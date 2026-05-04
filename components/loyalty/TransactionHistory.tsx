'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Transaction } from '@/lib/loyalty-types';

interface Props {
  customerId: string;
}

export default function TransactionHistory({ customerId }: Props) {
  const [txns, setTxns]       = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setTxns((data as Transaction[]) ?? []);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return (
      <p className="text-xs text-center py-6" style={{ color: 'rgba(242,232,217,0.3)' }}>
        Loading history…
      </p>
    );
  }

  if (!txns.length) {
    return (
      <p className="text-xs text-center py-6" style={{ color: 'rgba(242,232,217,0.3)' }}>
        No transactions yet.
      </p>
    );
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

  return (
    <div className="space-y-2">
      {txns.map((t) => (
        <div
          key={t.id}
          className="flex items-start justify-between px-4 py-3 rounded-xl text-sm"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,169,110,0.1)' }}
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: t.type === 'earn' ? 'rgba(200,169,110,0.15)' : 'rgba(160,103,75,0.2)',
                  color: t.type === 'earn' ? '#C8A96E' : '#A0674B',
                }}
              >
                {t.type === 'earn' ? 'Earned' : 'Redeemed'}
              </span>
              {t.bill_amount != null && (
                <span className="text-xs" style={{ color: 'rgba(242,232,217,0.4)' }}>
                  ₹{t.bill_amount}
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: 'rgba(242,232,217,0.35)' }}>
              {fmt(t.created_at)} · via {t.pin_level}
            </p>
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: t.type === 'earn' ? '#C8A96E' : '#A0674B' }}
          >
            {t.type === 'earn' ? '+' : '−'}{t.points} pts
          </span>
        </div>
      ))}
    </div>
  );
}
