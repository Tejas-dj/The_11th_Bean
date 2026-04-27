'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TastingChart } from './TastingChart';
import type { MenuItem } from '@/data/menu';

interface MenuCardProps {
  item: MenuItem;
  showFlipHint?: boolean;
}

export function MenuCard({ item, showFlipHint = false }: MenuCardProps) {
  const [flipped, setFlipped] = useState(false);
  const canFlip = !!item.hasOriginReveal;

  const toggle = () => { if (canFlip) setFlipped((f) => !f); };

  return (
    // Perspective wrapper required for 3D flip; min-height ensures back face isn't clipped
    <div style={{ perspective: '1000px' }} className="w-full">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: canFlip ? '340px' : undefined }}
        className="w-full"
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-cream-light rounded-2xl border border-sage/25 p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className="text-espresso text-lg font-medium leading-snug"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {item.name}
            </h3>
            <span className="font-mono text-sm text-espresso/45 flex-shrink-0 mt-0.5">
              ₹{item.price}
            </span>
          </div>

          <p className="text-espresso/60 text-sm leading-relaxed mb-4">{item.description}</p>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-sage/20 text-espresso/65 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {canFlip && (
              <button
                onClick={toggle}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
                className="flex items-center gap-1.5 text-[11px] text-caramel hover:text-rattan transition-colors focus-visible:outline-rattan"
                aria-label={`See origin info for ${item.name}`}
                aria-pressed={flipped}
              >
                <BeanIcon />
                {showFlipHint ? 'Tap to see origin' : 'Origin'}
              </button>
            )}
          </div>
        </div>

        {/* ── BACK ── (rotated 180deg, only visible when flipped) */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="bg-espresso rounded-2xl p-5 text-cream flex flex-col justify-between"
        >
          <div>
            <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] mb-1">Origin</p>
            <p
              className="text-cream text-lg font-medium mb-1"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {item.origin ?? '—'}
            </p>
            <p className="text-cream/55 text-xs mb-4">{item.originRegion}</p>

            {/* TODO: Replace with actual mini-map for origin region */}
            <div
              className="w-full h-16 rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              aria-label={`Map placeholder for ${item.origin}`}
            >
              <span className="text-cream/25 text-[9px] uppercase tracking-widest">
                [{item.origin} region map]
              </span>
            </div>

            {item.tastingNotes && (
              <div className="flex items-center gap-4">
                <TastingChart notes={item.tastingNotes} size={90} />
                <div className="space-y-1 text-[11px] text-cream/60">
                  {Object.entries(item.tastingNotes).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <span className="capitalize">{k}</span>
                      <span className="text-rattan">{v}/10</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {item.brewMethod && (
            <p className="text-cream/45 text-[11px] mt-3 pt-3 border-t border-cream/10">
              {item.brewMethod}
            </p>
          )}

          <button
            onClick={toggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
            className="mt-4 text-rattan text-xs hover:opacity-70 transition-opacity text-left focus-visible:outline-rattan"
            aria-label="Back to menu item"
          >
            ← Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function BeanIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <ellipse cx="6" cy="6" rx="4" ry="5.5" stroke="currentColor" strokeWidth="1" transform="rotate(-15 6 6)" />
      <path d="M6 1.5 Q4 6 6 10.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  );
}
