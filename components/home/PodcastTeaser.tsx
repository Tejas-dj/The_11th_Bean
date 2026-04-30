'use client';
import Link from 'next/link';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { latestEpisode } from '@/data/episodes';

// YouTube video ID for the latest episode
const YOUTUBE_VIDEO_ID = 'ndgXfaAHD9g';

export function PodcastTeaser() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-cream-light" aria-labelledby="podcast-heading">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="mb-10">
          <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase mb-2">Latest episode</p>
          <h2
            id="podcast-heading"
            className="text-espresso text-3xl md:text-4xl tracking-tight"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            Conversations at The 11<sup className="text-lg not-italic">th</sup> Bean
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          {/* Wide card — caramel inverted bg as per brief */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ backgroundColor: '#8B6D4A' }}
          >
            {/* Grain texture overlay — coffee-bag tactile feel */}
            <div
              className="absolute inset-0 pointer-events-none z-[1] opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
              aria-hidden="true"
            />
            <div className="flex flex-col lg:flex-row">
              {/* YouTube embed — 45% on desktop, full width + aspect-video on mobile */}
              <div className="w-full lg:w-[45%] flex-shrink-0 bg-black aspect-video lg:aspect-auto lg:min-h-[320px]">
                <iframe
                  className="w-full h-full"
                  style={{ minHeight: '220px', display: 'block' }}
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?si=5mMbN0tm6i4BKef8`}
                  title={latestEpisode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Content — 55% on desktop */}
              <div className="w-full lg:w-[55%] p-8 lg:p-10 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-rattan text-xs font-mono">
                      EP. {String(latestEpisode.number).padStart(2, '0')}
                    </span>
                    <span className="text-cream/30 text-xs">·</span>
                    <span className="text-cream/50 text-xs">
                      {new Date(latestEpisode.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </span>
                    {latestEpisode.isLatest && (
                      <span className="text-[10px] bg-red-800/80 text-cream px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>

                  <h3
                    className="text-cream text-2xl lg:text-3xl leading-tight font-medium"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    {latestEpisode.title}
                  </h3>

                  <p className="text-cream/70 text-sm leading-relaxed">
                    {latestEpisode.description}
                  </p>
                  {latestEpisode.guest && (
                    <p className="text-rattan text-xs">With {latestEpisode.guest}</p>
                  )}
                </div>

                <Link
                  href="/podcast"
                  className="self-start text-rattan text-sm font-medium link-underline hover:opacity-80 transition-opacity"
                >
                  All episodes →
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
