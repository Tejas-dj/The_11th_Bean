'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { RegisterClosure, Expense } from '@/lib/loyalty-types';

export default function LedgerView() {
  const [closures, setClosures] = useState<RegisterClosure[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: cData } = await supabase.from('register_closures').select('*').order('created_at', { ascending: false }).limit(30);
      const { data: eData } = await supabase.from('expenses').select('*').order('created_at', { ascending: false }).limit(50);
      
      setClosures((cData as RegisterClosure[]) || []);
      setExpenses((eData as Expense[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(242,232,217,0.4)', fontSize: '14px' }}>Loading ledger...</div>;
  }

  const cardStyle = { background: '#2A2320', border: '1px solid rgba(200,169,110,0.12)', borderRadius: '16px', padding: '20px' };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '100%', background: '#1E1916' }}>
      
      <div style={cardStyle}>
        <h2 style={{ fontSize: '18px', color: '#F2E8D9', margin: '0 0 16px 0', fontWeight: 500 }}>EOD Register Closures</h2>
        {closures.length === 0 ? (
          <p style={{ color: 'rgba(242,232,217,0.3)', fontSize: '13px' }}>No register closures logged yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'rgba(242,232,217,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Date & Time</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Closed By</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Expected</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Actual</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Diff</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {closures.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#F2E8D9' }}>
                    <td style={{ padding: '12px 8px' }}>{new Date(c.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td style={{ padding: '12px 8px', textTransform: 'capitalize' }}>{c.closed_by}</td>
                    <td style={{ padding: '12px 8px' }}>₹{c.expected_cash.toLocaleString()}</td>
                    <td style={{ padding: '12px 8px' }}>₹{c.actual_cash.toLocaleString()}</td>
                    <td style={{ padding: '12px 8px', color: c.difference === 0 ? '#6EC87E' : '#C86E6E', fontWeight: 600 }}>
                      {c.difference > 0 ? '+' : ''}{c.difference}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'rgba(242,232,217,0.6)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: '18px', color: '#F2E8D9', margin: '0 0 16px 0', fontWeight: 500 }}>Petty Cash Expenses</h2>
        {expenses.length === 0 ? (
          <p style={{ color: 'rgba(242,232,217,0.3)', fontSize: '13px' }}>No expenses logged yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'rgba(242,232,217,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Date & Time</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Logged By</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Amount</th>
                  <th style={{ padding: '12px 8px', fontWeight: 500 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#F2E8D9' }}>
                    <td style={{ padding: '12px 8px' }}>{new Date(e.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td style={{ padding: '12px 8px', textTransform: 'capitalize' }}>{e.logged_by}</td>
                    <td style={{ padding: '12px 8px', color: '#C86E6E', fontWeight: 500 }}>₹{Number(e.amount).toLocaleString()}</td>
                    <td style={{ padding: '12px 8px', color: 'rgba(242,232,217,0.8)' }}>{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
