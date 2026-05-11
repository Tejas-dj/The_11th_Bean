'use server';

import { createAdminClient } from '@/lib/supabase-admin';
import bcrypt from 'bcryptjs';
import type { PinLevel, Customer, MenuItem, Reward, BillLineItem, Expense, RegisterClosure } from '@/lib/loyalty-types';

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

/**
 * Helper to determine the "Business Day".
 * The cafe operates from 9 AM to 1 AM (or later). 
 * We consider a day to start at 5:00 AM and end at 4:59 AM the next day.
 */
function getBusinessDayBounds(dateOverride?: Date) {
  const now = dateOverride || new Date();
  // Subtract 5 hours so anything before 5 AM is considered the previous day
  const adjusted = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  
  const y = adjusted.getFullYear();
  const m = adjusted.getMonth();
  const d = adjusted.getDate();
  
  const start = new Date(y, m, d, 5, 0, 0); 
  const end = new Date(y, m, d + 1, 4, 59, 59, 999);
  
  const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  
  return { 
    startStr: start.toISOString(), 
    endStr: end.toISOString(), 
    dateStr,
    startDate: start,
    endDate: end
  };
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

export async function searchCustomersByName(
  query: string
): Promise<{ customers: Customer[] }> {
  if (!query || query.length < 2) return { customers: [] };
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('customers')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10);
  return { customers: (data as Customer[]) || [] };
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
  paymentMode?: 'cash' | 'upi' | 'card';
}): Promise<{ ok: true; pointsEarned: number; billAmount: number; billNumber: number | null } | { error: string }> {
  const { customerId, pinLevel, lineItems, paymentMode } = params;

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
      payment_mode: paymentMode ?? null,
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

  return { ok: true, pointsEarned, billAmount, billNumber: txn?.bill_number ?? null };
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
  category = 'Other',
): Promise<{ item: MenuItem } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .insert({ name: name.trim(), price, category })
    .select()
    .single();
  if (error) return { error: error.message };
  return { item: data as MenuItem };
}

export async function updateMenuItem(
  id: string,
  patch: Partial<Pick<MenuItem, 'name' | 'price' | 'is_active' | 'category'>>,
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

export async function deleteMenuItem(id: string): Promise<{ ok: true } | { error: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) return { error: error.message };
  return { ok: true };
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

  const { startDate: todayStart, endDate: todayEnd } = getBusinessDayBounds();
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

  // Fire all RPC calls in parallel — Postgres does the heavy math,
  // only tiny JSON blobs come back over the network.
  const [summaryRes, peakRes, topItemsRes, topCustsRes, recentTxnsRes, expensesRes] = await Promise.all([
    supabase.rpc('get_analytics_summary', {
      p_today_start:     todayStart.toISOString(),
      p_today_end:       todayEnd.toISOString(),
      p_yesterday_start: yesterdayStart.toISOString(),
    }),
    supabase.rpc('get_peak_hours'),
    supabase.rpc('get_top_items', { p_limit: 20 }),
    supabase.rpc('get_top_customers', { p_limit: 10 }),
    supabase.rpc('get_recent_transactions', { p_limit: 100 }),
    supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false }),
  ]);

  const summary      = summaryRes.data ?? {};
  const rawPeakHours = (peakRes.data ?? []) as { hour: number; count: number }[];
  const topItems     = topItemsRes.data ?? [];
  const topCustomers = topCustsRes.data ?? [];
  const transactions = recentTxnsRes.data ?? [];
  const exps         = expensesRes.data ?? [];

  // Format peak hours into the labels the dashboard expects (6am–10pm)
  const hourMap: Record<number, number> = {};
  rawPeakHours.forEach(({ hour, count }) => { hourMap[hour] = count; });
  const peakHours = Array.from({ length: 17 }, (_, i) => {
    const h = i + 6; // 6 → 22
    const label = h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`;
    return { hour: label, count: hourMap[h] ?? 0 };
  });

  const netProfit      = (summary.totalRevenue ?? 0) - (summary.totalExpenses ?? 0);
  const todayNetProfit = (summary.todayRevenue ?? 0) - (summary.todayExpenses ?? 0);

  return {
    topCustomers,
    transactions,
    transactionItems: topItems, // top-items data replaces raw transaction_items for the dashboard
    expenses: exps,
    pointsEconomy: {
      totalCirculating: summary.totalCirculating ?? 0,
      totalEverIssued:  summary.totalEverIssued  ?? 0,
      totalRedeemed:    summary.totalRedeemed    ?? 0,
    },
    summary: {
      totalRevenue:      summary.totalRevenue      ?? 0,
      totalExpenses:     summary.totalExpenses      ?? 0,
      netProfit,
      totalCustomers:    summary.totalCustomers    ?? 0,
      avgBill:           summary.avgBill           ?? 0,
      todayRevenue:      summary.todayRevenue      ?? 0,
      todayExpenses:     summary.todayExpenses     ?? 0,
      todayNetProfit,
      todayTxnCount:     summary.todayTxnCount     ?? 0,
      newCustomersToday: summary.newCustomersToday ?? 0,
      yesterdayRevenue:  summary.yesterdayRevenue  ?? 0,
    },
    peakHours,
  };
}

// ── EOD and Expenses ──────────────────────────────────────────

export async function logExpense(
  amount: number,
  description: string,
  pinLevel: PinLevel
): Promise<{ expense: Expense } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('expenses')
    .insert({ amount, description, logged_by: pinLevel })
    .select()
    .single();
  
  if (error) return { error: error.message };
  return { expense: data as Expense };
}
export async function getTodayExpenses(): Promise<{ expenses: Expense[] } | { error: string }> {
  const supabase = createAdminClient();
  const { startStr, endStr } = getBusinessDayBounds();

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('created_at', startStr)
    .lt('created_at', endStr)
    .order('created_at', { ascending: false });

  if (error) return { error: error.message };
  return { expenses: data as Expense[] };
}

export async function updateExpense(
  id: string,
  amount: number,
  description: string
): Promise<{ success: boolean } | { error: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('expenses')
    .update({ amount, description })
    .eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteExpense(id: string): Promise<{ success: boolean } | { error: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}
export async function closeRegister(
  expectedCash: number,
  actualCash: number,
  notes: string | null,
  pinLevel: PinLevel
): Promise<{ registerClosure: RegisterClosure } | { error: string }> {
  const supabase = createAdminClient();
  const difference = actualCash - expectedCash;
  const { data, error } = await supabase
    .from('register_closures')
    .insert({
      expected_cash: expectedCash,
      actual_cash: actualCash,
      difference,
      closed_by: pinLevel,
      notes
    })
    .select()
    .single();
    
  if (error) return { error: error.message };
  return { registerClosure: data as RegisterClosure };
}

export async function getTodayCashSummary(): Promise<{ cashSales: number; expenses: number } | { error: string }> {
  const supabase = createAdminClient();
  const { startStr, endStr } = getBusinessDayBounds();

  const { data: sales, error: salesErr } = await supabase
    .from('transactions')
    .select('bill_amount')
    .eq('type', 'earn')
    .eq('payment_mode', 'cash')
    .gte('created_at', startStr)
    .lt('created_at', endStr);
    
  if (salesErr) return { error: salesErr.message };

  const { data: exp, error: expErr } = await supabase
    .from('expenses')
    .select('amount')
    .gte('created_at', startStr)
    .lt('created_at', endStr);
    
  if (expErr) return { error: expErr.message };

  const cashSales = (sales as { bill_amount: number | null }[]).reduce((sum, s) => sum + (s.bill_amount || 0), 0);
  const expenses = (exp as { amount: number }[]).reduce((sum, e) => sum + Number(e.amount), 0);

  return { cashSales, expenses };
}

export async function startShift(startingFloat: number, pinLevel: PinLevel): Promise<{ success: boolean } | { error: string }> {
  const supabase = createAdminClient();
  const { dateStr } = getBusinessDayBounds();
  
  // We insert a new shift for today. If it fails due to unique constraint, it means one already exists.
  const { error } = await supabase
    .from('daily_shifts')
    .insert({ starting_float: startingFloat, opened_by: pinLevel, shift_date: dateStr });
  
  if (error) {
    // If it's a unique violation, update it instead
    if (error.code === '23505') {
      const { error: updErr } = await supabase
        .from('daily_shifts')
        .update({ starting_float: startingFloat, opened_by: pinLevel })
        .eq('shift_date', dateStr);
      if (updErr) return { error: updErr.message };
    } else {
      return { error: error.message };
    }
  }
  return { success: true };
}

export async function getTodayShift(): Promise<{ startingFloat: number | null } | { error: string }> {
  const supabase = createAdminClient();
  const { dateStr } = getBusinessDayBounds();
  const { data, error } = await supabase
    .from('daily_shifts')
    .select('starting_float')
    .eq('shift_date', dateStr)
    .single();

  if (error && error.code !== 'PGRST116') return { error: error.message };
  return { startingFloat: data ? data.starting_float : null };
}

export async function getYesterdayClosure(): Promise<{ actualCash: number | null }> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('register_closures')
    .select('actual_cash')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  return { actualCash: data ? data.actual_cash : null };
}

// ── Parked Bills ──────────────────────────────────────────────

export async function getParkedBills(): Promise<{ parkedBills: any[] } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('parked_bills')
    .select('id, customer_id, cashier_pin_level, line_items, created_at, customers(name, phone, total_points)')
    .order('created_at', { ascending: true });

  if (error) return { error: error.message };
  return { parkedBills: data || [] };
}

export async function parkBill(
  customerId: string,
  lineItems: any[],
  pinLevel: string
): Promise<{ success: boolean } | { error: string }> {
  const supabase = createAdminClient();
  
  // Enforce limit
  const { count, error: countErr } = await supabase
    .from('parked_bills')
    .select('*', { count: 'exact', head: true });
    
  if (countErr) return { error: countErr.message };
  if (count && count >= 3) return { error: 'Maximum of 3 bills can be parked at a time.' };

  const { error } = await supabase
    .from('parked_bills')
    .insert({
      customer_id: customerId,
      line_items: lineItems,
      cashier_pin_level: pinLevel
    });

  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteParkedBill(id: string): Promise<{ success: boolean } | { error: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('parked_bills')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };
  return { success: true };
}
