'use server';

import { createAdminClient } from '@/lib/supabase-admin';
import bcrypt from 'bcryptjs';
import type { PinLevel, Customer, MenuItem, Reward, BillLineItem } from '@/lib/loyalty-types';

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

// ── PIN verification ─────────────────────────────────────────

export async function verifyPin(
  pin: string,
): Promise<{ level: PinLevel } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('pins').select('level, pin_hash');
  if (error || !data?.length) return { error: 'Could not verify PIN.' };

  for (const row of data) {
    const match = await bcrypt.compare(pin, row.pin_hash);
    if (match) return { level: row.level as PinLevel };
  }
  return { error: 'Incorrect PIN.' };
}

// ── Customer lookup / creation ───────────────────────────────

export async function findCustomerByPhone(
  rawPhone: string,
): Promise<{ customer: Customer } | { notFound: true }> {
  const phone = normalizePhone(rawPhone);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('phone', phone)
    .maybeSingle();
  if (!data) return { notFound: true };
  return { customer: data as Customer };
}

export async function createCustomer(
  name: string,
  rawPhone: string,
): Promise<{ customer: Customer } | { error: string }> {
  const phone = normalizePhone(rawPhone);
  if (phone.length !== 10) return { error: 'Phone must be 10 digits.' };

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('customers')
    .insert({ name: name.trim(), phone })
    .select()
    .single();
  if (error) return { error: error.message };
  return { customer: data as Customer };
}

// ── Bill submission ──────────────────────────────────────────

export async function submitBill(params: {
  customerId: string;
  pinLevel: PinLevel;
  lineItems: BillLineItem[];
}): Promise<{ ok: true; pointsEarned: number; billAmount: number } | { error: string }> {
  const { customerId, pinLevel, lineItems } = params;

  const billAmount = lineItems.reduce(
    (sum, li) => sum + li.menuItem.price * li.quantity,
    0,
  );
  const pointsEarned = Math.floor(billAmount / 100);

  const supabase = createAdminClient();

  const { data: txn, error: txnErr } = await supabase
    .from('transactions')
    .insert({
      customer_id: customerId,
      type: 'earn',
      points: pointsEarned,
      bill_amount: billAmount,
      pin_level: pinLevel,
    })
    .select()
    .single();

  if (txnErr) return { error: txnErr.message };

  const itemRows = lineItems.map((li) => ({
    transaction_id: txn.id,
    menu_item_id: li.menuItem.id,
    quantity: li.quantity,
    unit_price: li.menuItem.price,
  }));

  const { error: itemsErr } = await supabase.from('transaction_items').insert(itemRows);
  if (itemsErr) return { error: itemsErr.message };

  const { error: updateErr } = await supabase.rpc('increment_points', {
    p_customer_id: customerId,
    p_points: pointsEarned,
  });
  if (updateErr) {
    // Fallback: manual update if RPC not available
    const { data: cust } = await supabase
      .from('customers')
      .select('total_points, lifetime_points')
      .eq('id', customerId)
      .single();
    await supabase
      .from('customers')
      .update({
        total_points: (cust?.total_points ?? 0) + pointsEarned,
        lifetime_points: (cust?.lifetime_points ?? 0) + pointsEarned,
      })
      .eq('id', customerId);
  }

  return { ok: true, pointsEarned, billAmount };
}

// ── Manual points adjustment ─────────────────────────────────

export async function adjustPoints(params: {
  customerId: string;
  points: number;
  type: 'earn' | 'redeem';
  pinLevel: PinLevel;
}): Promise<{ ok: true } | { error: string }> {
  const { customerId, points, type, pinLevel } = params;
  const supabase = createAdminClient();

  const { data: cust, error: fetchErr } = await supabase
    .from('customers')
    .select('total_points, lifetime_points')
    .eq('id', customerId)
    .single();

  if (fetchErr || !cust) return { error: 'Customer not found.' };

  const newTotal = type === 'earn'
    ? cust.total_points + points
    : cust.total_points - points;

  if (newTotal < 0) return { error: 'Not enough points to deduct.' };

  const { error: txnErr } = await supabase.from('transactions').insert({
    customer_id: customerId,
    type,
    points,
    pin_level: pinLevel,
  });
  if (txnErr) return { error: txnErr.message };

  const updatePayload: { total_points: number; lifetime_points?: number } = {
    total_points: newTotal,
  };
  if (type === 'earn') {
    updatePayload.lifetime_points = cust.lifetime_points + points;
  }

  const { error: updateErr } = await supabase
    .from('customers')
    .update(updatePayload)
    .eq('id', customerId);
  if (updateErr) return { error: updateErr.message };

  return { ok: true };
}

// ── Reward redemption ────────────────────────────────────────

export async function redeemReward(params: {
  customerId: string;
  reward: Reward;
  pinLevel: PinLevel;
}): Promise<{ ok: true } | { error: string }> {
  const { customerId, reward, pinLevel } = params;
  const supabase = createAdminClient();

  const { data: cust } = await supabase
    .from('customers')
    .select('total_points')
    .eq('id', customerId)
    .single();

  if (!cust || cust.total_points < reward.points_required) {
    return { error: 'Insufficient points.' };
  }

  const { error: txnErr } = await supabase.from('transactions').insert({
    customer_id: customerId,
    type: 'redeem',
    points: reward.points_required,
    pin_level: pinLevel,
  });
  if (txnErr) return { error: txnErr.message };

  const { error: updateErr } = await supabase
    .from('customers')
    .update({ total_points: cust.total_points - reward.points_required })
    .eq('id', customerId);
  if (updateErr) return { error: updateErr.message };

  return { ok: true };
}

// ── Menu management (owner only) ─────────────────────────────

export async function createMenuItem(
  name: string,
  price: number,
): Promise<{ item: MenuItem } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .insert({ name: name.trim(), price })
    .select()
    .single();
  if (error) return { error: error.message };
  return { item: data as MenuItem };
}

export async function updateMenuItem(
  id: string,
  patch: Partial<Pick<MenuItem, 'name' | 'price' | 'is_active'>>,
): Promise<{ item: MenuItem } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { item: data as MenuItem };
}

// ── Reward management (owner only) ───────────────────────────

export async function createReward(params: {
  name: string;
  points_required: number;
  description: string;
}): Promise<{ reward: Reward } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('rewards')
    .insert(params)
    .select()
    .single();
  if (error) return { error: error.message };
  return { reward: data as Reward };
}

export async function updateReward(
  id: string,
  patch: Partial<Reward>,
): Promise<{ reward: Reward } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('rewards')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { reward: data as Reward };
}

export async function deleteReward(id: string): Promise<{ ok: true } | { error: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('rewards').delete().eq('id', id);
  if (error) return { error: error.message };
  return { ok: true };
}

// ── Analytics helpers (owner only) ───────────────────────────

export async function fetchAnalytics() {
  const supabase = createAdminClient();

  const now = new Date();
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const [allCustomers, transactions, itemTotals] = await Promise.all([
    supabase
      .from('customers')
      .select('id, name, phone, total_points, lifetime_points, created_at')
      .order('lifetime_points', { ascending: false }),
    supabase
      .from('transactions')
      .select('id, type, points, bill_amount, pin_level, created_at, customers(name, phone)')
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('transaction_items')
      .select('quantity, unit_price, menu_items(name)'),
  ]);

  const custs = allCustomers.data ?? [];
  const txns  = transactions.data ?? [];

  // Revenue aggregates
  const earnTxns     = txns.filter((t: { type: string; bill_amount: number | null }) => t.type === 'earn' && t.bill_amount != null);
  const totalRevenue = earnTxns.reduce((s: number, t: { bill_amount: number }) => s + t.bill_amount, 0);
  const avgBill      = earnTxns.length > 0 ? totalRevenue / earnTxns.length : 0;

  const todayEarns      = earnTxns.filter((t: { created_at: string }) => new Date(t.created_at) >= todayStart);
  const yesterdayEarns  = earnTxns.filter((t: { created_at: string }) => {
    const d = new Date(t.created_at);
    return d >= yesterdayStart && d < todayStart;
  });

  const todayRevenue     = todayEarns.reduce((s: number, t: { bill_amount: number }) => s + t.bill_amount, 0);
  const yesterdayRevenue = yesterdayEarns.reduce((s: number, t: { bill_amount: number }) => s + t.bill_amount, 0);
  const todayTxnCount    = todayEarns.length;
  const newCustomersToday = custs.filter((c: { created_at: string }) => new Date(c.created_at) >= todayStart).length;

  // Points economy
  const totalCirculating = custs.reduce((s: number, c: { total_points: number }) => s + c.total_points, 0);
  const totalEverIssued  = custs.reduce((s: number, c: { lifetime_points: number }) => s + c.lifetime_points, 0);
  const totalRedeemed    = txns
    .filter((t: { type: string }) => t.type === 'redeem')
    .reduce((s: number, t: { points: number }) => s + t.points, 0);

  // Peak hours (0–23) — based on earn transactions
  const hourCounts: number[] = Array(24).fill(0);
  earnTxns.forEach((t: { created_at: string }) => {
    hourCounts[new Date(t.created_at).getHours()]++;
  });
  const peakHours = hourCounts.map((count, hour) => ({
    hour: hour < 12 ? `${hour || 12}${hour < 12 ? 'a' : 'p'}` : `${hour === 12 ? 12 : hour - 12}p`,
    count,
  })).slice(6, 23); // 6am–10pm

  return {
    topCustomers: custs.slice(0, 10),
    transactions: txns,
    transactionItems: itemTotals.data ?? [],
    pointsEconomy: { totalCirculating, totalEverIssued, totalRedeemed },
    summary: {
      totalRevenue,
      totalCustomers: custs.length,
      avgBill,
      todayRevenue,
      todayTxnCount,
      newCustomersToday,
      yesterdayRevenue,
    },
    peakHours,
  };
}
