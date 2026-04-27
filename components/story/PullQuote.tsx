import { SectionReveal } from '@/components/shared/SectionReveal';

interface PullQuoteProps {
  quote: string;
  attribution?: string;
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <SectionReveal>
      <blockquote className="text-center max-w-3xl mx-auto py-16 lg:py-24 px-6">
        {/* Decorative opening quote mark */}
        <span
          className="block text-rattan/40 text-8xl leading-none mb-4 select-none"
          style={{ fontFamily: 'Georgia, serif' }}
          aria-hidden="true"
        >
          "
        </span>
        <p
          className="text-espresso text-2xl md:text-3xl lg:text-4xl leading-snug mb-8 -mt-8"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          {quote}
        </p>
        {attribution && (
          <footer className="text-espresso/40 text-xs font-sans tracking-[0.2em] uppercase">
            {attribution}
          </footer>
        )}
      </blockquote>
    </SectionReveal>
  );
}
