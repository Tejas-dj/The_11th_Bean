'use client';
import { motion } from 'framer-motion';
import { menuCategories } from '@/data/menu';

type CategoryId = (typeof menuCategories)[number]['id'];

interface MenuTabsProps {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}

export function MenuTabs({ active, onChange }: MenuTabsProps) {
  return (
    <nav aria-label="Menu categories">
      {/* Desktop: pill-highlight tabs — highlight slides between active tabs */}
      <div className="hidden md:flex items-center gap-1 border-b border-sage/30 pb-1">
        {menuCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                isActive
                  ? 'text-espresso'
                  : 'text-espresso/45 hover:text-espresso/70 hover:bg-sage/10'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Sliding pill background */}
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-rattan/15 border border-rattan/25"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-[1]">{cat.label}</span>
              {/* Active underline dot */}
              {isActive && (
                <motion.span
                  layoutId="tab-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rattan"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile: horizontally scrollable pills */}
      <div
        className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {menuCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'text-espresso shadow-sm'
                  : 'bg-sage/20 text-espresso/60 hover:bg-sage/35'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-tab-pill"
                  className="absolute inset-0 rounded-full bg-rattan/25 border border-rattan/40"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-[1]">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
