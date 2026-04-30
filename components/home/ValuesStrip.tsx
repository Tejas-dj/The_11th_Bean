import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

const VALUES = [
  { word: 'Craft.',       subtext: 'Every cup reflects discipline.' },
  { word: 'Clarity.',     subtext: 'Nothing rushed. Nothing accidental.' },
  { word: 'Consistency.', subtext: 'We care enough to keep improving.' },
] as const;

export function ValuesStrip() {
  return (
    <section
      aria-label="Our values"
      className="px-6 py-16 lg:py-20 bg-cream relative overflow-hidden"
    >
      {/* Morning mascot — large background decoration, left side */}
      <div
        className="absolute left-0 bottom-0 w-36 md:w-52 opacity-[0.12] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/mascot/morning.svg"
          alt=""
          width={208}
          height={208}
          className="w-full h-auto animate-mascot-float"
        />
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-sage/25">
          {VALUES.map((v, i) => (
            <SectionReveal key={v.word} delay={i * 0.12}>
              <div className="flex flex-col items-center text-center px-6 py-6 md:py-2 gap-3">
                <span
                  className="text-espresso text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  {v.word}
                </span>
                <span className="text-espresso/40 text-xs tracking-[0.15em] uppercase">
                  {v.subtext}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
