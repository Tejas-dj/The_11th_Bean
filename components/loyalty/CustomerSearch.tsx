'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { createCustomer, getParkedBills } from '@/app/actions/loyalty';
import type { Customer, ParkedBill } from '@/lib/loyalty-types';

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

interface Props {
  onCustomerSelected: (customer: Customer, parkedBillId?: string, parkedLineItems?: any[]) => void;
  pinLevel: string;
}

type Screen = 'search' | 'new-customer';

const CoffeeMascot = () => (
  <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 12px rgba(200,169,110,0.15))' }}>
    <path d="M25 35 C25 25, 75 25, 75 35 L70 80 C68 90, 32 90, 30 80 Z" fill="rgba(200,169,110,0.15)" stroke="#C8A96E" strokeWidth="4"/>
    <path d="M75 40 Q90 40 85 55 Q80 70 73 65" fill="none" stroke="#C8A96E" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="42" cy="55" r="3" fill="#C8A96E"/>
    <circle cx="58" cy="55" r="3" fill="#C8A96E"/>
    <path d="M46 62 Q50 66 54 62" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round"/>
    <path d="M40 20 Q35 10 45 5" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
    <path d="M60 22 Q55 12 65 7" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export default function CustomerSearch({ onCustomerSelected, pinLevel }: Props) {
  const [screen, setScreen]   = useState<Screen>('search');
  const [phone, setPhone]     = useState('');
  const [name, setName]       = useState('');
  
  // Fuzzy search states
  const [nameSearch, setNameSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef  = useRef<HTMLInputElement>(null);

  const [parkedBills, setParkedBills] = useState<ParkedBill[]>([]);

  useEffect(() => { phoneRef.current?.focus(); }, []);
  useEffect(() => { if (screen === 'new-customer') nameRef.current?.focus(); }, [screen]);

  // Fetch parked bills on mount
  useEffect(() => {
    getParkedBills().then((res) => {
      if ('parkedBills' in res) {
        setParkedBills(res.parkedBills);
      }
    });
  }, []);

  const sanitizePhone = (v: string) => v.replace(/\D/g, '').slice(0, 10);

  // Debounced name search — runs directly against Supabase (no server round-trip)
  useEffect(() => {
    if (nameSearch.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('customers')
        .select('id, name, phone, total_points, lifetime_points, created_at')
        .ilike('name', `%${nameSearch}%`)
        .limit(10);
      setSuggestions((data as Customer[]) || []);
    }, 300);
    return () => clearTimeout(timer);
  }, [nameSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = sanitizePhone(phone);
    if (digits.length !== 10) { setError('Enter a valid 10-digit phone number.'); return; }
    setLoading(true);
    setError('');
    // Direct browser → Supabase, skips the Next.js server entirely
    const { data } = await supabase
      .from('customers')
      .select('id, name, phone, total_points, lifetime_points, created_at')
      .eq('phone', normalizePhone(digits))
      .maybeSingle();
    setLoading(false);
    if (!data) {
      setScreen('new-customer');
      setName(nameSearch);
    } else {
      onCustomerSelected(data as Customer);
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
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? '#C4453A' : 'rgba(200,169,110,0.2)'}`,
    color: '#F2E8D9',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '15px',
    transition: 'border 0.2s ease',
  });

  return (
    <div className="w-full max-w-5xl mx-auto pt-8 px-4" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '10vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <CoffeeMascot />
        </div>
        <h2 className="text-2xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif', marginBottom: '6px' }}>
          {screen === 'search' ? 'Who\'s ordering?' : 'New friend!'}
        </h2>
        <p className="text-sm" style={{ color: 'rgba(242,232,217,0.5)' }}>
          {screen === 'search' 
            ? 'Look up a customer by their name or phone number.' 
            : `No account found for ${phone}. Let's register them.`}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full">
        <div className="w-full max-w-md mx-auto md:mx-0" style={{ background: '#2A2320', padding: '24px', borderRadius: '20px', border: '1px solid rgba(200,169,110,0.1)' }}>
        {screen === 'search' ? (
          <form onSubmit={handleSearch} className="space-y-4">
            
            <div style={{ position: 'relative' }}>
              <label className="block text-xs mb-1.5 font-medium tracking-wide uppercase" style={{ color: '#C8A96E' }}>Customer Name</label>
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => {
                  setNameSearch(e.target.value);
                  setShowDropdown(true);
                  setError('');
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Type a name to search..."
                style={inputStyle()}
                autoComplete="off"
              />
              
              {showDropdown && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
                  background: '#1E1916', border: '1px solid rgba(200,169,110,0.2)', borderRadius: '12px',
                  overflow: 'hidden', zIndex: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}>
                  {suggestions.map((cust) => (
                    <div 
                      key={cust.id} 
                      onClick={() => onCustomerSelected(cust)}
                      style={{ 
                        padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', 
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,169,110,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ color: '#F2E8D9', fontWeight: 500 }}>{cust.name}</span>
                      <span style={{ color: 'rgba(242,232,217,0.4)', fontSize: '12px' }}>{cust.phone}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontSize: '12px', color: 'rgba(242,232,217,0.3)', textTransform: 'uppercase' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div>
              <label className="block text-xs mb-1.5 font-medium tracking-wide uppercase" style={{ color: '#C8A96E' }}>Mobile Number</label>
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
              className="w-full py-3.5 rounded-xl font-medium text-sm transition-all disabled:opacity-40"
              style={{ 
                background: phone.length === 10 ? '#C8A96E' : 'rgba(200,169,110,0.2)', 
                color: phone.length === 10 ? '#1E1916' : 'rgba(200,169,110,0.5)',
                marginTop: '20px'
              }}
            >
              {loading ? 'Searching…' : 'Search by Phone'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5 font-medium tracking-wide uppercase" style={{ color: '#C8A96E' }}>Customer Name</label>
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
              <label className="block text-xs mb-1.5 font-medium tracking-wide uppercase" style={{ color: '#C8A96E' }}>Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                style={inputStyle()}
                autoComplete="off"
              />
            </div>
            {error && <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => { setScreen('search'); setError(''); }}
                className="flex-1 py-3.5 rounded-xl font-medium text-sm transition-opacity"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(242,232,217,0.7)', border: '1px solid rgba(200,169,110,0.2)' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="flex-[2] py-3.5 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40"
                style={{ background: '#C8A96E', color: '#2A2320' }}
              >
                {loading ? 'Registering…' : 'Register & Continue'}
              </button>
            </div>
          </form>
        )}
      </div>

      {parkedBills.length > 0 && screen === 'search' && (
        <div className="w-full max-w-md mx-auto md:mx-0 md:w-80 mt-8 md:mt-0">
          <h3 style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '12px', textAlign: 'center' }}>
            Parked Orders ({parkedBills.length}/3)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {parkedBills.map(pb => (
              <button
                key={pb.id}
                onClick={() => {
                  if (pb.customers) {
                    const fullCustomer: any = {
                      ...pb.customers,
                      id: pb.customer_id
                    };
                    onCustomerSelected(fullCustomer, pb.id, pb.line_items);
                  }
                }}
                style={{
                  background: 'rgba(200,169,110,0.08)',
                  border: '1px solid rgba(200,169,110,0.2)',
                  borderRadius: '12px', padding: '16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,169,110,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(200,169,110,0.08)'}
              >
                <div>
                  <p style={{ color: '#F2E8D9', fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>
                    {pb.customers?.name || 'Unknown'}
                  </p>
                  <p style={{ color: 'rgba(242,232,217,0.5)', fontSize: '12px' }}>
                    {pb.line_items.length} items • Parked by {pb.cashier_pin_level}
                  </p>
                </div>
                <div style={{ color: '#C8A96E', fontSize: '20px' }}>→</div>
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
