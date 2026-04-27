'use client';
import { motion } from 'framer-motion';
import type { MenuItem } from '@/data/menu';

interface MenuCardProps {
  item: MenuItem;
  showFlipHint?: boolean;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="w-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-cream-light rounded-2xl border border-sage/25 p-5 shadow-sm h-full flex flex-col"
      >
        {/* Name + price */}
        <div className="flex items-start justify-between gap-3 mb-3">
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

        {/* Description */}
        <p className="text-espresso/60 text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-auto">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-sage/20 text-espresso/65 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
