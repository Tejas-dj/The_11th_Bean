'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { adjustPoints, redeemReward } from '@/app/actions/loyalty';
import TransactionHistory from './TransactionHistory';
import type { Customer, Reward, PinLevel } from '@/lib/loyalty-types';

interface Props {
  customer: Customer;
  pinLevel: PinLevel;
  onCustomerUpdated: (c: Customer) => void;
}

type Tab = 'history' | 'adjust' | 'redeem';

export default function PointsManager({ customer, pinLevel, onCustomerUpdated }: Props) {
  const [tab, setTab]         = useState<Tab>('history');
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [points, setPoints]   = useState('');
  const [adjType, setAdjType] = useState<'earn' | 'redeem'>('earn');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState('');
  const [error, setError]     = useState('');
  const [redeemTarget, setRedeemTarget] = useState<Reward | null>(null);

  useEffect(() => {
    supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points_required')
      .then(({ data }) => setRewards((data as Reward[]) ?? []));
  }, []);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(points, 10);
    if (!n || n < 1) { setError('Enter a positive number.'); return; }
    setLoading(true); setError(''); setMsg('');
    const result = await adjustPoints({ customerId: customer.id, points: n, type: adjType, pinLevel });
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      const newTotal = adjType === 'earn'
        ? customer.total_points + n
        : customer.total_points - n;
      const newLifetime = adjType === 'earn' ? customer.lifetime_points + n : customer.lifetime_points;
      onCustomerUpdated({ ...customer, total_points: newTotal, lifetime_points: newLifetime });
      setMsg(`${adjType === 'earn' ? 'Added' : 'Deducted'} ${n} points.`);
      setPoints('');
    }
  };

  const handleRedeem = async (reward: Reward) => {
    setLoading(true); setError(''); setMsg('');
    const result = await redeemReward({ customerId: customer.id, reward, pinLevel });
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      onCustomerUpdated({ ...customer, total_points: customer.total_points - reward.points_required });
      setMsg(`"${reward.name}" redeemed! −${reward.points_required} pts`);
      setRedeemTarget(null);
    }
  };

  const tabBtn = (t: Tab, label: string) => (
    <button
      key={t}
      onClick={() => { setTab(t); setMsg(''); setError(''); }}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{
        background: tab === t ? 'rgba(200,169,110,0.2)' : 'transparent',
        color: tab === t ? '#C8A96E' : 'rgba(242,232,217,0.5)',
        border: tab === t ? '1px solid rgba(200,169,110,0.35)' : '1px solid transparent',
      }}
    >
      {label}
    </button>
  );

  const inp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(200,169,110,0.25)',
    color: '#F2E8D9',
    borderRadius: '10px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    fontSize: '15px',
  };

  const eligibleRewards = rewards.filter((r) => r.points_required <= customer.total_points);

  return (
    <div className="mt-6 space-y-4">
      {/* Points summary */}
      <div
        className="rounded-xl px-5 py-4 flex gap-8"
        style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}
      >
        <div>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(242,232,217,0.4)' }}>Balance</p>
          <p className="text-2xl font-semibold" style={{ color: '#C8A96E' }}>{customer.total_points}</p>
          <p className="text-xs" style={{ color: 'rgba(242,232,217,0.35)' }}>points</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(242,232,217,0.4)' }}>Lifetime</p>
          <p className="text-2xl font-semibold" style={{ color: '#F2E8D9' }}>{customer.lifetime_points}</p>
          <p className="text-xs" style={{ color: 'rgba(242,232,217,0.35)' }}>total earned</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabBtn('history', 'History')}
        {tabBtn('adjust', 'Adjust Points')}
        {tabBtn('redeem', `Redeem${eligibleRewards.length ? ` (${eligibleRewards.length})` : ''}`)}
      </div>

      {/* Tab content */}
      {tab === 'history' && <TransactionHistory customerId={customer.id} />}

      {tab === 'adjust' && (
        <form onSubmit={handleAdjust} className="space-y-4">
          <div className="flex gap-2">
            {(['earn', 'redeem'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAdjType(t)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
                style={{
                  background: adjType === t ? (t === 'earn' ? 'rgba(200,169,110,0.2)' : 'rgba(160,103,75,0.2)') : 'rgba(255,255,255,0.04)',
                  color: adjType === t ? (t === 'earn' ? '#C8A96E' : '#A0674B') : 'rgba(242,232,217,0.5)',
                  border: `1px solid ${adjType === t ? (t === 'earn' ? 'rgba(200,169,110,0.3)' : 'rgba(160,103,75,0.3)') : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {t === 'earn' ? '+ Add Points' : '− Deduct Points'}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) => { setPoints(e.target.value); setError(''); }}
            placeholder="Number of points"
            style={inp}
          />
          {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
          {msg   && <p className="text-sm" style={{ color: '#C8A96E' }}>{msg}</p>}
          <button
            type="submit"
            disabled={loading || !points}
            className="w-full py-3 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40"
            style={{ background: '#C8A96E', color: '#2A2320' }}
          >
            {loading ? 'Saving…' : `${adjType === 'earn' ? 'Add' : 'Deduct'} ${points || '0'} Points`}
          </button>
        </form>
      )}

      {tab === 'redeem' && (
        <div className="space-y-3">
          {msg   && <p className="text-sm" style={{ color: '#C8A96E' }}>{msg}</p>}
          {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
          {rewards.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: 'rgba(242,232,217,0.3)' }}>
              No active rewards configured.
            </p>
          )}
          {rewards.map((r) => {
            const eligible = customer.total_points >= r.points_required;
            const isTarget = redeemTarget?.id === r.id;
            return (
              <div
                key={r.id}
                className="p-4 rounded-xl"
                style={{
                  background: eligible ? 'rgba(200,169,110,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${eligible ? 'rgba(200,169,110,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  opacity: eligible ? 1 : 0.5,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#F2E8D9' }}>{r.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(242,232,217,0.5)' }}>{r.description}</p>
                    <p className="text-xs mt-1" style={{ color: '#C8A96E' }}>{r.points_required} pts required</p>
                  </div>
                  {eligible && !isTarget && (
                    <button
                      onClick={() => setRedeemTarget(r)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: 'rgba(200,169,110,0.2)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)' }}
                    >
                      Redeem
                    </button>
                  )}
                </div>
                {isTarget && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setRedeemTarget(null)}
                      className="flex-1 py-2 rounded-lg text-xs transition-opacity"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(242,232,217,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRedeem(r)}
                      disabled={loading}
                      className="flex-1 py-2 rounded-lg text-xs font-medium disabled:opacity-40"
                      style={{ background: '#A0674B', color: '#F2E8D9' }}
                    >
                      {loading ? 'Processing…' : `Confirm −${r.points_required} pts`}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
