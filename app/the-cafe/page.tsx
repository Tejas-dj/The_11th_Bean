import type { Metadata } from 'next';
import Image from 'next/image';
import { InteriorTour }    from '@/components/cafe/InteriorTour';
import { AmbientPlayer }   from '@/components/cafe/AmbientPlayer';
import { NeighborhoodMap } from '@/components/cafe/NeighborhoodMap';
import { SectionReveal }   from '@/components/shared/SectionReveal';
import { ArchDivider }     from '@/components/shared/ArchDivider';

export const metadata: Metadata = {
  title: 'The Cafe | The 11th Bean, Basavanagudi',
  description: 'Step inside The 11th Bean. Books, brews, and a space that feels like the living room you always wanted. Basavanagudi, Bengaluru.',
};

export default function TheCafePage() {
  return (
    <div className="bg-cream">
      {/* ── Entrance ── hero starts at top-0 so the transparent navbar has caramel bg behind it */}
      <section aria-label="Cafe entrance" className="relative">
        {/* TODO: Replace with real exterior / entrance photo from Shishir (70vh min-height recommended) */}
        <div
          className="w-full overflow-hidden"
          style={{ height: 'clamp(480px, 72vh, 820px)' }}
        >
          <div
            className="w-full h-full flex flex-col items-center justify-end pb-12"
            style={{ backgroundColor: '#8B6D4A' }}
            role="img"
            aria-label="The 11th Bean exterior — placeholder"
          >
            <span className="text-cream/25 text-xs uppercase tracking-widest">
              [Cafe exterior photo — street view, entrance, signage]
            </span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <SectionReveal>
            <div className="flex items-center gap-5 mb-4" aria-hidden="true">
              <Image
                src="/mascot/morning.svg"
                alt=""
                width={64}
                height={64}
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
              42, Tata Silk Farm. The blue gate. Walk in. There's usually a seat near the window.
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
              {/* TODO: Replace with bookshelf nook photo — the most Instagrammable spot */}
              <div
                className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: '#B8B394' }}
                role="img"
                aria-label="The bookshelf reading nook at The 11th Bean"
              >
                <span className="text-cream/30 text-xs uppercase tracking-widest text-center px-6">
                  [Bookshelf nook — floor-to-ceiling books, guitar, rattan lamp]
                </span>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.1} className="w-full lg:w-1/2 space-y-6">
              {/* Game night mascot — perfectly placed in the "living room" section */}
              <div aria-hidden="true" className="flex justify-start mb-2">
                <Image
                  src="/mascot/game_night.svg"
                  alt=""
                  width={96}
                  height={96}
                  className="opacity-65"
                />
              </div>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                The bookshelves didn't come from a designer. Shishir just kept adding books. There's no system. Fiction next to coffee theory next to the Catan rules nobody reads. That's the point.
              </p>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                There's also a guitar. It belongs to whoever picks it up.
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

      {/* ── Neighborhood Map ── */}
      <NeighborhoodMap />

      {/* Floating ambient player — The Cafe page only */}
      <AmbientPlayer />
    </div>
  );
}
