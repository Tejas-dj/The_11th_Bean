'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import { supabase } from '@/lib/supabase';
import { submitBill, parkBill, deleteParkedBill } from '@/app/actions/loyalty';
import { Receipt } from './Receipt';
import type { Customer, MenuItem, BillLineItem, PinLevel, PaymentMode } from '@/lib/loyalty-types';
import { menuItems as localMenuItems } from '@/data/menu';

const GOLD    = '#C8A96E';
const CREAM   = '#F2E8D9';
const MUTED   = 'rgba(242,232,217,0.45)';
const BG_DARK = '#1E1916';
const BG_CARD = '#2A2320';
const BORDER  = '1px solid rgba(200,169,110,0.14)';

const CATEGORIES = [
  { id: 'all',             label: 'All' },
  { id: 'signature-brews', label: 'Signature' },
  { id: 'espresso-hot',    label: 'Hot Espresso' },
  { id: 'espresso-cold',   label: 'Cold Espresso' },
  { id: 'matcha',          label: 'Matcha' },
  { id: 'non-coffee-tea',  label: 'Tea & More' },
  { id: 'baked-items',     label: 'Baked Items' },
  { id: 'customizations',  label: 'Add-ons' },
];

const PAY_MODES: { id: PaymentMode; label: string; icon: string }[] = [
  { id: 'upi',  label: 'UPI',  icon: '📲' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'cash', label: 'Cash', icon: '💵' },
];

function MenuTile({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [flash, setFlash] = useState(false);
  const handleClick = () => { onAdd(); setFlash(true); setTimeout(() => setFlash(false), 200); };
  return (
    <button onClick={handleClick} style={{
      background: flash ? 'rgba(200,169,110,0.22)' : BG_CARD,
      border: flash ? `1px solid ${GOLD}` : BORDER,
      borderRadius: '12px', padding: '12px', cursor: 'pointer',
      textAlign: 'left', transition: 'all 0.12s',
      display: 'flex', flexDirection: 'column', gap: '4px',
    }}>
      <span style={{ fontSize: '13px', fontWeight: 500, color: CREAM, lineHeight: 1.3 }}>{item.name}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: GOLD, marginTop: 'auto' }}>₹{item.price}</span>
    </button>
  );
}

function CartRow({ li, idx, onQty, onRemove }: {
  li: BillLineItem; idx: number;
  onQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '10px 12px', borderRadius: '10px',
      background: 'rgba(255,255,255,0.03)', border: BORDER,
    }}>
      <span style={{ flex: 1, fontSize: '13px', color: CREAM, lineHeight: 1.3 }}>{li.menuItem.name}</span>
      <span style={{ fontSize: '12px', color: MUTED, width: '48px', textAlign: 'right' }}>₹{li.menuItem.price}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button onClick={() => onQty(idx, li.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(200,169,110,0.15)', border: 'none', color: GOLD, fontSize: '18px', lineHeight: 1, cursor: 'pointer' }}>−</button>
        <span style={{ width: '22px', textAlign: 'center', fontSize: '13px', color: CREAM }}>{li.quantity}</span>
        <button onClick={() => onQty(idx, li.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(200,169,110,0.15)', border: 'none', color: GOLD, fontSize: '18px', lineHeight: 1, cursor: 'pointer' }}>+</button>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: CREAM, width: '52px', textAlign: 'right' }}>₹{(li.menuItem.price * li.quantity).toFixed(0)}</span>
      <button onClick={() => onRemove(idx)} style={{ background: 'none', border: 'none', color: 'rgba(196,69,58,0.65)', fontSize: '14px', cursor: 'pointer', padding: '2px 4px' }} aria-label="Remove">✕</button>
    </div>
  );
}

interface Props {
  customer: Customer;
  pinLevel: PinLevel;
  onNewCustomer: () => void;
  onLogout: () => void;
  recentTransactions?: { bill_amount: number | null; created_at: string; payment_mode: string | null }[];
  onShowEod: () => void;
  parkedBillId?: string;
  initialLineItems?: BillLineItem[];
}

// Cache menu items in memory so they only load once per session
let cachedMenuItems: MenuItem[] | null = null;

export default function POSView({ 
  customer, pinLevel, onNewCustomer, onLogout, recentTransactions = [], onShowEod, parkedBillId, initialLineItems 
}: Props) {
  const [menuItems, setMenuItems]     = useState<MenuItem[]>(cachedMenuItems || []);
  const [lineItems, setLineItems]     = useState<BillLineItem[]>(initialLineItems || []);
  const [query, setQuery]             = useState('');
  const [suggestions, setSuggestions] = useState<MenuItem[]>([]);
  const [activeCategory, setCategory] = useState('all');
  const [paymentMode, setPayMode]     = useState<PaymentMode>('upi');
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState('');
  // Mobile: 'menu' | 'cart'
  const [mobileTab, setMobileTab]     = useState<'menu' | 'cart'>('menu');
  const [receiptData, setReceiptData] = useState<{
    customer: Customer; lineItems: BillLineItem[];
    billAmount: number; pointsEarned: number;
    paymentMode: PaymentMode; billNumber: number | null;
  } | null>(null);

  const fuseRef   = useRef<Fuse<MenuItem> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cachedMenuItems) {
      setMenuItems(cachedMenuItems);
      fuseRef.current = new Fuse(cachedMenuItems, { keys: ['name'], threshold: 0.4, minMatchCharLength: 1 });
      return;
    }

    supabase.from('menu_items').select('*').eq('is_active', true).order('name')
      .then(({ data }) => {
        if (data) {
          const augmentedData = (data as MenuItem[]).map(item => {
            const localMatch = localMenuItems.find(li => li.name === item.name);
            return {
              ...item,
              category: item.category || localMatch?.category || 'other'
            };
          });
          cachedMenuItems = augmentedData;
          setMenuItems(augmentedData);
          fuseRef.current = new Fuse(augmentedData, { keys: ['name'], threshold: 0.4, minMatchCharLength: 1 });
        }
      });
  }, []);

  const handleQueryChange = useCallback((v: string) => {
    setQuery(v);
    if (!v.trim() || !fuseRef.current) { setSuggestions([]); return; }
    setSuggestions(fuseRef.current.search(v).map((r) => r.item).slice(0, 10));
  }, []);

  const addItem = useCallback((item: MenuItem) => {
    setLineItems((prev) => {
      const i = prev.findIndex((li) => li.menuItem.id === item.id);
      if (i >= 0) { const u = [...prev]; u[i] = { ...u[i], quantity: u[i].quantity + 1 }; return u; }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
    setQuery('');
    setSuggestions([]);
  }, []);

  const updateQty = (idx: number, qty: number) => {
    if (qty < 1) setLineItems((prev) => prev.filter((_, i) => i !== idx));
    else setLineItems((prev) => prev.map((li, i) => (i === idx ? { ...li, quantity: qty } : li)));
  };

  const billTotal    = lineItems.reduce((s, li) => s + li.menuItem.price * li.quantity, 0);
  const pointsToEarn = Math.floor(billTotal / 100);

  const handleSubmit = async () => {
    if (!lineItems.length) { setError('Add at least one item.'); return; }
    setSubmitting(true); setError('');
    const result = await submitBill({ customerId: customer.id, pinLevel, lineItems, paymentMode });
    setSubmitting(false);
    if ('error' in result) { setError(result.error); }
    else {
      if (parkedBillId) {
        await deleteParkedBill(parkedBillId);
      }
      setReceiptData({ customer, lineItems, billAmount: result.billAmount, pointsEarned: result.pointsEarned, paymentMode, billNumber: result.billNumber });
      setTimeout(() => window.print(), 150);
    }
  };

  const handleParkBill = async () => {
    if (!lineItems.length) { setError('Cannot park an empty cart.'); return; }
    setSubmitting(true); setError('');
    const result = await parkBill(customer.id, lineItems, pinLevel);
    setSubmitting(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      if (parkedBillId) {
        // We just re-parked it, maybe it was a new ID, so delete the old one
        await deleteParkedBill(parkedBillId);
      }
      onNewCustomer();
    }
  };

  const handleDone = () => { setReceiptData(null); setLineItems([]); setQuery(''); onNewCustomer(); };

  const gridItems = query.trim()
    ? suggestions
    : activeCategory === 'all'
      ? menuItems
      : menuItems.filter((m) => (m.category || 'other') === activeCategory);

  /* ── Success screen ── */
  if (receiptData) {
    return (
      <div style={{ minHeight: '100vh', background: BG_DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ position: 'fixed', left: '-9999px', top: 0 }}><Receipt {...receiptData} /></div>
        <div style={{ maxWidth: '420px', width: '100%', background: BG_CARD, borderRadius: '20px', padding: '32px', border: '1px solid rgba(200,169,110,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✓</div>
          <h2 style={{ color: GOLD, fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '22px', fontWeight: 400 }}>Bill Submitted</h2>
          <p style={{ color: MUTED, fontSize: '14px', marginTop: '6px' }}>₹{receiptData.billAmount.toFixed(2)} · {receiptData.paymentMode.toUpperCase()} · +{receiptData.pointsEarned} pts</p>
          <p style={{ color: CREAM, fontSize: '15px', marginTop: '16px' }}>{customer.name}&apos;s balance: <strong style={{ color: GOLD }}>{customer.total_points + receiptData.pointsEarned} pts</strong></p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
            <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(200,169,110,0.12)', color: GOLD, border: '1px solid rgba(200,169,110,0.3)', fontSize: '14px', cursor: 'pointer' }}>🖨 Re-print</button>
            <button onClick={handleDone} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: GOLD, color: '#1E1916', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Next Customer →</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Shared: customer header strip ── */
  const customerHeader = (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(200,169,110,0.1)', background: 'rgba(200,169,110,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, marginBottom: '1px' }}>Current Customer</p>
        <p style={{ fontSize: '16px', fontWeight: 500, color: CREAM, fontFamily: 'var(--font-lora), Georgia, serif' }}>{customer.name}</p>
        <p style={{ fontSize: '11px', color: MUTED }}>{customer.phone}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '20px', fontWeight: 600, color: GOLD, margin: 0 }}>{customer.total_points}</p>
          <p style={{ fontSize: '10px', color: MUTED, letterSpacing: '0.1em', margin: 0 }}>POINTS</p>
        </div>
        <button
          onClick={onShowEod}
          style={{
            background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)',
            borderRadius: '16px', padding: '6px 12px', color: GOLD, fontSize: '12px', cursor: 'pointer',
            height: 'fit-content'
          }}
        >
          EOD
        </button>
      </div>
    </div>
  );

  /* ── Shared: checkout footer ── */
  const checkoutFooter = (
    <div style={{ padding: '12px 14px 16px', borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(0,0,0,0.15)' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', color: MUTED }}>Subtotal</span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: CREAM }}>₹{billTotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: MUTED }}>Points to earn</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: GOLD }}>+{pointsToEarn} pts</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {PAY_MODES.map((m) => {
          const active = m.id === paymentMode;
          return (
            <button key={m.id} onClick={() => setPayMode(m.id)} style={{
              flex: 1, padding: '9px 4px', borderRadius: '10px', cursor: 'pointer',
              background: active ? 'rgba(200,169,110,0.2)' : 'rgba(255,255,255,0.04)',
              border: active ? `1.5px solid ${GOLD}` : '1.5px solid rgba(200,169,110,0.15)',
              color: active ? GOLD : MUTED,
              fontSize: '13px', fontWeight: active ? 600 : 400, transition: 'all 0.12s',
            }}>
              <div style={{ fontSize: '16px' }}>{m.icon}</div>
              {m.label}
            </button>
          );
        })}
      </div>
      {error && <p style={{ fontSize: '12px', color: '#C4453A', marginBottom: '8px' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleParkBill} disabled={submitting || !lineItems.length} style={{
          flex: 1, padding: '15px 10px', borderRadius: '12px', border: `1px solid ${lineItems.length ? GOLD : 'rgba(200,169,110,0.2)'}`,
          background: 'transparent',
          color: lineItems.length ? GOLD : MUTED,
          fontSize: '14px', fontWeight: 600, cursor: lineItems.length ? 'pointer' : 'default',
          transition: 'all 0.15s', whiteSpace: 'nowrap'
        }}>
          ⏸ Park
        </button>
        <button onClick={handleSubmit} disabled={submitting || !lineItems.length} style={{
          flex: 2, padding: '15px', borderRadius: '12px', border: 'none',
          background: lineItems.length ? GOLD : 'rgba(200,169,110,0.2)',
          color: lineItems.length ? '#1E1916' : MUTED,
          fontSize: '15px', fontWeight: 700, cursor: lineItems.length ? 'pointer' : 'default',
          transition: 'all 0.15s', letterSpacing: '0.02em',
        }}>
          {submitting ? 'Processing…' : lineItems.length ? `Charge ₹${billTotal.toFixed(2)}` : 'Add Items'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button onClick={onNewCustomer} style={{ flex: 1, padding: '8px', background: 'none', border: 'none', color: MUTED, fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}>
          ← Back to home screen
        </button>
        {parkedBillId && (
          <button 
            onClick={async () => {
              setSubmitting(true);
              await deleteParkedBill(parkedBillId);
              setSubmitting(false);
              onNewCustomer();
            }}
            disabled={submitting}
            style={{ flex: 1, padding: '8px', background: 'rgba(196,69,58,0.1)', border: '1px solid rgba(196,69,58,0.2)', borderRadius: '8px', color: '#C4453A', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}
          >
            🗑 Discard Parked Bill
          </button>
        )}
      </div>
    </div>
  );

  /* ── Shared: search + category + grid panel ── */
  const menuPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Search */}
      <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
        <div style={{ position: 'relative' }}>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search menu…"
            style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'rgba(255,255,255,0.05)', border: BORDER, borderRadius: '10px', color: CREAM, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: MUTED }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      {/* Category tabs */}
      {!query.trim() && (
        <div style={{ display: 'flex', overflowX: 'auto', gap: '6px', padding: '8px 16px', scrollbarWidth: 'none', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                flexShrink: 0, padding: '5px 14px', borderRadius: '20px',
                fontSize: '12px', cursor: 'pointer',
                background: active ? 'rgba(200,169,110,0.18)' : 'transparent',
                color: active ? GOLD : MUTED,
                border: active ? '1px solid rgba(200,169,110,0.4)' : '1px solid rgba(255,255,255,0.07)',
                transition: 'all 0.12s',
              }}>{cat.label}</button>
            );
          })}
        </div>
      )}
      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        {gridItems.length === 0 ? (
          <p style={{ color: 'rgba(242,232,217,0.25)', textAlign: 'center', marginTop: '48px', fontSize: '13px' }}>
            {query ? 'No items match your search.' : 'No items in this category.'}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
            {gridItems.map((item) => <MenuTile key={item.id} item={item} onAdd={() => addItem(item)} />)}
          </div>
        )}
      </div>
    </div>
  );

  /* ── Shared: cart list ── */
  const cartList = (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {lineItems.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(200,169,110,0.15)', borderRadius: '12px', margin: '8px 0', minHeight: '120px' }}>
          <p style={{ color: 'rgba(242,232,217,0.25)', fontSize: '13px' }}>Tap items to add to order</p>
        </div>
      ) : (
        lineItems.map((li, i) => (
          <CartRow key={li.menuItem.id} li={li} idx={i} onQty={updateQty} onRemove={(idx) => setLineItems((prev) => prev.filter((_, j) => j !== idx))} />
        ))
      )}
    </div>
  );

  /* ════════════════════════════════════════════════
     MOBILE LAYOUT — single pane with tab switcher
  ════════════════════════════════════════════════ */
  return (
    <>
      {/* ── MOBILE (hidden on ≥768px) ── */}
      <div className="pos-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: BG_DARK }}>
        {customerHeader}

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(200,169,110,0.12)', background: BG_CARD }}>
          {(['menu', 'cart'] as const).map((tab) => (
            <button key={tab} onClick={() => setMobileTab(tab)} style={{
              flex: 1, padding: '12px', border: 'none', cursor: 'pointer',
              background: mobileTab === tab ? 'rgba(200,169,110,0.12)' : 'transparent',
              color: mobileTab === tab ? GOLD : MUTED,
              fontSize: '13px', fontWeight: mobileTab === tab ? 600 : 400,
              borderBottom: mobileTab === tab ? `2px solid ${GOLD}` : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {tab === 'menu' ? '🍵 Menu' : `🧾 Cart${lineItems.length > 0 ? ` (${lineItems.reduce((s, l) => s + l.quantity, 0)})` : ''}`}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {mobileTab === 'menu' ? (
            <>
              {menuPanel}
              {/* Quick "view cart" CTA when items exist */}
              {lineItems.length > 0 && (
                <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                  <button onClick={() => setMobileTab('cart')} style={{ width: '100%', padding: '13px', borderRadius: '12px', background: GOLD, color: '#1E1916', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                    View Cart · {lineItems.reduce((s, l) => s + l.quantity, 0)} items · ₹{billTotal.toFixed(0)} →
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {cartList}
              {checkoutFooter}
            </>
          )}
        </div>
      </div>

      {/* ── DESKTOP (hidden on <768px) ── */}
      <div className="pos-desktop" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: BG_DARK }}>
        {/* Left: menu */}
        <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
          {menuPanel}
        </div>
        {/* Right: cart + checkout */}
        <div style={{ width: '360px', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {customerHeader}
          {recentTransactions.length > 0 && (
            <div style={{ padding: '8px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
              {recentTransactions.slice(0, 3).map((t, i) => (
                <span key={i} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: 'rgba(200,169,110,0.1)', color: MUTED, border: BORDER }}>
                  ₹{t.bill_amount?.toFixed(0)} · {new Date(t.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </span>
              ))}
            </div>
          )}
          {cartList}
          {checkoutFooter}
        </div>
      </div>

      {/* Responsive toggle CSS */}
      <style>{`
        .pos-mobile { display: flex !important; }
        .pos-desktop { display: none !important; }
        @media (min-width: 768px) {
          .pos-mobile { display: none !important; }
          .pos-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}
