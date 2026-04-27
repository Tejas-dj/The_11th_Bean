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
      {/* Desktop: horizontal tabs */}
      <div className="hidden md:flex items-end gap-1 border-b border-sage/30">
        {menuCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-espresso' : 'text-espresso/45 hover:text-espresso/70'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {cat.label}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rattan rounded-full"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-rattan text-espresso'
                  : 'bg-sage/20 text-espresso/60 hover:bg-sage/35'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
