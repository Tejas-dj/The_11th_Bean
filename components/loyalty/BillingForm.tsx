'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import { supabase } from '@/lib/supabase';
import { submitBill } from '@/app/actions/loyalty';
import type { Customer, MenuItem, BillLineItem, PinLevel } from '@/lib/loyalty-types';

interface Props {
  customer: Customer;
  pinLevel: PinLevel;
  onSuccess: (customer: Customer, pointsEarned: number, billAmount: number) => void;
  onBack: () => void;
}

export default function BillingForm({ customer, pinLevel, onSuccess, onBack }: Props) {
  const [menuItems, setMenuItems]     = useState<MenuItem[]>([]);
  const [lineItems, setLineItems]     = useState<BillLineItem[]>([]);
  const [query, setQuery]             = useState('');
  const [suggestions, setSuggestions] = useState<MenuItem[]>([]);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const fuseRef   = useRef<Fuse<MenuItem> | null>(null);

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        if (data) {
          setMenuItems(data as MenuItem[]);
          fuseRef.current = new Fuse(data as MenuItem[], {
            keys: ['name'],
            threshold: 0.4,
            minMatchCharLength: 1,
          });
        }
      });
    searchRef.current?.focus();
  }, []);

  const handleQueryChange = useCallback((v: string) => {
    setQuery(v);
    if (!v.trim() || !fuseRef.current) { setSuggestions([]); return; }
    setSuggestions(fuseRef.current.search(v).map((r) => r.item).slice(0, 6));
  }, []);

  const addItem = (item: MenuItem) => {
    setLineItems((prev) => {
      const existing = prev.findIndex((li) => li.menuItem.id === item.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + 1 };
        return updated;
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
    setQuery('');
    setSuggestions([]);
    searchRef.current?.focus();
  };

  const updateQty = (idx: number, qty: number) => {
    if (qty < 1) {
      setLineItems((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setLineItems((prev) =>
        prev.map((li, i) => (i === idx ? { ...li, quantity: qty } : li)),
      );
    }
  };

  const billTotal    = lineItems.reduce((s, li) => s + li.menuItem.price * li.quantity, 0);
  const pointsToEarn = Math.floor(billTotal / 100);

  const handleSubmit = async () => {
    if (!lineItems.length) { setError('Add at least one item.'); return; }
    setSubmitting(true);
    setError('');
    const result = await submitBill({ customerId: customer.id, pinLevel, lineItems });
    setSubmitting(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      onSuccess(
        { ...customer, total_points: customer.total_points + result.pointsEarned, lifetime_points: customer.lifetime_points + result.pointsEarned },
        result.pointsEarned,
        result.billAmount,
      );
    }
  };

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

  return (
    <div className="max-w-lg mx-auto pt-6 px-4 pb-10">
      {/* Customer header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>Billing</p>
          <h2 className="text-xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
            {customer.name}
          </h2>
          <p className="text-sm" style={{ color: 'rgba(242,232,217,0.5)' }}>
            {customer.phone} · {customer.total_points} pts
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
          style={{ color: 'rgba(242,232,217,0.5)', border: '1px solid rgba(200,169,110,0.2)' }}
        >
          ← Back
        </button>
      </div>

      {/* Item search */}
      <div className="relative mb-4">
        <label className="block text-xs mb-2" style={{ color: 'rgba(242,232,217,0.5)' }}>
          Search menu items
        </label>
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Type item name (e.g. latte, cold brew…)"
          style={inp}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul
            className="absolute z-10 w-full mt-1 rounded-xl overflow-hidden shadow-xl"
            style={{ background: '#3D302A', border: '1px solid rgba(200,169,110,0.25)' }}
          >
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="w-full flex justify-between items-center px-4 py-3 text-sm transition-colors hover:opacity-80"
                  style={{ color: '#F2E8D9', background: 'transparent' }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span>{item.name}</span>
                  <span style={{ color: '#C8A96E' }}>₹{item.price}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Line items */}
      {lineItems.length > 0 ? (
        <div className="space-y-2 mb-6">
          <p className="text-xs mb-2" style={{ color: 'rgba(242,232,217,0.4)' }}>Items</p>
          {lineItems.map((li, i) => (
            <div
              key={li.menuItem.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,169,110,0.15)' }}
            >
              <span className="flex-1 text-sm" style={{ color: '#F2E8D9' }}>{li.menuItem.name}</span>
              <span className="text-xs w-16 text-right" style={{ color: 'rgba(242,232,217,0.5)' }}>
                ₹{li.menuItem.price} ea
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQty(i, li.quantity - 1)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-light transition-opacity hover:opacity-70"
                  style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E' }}
                >
                  −
                </button>
                <span className="w-6 text-center text-sm" style={{ color: '#F2E8D9' }}>{li.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQty(i, li.quantity + 1)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-light transition-opacity hover:opacity-70"
                  style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E' }}
                >
                  +
                </button>
              </div>
              <span className="text-sm w-16 text-right font-medium" style={{ color: '#F2E8D9' }}>
                ₹{(li.menuItem.price * li.quantity).toFixed(0)}
              </span>
              <button
                type="button"
                onClick={() => setLineItems((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-xs transition-opacity hover:opacity-70 ml-1"
                style={{ color: 'rgba(196,69,58,0.7)' }}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-10 rounded-xl mb-6"
          style={{ border: '1px dashed rgba(200,169,110,0.2)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(242,232,217,0.3)' }}>No items added yet</p>
        </div>
      )}

      {/* Bill total + points */}
      <div
        className="rounded-xl p-4 mb-4 space-y-2"
        style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}
      >
        <div className="flex justify-between text-sm">
          <span style={{ color: 'rgba(242,232,217,0.6)' }}>Bill Total</span>
          <span className="font-semibold text-base" style={{ color: '#F2E8D9' }}>₹{billTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'rgba(242,232,217,0.6)' }}>Points to earn</span>
          <span className="font-semibold" style={{ color: '#C8A96E' }}>+{pointsToEarn} pts</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(242,232,217,0.3)' }}>
          1 pt per ₹100 spent · floor(₹{billTotal.toFixed(0)} ÷ 100) = {pointsToEarn}
        </p>
      </div>

      {error && <p className="text-sm mb-3" style={{ color: '#C4453A' }}>{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting || !lineItems.length}
        className="w-full py-3.5 rounded-xl font-medium transition-opacity disabled:opacity-40"
        style={{ background: '#C8A96E', color: '#2A2320' }}
      >
        {submitting ? 'Processing…' : `Submit Bill · ₹${billTotal.toFixed(2)}`}
      </button>
    </div>
  );
}
