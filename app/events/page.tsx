'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { useNavbarHidden } from '@/hooks/useNavbarHidden';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { events } from '@/data/events';
import type { EventEntry, EventType } from '@/data/events';

type FilterId = EventType | 'all';
const TABS: { id: FilterId; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'at-the-bean', label: 'At The Bean' },
  { id: 'collab',      label: 'Collab' },
  { id: 'pop-up',      label: 'Pop-Up' },
];
const TYPE_LABELS: Record<string, string> = {
  'at-the-bean': 'At The Bean',
  collab: 'Collab',
  'pop-up': 'Pop-Up',
};
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function sortEvents(list: EventEntry[]) {
  const upcoming = list.filter((e) => e.status !== 'past').sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = list.filter((e) => e.status === 'past').sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return [...upcoming, ...past];
}

export default function EventsPage() {
  const [active, setActive] = useState<FilterId>('all');
  const [selected, setSelected] = useState<EventEntry | null>(null);
  const navHidden = useNavbarHidden();
  const filtered = sortEvents(active === 'all' ? events : events.filter((e) => e.type === active));

  return (
    <>
      {/* Hero */}
      <section aria-label="Events header" className="relative pt-24 pb-16 px-6 overflow-hidden" style={{ backgroundColor: '#2A2320' }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at 55% 35%, #C8A96E 0%, transparent 65%)' }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionReveal>
            <p className="text-rattan text-[10px] tracking-[0.2em] uppercase mb-4">The 11th Bean</p>
            <h1 className="text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-6" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
              Something's always<br />brewing
            </h1>
            <p className="text-cream/50 text-base md:text-lg max-w-xl leading-relaxed pr-28 md:pr-0 relative z-20">
              Cupping sessions, jazz nights, estate collabs, market mornings — the cafe is never just a cafe. Here's what we've got on.
            </p>
          </SectionReveal>
        </div>
        <div className="absolute bottom-0 right-6 md:right-14 z-10 w-48 md:w-64 pointer-events-none select-none" aria-hidden="true">
          <Image src="/mascot/brewing.svg" alt="" width={176} height={176} className="w-full h-auto opacity-65" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
      </section>

      {/* Sticky Tabs */}
      <LayoutGroup id="events-tabs">
      <div className={`sticky ${navHidden ? 'top-0' : 'top-16 lg:top-20'} z-40 bg-cream border-b border-sage/20 transition-[top] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Event categories">
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button key={tab.id} role="tab" aria-selected={isActive} onClick={() => setActive(tab.id)}
                  className="relative flex-shrink-0 px-4 md:px-5 py-4 text-xs md:text-sm transition-colors whitespace-nowrap"
                  style={{ color: isActive ? 'var(--c-espresso)' : 'rgba(42,35,32,0.45)', fontFamily: isActive ? 'var(--font-lora), Georgia, serif' : undefined, fontStyle: isActive ? 'italic' : undefined }}>
                  {tab.label}
                  {/* Animated sliding pill underline */}
                  {isActive && (
                    <motion.span
                      layoutId="events-tab-pill"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{ backgroundColor: 'var(--c-rattan)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </LayoutGroup>

      {/* Grid */}
      <section className="px-4 md:px-6 py-12 bg-cream" aria-label="Event listings">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {filtered.length === 0 ? (
                <div className="col-span-full py-20 flex flex-col items-center gap-5 text-center">
                  <Image src="/mascot/empty_cup.svg" alt="" width={130} height={130} className="opacity-50" aria-hidden="true" />
                  <p className="text-espresso/40 text-base">Nothing here yet. Check back soon.</p>
                </div>
              ) : filtered.map((event, i) => (
                <SectionReveal key={event.id} delay={i * 0.06}>
                  <EventCard event={event} onOpen={() => setSelected(event)} />
                </SectionReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Co-Host CTA */}
      <section aria-labelledby="cohost-heading" className="px-4 md:px-6 pb-20 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal>
            <div className="rounded-2xl border border-sage/30 px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12" style={{ backgroundColor: '#FAF7F2' }}>
              <div className="flex-shrink-0 w-24 md:w-32 opacity-80" aria-hidden="true">
                <Image src="/mascot/namaste.svg" alt="" width={128} height={128} className="w-full h-auto" />
              </div>
              <div className="flex-1">
                <p className="text-rattan text-[10px] tracking-[0.2em] uppercase mb-3">Partner with us</p>
                <h2 id="cohost-heading" className="text-espresso text-2xl md:text-3xl mb-3 leading-tight" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
                  Want to co-host something at The Bean?
                </h2>
                <p className="text-espresso/55 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                  We're open to collabs with brands, studios, artists, estates, collectives — anyone with something interesting to share over good coffee.
                </p>
                {/* TODO: Replace with real contact link from Shishir */}
                <a href="#contact-placeholder" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80" style={{ backgroundColor: 'var(--c-espresso)', color: 'var(--c-cream)' }}>
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <p className="text-espresso/30 text-xs mt-3 italic">Link coming soon.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   EventCard
   - Top half: poster image (object-cover)
   - Bottom half: cream info area
   - Mascot: absolutely positioned, bottom-right of the info area (the "empty" zone)
───────────────────────────────────────── */
function EventCard({ event, onOpen }: { event: EventEntry; onOpen: () => void }) {
  const isPast = event.status === 'past';
  const isSoldOut = event.status === 'sold-out';
  const fmtDate = new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <article
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      aria-label={`View details for ${event.title}`}
      className={`group rounded-2xl overflow-hidden border cursor-pointer focus-visible:outline-2 focus-visible:outline-rattan focus-visible:outline-offset-2${!isPast ? ' event-card-upcoming' : ''}`}
      style={{
        borderColor: isPast ? 'rgba(184,179,148,0.15)' : 'transparent',
        backgroundColor: '#F2E8D9',
        opacity: isPast ? 0.78 : 1,
        filter: isPast ? 'saturate(0.55)' : 'none',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s ease',
      }}
      onMouseEnter={(e) => { if (!isPast) { e.currentTarget.style.animation = 'none'; } e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 0 0 1.5px #C8A96E, 0 16px 40px rgba(42,35,32,0.15)'; }}
      onMouseLeave={(e) => { if (!isPast) { e.currentTarget.style.animation = ''; } e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {/* ── Poster image (top half) ── */}
      <div className="relative w-full h-48 overflow-hidden" style={{ backgroundColor: event.accentColor }}>
        {/* Grain texture on fallback bg */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }} aria-hidden="true" />

        {event.posterImage && (
          <Image src={event.posterImage} alt={`${event.title} poster`} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        )}

        {/* Dark gradient over poster so badges are readable */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 60%)' }} aria-hidden="true" />

        {/* Hover "View Details" hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(0,0,0,0.22)' }} aria-hidden="true">
          <span className="text-cream/95 text-xs tracking-[0.15em] uppercase font-medium bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-sm">View Details</span>
        </div>

        {/* Status badges — top left */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
          <span className="text-[10px] uppercase tracking-[0.15em] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(242,232,217,0.18)', color: 'rgba(242,232,217,0.95)' }}>
            {TYPE_LABELS[event.type]}
          </span>
          {isPast && (
            <span className="text-[10px] uppercase tracking-[0.15em] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.35)', color: 'rgba(242,232,217,0.65)' }}>Ended</span>
          )}
          {isSoldOut && (
            <span className="text-[10px] uppercase tracking-[0.15em] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(200,169,110,0.5)', color: '#F2E8D9' }}>Sold Out</span>
          )}
        </div>

        {/* Upcoming badge — top right, pulsing dot */}
        {!isPast && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(200,169,110,0.22)', border: '1px solid rgba(200,169,110,0.5)' }}>
            <span className="upcoming-dot w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#C8A96E' }} />
            <span className="text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: '#C8A96E' }}>
              {isSoldOut ? 'Sold Out' : 'Upcoming'}
            </span>
          </div>
        )}
      </div>

      {/* ── Info area (bottom half) — mascot lives here ── */}
      <div className="relative p-5 min-h-[9rem]">
        {/* Mascot — bottom-right of the info area, large and prominent */}
        {event.mascot && (
          <div
            className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none select-none"
            aria-hidden="true"
            style={{ opacity: 0.38 }}
          >
            <Image
              src={event.mascot}
              alt=""
              fill
              className="object-contain object-bottom-right"
              sizes="144px"
            />
          </div>
        )}

        {/* Content — sits above mascot */}
        <div className="relative z-10 pr-16">
          <div className="flex items-center gap-2 mb-2.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="rgba(42,35,32,0.35)" strokeWidth="1" />
              <path d="M4 1v2M8 1v2M1 5h10" stroke="rgba(42,35,32,0.35)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="text-espresso/40 font-mono text-[10px]">{fmtDate}</p>
            <span className="text-espresso/20 text-[10px]">·</span>
            <p className="text-espresso/40 font-mono text-[10px]">{event.time}</p>
          </div>
          <h3 className="text-espresso text-base md:text-lg leading-snug mb-1" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
            {event.title}
          </h3>
          <p className="text-espresso/40 text-xs mb-2.5 leading-relaxed">{event.venue}</p>
          <p className="text-espresso/60 text-xs leading-relaxed line-clamp-2">{event.description}</p>
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {event.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-espresso/40 border border-sage/25 rounded-full px-2 py-0.5">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   EventModal — full-screen overlay
   Left panel: poster image fills the area
               mascot overlaid, prominent
   Right panel: scrollable details
───────────────────────────────────────── */
function EventModal({ event, onClose }: { event: EventEntry; onClose: () => void }) {
  const isPast = event.status === 'past';
  const isSoldOut = event.status === 'sold-out';

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [handleKey]);

  const day     = new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric' });
  const month   = new Date(event.date).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  const year    = new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric' });
  const weekday = new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long' });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(42,35,32,0.9)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={event.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 28 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden overflow-x-hidden flex flex-col md:flex-row"
        style={{ backgroundColor: '#F2E8D9' }}
      >
        {/* ── LEFT: Poster panel ── */}
        <div className="relative flex-shrink-0 w-full md:w-[42%] h-56 md:h-auto overflow-hidden" style={{ backgroundColor: event.accentColor }}>
          {/* Grain fallback texture */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }} aria-hidden="true" />

          {/* Poster image */}
          {event.posterImage ? (
            <>
              <Image src={event.posterImage} alt={`${event.title} poster`} fill className="object-cover" sizes="42vw" />
              {/* Gradient so mascot + ticket strip read over the poster */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} aria-hidden="true" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="border border-cream/15 rounded-lg px-4 py-2">
                <p className="text-cream/25 text-[10px] tracking-[0.2em] uppercase">Event Poster</p>
              </div>
            </div>
          )}

          {/* No mascot overlay on the poster — mascot lives on the right panel */}

          {/* Ticket-stub strip — bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-3 z-10"
            style={{ borderTop: '1px dashed rgba(242,232,217,0.25)', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
          >
            <div className="text-center min-w-[2.5rem]">
              <p className="text-cream/50 text-[9px] tracking-[0.2em] uppercase leading-none">{month}</p>
              <p className="text-cream text-3xl leading-none" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>{day}</p>
              <p className="text-cream/40 text-[9px] leading-none mt-0.5">{year}</p>
            </div>
            <div className="w-px h-8 bg-cream/20 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-cream/85 text-xs font-medium truncate">{weekday}</p>
              <p className="text-cream/50 text-[10px] font-mono truncate">{event.time}</p>
            </div>
            <div className="ml-auto text-right flex-shrink-0">
              <p className="text-cream/30 text-[9px] tracking-[0.18em] uppercase">The 11th Bean</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Details panel ── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden overflow-y-auto md:overflow-hidden">
          {/* Close */}
          <div className="flex justify-end p-4 flex-shrink-0">
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-espresso/40 hover:text-espresso hover:bg-sage/20 transition-colors" aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(184,179,148,0.4) transparent' }}>
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1 rounded-full border border-sage/30 text-espresso/60">{TYPE_LABELS[event.type]}</span>
              {isPast && <span className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1 rounded-full bg-black/5 text-espresso/40">Ended</span>}
              {isSoldOut && <span className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1 rounded-full text-caramel border border-rattan/40">Sold Out</span>}
            </div>

            {/* Title + mascot side by side */}
            <div className="flex items-start gap-4 mb-4">
              <h2 className="flex-1 text-espresso text-2xl md:text-3xl leading-tight" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
                {event.title}
              </h2>
              {/* Mascot next to title — coloured, large */}
              {event.mascot && (
                <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32" aria-hidden="true">
                  <Image src={event.mascot} alt="" width={128} height={128} className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            {/* Venue + time */}
            <div className="flex flex-col gap-1.5 mb-5">
              <div className="flex items-center gap-2 text-espresso/55 text-xs">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1a4 4 0 0 1 4 4c0 2.5-4 7-4 7S2 7.5 2 5a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.2" /><circle cx="6" cy="5" r="1.2" stroke="currentColor" strokeWidth="1.2" /></svg>
                {event.venue}
              </div>
              <div className="flex items-center gap-2 text-espresso/55 text-xs">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 3.5V6l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                {event.time}
              </div>
            </div>

            <div className="h-px mb-5" style={{ backgroundColor: 'rgba(184,179,148,0.3)' }} />

            {/* Long description */}
            <div className="space-y-3 mb-6">
              {event.longDescription.split('\n').map((para, i) =>
                para.trim() ? <p key={i} className="text-espresso/70 text-sm leading-relaxed">{para}</p> : null
              )}
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {event.tags.map((tag) => <span key={tag} className="text-[10px] text-espresso/45 border border-sage/25 rounded-full px-2.5 py-1">#{tag}</span>)}
              </div>
            )}

            {/* CTA */}
            {!isPast && event.rsvpLink && (
              <div>
                <a href={event.rsvpLink} className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: 'var(--c-espresso)', color: 'var(--c-cream)' }}
                  aria-label={`${isSoldOut ? 'Join waitlist' : 'RSVP'} for ${event.title}`}>
                  {isSoldOut ? 'Join Waitlist' : 'RSVP / Details'}
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <p className="text-espresso/30 text-[10px] mt-2 italic">RSVP link coming soon.</p>
              </div>
            )}
            {isPast && (
              <p className="text-espresso/35 text-sm italic" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                This event has ended. Stay tuned for what's next.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
