import type { Metadata } from 'next';
import { SectionReveal } from '@/components/shared/SectionReveal';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Why We Exist | The 11th Bean',
  description: 'The philosophy behind The 11th Bean. Why Shishir built it, what it stands for, and what we believe a cafe should be.',
};

// TODO: Replace with Shishir's actual words after interview — this is a draft framework

const SECTIONS = [
  {
    number: '01',
    heading: 'Coffee is the excuse.',
    body: [
      "The 11th Bean is not a coffee shop that happens to have seating. It is a place that happens to serve coffee. The distinction matters more than it sounds.",
      "People come here because they needed somewhere to be. The coffee is very good. But the reason they stay, and come back, and bring someone else the next time — that is not the coffee.",
    ],
  },
  {
    number: '02',
    heading: 'We believe in the slow.',
    body: [
      "Everything in this city moves fast. The traffic, the sprints, the lunch breaks timed to the minute. We are not a stop. We are not optimised for throughput.",
      "A pour over takes three minutes. We will not apologise for it. If you have three minutes, sit down. If you don't, we would gently suggest that is the problem.",
    ],
  },
  {
    number: '03',
    heading: 'This city already has chains.',
    body: [
      "Basavanagudi does not need another logo. It does not need another identical menu or another app-based loyalty programme. It needs what it has always had: a neighbourhood place, run by someone who lives nearby and cares about the outcome.",
      "Shishir grew up here. He knows the light at 8am. He knows which table gets the best of it. This cafe is not a concept. It is a commitment.",
    ],
  },
  {
    number: '04',
    heading: 'The bookshelves are real.',
    body: [
      "Nothing in this space was chosen by an interior designer trying to look like a cafe that wasn't designed by an interior designer. The books are here because Shishir ran out of room at home. The guitar is here because a friend left it. The Catan set is missing two roads.",
      "This is not a vibe. It is a room that people actually use.",
    ],
  },
  {
    number: '05',
    heading: 'One cup at a time.',
    body: [
      "We will not scale. There will not be a second location in Koramangala with the same menu and a slightly different logo. There is one machine, one person who knows how to use it, and one counter.",
      "That is enough. That is the whole point.",
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
        {/* Namaste mascot — right side of hero, welcoming before the manifesto */}
        <div
          className="absolute bottom-0 right-4 md:right-16 w-48 md:w-64 pointer-events-none select-none z-10"
          aria-hidden="true"
        >
          <Image
            src="/mascot/namaste.svg"
            alt=""
            width={256}
            height={256}
            className="w-full h-auto opacity-50"
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
              This is not a mission statement. Mission statements are for decks.
              This is just what we believe, written down.
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
