'use client';

import { useState } from 'react';
import Image from 'next/image';
import CashierView from './CashierView';
import AnalyticsDashboard from './AnalyticsDashboard';
import MenuManager from './MenuManager';
import RewardManager from './RewardManager';
import LedgerView from './LedgerView';

type Tab = 'dashboard' | 'cashier' | 'financials' | 'menu' | 'rewards';

interface Props {
  onLogout: () => void;
}

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'cashier',
    label: 'Cashier',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'financials',
    label: 'Ledger & EOD',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
  },
  {
    id: 'menu',
    label: 'Menu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      </svg>
    ),
  },
  {
    id: 'rewards',
    label: 'Rewards',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function OwnerView({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('dashboard');

  const renderContent = () => {
    switch (tab) {
      case 'dashboard': return <AnalyticsDashboard />;
      case 'cashier':   return <CashierView pinLevel="owner" onLogout={onLogout} />;
      case 'financials':return <LedgerView />;
      case 'menu':      return <MenuManager />;
      case 'rewards':   return <RewardManager />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1E1916' }}>

      {/* ── Desktop Sidebar ────────────────────────────────── */}
      <aside
        className="hidden md:flex"
        style={{
          width: '220px',
          flexShrink: 0,
          flexDirection: 'column',
          background: '#1A1512',
          borderRight: '1px solid rgba(200,169,110,0.1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <Image
            src="/Main_Logo.svg"
            alt="The 11th Bean"
            width={130}
            height={48}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.75, objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'rgba(200,169,110,0.15)',
              color: '#C8A96E',
              border: '1px solid rgba(200,169,110,0.35)',
            }}
          >
            Owner
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  borderLeft: active ? '2px solid #C8A96E' : '2px solid transparent',
                  background: active ? 'rgba(200,169,110,0.1)' : 'transparent',
                  color: active ? '#C8A96E' : 'rgba(242,232,217,0.45)',
                  fontSize: '13.5px',
                  fontWeight: active ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'left',
                  paddingLeft: active ? '12px' : '14px',
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sign out */}
        <div style={{ padding: '16px 10px 24px' }}>
          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '9px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(242,232,217,0.35)',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(242,232,217,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,232,217,0.35)')}
          >
            <LogoutIcon />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content area ──────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Mobile sticky tab row */}
        <div
          className="md:hidden"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'rgba(26,21,18,0.97)',
            borderBottom: '1px solid rgba(200,169,110,0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Owner badge row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/Main_Logo.svg"
                alt="The 11th Bean"
                width={100}
                height={30}
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.9, objectFit: 'contain' }}
                priority
              />
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: 'rgba(200,169,110,0.15)',
                  color: '#C8A96E',
                  border: '1px solid rgba(200,169,110,0.35)',
                }}
              >
                Owner
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{ background: 'none', border: 'none', color: 'rgba(242,232,217,0.4)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <LogoutIcon /> Sign out
            </button>
          </div>
          {/* Scrollable tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', padding: '0 10px 10px', gap: '4px', scrollbarWidth: 'none' }}>
            {NAV_ITEMS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    padding: '7px 14px',
                    borderRadius: '20px',
                    border: active ? '1px solid rgba(200,169,110,0.4)' : '1px solid rgba(200,169,110,0.12)',
                    background: active ? 'rgba(200,169,110,0.15)' : 'transparent',
                    color: active ? '#C8A96E' : 'rgba(242,232,217,0.45)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
