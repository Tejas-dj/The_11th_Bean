'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { CollectionTabs } from '@/components/gallery/CollectionTabs';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { Lightbox } from '@/components/gallery/Lightbox';
import { collections, galleryImages } from '@/data/gallery';
import type { GalleryImage } from '@/data/gallery';

export default function GalleryPage() {
  const [activeCollection, setActiveCollection] = useState(collections[0].id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeImages = galleryImages.filter((img) => img.collection === activeCollection);
  const activeDesc = collections.find((c) => c.id === activeCollection)?.description ?? '';

  const handleImageClick = (_img: GalleryImage, index: number) => {
    setLightboxIndex(index);
  };

  const handleCollectionChange = (id: string) => {
    setActiveCollection(id);
    setLightboxIndex(null);
  };

  return (
    <>
      {/* Hero */}
      <section
        aria-label="Gallery header"
        className="relative pt-24 pb-16 px-6 overflow-hidden"
        style={{ backgroundColor: '#2A2320' }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, #C8A96E 0%, transparent 65%)' }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionReveal>
            <p className="text-rattan text-[10px] tracking-[0.2em] uppercase mb-4">The 11th Bean</p>
            <h1
              className="text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              A place worth<br />looking at
            </h1>
            <p className="text-cream/50 text-base md:text-lg max-w-xl leading-relaxed pr-28 md:pr-0 relative z-20">
              Photographs from the cafe. Real ones, eventually. For now: the light is right, the coffee is going,
              and someone left a book open on table four.
            </p>
          </SectionReveal>
        </div>

        {/* Tasting mascot — bottom-right, cream-tinted */}
        <div
          className="absolute bottom-0 right-6 md:right-14 z-10 w-32 md:w-44 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/mascot/tasting.svg"
            alt=""
            width={176}
            height={176}
            className="w-full h-auto opacity-65"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </section>

      {/* Tabs */}
      <CollectionTabs
        collections={collections}
        active={activeCollection}
        onChange={handleCollectionChange}
      />

      {/* Collection label */}
      <section className="px-6 pt-10 pb-3 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal>
            <p
              className="text-espresso/45 text-sm"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              {activeDesc}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-6 pb-20 bg-cream">
        <div className="max-w-[1400px] mx-auto pt-4">
          <MasonryGrid
            key={activeCollection}
            images={activeImages}
            collectionId={activeCollection}
            onImageClick={handleImageClick}
          />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={activeImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
