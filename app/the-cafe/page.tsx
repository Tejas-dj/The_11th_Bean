'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { InteriorTour }    from '@/components/cafe/InteriorTour';
import { AmbientPlayer }   from '@/components/cafe/AmbientPlayer';
import { NeighborhoodMap } from '@/components/cafe/NeighborhoodMap';
import { SectionReveal }   from '@/components/shared/SectionReveal';
import { ArchDivider }     from '@/components/shared/ArchDivider';
import { CollectionTabs }  from '@/components/gallery/CollectionTabs';
import { MasonryGrid }     from '@/components/gallery/MasonryGrid';
import { Lightbox }        from '@/components/gallery/Lightbox';
import { collections, galleryImages } from '@/data/gallery';
import type { GalleryImage } from '@/data/gallery';

export default function TheCafePage() {
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
    <div className="bg-cream">
      {/* ── Entrance ── */}
      <section aria-label="Cafe entrance" className="relative">
        <div
          className="w-full overflow-hidden relative"
          style={{ height: 'clamp(480px, 72vh, 820px)' }}
        >
          <Image
            src="/images/cafe/cafe_exterior.png"
            alt="The 11th Bean cafe exterior — entrance on Tata Silk Farm Road"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <SectionReveal>
            <div className="flex items-center gap-5 mb-4" aria-hidden="true">
              <Image
                src="/mascot/morning.svg"
                alt=""
                width={84}
                height={84}
                className="opacity-65"
              />
            </div>
            <h1
              className="text-espresso text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-5"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              The Cafe
            </h1>
            <p className="text-espresso/60 text-base md:text-xl max-w-xl leading-relaxed">
              Designed under the philosophy of Maison Aranya. Material honesty, calm and clarity.
              A place to slow down. A place to think clearly. A place to feel at ease.
            </p>
          </SectionReveal>
        </div>
      </section>

      <ArchDivider color="#F2E8D9" />

      {/* ── Interior Tour ── */}
      <InteriorTour />

      <ArchDivider color="#F2E8D9" />

      {/* ── The Living Room ── books, games, guitar */}
      <section aria-labelledby="living-room-heading" className="py-20 lg:py-28 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal className="mb-12">
            <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-2">Not just a cafe</p>
            <h2
              id="living-room-heading"
              className="text-espresso text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              The Living Room
            </h2>
          </SectionReveal>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <SectionReveal direction="left" className="w-full lg:w-1/2">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/cafe/cafe_living_room_nook.png"
                  alt="The bookshelf reading nook at The 11th Bean"
                  fill
                  className="object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.1} className="w-full lg:w-1/2 space-y-6">
              {/* Game night mascot — perfectly placed in the "living room" section */}
              <div aria-hidden="true" className="flex justify-start mb-2">
                <Image
                  src="/mascot/game_night.svg"
                  alt=""
                  width={124}
                  height={124}
                  className="opacity-65"
                />
              </div>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                A neighbourhood café designed for slow mornings, long work sessions and conversations that run longer than expected.
              </p>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                No pressure to leave. No pressure to order more. Just a space that lets you stay.
              </p>

              {/* Games available */}
              <div>
                <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">On the shelf</p>
                <div className="flex flex-wrap gap-2">
                  {['Catan', 'Pictionary', 'Chess', 'Uno'].map((game) => (
                    <span key={game} className="text-sm bg-sage/20 text-espresso/70 px-3 py-1 rounded-full">
                      {game}
                    </span>
                  ))}
                  <span className="text-sm bg-sage/20 text-espresso/70 px-3 py-1 rounded-full">
                    + whatever Shishir finds at the market
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <ArchDivider color="#F2E8D9" />

      {/* ── Gallery ── embedded, no separate page */}
      <section aria-labelledby="gallery-heading" className="py-20 lg:py-28 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 mb-10">
          <SectionReveal>
            <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-2">A place worth looking at</p>
            <h2
              id="gallery-heading"
              className="text-espresso text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              Through the lens
            </h2>
          </SectionReveal>
        </div>

        {/* Collection tabs */}
        <CollectionTabs
          collections={collections}
          active={activeCollection}
          onChange={handleCollectionChange}
        />

        {/* Collection description */}
        <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-3">
          <SectionReveal>
            <p
              className="text-espresso/45 text-sm"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              {activeDesc}
            </p>
          </SectionReveal>
        </div>

        {/* Masonry grid */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-4">
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

      <ArchDivider color="#F2E8D9" />

      {/* ── Neighborhood Map ── */}
      <NeighborhoodMap />

      {/* Floating ambient player — The Cafe page only */}
      <AmbientPlayer />
    </div>
  );
}
