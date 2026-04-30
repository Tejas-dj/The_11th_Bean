import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StoryHero }      from '@/components/story/StoryHero';
import { NarrativeBlock } from '@/components/story/NarrativeBlock';
import { PullQuote }      from '@/components/story/PullQuote';
import { Artifact }       from '@/components/story/Artifact';
import { ColorTransition } from '@/components/story/ColorTransition';
import { SectionReveal }  from '@/components/shared/SectionReveal';
import { ArchDivider }    from '@/components/shared/ArchDivider';

export const metadata: Metadata = {
  title: 'Our Story | How Shishir Left IT to Build The 11th Bean',
  description: 'Before the first cup, there was a cubicle. The story of Shishir and the cafe he built in Basavanagudi.',
};

export default function OurStoryPage() {
  return (
    <>
      <StoryHero />

      {/* ── The Before ── muted, slightly cool section */}
      <section aria-labelledby="before-heading" className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionReveal className="pt-16 pb-4">
            <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase" id="before-heading">
              Chapter One
            </p>
          </SectionReveal>

          <NarrativeBlock
            headline="The IT Years"
            paragraphs={[
              "I spent over 15 years in the IT industry, working across India, France and Germany. It was stable, structured and rewarding in many ways. Priya was on a similar path before choosing to step away and pursue a Master's in Psychology.",
              "On paper, everything made sense. In reality, it did not. Coming back to India brought a different perspective. The work felt distant from what I wanted to build. The frustration was not sudden. It built slowly, until it became clear that something had to change.",
            ]}
            imageBg="#8B6D4A"
            imageLabel="[Portrait of the founders]"
            imageAlt="The founders of The Eleventh Bean Café"
            flip={false}
          />

          <NarrativeBlock
            headline="Finding Coffee Again"
            paragraphs={[
              "Coffee was always present. I have been drinking it since the age of six. But it was only when I began studying it seriously that things shifted.",
              "I approached coffee academically. Understanding espresso, extraction, why it is served at a certain temperature, why Indian filter coffee behaves differently, why froth forms, how milk interacts with coffee, how flavour is built and lost. What was once habit became curiosity. Curiosity became understanding. Understanding became respect.",
            ]}
            imageBg="#B8B394"
            imageLabel="[Coffee brewing close-up]"
            imageAlt="Close-up of coffee brewing at The Eleventh Bean"
            flip={true}
          />
        </div>
      </section>

      <ArchDivider color="#B8B394" />

      {/* ── The Leap ── background transitions from sage to cream as user scrolls */}
      <ColorTransition
        fromColor="#B8B394"
        toColor="#F2E8D9"
        className="py-4"
      >
        <section aria-labelledby="leap-heading" className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* Stressed mascot — floating left, conveys the chaos of the leap */}
          <div
            className="absolute left-0 top-12 w-20 md:w-28 opacity-55 pointer-events-none select-none"
            aria-hidden="true"
          >
            <Image
              src="/mascot/stressed.svg"
              alt=""
              width={112}
              height={112}
              className="w-full h-auto"
            />
          </div>

          <SectionReveal className="pt-8 pb-2">
            <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase text-center" id="leap-heading">
              Chapter Two
            </p>
          </SectionReveal>

          {/* TODO: Replace with Shishir's exact words — recorded and transcribed */}
          <PullQuote
            quote="Finding this path did not happen early. It happened after years of doing something else well. But once it became clear, it also became obvious."
            attribution="Shishir, The 11<sup>th</sup> Bean"
          />

          <div className="max-w-2xl mx-auto pb-16">
            <SectionReveal>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed text-center">
                We began with a simple pursuit. To find a coffee that felt complete. Ten beans brought us close. The 11<sup>th</sup> brought clarity. It was not just better. It felt right. That decision became our identity.
              </p>
            </SectionReveal>
          </div>
        </section>
      </ColorTransition>

      <ArchDivider color="#F2E8D9" />

      {/* ── Building The 11th Bean ── */}
      <section aria-labelledby="building-heading" className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionReveal className="pt-16 pb-4">
            <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase" id="building-heading">
              Chapter Three
            </p>
          </SectionReveal>

          {/* Block with draggable artifact */}
          <div className="relative">
            <NarrativeBlock
              headline="Our Beginning"
              paragraphs={[
                "We began with a simple pursuit. To find a coffee that felt complete. Ten beans brought us close. The 11ᵗʰ brought clarity. It was not just better. It felt right.",
                "That decision became our identity. And our standard. Maison Aranya represents Indian craftsmanship across categories. The 11ᵗʰ Bean Café is its coffee expression. It is where craft becomes something you can taste and experience in real time.",
              ]}
              imageBg="#8B6D4A"
              imageLabel="[Photo of the space during renovation / the street on Tata Silk Farm]"
              imageAlt="The café space during renovation"
              flip={false}
            />
            <Artifact
              label="First sketch"
              caption="Floor plan sketch, pencil on graph paper"
              rotation={4}
              offsetTop="15%"
              offsetRight="-20px"
            />
            {/* Chikmagalur mascot — references the sourcing trips mentioned in this section */}
            <div
              className="absolute bottom-4 left-0 w-20 md:w-28 opacity-60 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Image
                src="/mascot/Chikmagalur.svg"
                alt=""
                width={112}
                height={112}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="relative">
            <NarrativeBlock
              headline="Why This Exists"
              paragraphs={[
                "We did not want to build a café that felt transactional. We wanted a place where the coffee is taken seriously, but the people are not rushed.",
                "Where regulars feel at home, and first-time visitors do not feel out of place. That is what we continue to build, every day.",
              ]}
              imageBg="#C8A96E"
              imageLabel="[Photo of the La Carimali machine / opening day]"
              imageAlt="The Eleventh Bean Café espresso machine"
              flip={true}
            />
            <Artifact
              label="Opening day"
              caption="First receipt: ₹120, one cappuccino"
              rotation={-5}
              offsetTop="20%"
              offsetRight="-10px"
            />
          </div>
        </div>
      </section>

      <ArchDivider color="#FAF7F2" />

      {/* ── The Now ── */}
      <section
        aria-labelledby="now-heading"
        className="py-20 lg:py-28 px-6"
        style={{ backgroundColor: '#FAF7F2' }}
      >
        <div className="max-w-[800px] mx-auto text-center space-y-8">
          <SectionReveal>
            <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase" id="now-heading">
              Today
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex justify-center mb-4" aria-hidden="true">
              <Image
                src="/mascot/blessed.svg"
                alt=""
                width={96}
                height={96}
                className="opacity-60"
              />
            </div>
            <h2
              className="text-espresso text-3xl md:text-4xl leading-snug"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              A café built on craft, clarity and the discipline of doing things right.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-espresso/65 text-base md:text-lg leading-relaxed">
              We are not built for volume. We are built for consistency, clarity and craft. Every cup reflects discipline. Every decision reflects intention.
            </p>
            <p className="text-espresso/65 text-base md:text-lg leading-relaxed mt-4">
              We do not get everything perfect. But we care enough to keep improving every single day.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <Link
              href="/visit"
              className="inline-block mt-4 px-8 py-3.5 bg-caramel text-cream font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Come say hello →
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
