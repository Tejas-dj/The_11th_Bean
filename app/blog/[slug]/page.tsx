import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blog';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | The 11th Bean`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      siteName: 'The 11th Bean',
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-sans text-caramel hover:text-rattan transition-colors duration-200 mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All posts
        </Link>

        {/* Post header */}
        <div className="mb-10">
          <p className="text-caramel text-xs tracking-[0.2em] uppercase font-sans mb-4">
            {post.category}
          </p>
          <h1
            className="text-espresso text-3xl sm:text-4xl font-serif leading-tight mb-5"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-espresso/45 font-mono text-xs tabular-nums">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <hr className="border-caramel/20 mb-10" />

        {/* Body */}
        <article className="flex flex-col gap-6">
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-espresso/80 font-sans text-base leading-[1.8] tracking-[0.01em]"
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-caramel/20">
          <p className="text-espresso/50 font-sans text-sm mb-6">
            Written by the team at The 11th Bean, Basavanagudi, Bengaluru.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-caramel/40 text-caramel text-sm font-sans font-medium rounded-full hover:bg-caramel hover:text-cream transition-colors duration-200"
          >
            ← More from the brew room
          </Link>
        </div>
      </div>
    </div>
  );
}
