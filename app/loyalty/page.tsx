'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Customer, Transaction, Reward } from '@/lib/loyalty-types';

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

interface LookupResult {
  customer: Customer;
  transactions: Transaction[];
  rewards: Reward[];
}

export default function LoyaltyPage() {
  const [phone, setPhone]     = useState('');
  const [result, setResult]   = useState<LookupResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = normalizePhone(phone);
    if (digits.length !== 10) { setError('Please enter a valid 10-digit number.'); return; }

    setLoading(true); setError(''); setResult(null); setNotFound(false);

    const [custRes, rewardsRes] = await Promise.all([
      supabase
        .from('customers')
        .select('*')
        .eq('phone', digits)
        .maybeSingle(),
      supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_required'),
    ]);

    if (!custRes.data) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const customer = custRes.data as Customer;

    const txnRes = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(30);

    setLoading(false);
    setResult({
      customer,
      transactions: (txnRes.data as Transaction[]) ?? [],
      rewards: (rewardsRes.data as Reward[]) ?? [],
    });
  };

  const reset = () => {
    setResult(null); setNotFound(false); setPhone(''); setError('');
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-lg mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <Image
              src="/mascot/blessed.svg"
              alt=""
              width={80}
              height={80}
              className="opacity-70"
              aria-hidden="true"
            />
          </div>
          <h1
            className="text-3xl md:text-4xl text-espresso mb-3"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            Your loyalty points
          </h1>
          <p className="text-espresso/55 text-sm">
            Enter your phone number to check your balance and rewards.
          </p>
        </div>

        {/* Lookup form */}
        {!result && !notFound && (
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label htmlFor="phone-input" className="block text-xs tracking-widest uppercase text-espresso/40 mb-2">
                Mobile number
              </label>
              <input
                id="phone-input"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                placeholder="10-digit mobile number"
                className="w-full rounded-xl px-4 py-3 text-espresso bg-cream-light outline-none text-lg tracking-wide"
                style={{ border: `1.5px solid ${error ? '#C4453A' : 'rgba(139,109,74,0.25)'}` }}
                autoComplete="tel"
              />
            </div>
            {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="w-full py-3.5 rounded-xl font-medium bg-caramel text-cream transition-opacity disabled:opacity-40"
            >
              {loading ? 'Looking up…' : 'Check My Points'}
            </button>
          </form>
        )}

        {/* Not found */}
        {notFound && (
          <div
            className="rounded-2xl p-8 text-center space-y-4"
            style={{ background: 'rgba(139,109,74,0.07)', border: '1.5px solid rgba(139,109,74,0.15)' }}
          >
            <div className="flex justify-center">
              <Image src="/mascot/lost.svg" alt="" width={64} height={64} className="opacity-60" aria-hidden="true" />
            </div>
            <p className="text-espresso font-medium" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
              We couldn&apos;t find that number.
            </p>
            <p className="text-espresso/55 text-sm">
              Ask your barista to sign you up on your next visit!
            </p>
            <button onClick={reset} className="text-sm text-caramel hover:opacity-70 transition-opacity">
              Try a different number →
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {/* Customer card */}
            <div
              className="rounded-2xl px-6 py-5"
              style={{ background: 'rgba(139,109,74,0.07)', border: '1.5px solid rgba(200,169,110,0.3)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-espresso/40 mb-1">Welcome back</p>
                  <h2
                    className="text-2xl text-espresso"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                  >
                    {result.customer.name}
                  </h2>
                  <p className="text-espresso/45 text-sm">{result.customer.phone}</p>
                </div>
                <button onClick={reset} className="text-xs text-espresso/30 hover:opacity-60 transition-opacity">
                  ← Back
                </button>
              </div>

              <div className="mt-5 flex gap-6">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-espresso/40">Balance</p>
                  <p className="text-3xl font-semibold" style={{ color: '#8B6D4A' }}>
                    {result.customer.total_points}
                  </p>
                  <p className="text-xs text-espresso/40">points</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-espresso/40">Lifetime</p>
                  <p className="text-3xl font-semibold text-espresso/70">{result.customer.lifetime_points}</p>
                  <p className="text-xs text-espresso/40">total earned</p>
                </div>
              </div>
            </div>

            {/* Rewards */}
            {result.rewards.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-espresso/40 mb-3">Available Rewards</p>
                <div className="space-y-2">
                  {result.rewards.map((r) => {
                    const eligible = result.customer.total_points >= r.points_required;
                    const needed   = r.points_required - result.customer.total_points;
                    return (
                      <div
                        key={r.id}
                        className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-3"
                        style={{
                          background: eligible ? 'rgba(200,169,110,0.1)' : 'rgba(0,0,0,0.03)',
                          border: `1px solid ${eligible ? 'rgba(200,169,110,0.4)' : 'rgba(139,109,74,0.12)'}`,
                        }}
                      >
                        <div>
                          <p className="text-sm font-medium text-espresso">{r.name}</p>
                          {r.description && r.description !== 'REWARD_DESCRIPTION_HERE' && (
                            <p className="text-xs text-espresso/50">{r.description}</p>
                          )}
                          <p className="text-xs mt-0.5" style={{ color: '#8B6D4A' }}>
                            {r.points_required} pts
                          </p>
                        </div>
                        {eligible ? (
                          <span
                            className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0"
                            style={{ background: '#8B6D4A', color: '#FAF7F2' }}
                          >
                            Eligible ✓
                          </span>
                        ) : (
                          <span className="text-xs text-espresso/40 flex-shrink-0">
                            {needed} more pts
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Transaction history */}
            {result.transactions.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-espresso/40 mb-3">Transaction History</p>
                <div className="space-y-2 max-h-[360px] overflow-y-auto rounded-xl">
                  {result.transactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-cream-light"
                      style={{ border: '1px solid rgba(139,109,74,0.1)' }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: t.type === 'earn' ? 'rgba(139,109,74,0.12)' : 'rgba(160,103,75,0.12)',
                              color: t.type === 'earn' ? '#8B6D4A' : '#A0674B',
                            }}
                          >
                            {t.type === 'earn' ? 'Earned' : 'Redeemed'}
                          </span>
                          {t.bill_amount != null && (
                            <span className="text-xs text-espresso/40">₹{t.bill_amount}</span>
                          )}
                        </div>
                        <p className="text-xs text-espresso/35 mt-0.5">{fmtDate(t.created_at)}</p>
                      </div>
                      <span
                        className="font-semibold text-sm"
                        style={{ color: t.type === 'earn' ? '#8B6D4A' : '#A0674B' }}
                      >
                        {t.type === 'earn' ? '+' : '−'}{t.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Member since */}
            <p className="text-center text-xs text-espresso/30">
              Member since {fmtDate(result.customer.created_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
