'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { verifyPin } from '@/app/actions/loyalty';
import type { PinLevel } from '@/lib/loyalty-types';

interface Props {
  onVerified: (level: PinLevel) => void;
}

export default function PinEntry({ onVerified }: Props) {
  const [pin, setPin]         = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    setLoading(true);
    setError('');
    const result = await verifyPin(pin.trim());
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
      setPin('');
      inputRef.current?.focus();
    } else {
      onVerified(result.level);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
         style={{ background: '#2A2320' }}>
      <div className="w-full max-w-sm space-y-8">

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Main_Logo.svg"
            alt="The 11th Bean"
            width={180}
            height={90}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }}
            priority
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 space-y-6"
             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,169,110,0.2)' }}>

          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.2em] uppercase"
               style={{ color: '#C8A96E' }}>
              Staff Access
            </p>
            <h1 className="text-xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
              Enter your PIN
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder="••••••"
              maxLength={12}
              className="w-full rounded-xl px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition-colors"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${error ? '#C4453A' : 'rgba(200,169,110,0.3)'}`,
                color: '#F2E8D9',
                caretColor: '#C8A96E',
              }}
              autoComplete="off"
            />

            {error && (
              <p className="text-center text-sm" style={{ color: '#C4453A' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !pin}
              className="w-full py-3 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40"
              style={{ background: '#C8A96E', color: '#2A2320' }}
            >
              {loading ? 'Verifying…' : 'Enter'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs" style={{ color: 'rgba(242,232,217,0.25)' }}>
          The 11th Bean · Staff Portal
        </p>
      </div>
    </div>
  );
}
