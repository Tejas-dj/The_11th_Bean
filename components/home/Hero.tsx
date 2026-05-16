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

      {/* Cinematic vignette overlay — darker at edges, readable center */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(42,35,32,0.25) 0%, rgba(42,35,32,0.60) 70%, rgba(42,35,32,0.82) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Grain texture — artisanal paper feel */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-[2] text-center px-6 max-w-3xl mx-auto">
        {/* Location line — fades in first */}
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/70 text-xs tracking-[0.25em] uppercase mb-6 font-sans"
        >
          Basavanagudi · Bengaluru
        </motion.p>

        {/* Main title — logo image replaces text */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="sr-only">The 11th Bean</h1>
          <Image
            src="/Main_Logo.svg"
            alt="The 11th Bean"
            width={480}
            height={200}
            priority
            className="mx-auto w-[clamp(350px,80vw,648px)] h-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>

        {/* Subtitle — softer fade after title settles */}
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/85 text-xl md:text-2xl leading-relaxed max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          A Coffee Expression of Maison Aranya
        </motion.p>
      </div>

      {/* Morning mascot — bottom-right, gently floating */}
      {mounted && !reduced && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-14 right-4 md:right-10 z-[2] w-28 md:w-36 pointer-events-none select-none animate-mascot-float"
          aria-hidden="true"
        >
          <Image
            src="/mascot/morning.svg"
            alt=""
            width={144}
            height={144}
            className="w-full h-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      )}

      {/* Scroll indicator — delayed until after subtitle appears */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
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
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/video/hero_loop.webm" type="video/mp4" />
      </video>
    </div>
  );
}

function MobileBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Image
        src="/images/hero/hero_mobile.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
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
