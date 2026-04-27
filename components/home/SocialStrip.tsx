import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

// TODO: Replace with real curated photos from Shishir's Instagram / cafe photography.
// Option A: Instagram Basic Display API (deprecated 2024 — requires app review).
// Option B (recommended): Curated static selection, updated every 2-3 months.
const PLACEHOLDER_POSTS = [
  { id: '1', color: '#B8B394', caption: 'Morning light hitting the counter just right.' },
  { id: '2', color: '#C8A96E', caption: "The La Carimali doesn't need a filter." },
  { id: '3', color: '#8B6D4A', caption: 'Books, brews, and the right kind of quiet.' },
  { id: '4', color: '#A0674B', caption: 'Single origin from Chikmagalur. Shishir drove up for these.' },
  { id: '5', color: '#B8B394', caption: "Your corner table is waiting. (It's the one by the window.)" },
  { id: '6', color: '#C8A96E', caption: 'Catan mid-game. Nobody finished. Everybody stayed.' },
];

export function SocialStrip() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-cream" aria-labelledby="social-heading">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/mascot/morning.svg"
              alt=""
              width={56}
              height={56}
              className="opacity-60 flex-shrink-0"
              aria-hidden="true"
            />
            <h2
              id="social-heading"
              className="text-espresso text-3xl md:text-4xl tracking-tight"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              From the feed
            </h2>
          </div>
          <a
            href="https://instagram.com/the11thbean"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caramel text-sm font-medium link-underline hover:text-rattan transition-colors"
            aria-label="Follow @the11thbean on Instagram (opens in new tab)"
          >
            Follow @the11thbean →
          </a>
        </SectionReveal>

        {/* Desktop: 3×2 grid. Mobile: 2×3 grid with thin gaps */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5 md:gap-0">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <SectionReveal key={post.id} delay={i * 0.06}>
              <PostTile post={post} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Post = (typeof PLACEHOLDER_POSTS)[number];

function PostTile({ post }: { post: Post }) {
  return (
    <a
      href="https://instagram.com/the11thbean"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden"
      aria-label={`Instagram post: ${post.caption} (opens in new tab)`}
    >
      {/* Placeholder image */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={{ backgroundColor: post.color }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <span className="text-cream text-xs text-center px-4 uppercase tracking-widest">
            [Photo]
          </span>
        </div>
      </div>

      {/* Hover overlay with caption */}
      <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/55 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
        <p className="text-cream text-xs leading-relaxed line-clamp-2">{post.caption}</p>
      </div>

      {/* Instagram icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
        </svg>
      </div>
    </a>
  );
}
