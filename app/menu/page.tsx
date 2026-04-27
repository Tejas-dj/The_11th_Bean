'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { MenuTabs }    from '@/components/menu/MenuTabs';
import { MenuCard }    from '@/components/menu/MenuCard';
import { ShishirPick } from '@/components/menu/ShishirPick';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { menuItems, menuCategories } from '@/data/menu';

type CategoryId = (typeof menuCategories)[number]['id'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('hot-coffee');

  const filtered = menuItems.filter(
    (item) => item.category === activeCategory && !item.isShishirsPick
  );

  // Show flip hint only on the first coffee card with origin reveal
  const firstOriginIdx = filtered.findIndex((i) => i.hasOriginReveal);

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">

        {/* Page header */}
        <SectionReveal className="mb-10">
          <div className="flex items-start gap-6 md:gap-10">
            <div className="flex-1">
              <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase mb-3">The Menu</p>
              <h1
                className="text-espresso text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none mb-4"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                Short menu.<br />Every item earned its spot.
              </h1>
              <p className="text-espresso/55 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
                Everything here exists because Shishir couldn't stop tinkering. Cards with a{' '}
                <span className="text-caramel">bean icon</span> flip to reveal the origin story.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 md:w-32 opacity-70 mt-2 hidden sm:block" aria-hidden="true">
              <Image
                src="/mascot/pour_over.svg"
                alt=""
                width={128}
                height={128}
                className="w-full h-auto"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Category tabs */}
        <SectionReveal delay={0.1} className="mb-10">
          <MenuTabs active={activeCategory} onChange={setActiveCategory} />
        </SectionReveal>

        {/* Items grid — crossfade on category change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center gap-5 text-center">
                <Image
                  src="/mascot/empty_cup.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="opacity-50"
                  aria-hidden="true"
                />
                <p className="text-espresso/40 text-base">Nothing here yet. Shishir's still tinkering.</p>
              </div>
            ) : (
              filtered.map((item, i) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  showFlipHint={i === firstOriginIdx}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Shishir's Pick */}
        <ShishirPick />
      </div>
    </div>
  );
}
