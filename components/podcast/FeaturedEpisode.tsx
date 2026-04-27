import Image from 'next/image';
import { AudioPlayer } from './AudioPlayer';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { latestEpisode } from '@/data/episodes';
import type { Episode } from '@/data/episodes';

interface FeaturedEpisodeProps {
  onPlay: (ep: Episode) => void;
}

export function FeaturedEpisode({ onPlay }: FeaturedEpisodeProps) {
  const ep = latestEpisode;

  return (
    <section aria-labelledby="featured-ep-heading" className="px-6 py-16" style={{ backgroundColor: '#2A2320' }}>
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="mb-6">
          <p className="text-rattan text-[10px] tracking-[0.2em] uppercase">Latest episode</p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden" style={{ backgroundColor: '#1e1a17' }}>
            {/* Artwork — 40% */}
            <div
              className="w-full lg:w-[40%] aspect-square lg:aspect-auto lg:min-h-[360px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#3a3028' }}
              role="img"
              aria-label="Episode artwork placeholder"
            >
              {/* TODO: Replace with real episode artwork or recording still from Shishir */}
              <div className="flex flex-col items-center justify-center h-full gap-3 p-8">
                <Image
                  src="/mascot/podcast_host.svg"
                  alt=""
                  width={200}
                  height={200}
                  className="opacity-60"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p className="text-[10px] uppercase tracking-widest text-cream/20">Episode artwork</p>
              </div>
            </div>

            {/* Content — 60% */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-rattan text-xs">EP. {String(ep.number).padStart(2,'0')}</span>
                  <span className="text-cream/25 text-xs">·</span>
                  <span className="text-cream/40 text-xs">
                    {new Date(ep.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </span>
                  {ep.isLatest && (
                    <span className="text-[10px] bg-board-red/80 text-cream px-2 py-0.5 rounded-full">New</span>
                  )}
                </div>
                <h2
                  id="featured-ep-heading"
                  className="text-cream text-2xl lg:text-3xl font-medium leading-snug mb-3"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                >
                  {ep.title}
                </h2>
                <p className="text-cream/55 text-sm leading-relaxed">{ep.description}</p>
                {ep.guest && <p className="text-rattan text-xs mt-2">With {ep.guest}</p>}
              </div>

              <AudioPlayer
                duration={ep.duration}
                audioUrl={ep.audioUrl}
                onPlay={() => onPlay(ep)}
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
