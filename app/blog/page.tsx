import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog | The 11th Bean — Coffee Stories from Basavanagudi',
  description:
    'Brew guides, sourcing stories, and coffee culture from the team at The 11th Bean, Basavanagudi, Bengaluru.',
  openGraph: {
    title: 'Blog | The 11th Bean',
    description: 'Brew guides, sourcing stories, and coffee culture from The 11th Bean.',
    type: 'website',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Page header */}
        <div className="mb-16 flex items-center justify-between gap-8">
          {/* Text — left side */}
          <div>
            <p className="text-caramel text-xs tracking-[0.22em] uppercase mb-3 font-sans">
              The 11th Bean
            </p>
            <h1
              className="text-espresso text-5xl lg:text-6xl font-serif leading-tight"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              From the Brew Room
            </h1>
            <p className="mt-4 text-espresso/60 font-sans text-base max-w-lg leading-relaxed">
              Sourcing stories, craft notes, and guides for anyone who wants to understand their cup a little better.
            </p>
          </div>

          {/* Blog writer mascot — fills the empty right space */}
          <div
            className="hidden md:block flex-shrink-0 w-48 lg:w-64 select-none pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/mascot/blog_writer.svg"
              alt=""
              width={256}
              height={256}
              className="w-full h-auto opacity-70"
            />
          </div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-creamLight rounded-2xl overflow-hidden border border-caramel/10 hover:border-caramel/25 transition-colors duration-300"
            >
              {/* Category + date bar */}
              <div className="px-6 pt-6 pb-0 flex items-center justify-between gap-4">
                <span className="text-caramel text-xs tracking-[0.18em] uppercase font-sans">
                  {post.category}
                </span>
                <time
                  dateTime={post.date}
                  className="text-espresso/40 text-xs font-mono tabular-nums"
                >
                  {formatDate(post.date)}
                </time>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-3">
                <h2
                  className="text-espresso text-xl font-serif leading-snug group-hover:text-caramel transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                >
                  {post.title}
                </h2>
                <p className="text-espresso/65 font-sans text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-sans font-medium text-caramel hover:text-rattan transition-colors duration-200 underline underline-offset-4 decoration-caramel/30 hover:decoration-rattan/60"
                    aria-label={`Read: ${post.title}`}
                  >
                    Read more →
                  </Link>
                  <span className="text-espresso/35 text-xs font-mono">
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
