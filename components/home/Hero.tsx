'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch on mobile detection
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-caramel"
      aria-label="Welcome to The 11th Bean"
    >
      {/* Background layer */}
      {mounted && isMobile ? <MobileBackground /> : <DesktopBackground />}

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-espresso/40 z-[1]" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative z-[2] text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/70 text-xs tracking-[0.25em] uppercase mb-6 font-sans"
        >
          Basavanagudi · Bengaluru
        </motion.p>

        <motion.h1
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-8 tracking-tight"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          The 11<sup className="text-[0.35em] not-italic align-super">th</sup>{' '}Bean
        </motion.h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/85 text-xl md:text-2xl leading-relaxed max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          He counted ten beans. None were right.
          <br />
          Then came the eleventh.
        </motion.p>
      </div>

      {/* Morning mascot — bottom-right, cream-tinted */}
      {mounted && !reduced && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-14 right-4 md:right-10 z-[2] w-20 md:w-28 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/mascot/morning.svg"
            alt=""
            width={112}
            height={112}
            className="w-full h-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      )}

      {/* Scroll indicator */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2]"
          aria-hidden="true"
        >
          <span className="text-cream/40 text-[10px] tracking-[0.2em] uppercase">
            {mounted && isMobile ? 'Swipe up' : 'Scroll'}
          </span>
          <DripIndicator />
        </motion.div>
      )}
    </section>
  );
}

function DesktopBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* TODO: Replace with autoplay muted loop video (8-12s, max 3MB MP4 at 720p) from Shishir.
          Poster image must be set for LCP — see brief Appendix I. */}
      <div className="w-full h-full bg-caramel flex items-end justify-end p-6" aria-hidden="true">
        <span className="text-cream/20 text-xs uppercase tracking-widest">
          [Cafe interior video loop — 8–12 s]
        </span>
      </div>
    </div>
  );
}

function MobileBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* TODO: Replace with vertically-optimised hero image from Shishir (pour-over close-up recommended) */}
      <div className="w-full h-full bg-caramel flex items-end justify-end p-6">
        <span className="text-cream/20 text-xs uppercase tracking-widest">
          [Hero image — portrait crop]
        </span>
      </div>
    </div>
  );
}

// Animated coffee-drip scroll cue: a thin line slowly "drips" downward.
function DripIndicator() {
  return (
    <div className="relative w-px h-14 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full bg-cream/50"
        style={{ height: '45%' }}
        animate={{ y: ['0%', '230%'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
      />
    </div>
  );
}
