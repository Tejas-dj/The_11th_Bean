'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { fetchAnalytics } from '@/app/actions/loyalty';

/* ─── Types ──────────────────────────────────────────────── */
type AnalyticsData = Awaited<ReturnType<typeof fetchAnalytics>>;
type Period = 'day' | 'week' | 'month';
interface ItemCount { name: string; count: number }

/* ─── Helpers ────────────────────────────────────────────── */
function groupRevenueByPeriod(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: { type: string; bill_amount: number | null; created_at: string }[],
  period: Period,
): { label: string; revenue: number }[] {
  const earns = transactions.filter(
    (t): t is typeof t & { bill_amount: number } =>
      t.type === 'earn' && t.bill_amount != null,
  );
  const map = new Map<string, number>();
  earns.forEach((t) => {
    const d = new Date(t.created_at);
    let key: string;
    if (period === 'day') {
      key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    } else if (period === 'week') {
      const s = new Date(d);
      s.setDate(d.getDate() - d.getDay());
      key = s.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    } else {
      key = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    }
    map.set(key, (map.get(key) ?? 0) + t.bill_amount);
  });
  return Array.from(map.entries())
    .map(([label, revenue]) => ({ label, revenue }))
    .slice(-14);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function topItems(transactionItems: any[]): ItemCount[] {
  const map = new Map<string, number>();
  transactionItems.forEach((ti) => {
    const name = ti.menu_items?.name ?? 'Unknown';
    map.set(name, (map.get(name) ?? 0) + ti.quantity);
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/* ─── Style constants ────────────────────────────────────── */
const BG_PAGE  = '#1E1916';
const BG_CARD  = '#2A2320';
const GOLD     = '#C8A96E';
const CREAM    = '#F2E8D9';
const MUTED    = 'rgba(242,232,217,0.4)';
const CARD_BORDER = '1px solid rgba(200,169,110,0.12)';

const card: React.CSSProperties = {
  background: BG_CARD,
  border: CARD_BORDER,
  borderRadius: '16px',
  padding: '20px',
};

const TOOLTIP_STYLE: React.CSSProperties = {
  background: '#1A1512',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: '10px',
  color: CREAM,
  fontSize: '12px',
  padding: '8px 12px',
};

const EMPTY_MSG = (
  <p style={{ color: 'rgba(242,232,217,0.25)', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
    No data yet — start processing bills to see analytics.
  </p>
);

/* ─── Small sub-components ───────────────────────────────── */
function KpiCard({
  label, value, sub, icon, delta,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  delta?: { amount: number; positive: boolean } | null;
}) {
  return (
    <div
      style={{ ...card, position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s', cursor: 'default' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.28)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.12)'; }}
    >
      <div style={{ position: 'absolute', top: 14, right: 16, opacity: 0.08, color: GOLD }}>{icon}</div>
      <p style={{ fontSize: '22px', fontWeight: 600, color: CREAM, marginBottom: '2px' }}>{value}</p>
      <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: MUTED }}>{sub}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(242,232,217,0.35)' }}>{label}</p>
        {delta && (
          <span style={{ fontSize: '10px', color: delta.positive ? '#6EC87E' : '#C86E6E' }}>
            {delta.positive ? '▲' : '▼'} ₹{Math.abs(delta.amount).toLocaleString('en-IN')}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Revenue KPI icons ──────────────────────────────────── */
const IconMoney = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15" />
  </svg>
);
const IconPeople = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconReceipt = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" />
  </svg>
);
const IconStar = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ─── Points economy bar ─────────────────────────────────── */
function EcoBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
    </div>
  );
}

/* ─── Main dashboard ─────────────────────────────────────── */
export default function AnalyticsDashboard() {
  const [data, setData]       = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod]   = useState<Period>('day');

  const load = useCallback(() => {
    setLoading(true);
    fetchAnalytics().then((d) => { setData(d); setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <p style={{ color: MUTED, fontSize: '14px' }}>Loading analytics…</p>
      </div>
    );
  }
  if (!data) return null;

  const {
    summary: { totalRevenue, totalCustomers, avgBill, todayRevenue, yesterdayRevenue, todayTxnCount, newCustomersToday },
    pointsEconomy: { totalCirculating, totalEverIssued, totalRedeemed },
    topCustomers, transactions, transactionItems, peakHours,
  } = data;

  const revenueData = groupRevenueByPeriod(transactions, period);
  const itemData    = topItems(transactionItems);
  const maxPeakCount = Math.max(...peakHours.map((h) => h.count), 1);

  const revDelta = todayRevenue !== yesterdayRevenue
    ? { amount: todayRevenue - yesterdayRevenue, positive: todayRevenue > yesterdayRevenue }
    : null;

  const rankBorderColor = (i: number) =>
    i === 0 ? GOLD : i === 1 ? '#A9A9A9' : i === 2 ? '#CD7F32' : 'rgba(200,169,110,0.15)';

  return (
    <div style={{ background: BG_PAGE, minHeight: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-lora), Georgia, serif', color: CREAM, fontWeight: 400, margin: 0 }}>
          Dashboard
        </h2>
        <button
          onClick={load}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '20px',
            background: 'rgba(200,169,110,0.1)', color: GOLD,
            border: '1px solid rgba(200,169,110,0.25)', fontSize: '12px', cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* ── KPI Cards ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          sub="All-time revenue"
          icon={<IconMoney />}
          delta={revDelta}
        />
        <KpiCard
          label="Total Customers"
          value={`${totalCustomers}`}
          sub="Registered members"
          icon={<IconPeople />}
        />
        <KpiCard
          label="Avg Bill Size"
          value={`₹${avgBill.toFixed(0)}`}
          sub="Per transaction"
          icon={<IconReceipt />}
        />
        <KpiCard
          label="Points Circulating"
          value={`${totalCirculating.toLocaleString('en-IN')}`}
          sub="Current balance (all)"
          icon={<IconStar />}
        />
      </div>

      {/* ── Row 2: Revenue chart + Today at a glance ────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: '16px', minWidth: 0 }}>

        {/* Revenue over time */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, margin: 0 }}>Revenue Over Time</p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['day', 'week', 'month'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: '4px 10px', borderRadius: '16px', fontSize: '11px', cursor: 'pointer',
                    background: period === p ? 'rgba(200,169,110,0.2)' : 'rgba(255,255,255,0.04)',
                    color: period === p ? GOLD : MUTED,
                    border: period === p ? '1px solid rgba(200,169,110,0.35)' : '1px solid rgba(255,255,255,0.06)',
                    textTransform: 'capitalize',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          {revenueData.length === 0 ? EMPTY_MSG : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData} margin={{ left: -10, right: 4 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(200,169,110,0.35)" />
                    <stop offset="100%" stopColor="rgba(200,169,110,0)" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} width={52} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v: unknown) => [`₹${(v as number).toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={GOLD}
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Today at a glance */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, marginBottom: '16px' }}>Today at a Glance</p>
          {[
            {
              label: 'Revenue Today',
              value: `₹${todayRevenue.toLocaleString('en-IN')}`,
              chip: revDelta
                ? { text: `${revDelta.positive ? '▲' : '▼'} ₹${Math.abs(revDelta.amount).toLocaleString('en-IN')} vs yesterday`, positive: revDelta.positive }
                : { text: 'Same as yesterday', positive: null },
            },
            { label: 'Bills Processed', value: `${todayTxnCount}`, chip: null },
            { label: 'New Customers', value: `${newCustomersToday}`, chip: null },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div>
                <p style={{ fontSize: '11px', color: MUTED, marginBottom: '3px' }}>{row.label}</p>
                {row.chip && (
                  <span style={{
                    fontSize: '10px',
                    color: row.chip.positive === null ? 'rgba(242,232,217,0.3)' : row.chip.positive ? '#6EC87E' : '#C86E6E',
                  }}>
                    {row.chip.text}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '20px', fontWeight: 600, color: CREAM }}>{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 3: Most ordered + Peak hours ────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '16px', minWidth: 0 }}>

        {/* Most ordered items */}
        <div style={card}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, marginBottom: '16px' }}>Most Ordered Items</p>
          {itemData.length === 0 ? EMPTY_MSG : (
            <ResponsiveContainer width="100%" height={Math.max(itemData.length * 36, 120)}>
              <BarChart data={itemData} layout="vertical" margin={{ left: 0, right: 12 }}>
                <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(242,232,217,0.65)', fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: unknown) => [v as number, 'Qty sold']} />
                <Bar dataKey="count" fill={GOLD} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Peak hours */}
        <div style={card}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, marginBottom: '4px' }}>Peak Hours</p>
          <p style={{ fontSize: '11px', color: MUTED, marginBottom: '14px' }}>Busiest times at the counter</p>
          {peakHours.every((h) => h.count === 0) ? EMPTY_MSG : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={peakHours} margin={{ left: -10, right: 4 }}>
                  <XAxis dataKey="hour" tick={{ fill: MUTED, fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: unknown) => [v as number, 'Transactions']} />
                  <Bar
                    dataKey="count"
                    radius={[3, 3, 0, 0]}
                    // Color each bar individually via cell won't work simply; use gradient as fill
                    fill="rgba(200,169,110,0.35)"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: '10px', color: 'rgba(242,232,217,0.25)', marginTop: '6px' }}>Based on all transactions</p>
            </>
          )}
        </div>
      </div>

      {/* ── Row 4: Top customers + Points economy ────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', minWidth: 0 }}>

        {/* Top customers */}
        <div style={card}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, marginBottom: '14px' }}>Top Customers</p>
          {topCustomers.length === 0 ? EMPTY_MSG : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topCustomers.map((c, i) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(242,232,217,0.3)', width: '16px', textAlign: 'right' }}>
                    {i + 1}
                  </span>
                  <div
                    style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: 'rgba(200,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: GOLD, flexShrink: 0,
                      border: `2px solid ${rankBorderColor(i)}`,
                    }}
                  >
                    {initials(c.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: CREAM, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                    <p style={{ fontSize: '11px', color: MUTED }}>{c.phone}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: GOLD }}>{c.lifetime_points}</p>
                    <p style={{ fontSize: '10px', color: 'rgba(242,232,217,0.3)' }}>lifetime pts</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Points economy */}
        <div style={card}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, marginBottom: '20px' }}>Points Economy</p>
          {[
            { label: 'Total Issued', value: totalEverIssued, color: 'rgba(200,169,110,0.6)', max: totalEverIssued },
            { label: 'Currently Circulating', value: totalCirculating, color: GOLD, max: totalEverIssued },
            { label: 'Redeemed', value: totalRedeemed, color: '#A0674B', max: totalEverIssued },
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '18px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <p style={{ fontSize: '11px', color: MUTED }}>{row.label}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: CREAM }}>{row.value.toLocaleString('en-IN')}</p>
              </div>
              <EcoBar value={row.value} max={row.max} color={row.color} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 6: Recent transactions feed ──────────── */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: CREAM, margin: 0 }}>Recent Transactions</p>
          <span style={{ fontSize: '10px', color: 'rgba(242,232,217,0.3)' }}>Last 30 transactions</span>
        </div>
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {transactions.length === 0 ? (
            <div style={{ padding: '24px' }}>{EMPTY_MSG}</div>
          ) : (
            transactions.slice(0, 30).map((t, i) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const txn = t as any as { id: string; type: string; points: number; bill_amount: number | null; created_at: string; customers?: { name: string; phone: string } };
              return (
                <div
                  key={txn.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 20px',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '10px', padding: '2px 8px', borderRadius: '10px',
                        background: txn.type === 'earn' ? 'rgba(200,169,110,0.15)' : 'rgba(160,103,75,0.2)',
                        color: txn.type === 'earn' ? GOLD : '#A0674B',
                        flexShrink: 0,
                        textTransform: 'capitalize',
                      }}
                    >
                      {txn.type}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '13px', color: CREAM, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {txn.customers?.name ?? '—'}
                      </p>
                      {txn.bill_amount != null && (
                        <p style={{ fontSize: '11px', color: MUTED }}>₹{txn.bill_amount.toLocaleString('en-IN')}</p>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: txn.type === 'earn' ? GOLD : '#A0674B' }}>
                      {txn.type === 'earn' ? '+' : '−'}{txn.points}
                    </p>
                    <p style={{ fontSize: '10px', color: 'rgba(242,232,217,0.3)' }}>
                      {new Date(txn.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
