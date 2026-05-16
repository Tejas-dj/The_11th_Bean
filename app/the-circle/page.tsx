import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { CATEGORY_COLORS } from '@/data/circle';
import type { CircleMember } from '@/data/circle';
import { getCircleMembers } from '@/lib/parseCircle';

// Re-read the-circle.md on every request so edits are live without restarting.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'The First Circle | The 11th Bean, Basavanagudi',
  description:
    'The people who drink here. The businesses we back. A curated circle of regulars whose work Shishir and Priya personally endorse.',
};

export default function TheCirclePage() {
  const members = getCircleMembers();

  return (
    <div style={{ backgroundColor: '#1a1210', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section
        aria-label="The Circle introduction"
        className="relative overflow-hidden"
        style={{ backgroundColor: '#1a1210' }}
      >
        {/* Multi-layer background atmosphere */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Warm rattan glow — bottom left */}
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%',
            width: '55%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(200,169,110,0.13) 0%, transparent 70%)',
          }} />
          {/* Brick accent — top right */}
          <div style={{
            position: 'absolute', top: '-5%', right: '5%',
            width: '40%', height: '50%',
            background: 'radial-gradient(ellipse, rgba(160,103,75,0.09) 0%, transparent 65%)',
          }} />
          {/* Fine grain texture */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-36 pb-24 lg:pb-32">
          <SectionReveal>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div style={{
                width: 32, height: 1,
                background: 'linear-gradient(90deg, rgba(200,169,110,0.8), transparent)',
              }} />
              <p style={{
                color: '#C8A96E',
                fontSize: 10, letterSpacing: '0.28em',
                textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
              }}>
                The 11th Bean
              </p>
            </div>

            {/* Main heading */}
            <h1
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                lineHeight: 0.9,
                color: '#F2E8D9',
                marginBottom: '1.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              The<br />
              First<br />
              <span style={{ color: '#C8A96E' }}>Circle</span>
            </h1>

            {/* Rule */}
            <div style={{
              width: 56, height: 1,
              backgroundColor: 'rgba(200,169,110,0.35)',
              marginBottom: '1.75rem',
            }} />

            {/* Description */}
            <div className="max-w-md">
              <p style={{ color: 'rgba(242,232,217,0.6)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                These aren&apos;t ads. They&apos;re people we know, whose work
                we&apos;ve seen up close, and whose craft we can personally vouch for.
              </p>
              <p style={{ color: 'rgba(242,232,217,0.3)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                If you&apos;re a regular and you make something worth knowing about — come talk to us.
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* Decorative bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #1a1210)',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── Thin divider line ── */}
      <div style={{
        maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem',
      }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.2) 30%, rgba(200,169,110,0.2) 70%, transparent)' }} />
      </div>

      {/* ── Members grid ── */}
      <section
        aria-labelledby="circle-members-heading"
        style={{ backgroundColor: '#1a1210', padding: '5rem 1.5rem 6rem' }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 id="circle-members-heading" className="sr-only">The Circle Members</h2>

          {members.length === 0 ? (
            <SectionReveal>
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <p style={{
                  fontFamily: 'var(--font-lora), Georgia, serif',
                  fontStyle: 'italic',
                  color: 'rgba(242,232,217,0.3)',
                  fontSize: '1.25rem',
                }}>
                  Coming soon. The circle is forming.
                </p>
              </div>
            </SectionReveal>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {members.map((member, i) => (
                <SectionReveal key={member.id} delay={i * 0.08}>
                  <CircleCard member={member} />
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-label="Join the circle"
        style={{ backgroundColor: '#1a1210', padding: '5rem 1.5rem 7rem' }}
      >
        {/* Top rule */}
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.2) 30%, rgba(200,169,110,0.2) 70%, transparent)', marginBottom: '5rem' }} />
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            {/* Glow behind CTA */}
            <div style={{
              position: 'absolute', inset: '-60px',
              background: 'radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p style={{
              color: 'rgba(200,169,110,0.7)',
              fontSize: 10, letterSpacing: '0.25em',
              textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              Are you a regular?
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F2E8D9',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Make something worth<br />talking about?
            </h2>
            <p style={{ color: 'rgba(242,232,217,0.45)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              The circle grows one conversation at a time.<br />
              Come in, order something good, and tell us what you do.
            </p>
            <Link
              href="/visit"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2.5rem',
                backgroundColor: '#C8A96E',
                color: '#1a1210',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: 999,
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-85"
            >
              Visit Us
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ─── Member card ─── */
function CircleCard({ member }: { member: CircleMember }) {
  const categoryColor = CATEGORY_COLORS[member.category] ?? CATEGORY_COLORS.Other;

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#211915',
        border: '1px solid rgba(200,169,110,0.1)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="group hover:-translate-y-1 hover:shadow-2xl"
      aria-label={`${member.name} — ${member.category}`}
    >
      {/* Photo / placeholder */}
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', backgroundColor: member.bgColor }}>

        {/* Gradient overlay — always on top of photo */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(26,18,16,0) 40%, rgba(26,18,16,0.85) 100%)',
        }} />

        {/* Warm tint layer */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(200,169,110,0.06) 0%, transparent 60%)',
        }} />

        {member.photo ? (
          <Image
            src={`/images/the-circle/${member.photo}`}
            alt={member.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Textured placeholder */
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16,
          }}>
            {/* Icon stand-in */}
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '1px solid rgba(200,169,110,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="rgba(200,169,110,0.4)" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(200,169,110,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={{ color: 'rgba(200,169,110,0.2)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Photo coming soon
            </p>
          </div>
        )}

        {/* Category pill — top left */}
        <span style={{
          position: 'absolute', top: 14, left: 14, zIndex: 10,
          backgroundColor: categoryColor,
          color: '#1a1210',
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 999,
        }}>
          {member.category}
        </span>

        {/* Since badge — top right */}
        {member.regularSince && (
          <span style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            backgroundColor: 'rgba(26,18,16,0.72)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(242,232,217,0.55)',
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 999,
            border: '1px solid rgba(200,169,110,0.12)',
          }}>
            Since {member.regularSince}
          </span>
        )}

        {/* Name overlaid on bottom of photo */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, padding: '1.25rem 1.25rem 0.5rem' }}>
          <p style={{
            color: '#F2E8D9',
            fontSize: '1.25rem', fontWeight: 600,
            letterSpacing: '-0.01em', lineHeight: 1.2,
            marginBottom: 2,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}>
            {member.name}
          </p>
          <p style={{ color: 'rgba(242,232,217,0.5)', fontSize: '0.8rem', lineHeight: 1.4 }}>
            {member.tagline}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>

        {/* Rattan rule */}
        <div style={{ height: 1, backgroundColor: 'rgba(200,169,110,0.12)' }} />

        {/* Shishir quote */}
        {member.shishirSays && (
          <blockquote style={{
            borderLeft: '2px solid rgba(200,169,110,0.35)',
            paddingLeft: '0.875rem',
            margin: 0,
          }}>
            <p style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(242,232,217,0.6)',
              fontSize: '0.875rem',
              lineHeight: 1.65,
            }}>
              &ldquo;{member.shishirSays}&rdquo;
            </p>
            <footer style={{
              marginTop: '0.5rem',
              color: 'rgba(200,169,110,0.45)',
              fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              — Shishir &amp; Priya
            </footer>
          </blockquote>
        )}

        {/* External link */}
        {member.handle && (
          <div style={{ marginTop: 'auto' }}>
            <a
              href={member.handleUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: '#C8A96E',
                fontSize: '0.8125rem',
                fontWeight: 500,
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-100"
              aria-label={`Visit ${member.name}'s profile (opens in new tab)`}
            >
              <span>{member.handle}</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
