import { SectionReveal } from '@/components/shared/SectionReveal';

interface NarrativeBlockProps {
  headline: string;
  paragraphs: string[];
  imageAlt: string;
  imageBg: string;
  imageLabel: string;
  flip?: boolean; // true = image left, text right
}

export function NarrativeBlock({
  headline,
  paragraphs,
  imageAlt,
  imageBg,
  imageLabel,
  flip = false,
}: NarrativeBlockProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center py-14 lg:py-20">
      <SectionReveal
        direction={flip ? 'right' : 'left'}
        className={`w-full lg:w-1/2 ${flip ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div
          className="w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageBg }}
          role="img"
          aria-label={imageAlt}
        >
          {/* TODO: Replace with real photo from Shishir */}
          <p className="text-cream/30 text-xs uppercase tracking-widest text-center px-8 leading-loose">
            {imageLabel}
          </p>
        </div>
      </SectionReveal>

      <SectionReveal
        direction={flip ? 'left' : 'right'}
        delay={0.1}
        className={`w-full lg:w-1/2 ${flip ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="space-y-5">
          <h2
            className="text-espresso text-2xl md:text-3xl font-medium leading-snug"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {headline}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-espresso/70 text-base md:text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}
