'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '@/data/events';

const DISMISS_KEY = 'bean_event_toast_dismissed_v1';

export function EventAnnouncement() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Find the nearest upcoming event
  const upcomingEvent = events
    .filter((e) => e.status === 'upcoming' || e.status === 'sold-out')
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];

  useEffect(() => {
    setMounted(true);
    if (!upcomingEvent) return;
    // Show once per session per event ID
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed === upcomingEvent.id) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, [upcomingEvent]);

  if (!mounted) return null;

  const dismiss = () => {
    if (upcomingEvent) sessionStorage.setItem(DISMISS_KEY, upcomingEvent.id);
    setVisible(false);
  };

  if (!upcomingEvent) return null;

  const dateStr = new Date(upcomingEvent.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          role="alertdialog"
          aria-label={`Upcoming event: ${upcomingEvent.title}`}
          className="fixed bottom-6 right-6 z-[1500] w-[18.5rem] rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#2A2320' }}
        >
          {/* Rattan accent top stripe */}
          <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #C8A96E 0%, rgba(200,169,110,0.3) 100%)' }} />

          <div className="p-4 flex gap-3 items-start">
            {/* Mascot or icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: upcomingEvent.accentColor }}>
              {upcomingEvent.mascot ? (
                <Image
                  src={upcomingEvent.mascot}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(242,232,217,0.8)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              )}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.18em] uppercase font-medium mb-0.5" style={{ color: '#C8A96E' }}>
                {upcomingEvent.status === 'sold-out' ? 'Sold Out · ' : '● Coming up · '}
                {dateStr}
              </p>
              <p className="text-cream text-sm font-medium leading-snug truncate" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
                {upcomingEvent.title}
              </p>
              <p className="text-cream/50 text-[11px] leading-relaxed mt-0.5 line-clamp-1">
                {upcomingEvent.time} · {upcomingEvent.venue.split(',')[0]}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss event notification"
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: 'rgba(242,232,217,0.4)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="9" y2="9" /><line x1="9" y1="1" x2="1" y2="9" />
              </svg>
            </button>
          </div>

          {/* Footer CTA */}
          <Link
            href="/events"
            onClick={dismiss}
            className="flex items-center justify-between px-4 py-2.5 transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(200,169,110,0.12)', borderTop: '1px solid rgba(200,169,110,0.15)' }}
          >
            <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#C8A96E' }}>See event details</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
