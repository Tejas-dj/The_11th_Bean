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
            headline="The Corporate Life"
            paragraphs={[
              // TODO: Replace with Shishir's actual story — record a 30-60 min conversation
              "For nearly a decade, Shishir Narayan moved through the rhythms of Bengaluru's IT world. Standups at 9, Jira boards by 10. The work wasn't bad. The pay was fine. But somewhere between the sprint reviews and the team lunches, he started noticing how much of his day he spent not quite present.",
              "Coffee was the ritual that bookended everything. The terrible office filter brew at 8am. The decent third-wave cup during the lunch break that felt like a small act of rebellion. He didn't know it yet, but he was already paying attention to the wrong thing. Or the right thing, depending on how you look at it.",
            ]}
            imageBg="#8B6D4A"
            imageLabel="[Office / IT park atmosphere photo]"
            imageAlt="Placeholder for Shishir's corporate life — Bengaluru IT park or office setting"
            flip={false}
          />

          <NarrativeBlock
            headline="The Breaking Point"
            paragraphs={[
              // TODO: Ask Shishir — was there a specific day, conversation, or cup of coffee?
              "There wasn't a dramatic moment. No desk-flipping resignation, no argument with a manager. It was quieter than that. It was a Tuesday afternoon, a cup of coffee from a new roastery near his office, and the sudden awareness that he'd been tasting coffee differently for months. Comparing. Wondering. Imagining.",
              "He drove home that evening and told his wife he wanted to open a cafe. She asked him if he'd thought about it. He said he'd been thinking about nothing else for two years.",
            ]}
            imageBg="#B8B394"
            imageLabel="[Atmospheric photo — rainy evening, a cup of coffee, a quiet moment]"
            imageAlt="Placeholder for the breaking point — atmospheric, quiet, introspective"
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

          {/* TODO: Replace with Shishir's exact words — record and transcribe */}
          <PullQuote
            quote="I didn't quit to follow a passion. I quit because I couldn't keep pretending the spreadsheet was enough."
            attribution="Shishir, The 11th Bean"
          />

          <div className="max-w-2xl mx-auto pb-16">
            <SectionReveal>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed text-center">
                He left in March. The space on Tata Silk Farm in Basavanagudi took six months to find. Another four to set up. He did most of it himself: the paint, the shelves, the sourcing trips to Chikmagalur. He wasn't in a hurry. That was the whole point.
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
              headline="Finding the Space"
              paragraphs={[
                "Basavanagudi wasn't an accident. Shishir grew up nearby, spent weekends at Lalbagh, ate idli at Brahmin's Coffee Bar before it was on any 'best of' list. The neighborhood has a particular pace. Slower than Koramangala, less self-conscious than Indiranagar. A cafe here would have to earn its place, not just lease it.",
                "The Tata Silk Farm address carries history most people in the city have forgotten: JRD Tata started a silk cultivation venture here in 1896. The mulberry trees are gone, but the name stayed. Shishir liked the idea of building something new in a place that had always been about making things.",
              ]}
              imageBg="#8B6D4A"
              imageLabel="[Photo of the space during renovation / the street on Tata Silk Farm]"
              imageAlt="Placeholder for the cafe space during renovation"
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
              headline="The First Cup"
              paragraphs={[
                // TODO: Ask Shishir — who was the first customer? What was the first compliment?
                "The cafe opened on a Thursday. There was no launch event, no Instagram announcement. Shishir opened the door at 8am, turned on the La Carimali, and made himself an espresso. The first customer walked in ten minutes later, a woman who lived three streets away and had been watching the renovation with curiosity.",
                "She asked for a cappuccino. He made it. She said nothing for a while, then: 'This is very good.' That was enough.",
              ]}
              imageBg="#C8A96E"
              imageLabel="[Photo of the La Carimali machine / opening day]"
              imageAlt="Placeholder for the cafe's opening day"
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
              The cafe Shishir imagined is the cafe you walk into today.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-espresso/65 text-base md:text-lg leading-relaxed">
              There are regulars now. People who bring laptops and stay all afternoon. People who come for the single origin on the weekend and the podcast recording on Tuesday evenings. The bookshelves got fuller. The guitar is still there, still barely in tune. Shishir still makes every cup himself.
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
