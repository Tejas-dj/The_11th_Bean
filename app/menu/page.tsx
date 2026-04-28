'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { MenuTabs }    from '@/components/menu/MenuTabs';
import { MenuCard }    from '@/components/menu/MenuCard';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { menuItems, menuCategories } from '@/data/menu';

type CategoryId = (typeof menuCategories)[number]['id'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('signature-brews');
  const [tabsFloating, setTabsFloating] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Shadow appears on the sticky tab bar as soon as it detaches from the header
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setTabsFloating(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = menuItems.filter((item) => item.category === activeCategory);

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
                Everything here exists because Shishir couldn't stop tinkering.
                Customizations available on request.
              </p>
            </div>
            <div className="flex-shrink-0 w-32 md:w-40 opacity-70 mt-2 hidden sm:block" aria-hidden="true">
              <Image
                src="/mascot/pour_over.svg"
                alt=""
                width={160}
                height={160}
                className="w-full h-auto"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Sentinel — sits just above the tab bar, observed by IntersectionObserver */}
        <div ref={sentinelRef} className="h-px" aria-hidden="true" />

        {/* Category tabs — sticky with floating shadow */}
        <div
          className="sticky top-16 lg:top-14 z-30 bg-cream transition-shadow duration-300"
          style={{ boxShadow: tabsFloating ? '0 4px 16px rgba(42,35,32,0.08)' : 'none' }}
        >
        <SectionReveal delay={0.1} className="mb-10">
          <MenuTabs active={activeCategory} onChange={setActiveCategory} />
        </SectionReveal>
        </div>

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
                  width={130}
                  height={130}
                  className="opacity-50"
                  aria-hidden="true"
                />
                <p className="text-espresso/40 text-base">Nothing here yet. Shishir's still tinkering.</p>
              </div>
            ) : (
              filtered.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  showFlipHint={false}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
