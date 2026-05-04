'use client';

import { useState } from 'react';
import CustomerSearch from './CustomerSearch';
import BillingForm from './BillingForm';
import PointsManager from './PointsManager';
import type { Customer, PinLevel } from '@/lib/loyalty-types';

type Screen = 'search' | 'billing' | 'customer-detail';

interface Props {
  pinLevel: PinLevel;
  onLogout: () => void;
}

export default function CashierView({ pinLevel, onLogout }: Props) {
  const [screen, setScreen]     = useState<Screen>('search');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [lastBill, setLastBill] = useState<{ points: number; amount: number } | null>(null);

  const handleCustomerSelected = (c: Customer) => {
    setCustomer(c);
    setLastBill(null);
    setScreen('billing');
  };

  const handleBillSuccess = (updatedCustomer: Customer, pointsEarned: number, billAmount: number) => {
    setCustomer(updatedCustomer);
    setLastBill({ points: pointsEarned, amount: billAmount });
    setScreen('customer-detail');
  };

  const handleNewCustomer = () => {
    setCustomer(null);
    setLastBill(null);
    setScreen('search');
  };

  return (
    <div className="min-h-screen" style={{ background: '#2A2320' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(42,35,32,0.95)', borderBottom: '1px solid rgba(200,169,110,0.15)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: '#F2E8D9' }}>The 11th Bean</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.25)' }}
          >
            {pinLevel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {screen !== 'search' && (
            <button
              onClick={handleNewCustomer}
              className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
              style={{ color: 'rgba(242,232,217,0.6)', border: '1px solid rgba(200,169,110,0.2)' }}
            >
              + New Customer
            </button>
          )}
          <button
            onClick={onLogout}
            className="text-xs transition-opacity hover:opacity-60"
            style={{ color: 'rgba(242,232,217,0.4)' }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Bill success banner */}
      {screen === 'customer-detail' && lastBill && (
        <div
          className="mx-4 mt-4 px-5 py-4 rounded-xl"
          style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.3)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: '#F2E8D9' }}>
                ✓ Bill submitted — ₹{lastBill.amount.toFixed(2)}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#C8A96E' }}>
                +{lastBill.points} points added to {customer?.name}
              </p>
            </div>
            <button
              onClick={handleNewCustomer}
              className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: '#C8A96E', color: '#2A2320' }}
            >
              Next Customer
            </button>
          </div>
        </div>
      )}

      {/* Screens */}
      {screen === 'search' && (
        <CustomerSearch onCustomerSelected={handleCustomerSelected} />
      )}

      {screen === 'billing' && customer && (
        <BillingForm
          customer={customer}
          pinLevel={pinLevel}
          onSuccess={handleBillSuccess}
          onBack={() => setScreen('search')}
        />
      )}

      {screen === 'customer-detail' && customer && (
        <div className="max-w-lg mx-auto px-4 pb-10">
          {/* Customer card */}
          <div className="mt-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>Customer</p>
              <h2 className="text-xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
                {customer.name}
              </h2>
              <p className="text-sm" style={{ color: 'rgba(242,232,217,0.5)' }}>{customer.phone}</p>
            </div>
            <button
              onClick={() => setScreen('billing')}
              className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.25)' }}
            >
              New Bill
            </button>
          </div>

          <PointsManager
            customer={customer}
            pinLevel={pinLevel}
            onCustomerUpdated={setCustomer}
          />
        </div>
      )}
    </div>
  );
}
