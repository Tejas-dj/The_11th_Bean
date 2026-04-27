'use client';
import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { latestEpisode } from '@/data/episodes';

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
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#8B6D4A' }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Episode artwork — 40% on desktop */}
              <div
                className="w-full lg:w-[40%] aspect-square lg:aspect-auto lg:min-h-[340px] flex items-center justify-center"
                style={{ backgroundColor: '#7A5E3A' }}
                role="img"
                aria-label="Podcast episode artwork — placeholder"
              >
                {/* TODO: Replace with real episode artwork or recording still from Shishir */}
                <div className="flex flex-col items-center justify-center h-full p-8 gap-3">
                  <Image
                    src="/mascot/podcast_host.svg"
                    alt=""
                    width={175}
                    height={175}
                    className="opacity-55"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <p className="text-xs uppercase tracking-widest text-cream/30">Episode artwork</p>
                </div>
              </div>

              {/* Content — 60% on desktop */}
              <div className="w-full lg:w-[60%] p-8 lg:p-10 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-rattan text-xs font-mono">
                      EP. {String(latestEpisode.number).padStart(2, '0')}
                    </span>
                    <span className="text-cream/30 text-xs">·</span>
                    <span className="text-cream/50 text-xs">
                      {new Date(latestEpisode.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </span>
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
                </div>

                <InlinePlayer duration={latestEpisode.duration} episodeId={latestEpisode.id} />

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

function InlinePlayer({ duration, episodeId }: { duration: string; episodeId: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    // TODO: Wire to real audio URL from Shishir's podcast
    setPlaying((p) => !p);
  }, []);

  const [mins, secs] = duration.split(':');
  const currentSecs = Math.floor((progress / 100) * (parseInt(mins) * 60 + parseInt(secs)));
  const display = `${String(Math.floor(currentSecs / 60)).padStart(2, '0')}:${String(currentSecs % 60).padStart(2, '0')}`;

  return (
    <div
      className="space-y-3"
      role="region"
      aria-label={`Audio player for episode`}
    >
      <div className="flex items-center gap-4">
        {/* Play/Pause button */}
        <button
          onClick={toggle}
          className="w-11 h-11 rounded-full bg-rattan flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
          aria-label={playing ? 'Pause episode' : 'Play episode'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Progress bar */}
        <div className="flex-1 space-y-1">
          <div
            className="w-full h-1 rounded-full overflow-hidden cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <motion.div
              className="h-full rounded-full bg-rattan"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-cream/40 font-mono text-[11px]">
            <span aria-live="polite">{display}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 2L12 7L3 12V2Z" fill="#2A2320" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="4" height="10" rx="1" fill="#2A2320" />
      <rect x="8" y="2" width="4" height="10" rx="1" fill="#2A2320" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cream/40" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3"/>
      <path d="M5 10a7 7 0 0 0 14 0"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  );
}
