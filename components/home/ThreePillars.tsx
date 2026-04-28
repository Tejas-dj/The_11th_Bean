'use client';
import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

const PILLARS = [
  {
    title: 'Books & Brews',
    body: "A guitar nobody plays but everybody loves. A bookshelf with no system. Catan sets with missing pieces. This corner isn't curated. It's lived in.",
    // TODO: Replace with actual photo of the bookshelf nook / reading corner
    bgColor: '#B8B394',
    imageLabel: '[Bookshelf nook — reading corner photo]',
  },
  {
    title: 'Craft, Not Corporate',
    body: "Shishir traded Jira tickets for espresso shots. The La Carimali machine isn't a prop. It's his desk now.",
    // TODO: Replace with photo of the La Carimali machine / counter area
    bgColor: '#8B6D4A',
    imageLabel: '[La Carimali machine / counter photo]',
  },
  {
    title: 'Your Other Living Room',
    body: "Bring your laptop. Or don't. Stay for one cup or five. The WiFi password is on the wall and nobody's watching the clock.",
    // TODO: Replace with photo of seating area showing open laptops
    bgColor: '#A0674B',
    imageLabel: '[Seating area with laptops photo]',
  },
] as const;

export function ThreePillars() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-cream" aria-labelledby="pillars-heading">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3" aria-hidden="true">
            <Image
              src="/mascot/pour_over.svg"
              alt=""
              width={68}
              height={68}
              className="opacity-55"
            />
          </div>
          <h2
            id="pillars-heading"
            className="text-espresso text-3xl md:text-4xl tracking-tight"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            What we believe in
          </h2>
        </SectionReveal>

        {/* Cards — 3-column grid on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <SectionReveal key={pillar.title} delay={i * 0.12}>
              <PillarCard pillar={pillar} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Pillar = (typeof PILLARS)[number];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const cardRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.article
      ref={cardRef}
      whileHover="hovered"
      initial="idle"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden flex flex-col justify-end min-h-[420px] cursor-default"
      style={{ borderRadius: '110px 110px 16px 16px' }}
      aria-label={pillar.title}
    >
      {/* Background image placeholder */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: pillar.bgColor }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <span className="text-cream text-xs text-center px-6 uppercase tracking-widest leading-loose">
            {pillar.imageLabel}
          </span>
        </div>
      </div>

      {/* Cursor spotlight — radial glow that follows the mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle 180px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Sage wash — clears on hover to reveal the image */}
      <motion.div
        className="absolute inset-0 bg-sage/55"
        variants={{ idle: { opacity: 1 }, hovered: { opacity: 0 } }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {/* Gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(42,35,32,0.80) 0%, rgba(42,35,32,0.20) 55%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Content — slides up on hover */}
      <motion.div
        className="relative z-10 p-8"
        variants={{
          idle:    { y: 0 },
          hovered: { y: -10 },
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h3
          className="text-cream text-2xl font-medium mb-3"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          variants={{
            idle:    { opacity: 0.9 },
            hovered: { opacity: 1 },
          }}
        >
          {pillar.title}
        </motion.h3>
        <motion.p
          className="text-cream/80 text-sm leading-relaxed"
          variants={{
            idle:    { opacity: 0.75 },
            hovered: { opacity: 1 },
          }}
        >
          {pillar.body}
        </motion.p>
      </motion.div>
    </motion.article>
  );
}
