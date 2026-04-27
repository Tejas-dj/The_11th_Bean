'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { videos, videoCategories } from '@/data/videos';
import type { VideoEntry } from '@/data/videos';

type CategoryId = (typeof videoCategories)[number]['id'] | 'all';

const TABS: { id: CategoryId; label: string }[] = [
  { id: 'all',            label: 'All'            },
  { id: 'cafe-sessions',  label: 'Cafe Sessions'  },
  { id: 'the-craft',      label: 'The Craft'      },
  { id: 'podcast-clips',  label: 'Podcast Clips'  },
];

export default function WatchPage() {
  const [active, setActive] = useState<CategoryId>('all');
  const [playing, setPlaying] = useState<VideoEntry | null>(null);

  const filtered = active === 'all' ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      {/* Hero */}
      <section
        aria-label="Watch header"
        className="relative pt-24 pb-16 px-6 overflow-hidden"
        style={{ backgroundColor: '#2A2320' }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #C8A96E 0%, transparent 65%)' }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionReveal>
            <p className="text-rattan text-[10px] tracking-[0.2em] uppercase mb-4">The 11th Bean</p>
            <h1
              className="text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              Watch
            </h1>
            <p className="text-cream/50 text-base md:text-lg max-w-xl leading-relaxed">
              Short clips from the cafe. The craft, the sessions, the moments between.
              {/* TODO: Add Shishir's YouTube channel link when ready */}
            </p>
          </SectionReveal>
        </div>

        {/* After hours mascot — bottom-right, cream-tinted */}
        <div
          className="absolute bottom-0 right-6 md:right-14 z-10 w-24 md:w-32 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/mascot/after_hours.svg"
            alt=""
            width={128}
            height={128}
            className="w-full h-auto opacity-65"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 lg:top-20 z-40 bg-cream border-b border-sage/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Video categories">
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  className="relative flex-shrink-0 px-4 md:px-5 py-4 text-xs md:text-sm transition-colors whitespace-nowrap"
                  style={{
                    color: isActive ? 'var(--c-espresso)' : 'rgba(42,35,32,0.45)',
                    fontFamily: isActive ? 'var(--font-lora), Georgia, serif' : undefined,
                    fontStyle: isActive ? 'italic' : undefined,
                  }}
                >
                  {tab.label}
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

      {/* Grid */}
      <section className="px-4 md:px-6 py-12 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.length === 0 ? (
                <div className="col-span-full py-20 flex flex-col items-center gap-5 text-center">
                  <Image
                    src="/mascot/empty_cup.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="opacity-50"
                    aria-hidden="true"
                  />
                  <p className="text-espresso/40 text-base">Nothing here yet. Check back soon.</p>
                </div>
              ) : filtered.map((video, i) => (
                <SectionReveal key={video.id} delay={i * 0.05}>
                  <VideoCard video={video} onPlay={() => setPlaying(video)} />
                </SectionReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox player */}
      <AnimatePresence>
        {playing && (
          <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function VideoCard({ video, onPlay }: { video: VideoEntry; onPlay: () => void }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-sage/15 bg-cream">
      {/* Thumbnail */}
      <button
        onClick={onPlay}
        className="relative w-full aspect-video block focus-visible:outline-2 focus-visible:outline-rattan"
        aria-label={`Play: ${video.title}`}
      >
        <div className="absolute inset-0" style={{ backgroundColor: video.bgColor }} aria-hidden="true" />

        {/* Play button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: 'rgba(242,232,217,0.92)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="#2A2320" aria-hidden="true">
              <path d="M4 2L15 9L4 16V2Z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-3 right-3 font-mono text-[10px] text-cream bg-black/50 px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] text-cream/80 bg-black/40 px-2 py-0.5 rounded-full uppercase tracking-widest">
          {videoCategories.find((c) => c.id === video.category)?.label}
        </span>
      </button>

      {/* Info */}
      <div className="p-4">
        <p className="text-espresso/35 font-mono text-[10px] mb-1">
          {new Date(video.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <h3
          className="text-espresso font-medium text-sm md:text-base leading-snug mb-1"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {video.title}
        </h3>
        <p className="text-espresso/50 text-xs leading-relaxed line-clamp-2">{video.description}</p>
      </div>
    </article>
  );
}

function VideoPlayer({ video, onClose }: { video: VideoEntry; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-cream/50 hover:text-cream transition-colors"
        aria-label="Close video"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {video.youtubeId ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className="w-full aspect-video rounded-xl flex flex-col items-center justify-center gap-4"
            style={{ backgroundColor: video.bgColor }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(242,232,217,0.5)" strokeWidth="1" aria-hidden="true">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="rgba(242,232,217,0.5)" stroke="none"/>
            </svg>
            <p className="text-cream/50 text-sm">Video coming soon</p>
          </div>
        )}
        <div className="mt-4">
          <h2
            className="text-cream text-lg md:text-xl font-medium"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            {video.title}
          </h2>
          <p className="text-cream/45 text-sm mt-1">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
