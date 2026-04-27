'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PodcastHero }      from '@/components/podcast/PodcastHero';
import { FeaturedEpisode }  from '@/components/podcast/FeaturedEpisode';
import { EpisodeList }      from '@/components/podcast/EpisodeList';
import { PersistentPlayer } from '@/components/podcast/PersistentPlayer';
import { SectionReveal }    from '@/components/shared/SectionReveal';
import type { Episode } from '@/data/episodes';

const PLATFORMS = [
  { name: 'Spotify',        href: '#', icon: '🎵' }, // TODO: Real URLs from Shishir
  { name: 'Apple Podcasts', href: '#', icon: '🎙️' },
  { name: 'YouTube',        href: '#', icon: '▶️' },
  { name: 'RSS',            href: '#', icon: '📡' },
] as const;

export default function PodcastPage() {
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (ep: Episode) => {
    setNowPlaying(ep);
    setIsPlaying(true);
  };

  return (
    <>
      <PodcastHero />
      <FeaturedEpisode onPlay={handlePlay} />
      <EpisodeList nowPlayingId={nowPlaying?.id} onPlay={handlePlay} />

      {/* Where to subscribe */}
      <section aria-labelledby="subscribe-heading" className="py-16 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal className="mb-8">
            <div className="flex items-center gap-6">
              <div>
                <h2
                  id="subscribe-heading"
                  className="text-espresso text-2xl"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  Listen wherever you are
                </h2>
              </div>
              <div aria-hidden="true" className="flex-shrink-0">
                <Image
                  src="/mascot/podcast_host.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="opacity-70"
                />
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sage/30 text-sm text-espresso/70 hover:border-rattan hover:text-espresso transition-colors"
                  aria-label={`Listen on ${p.name} (opens in new tab)`}
                >
                  <span aria-hidden="true">{p.icon}</span>
                  {p.name}
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <PersistentPlayer
        episode={nowPlaying}
        playing={isPlaying}
        onToggle={setIsPlaying}
        onClose={() => { setNowPlaying(null); setIsPlaying(false); }}
      />
    </>
  );
}
