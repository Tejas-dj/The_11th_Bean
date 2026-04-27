import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

export const metadata: Metadata = {
  title: 'Visit Us | The 11th Bean, Tata Silk Farm, Basavanagudi',
  description: 'Your table is waiting. Find The 11th Bean at 42, Tata Silk Farm, Basavanagudi, Bengaluru. Hours, directions, and how to get here.',
};

const HOURS = [
  { day: 'Monday',   hours: '8:00 AM – 9:00 PM',  open: true  },
  { day: 'Tuesday',  hours: '8:00 AM – 9:00 PM',  open: true  },
  { day: 'Wednesday',hours: '8:00 AM – 9:00 PM',  open: true  },
  { day: 'Thursday', hours: '8:00 AM – 9:00 PM',  open: true  },
  { day: 'Friday',   hours: '8:00 AM – 10:00 PM', open: true  },
  { day: 'Saturday', hours: '9:00 AM – 10:00 PM', open: true  },
  { day: 'Sunday',   hours: '9:00 AM – 8:00 PM',  open: true  },
  // TODO: Verify hours with Shishir — these are placeholders
] as const;

// TODO: Verify these with Shishir before launch
const TIPS = [
  "Ask Shishir about today's single origin. He'll light up.",
  "The corner table by the window gets the best light after 3pm.",
  "If you're here before 10am, ask for the pour over. It's worth the wait.",
  "The guitar by the bookshelves is there to be played. Nobody will judge.",
] as const;

export default function VisitPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">

      {/* ── Invitation ── */}
      <section className="px-6 pt-10 pb-16 max-w-[1400px] mx-auto" aria-labelledby="visit-heading">
        <SectionReveal>
          <div className="flex items-start gap-5 md:gap-8">
            <div className="flex-shrink-0 w-20 md:w-28 mt-1 opacity-70" aria-hidden="true">
              <Image
                src="/mascot/namaste.svg"
                alt=""
                width={112}
                height={112}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h1
                id="visit-heading"
                className="text-espresso text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-4"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                Your table is waiting.
              </h1>
              <p className="text-espresso/55 text-lg max-w-md mt-4">
                Corner seat gets the best light after 3pm. We'll leave the door open.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── Map + Details ── */}
      <section
        className="px-6 pb-20 max-w-[1400px] mx-auto"
        aria-label="Location and contact details"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Details — 40% on desktop */}
          <SectionReveal direction="left" className="w-full lg:w-[40%] space-y-10">

            {/* Address */}
            <div>
              <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">Address</p>
              <address className="not-italic text-espresso/85 leading-relaxed text-base">
                42, Tata Silk Farm, Basavanagudi<br />
                Near Mecon Limited, S End Road<br />
                Bengaluru 560028
              </address>
              <a
                href="https://maps.google.com/?q=The+11th+Bean+42+Tata+Silk+Farm+Basavanagudi+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-caramel text-sm font-medium link-underline hover:text-rattan transition-colors"
                aria-label="Open in Google Maps (new tab)"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">Hours</p>
              <ul className="space-y-2 text-sm" aria-label="Opening hours">
                {HOURS.map(({ day, hours, open }) => (
                  <li key={day} className={`flex items-baseline justify-between gap-4 ${!open ? 'opacity-40' : ''}`}>
                    <span className="text-espresso/80">{day}</span>
                    <span
                      className="text-espresso/50 font-mono text-xs flex-shrink-0"
                      style={!open ? { textDecoration: 'line-through' } : {}}
                    >
                      {open ? hours : 'Closed'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Getting here */}
            <div>
              <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">Getting Here</p>
              <p className="text-espresso/70 text-sm leading-relaxed">
                The nearest metro is South End Circle on the Green Line, a 10-minute walk. If you're driving, there's street parking on S End Road. Look for the blue gate next to the silk farm signboard. We're just past it.
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">Contact</p>
              <div className="space-y-2 text-sm text-espresso/75">
                {/* TODO: Replace with real phone/email from Shishir */}
                <div>
                  <a href="tel:+919876543210" className="link-underline hover:text-caramel transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <a href="mailto:hello@the11thbean.com" className="link-underline hover:text-caramel transition-colors">
                    hello@the11thbean.com
                  </a>
                </div>
                <div>
                  <a
                    href="https://instagram.com/the11thbean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline hover:text-caramel transition-colors"
                    aria-label="@the11thbean on Instagram (new tab)"
                  >
                    @the11thbean
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Map — 60% on desktop */}
          <SectionReveal direction="right" delay={0.1} className="w-full lg:w-[60%]">
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ height: 'clamp(300px, 50vh, 550px)' }}
            >
              {/* Google Maps embed — no API key needed for basic embed */}
              <iframe
                title="The 11th Bean location on Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'sepia(0.3) saturate(1.1) hue-rotate(10deg)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Tata+Silk+Farm+Basavanagudi+Bengaluru&output=embed&z=16"
                aria-label="Map showing The 11th Bean location in Basavanagudi, Bengaluru"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── First Visit Tips ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: '#FAF7F2' }}
        aria-labelledby="tips-heading"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal>
            <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-8" id="tips-heading">
              First time here?
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {TIPS.map((tip, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="p-5 rounded-xl border border-sage/20"
                  style={{ backgroundColor: 'rgba(200,169,110,0.07)' }}
                >
                  <p
                    className="text-espresso/75 text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                  >
                    "{tip}"
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beyond the cup ── game nights + pickleball */}
      <section className="py-16 px-6 bg-cream" aria-labelledby="community-heading">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal>
            <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-8" id="community-heading">
              Beyond the cup
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <SectionReveal delay={0.05}>
              <div
                className="p-6 rounded-2xl border border-sage/20 flex gap-5 items-start"
                style={{ backgroundColor: 'rgba(200,169,110,0.07)' }}
              >
                <Image
                  src="/mascot/game_night.svg"
                  alt=""
                  width={72}
                  height={72}
                  className="flex-shrink-0 opacity-75 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <h3
                    className="text-espresso font-medium mb-2 text-sm"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    Game Nights
                  </h3>
                  <p className="text-espresso/60 text-sm leading-relaxed">
                    Friday evenings, the board games come out. Catan, Codenames, whatever you bring.
                    The Catan set is missing two roads. Fair warning.
                  </p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div
                className="p-6 rounded-2xl border border-sage/20 flex gap-5 items-start"
                style={{ backgroundColor: 'rgba(200,169,110,0.07)' }}
              >
                <Image
                  src="/mascot/pickleball.svg"
                  alt=""
                  width={72}
                  height={72}
                  className="flex-shrink-0 opacity-75 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <h3
                    className="text-espresso font-medium mb-2 text-sm"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    The Pickleball Crew
                  </h3>
                  <p className="text-espresso/60 text-sm leading-relaxed">
                    Saturday mornings before we open, regulars play at the courts nearby.
                    Ask Shishir if you want in. Bring your own paddle.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Google Review CTA ── */}
      <section className="py-12 px-6 bg-cream" aria-label="Leave a review">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-sage/25">
              <div>
                <p className="text-espresso font-medium mb-1">Loved your visit?</p>
                <p className="text-espresso/55 text-sm">Tell us about it. It helps more people find the cafe.</p>
              </div>
              {/* TODO: Replace href with real Google Maps review link from Shishir's Google Business Profile */}
              <a
                href="https://maps.google.com/?q=The+11th+Bean+Basavanagudi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-6 py-2.5 bg-caramel text-cream text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                aria-label="Leave a Google review for The 11th Bean (opens in new tab)"
              >
                Leave a Review →
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
