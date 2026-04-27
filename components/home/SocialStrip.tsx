import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';
import { instaPosts } from '@/data/instagram';
import type { InstaPost } from '@/data/instagram';

// Fallback colour palette shown while placeholder images haven't been added yet
const FALLBACK_COLORS = ['#B8B394', '#C8A96E', '#8B6D4A', '#A0674B', '#B8B394', '#C8A96E'];

export function SocialStrip() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-cream" aria-labelledby="social-heading">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/mascot/morning.svg"
              alt=""
              width={72}
              height={72}
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

        {/* Desktop: 3×2 grid. Mobile: 2×3 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5 md:gap-0">
          {instaPosts.slice(0, 6).map((post, i) => (
            <SectionReveal key={`${post.date}-${i}`} delay={i * 0.06}>
              <PostTile post={post} index={i} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostTile({ post, index }: { post: InstaPost; index: number }) {
  const isPlaceholder = post.image.includes('placeholder_');

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden"
      aria-label={`Instagram post: ${post.caption} (opens in new tab)`}
    >
      {isPlaceholder ? (
        /* Colour swatch shown until real images are dropped in */
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ backgroundColor: FALLBACK_COLORS[index % FALLBACK_COLORS.length] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
            </svg>
            <span className="text-cream text-[10px] text-center uppercase tracking-widest">Photo coming</span>
          </div>
        </div>
      ) : (
        /* Real image */
        <Image
          src={post.image}
          alt={post.caption}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width:768px) 50vw, 33vw"
        />
      )}

      {/* Hover overlay — caption + Instagram icon */}
      <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/55 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
        <p className="text-cream text-xs leading-relaxed line-clamp-2">{post.caption}</p>
      </div>

      {/* Instagram icon — top right on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
        </svg>
      </div>
    </a>
  );
}
