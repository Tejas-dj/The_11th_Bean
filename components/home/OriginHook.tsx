import Link from 'next/link';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

export function OriginHook() {
  return (
    // Slight background warmth shift signals the story section
    <section
      className="py-20 lg:py-28 px-6"
      style={{ backgroundColor: '#EAE0CE' }}
      aria-labelledby="story-hook-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Photo — 55% on desktop, full width on mobile */}
          <SectionReveal direction="left" className="w-full lg:w-[55%]">
            {/* TODO: Replace with candid portrait of Shishir behind the counter mid-action */}
            <div
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: '#C8A96E' }}
              role="img"
              aria-label="Portrait of Shishir at the cafe counter — placeholder"
            >
              <div className="text-center text-espresso/50 p-10 space-y-2">
                <p className="text-xs uppercase tracking-[0.2em]">Photo placeholder</p>
                <p className="text-sm leading-relaxed max-w-[220px] mx-auto">
                  Candid portrait of Shishir<br />behind the counter, mid-action
                </p>
                <p className="text-xs text-espresso/35">Approx. 1200 × 900 px</p>
              </div>
            </div>
          </SectionReveal>

          {/* Text — 45% on desktop */}
          <SectionReveal direction="right" delay={0.1} className="w-full lg:w-[45%]">
            <div className="space-y-6 relative">
              {/* Stressed mascot — floats top-right of the text block */}
              <div
                className="absolute -top-4 -right-2 w-28 md:w-32 opacity-55 pointer-events-none select-none"
                aria-hidden="true"
              >
                <Image
                  src="/mascot/stressed.svg"
                  alt=""
                  width={128}
                  height={128}
                  className="w-full h-auto"
                />
              </div>
              <h2
                id="story-hook-heading"
                className="text-espresso text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight pr-24 md:pr-0 relative z-20"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                Before the first cup, there was a cubicle.
              </h2>

              {/* TODO: Replace with Shishir's actual story — 30–60 min interview needed */}
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                Shishir spent years in IT, chasing deadlines and standups. Then one afternoon, somewhere between a bad coffee and a good conversation, something shifted. He didn't quit to "follow his passion". He quit because the alternative was to keep pretending.
              </p>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                The 11th Bean isn't his second career. It's his first honest one.
              </p>

              <Link
                href="/our-story"
                className="inline-block text-caramel font-medium text-base link-underline hover:text-rattan transition-colors duration-200 mt-2"
              >
                Read the full story →
              </Link>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
