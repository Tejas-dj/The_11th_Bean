'use client';
import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { previewItems, type MenuItem } from '@/data/menu';

const MENU_IMAGE_SRCS: Record<string, string> = {
  'eleventh-bean-drip':   '/images/menu/menu_eleventh-bean-drip.jpg',
  'cafe-latte':           '/images/menu/menu_cafe-latte.jpg',
  'choco-fudge-frappe':   '/images/menu/menu_choco-fudge-frappe.webp',
  'matcha-lemonade':      '/images/menu/menu_matcha-lemonade.jpg',
  'pour-over':            '/images/menu/menu_pour-over.jpg',
};

export function MenuPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToCard = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.clientWidth / 2 + card.offsetWidth / 2, behavior: 'smooth' });
    setActiveIdx(idx);
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIdx(closest);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden" aria-labelledby="menu-preview-heading">
      <div className="max-w-[1400px] mx-auto px-6 mb-10">
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/mascot/empty_cup.svg"
              alt=""
              width={72}
              height={72}
              className="opacity-55 flex-shrink-0"
              aria-hidden="true"
            />
            <h2
              id="menu-preview-heading"
              className="text-espresso text-3xl md:text-4xl tracking-tight"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              From the menu
            </h2>
          </div>
          <p className="text-espresso/50 text-sm max-w-xs">
            We do not expand for the sake of variety. We refine for the sake of quality.
          </p>
        </SectionReveal>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
        {/* Arrow buttons */}
        <ArrowBtn dir="left"  onClick={() => scrollToCard(Math.max(0, activeIdx - 1))} hidden={activeIdx === 0} />
        <ArrowBtn dir="right" onClick={() => scrollToCard(Math.min(previewItems.length - 1, activeIdx + 1))} hidden={activeIdx === previewItems.length - 1} />

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[max(1.5rem,calc(50vw-280px))] pb-4"
          style={{ scrollbarWidth: 'none' }}
          role="list"
          aria-label="Menu preview items"
        >
          {previewItems.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              active={i === activeIdx}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
          {previewItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === activeIdx ? 'var(--c-rattan)' : 'var(--c-sage)' }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <SectionReveal className="text-center mt-10">
        <Link
          href="/menu"
          className="inline-block text-caramel font-medium link-underline hover:text-rattan transition-colors duration-200"
        >
          Explore the full menu →
        </Link>
      </SectionReveal>
    </section>
  );
}

function MenuCard({ item, active, onClick }: { item: MenuItem; active: boolean; onClick: () => void }) {
  const imageSrc = MENU_IMAGE_SRCS[item.id];
  return (
    <motion.div
      role="listitem"
      animate={{
        opacity: active ? 1 : 0.6,
        scale: active ? 1 : 0.94,
        filter: active ? 'blur(0px)' : 'blur(1.5px)',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="snap-center flex-shrink-0 cursor-pointer w-[280px] md:w-[300px]"
    >
      <motion.div
        animate={{
          boxShadow: active
            ? '0 8px 32px rgba(139,109,74,0.22), 0 2px 8px rgba(42,35,32,0.08)'
            : '0 1px 4px rgba(42,35,32,0.06)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-cream-light rounded-2xl overflow-hidden border border-sage/30"
      >
        {/* Square item photo */}
        <div className="w-full aspect-square relative overflow-hidden" aria-hidden="true">
          {imageSrc ? (
            <Image src={imageSrc} alt={item.name} fill className="object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-cream/40 text-xs uppercase tracking-widest"
              style={{ backgroundColor: active ? '#C8A96E' : '#B8B394' }}
            >
              {item.name}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3
            className="text-espresso text-lg font-medium mb-1"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {item.name}
          </h3>
          <p className="text-espresso/60 text-sm leading-relaxed mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {item.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[11px] bg-sage/20 text-espresso/70 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm text-espresso/50 ml-2">₹{item.price}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ArrowBtn({ dir, onClick, hidden }: { dir: 'left' | 'right'; onClick: () => void; hidden: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12, backgroundColor: 'var(--c-rattan)', color: 'var(--c-cream)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      className={`absolute top-[40%] z-10 w-10 h-10 rounded-full bg-cream shadow-md border border-sage/30 flex items-center justify-center transition-opacity duration-200 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${dir === 'left' ? 'left-4' : 'right-4'}`}
      aria-label={dir === 'left' ? 'Previous item' : 'Next item'}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={dir === 'left' ? 'M10 3L5 8L10 13' : 'M6 3L11 8L6 13'}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
