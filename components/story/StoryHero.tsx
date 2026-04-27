'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function StoryHero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #1a1510 0%, #2A2320 100%)' }}
      aria-label="Story opening"
    >
      {/* TODO: Replace background with full-viewport "before" image — rainy Bengaluru skyline,
          neon-lit IT park, or crowded office building. See brief Page 2, Section 1. */}
      <div className="absolute inset-0 bg-espresso/40" aria-hidden="true" />

      {/* Stressed mascot — right side, large faded silhouette sets the "corporate life" mood */}
      <div
        className="absolute bottom-0 right-4 md:right-16 w-40 md:w-56 pointer-events-none select-none z-[1]"
        aria-hidden="true"
        style={{ opacity: 0.22 }}
      >
        <Image
          src="/mascot/stressed.svg"
          alt=""
          width={224}
          height={224}
          className="w-full h-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          Before the first cup,<br />there was a cubicle.
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-cream/30 text-[10px] tracking-[0.25em] uppercase">His story</span>
        <div className="w-px h-12 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[40%] bg-cream/40 rounded-full"
            animate={{ y: ['0%', '230%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
