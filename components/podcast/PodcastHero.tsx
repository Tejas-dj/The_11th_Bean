import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

export function PodcastHero() {
  return (
    <section
      aria-label="Podcast header"
      className="relative pt-24 pb-16 px-6 overflow-hidden"
      style={{ backgroundColor: '#2A2320' }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, #C8A96E 0%, transparent 65%)' }}
      />

      {/* Podcast host mascot — large, right side */}
      <div
        className="absolute bottom-0 -right-4 md:right-12 z-10 w-44 md:w-80 lg:w-96 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/mascot/podcast_host.svg"
          alt=""
          width={384}
          height={384}
          className="w-full h-auto opacity-80"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-rattan flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A2320" strokeWidth="1.5">
                <rect x="9" y="2" width="6" height="12" rx="3"/>
                <path d="M5 10a7 7 0 0 0 14 0"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
            </div>
            <span className="text-cream/50 text-xs tracking-[0.2em] uppercase">The Chronicles</span>
          </div>

          <h1
            className="text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-6"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            Conversations at<br />The 11<sup className="text-2xl not-italic align-super">th</sup> Bean
          </h1>

          <p className="text-cream/55 text-base md:text-lg max-w-xl leading-relaxed pr-32 md:pr-0 relative z-20">
            Shishir talks to interesting people over coffee. Real conversations with indie creators, storytellers, and friends of the café.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
