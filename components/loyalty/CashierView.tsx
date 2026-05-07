'use client';

import { useState } from 'react';
import Image from 'next/image';
import CustomerSearch from './CustomerSearch';
import POSView from './POSView';
import EodExpenses from './EodExpenses';
import type { Customer, PinLevel, Transaction } from '@/lib/loyalty-types';
import { supabase } from '@/lib/supabase';

type Screen = 'search' | 'pos';

interface Props {
  pinLevel: PinLevel;
  onLogout: () => void;
}

export default function CashierView({ pinLevel, onLogout }: Props) {
  const [screen, setScreen]             = useState<Screen>('search');
  const [customer, setCustomer]         = useState<Customer | null>(null);
  const [recentTxns, setRecentTxns]     = useState<Transaction[]>([]);
  const [showEod, setShowEod]           = useState(false);
  const [resumingParkedBillId, setResumingParkedBillId] = useState<string | null>(null);
  const [resumingLineItems, setResumingLineItems]       = useState<any[]>([]);

  const handleCustomerSelected = async (c: Customer, parkedBillId?: string, parkedLineItems?: any[]) => {
    setCustomer(c);
    if (parkedBillId && parkedLineItems) {
      setResumingParkedBillId(parkedBillId);
      setResumingLineItems(parkedLineItems);
    } else {
      setResumingParkedBillId(null);
      setResumingLineItems([]);
    }
    // Fetch last 5 transactions for "the usual" hint
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', c.id)
      .eq('type', 'earn')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentTxns((data as Transaction[]) ?? []);
    setScreen('pos');
  };

  const handleNewCustomer = () => {
    setCustomer(null);
    setRecentTxns([]);
    setResumingParkedBillId(null);
    setResumingLineItems([]);
    setScreen('search');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1E1916', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar — only visible on search screen */}
      {screen === 'search' && (
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            background: 'rgba(26,21,18,0.96)',
            borderBottom: '1px solid rgba(200,169,110,0.12)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/Main_Logo.svg"
              alt="The 11th Bean"
              width={110}
              height={32}
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.9, objectFit: 'contain' }}
              priority
            />
            <span
              style={{
                fontSize: '10px', padding: '2px 10px', borderRadius: '20px',
                background: 'rgba(200,169,110,0.15)', color: '#C8A96E',
                border: '1px solid rgba(200,169,110,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}
            >
              {pinLevel}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setShowEod(true)}
              style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', borderRadius: '16px', padding: '6px 12px', color: '#C8A96E', fontSize: '13px', cursor: 'pointer' }}
            >
              EOD & Expenses
            </button>
            <button
              onClick={onLogout}
              style={{ background: 'none', border: 'none', color: 'rgba(242,232,217,0.4)', fontSize: '13px', cursor: 'pointer' }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* EOD/Expenses Modal */}
      {showEod && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <EodExpenses pinLevel={pinLevel} onClose={() => setShowEod(false)} />
        </div>
      )}

      {/* Screens */}
      {screen === 'search' && (
        <CustomerSearch onCustomerSelected={handleCustomerSelected} pinLevel={pinLevel} />
      )}

      {screen === 'pos' && customer && (
        <POSView
          customer={customer}
          pinLevel={pinLevel}
          onNewCustomer={handleNewCustomer}
          onLogout={onLogout}
          recentTransactions={recentTxns}
          onShowEod={() => setShowEod(true)}
          parkedBillId={resumingParkedBillId || undefined}
          initialLineItems={resumingLineItems.length > 0 ? resumingLineItems : undefined}
        />
      )}
    </div>
  );
}
