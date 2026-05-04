'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { PinLevel } from '@/lib/loyalty-types';

// Dynamic imports keep admin bundle out of the main site
const PinEntry    = dynamic(() => import('@/components/loyalty/PinEntry'));
const CashierView = dynamic(() => import('@/components/loyalty/CashierView'));
const OwnerView   = dynamic(() => import('@/components/loyalty/OwnerView'));

const SESSION_KEY = 'loyalty_access_level';

export default function LoyaltyAdminPage() {
  const [accessLevel, setAccessLevel] = useState<PinLevel | null>(null);
  const [hydrated, setHydrated]       = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === 'cashier' || stored === 'owner') {
      setAccessLevel(stored);
    }
    setHydrated(true);
  }, []);

  const handleVerified = (level: PinLevel) => {
    sessionStorage.setItem(SESSION_KEY, level);
    setAccessLevel(level);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessLevel(null);
  };

  // Cover the main site's navbar + footer with a full-viewport fixed panel
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#2A2320',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {!hydrated ? null : !accessLevel ? (
        <PinEntry onVerified={handleVerified} />
      ) : accessLevel === 'owner' ? (
        <OwnerView onLogout={handleLogout} />
      ) : (
        <CashierView pinLevel="cashier" onLogout={handleLogout} />
      )}
    </div>
  );
}
