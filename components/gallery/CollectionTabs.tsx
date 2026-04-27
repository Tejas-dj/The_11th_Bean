'use client';
import { useRef } from 'react';
import type { GalleryCollection } from '@/data/gallery';

interface CollectionTabsProps {
  collections: GalleryCollection[];
  active: string;
  onChange: (id: string) => void;
}

export function CollectionTabs({ collections, active, onChange }: CollectionTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-cream border-b border-sage/20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Scrollable on mobile, flex on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Gallery collections"
        >
          {collections.map((col) => {
            const isActive = col.id === active;
            return (
              <button
                key={col.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`collection-${col.id}`}
                onClick={() => onChange(col.id)}
                className="relative flex-shrink-0 px-4 md:px-5 py-4 text-xs md:text-sm transition-colors whitespace-nowrap"
                style={{
                  color: isActive ? 'var(--c-espresso)' : 'rgba(42,35,32,0.45)',
                  fontFamily: isActive ? 'var(--font-lora), Georgia, serif' : undefined,
                  fontStyle: isActive ? 'italic' : undefined,
                }}
              >
                {col.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--c-rattan)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
