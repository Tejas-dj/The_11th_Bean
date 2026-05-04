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

    try {
      // Enforce a max wait time — if the server action hangs (e.g. missing env var
      // on Vercel), we surface an error instead of freezing forever.
      const result = await Promise.race<Awaited<ReturnType<typeof verifyPin>>>([
        verifyPin(pin.trim()),
        new Promise<{ error: string }>((resolve) =>
          setTimeout(() => resolve({ error: 'Connection timed out. Check that SUPABASE_SERVICE_ROLE_KEY is set in your Vercel environment variables.' }), 10_000),
        ),
      ]);

      setLoading(false);

      if ('error' in result) {
        // Distinguish "wrong PIN" from infrastructure errors for UX clarity
        const msg = result.error === 'Incorrect PIN.'
          ? 'Incorrect PIN — please try again.'
          : result.error;
        setError(msg);
        setPin('');
        inputRef.current?.focus();
      } else {
        onVerified(result.level);
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
      setPin('');
      inputRef.current?.focus();
      console.error('[PinEntry] verifyPin error:', err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#2A2320' }}
    >
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
        <div
          className="rounded-2xl p-8 space-y-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,169,110,0.2)' }}
        >
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>
              Staff Access
            </p>
            <h1
              className="text-xl font-medium"
              style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
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
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition-colors disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${error ? '#C4453A' : 'rgba(200,169,110,0.3)'}`,
                color: '#F2E8D9',
                caretColor: '#C8A96E',
              }}
              autoComplete="off"
            />

            {/* Error message */}
            {error && (
              <div
                className="flex items-start gap-2 rounded-xl px-4 py-3"
                style={{ background: 'rgba(196,69,58,0.12)', border: '1px solid rgba(196,69,58,0.3)' }}
              >
                {/* Warning icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4453A"
                  strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: '1px' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm" style={{ color: '#C4453A' }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !pin}
              className="w-full py-3 rounded-xl font-medium text-sm transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: '#C8A96E', color: '#2A2320' }}
            >
              {loading ? (
                <>
                  {/* Spinner */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ animation: 'spin 0.8s linear infinite' }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Verifying…
                </>
              ) : 'Enter'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs" style={{ color: 'rgba(242,232,217,0.25)' }}>
          The 11th Bean · Staff Portal
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
