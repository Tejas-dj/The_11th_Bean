'use client';

import { useState, useRef, useEffect } from 'react';
import { findCustomerByPhone, createCustomer } from '@/app/actions/loyalty';
import type { Customer } from '@/lib/loyalty-types';

interface Props {
  onCustomerSelected: (customer: Customer) => void;
}

type Screen = 'search' | 'new-customer';

export default function CustomerSearch({ onCustomerSelected }: Props) {
  const [screen, setScreen]   = useState<Screen>('search');
  const [phone, setPhone]     = useState('');
  const [name, setName]       = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { phoneRef.current?.focus(); }, []);
  useEffect(() => { if (screen === 'new-customer') nameRef.current?.focus(); }, [screen]);

  const sanitizePhone = (v: string) => v.replace(/\D/g, '').slice(0, 10);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = sanitizePhone(phone);
    if (digits.length !== 10) { setError('Enter a valid 10-digit phone number.'); return; }
    setLoading(true);
    setError('');
    const result = await findCustomerByPhone(digits);
    setLoading(false);
    if ('notFound' in result) {
      setScreen('new-customer');
    } else {
      onCustomerSelected(result.customer);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required.'); return; }
    setLoading(true);
    setError('');
    const result = await createCustomer(name, phone);
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      onCustomerSelected(result.customer);
    }
  };

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${hasError ? '#C4453A' : 'rgba(200,169,110,0.25)'}`,
    color: '#F2E8D9',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '16px',
  });

  return (
    <div className="max-w-md mx-auto pt-10 px-4">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: '#C8A96E' }}>
            {screen === 'search' ? 'Customer Lookup' : 'New Customer'}
          </p>
          <h2 className="text-2xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
            {screen === 'search' ? 'Search by phone' : 'Register customer'}
          </h2>
          {screen === 'new-customer' && (
            <p className="text-sm mt-1" style={{ color: 'rgba(242,232,217,0.5)' }}>
              No account found for {phone}. Enter their name to register.
            </p>
          )}
        </div>

        {screen === 'search' ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(242,232,217,0.5)' }}>
                Mobile number
              </label>
              <input
                ref={phoneRef}
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => { setPhone(sanitizePhone(e.target.value)); setError(''); }}
                placeholder="10-digit mobile number"
                style={inputStyle(!!error)}
                autoComplete="off"
              />
            </div>
            {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="w-full py-3 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40"
              style={{ background: '#C8A96E', color: '#2A2320' }}
            >
              {loading ? 'Searching…' : 'Find Customer'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(242,232,217,0.5)' }}>
                Customer name
              </label>
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Full name"
                style={inputStyle(!!error)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(242,232,217,0.5)' }}>
                Mobile number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                style={inputStyle()}
                autoComplete="off"
              />
            </div>
            {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setScreen('search'); setError(''); }}
                className="flex-1 py-3 rounded-xl font-medium text-sm transition-opacity"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(242,232,217,0.7)', border: '1px solid rgba(200,169,110,0.2)' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="flex-1 py-3 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40"
                style={{ background: '#C8A96E', color: '#2A2320' }}
              >
                {loading ? 'Registering…' : 'Register & Continue'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
