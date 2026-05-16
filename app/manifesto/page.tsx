import type { Metadata } from 'next';
import { SectionReveal } from '@/components/shared/SectionReveal';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Why We Exist | The 11th Bean',
  description: 'The philosophy behind The 11th Bean. Why Shishir and Priya built it, what it stands for, and what we believe a cafe should be.',
};

// Sourced directly from Shishir's cafe info document

const SECTIONS = [
  {
    number: '01',
    heading: 'Coffee is treated as craft.',
    body: [
      "At The 11ᵗʰ Bean, coffee is treated the same way Maison Aranya treats materials. With respect, precision and patience.",
      "We serve only Specialty Coffee because it represents the highest standard of this craft. It rewards discipline. It respects the farmer. It preserves the true character of the bean.",
    ],
  },
  {
    number: '02',
    heading: 'Craft is built through decisions.',
    body: [
      "Small details define the final cup. Consistency builds trust. Simplicity requires discipline.",
      "We do not complicate coffee. We refine it. This is how Maison Aranya thinks. This is how we brew.",
    ],
  },
  {
    number: '03',
    heading: 'Good coffee is repeatable.',
    body: [
      "Our standards include freshly roasted Specialty beans, precise grind size, controlled water temperature, calibrated extraction and clean and maintained equipment.",
      "These are not enhancements. They are the foundation. Every cup is brewed with the same intent.",
    ],
  },
  {
    number: '04',
    heading: 'The space is built for presence.',
    body: [
      "Designed under the philosophy of Maison Aranya, this café reflects material honesty, calm and clarity.",
      "A place to slow down. A place to think clearly. A place to feel at ease. No pressure to leave. No pressure to order more.",
    ],
  },
  {
    number: '05',
    heading: 'We are not built for volume.',
    body: [
      "We are built for consistency, clarity and craft. Every cup reflects discipline. Every decision reflects intention.",
      "We do not get everything perfect. But we care enough to keep improving every single day.",
    ],
  },
] as const;

export default function ManifestoPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-6"
        style={{ backgroundColor: '#2A2320' }}
        aria-labelledby="manifesto-heading"
      >
        {/* Blog writer mascot — right side of hero */}
        <div
          className="absolute bottom-0 right-4 md:right-16 w-48 md:w-64 pointer-events-none select-none z-10"
          aria-hidden="true"
        >
          <Image
            src="/mascot/blog_writer.svg"
            alt=""
            width={256}
            height={256}
            className="w-full h-auto opacity-60"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div className="max-w-[800px] mx-auto">
          <SectionReveal>
            <p className="text-rattan text-[10px] tracking-[0.2em] uppercase mb-6">The 11th Bean</p>
            <h1
              id="manifesto-heading"
              className="text-cream text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              Why we exist.
            </h1>
            <p className="text-cream/45 text-sm md:text-base leading-relaxed max-w-lg">
              Not as a mission statement. As a belief system. This is what we stand for, written down.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Manifesto sections */}
      <div className="max-w-[800px] mx-auto px-6 py-20 space-y-20 lg:space-y-28">
        {SECTIONS.map((section, i) => (
          <SectionReveal key={section.number} delay={0}>
            <article>
              <div className="flex items-start gap-6 mb-6">
                <span
                  className="font-mono text-espresso/20 text-sm flex-shrink-0 mt-2"
                  aria-hidden="true"
                >
                  {section.number}
                </span>
                <h2
                  className="text-espresso text-2xl md:text-3xl lg:text-4xl leading-snug"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  {section.heading}
                </h2>
              </div>
              <div className="pl-12 space-y-5 border-l border-sage/30 ml-[calc(1rem+3px)]">
                {section.body.map((para, j) => (
                  <p key={j} className="text-espresso/70 text-base md:text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          </SectionReveal>
        ))}

        {/* Closing */}
        <SectionReveal>
          <div className="border-t border-sage/25 pt-16 text-center space-y-6">
            <div className="flex justify-center mb-2" aria-hidden="true">
              <Image
                src="/mascot/blessed.svg"
                alt=""
                width={112}
                height={112}
                className="opacity-80"
              />
            </div>
            <p
              className="text-espresso text-2xl md:text-3xl lg:text-4xl leading-snug"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              Come in. Have a seat.
            </p>
            <p className="text-espresso/50 text-sm">
              42, Tata Silk Farm, Basavanagudi. The blue gate.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/visit"
                className="px-6 py-2.5 bg-caramel text-cream text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Find us
              </Link>
              <Link
                href="/our-story"
                className="px-6 py-2.5 border border-sage/35 text-espresso text-sm rounded-full hover:border-rattan transition-colors"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
