'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';

// Each block in the guided interior tour — see brief Page 3, Section 2.
const TOUR_BLOCKS = [
  {
    type: 'full' as const,
    bgColor: '#8B6D4A',
    label: '[Counter / bar area — full-width photo]',
    alt: 'The 11th Bean counter and bar area',
    src: '/images/cafe/tour/tour_counter_bar.png',
  },
  {
    type: 'callout' as const,
    text: 'The bar is where everything begins.',
    sub: "With respect, precision and patience. Watch the process and you will understand what the name means. Every cup brewed with the same intent.",
  },
  {
    type: 'split' as const,
    left:  { bgColor: '#B8B394', label: '[Seating area — tables, chairs, laptops]', alt: 'Seating area with black Tolix chairs and wooden tables', src: '/images/cafe/tour/tour_seating_area.png' },
    right: { bgColor: '#C8A96E', label: '[Detail shot — rattan lamp / plant / table setting]', alt: 'Rattan pendant lamp detail', src: '/images/cafe/tour/tour_detail_rattan.webp' },
  },
  {
    type: 'callout' as const,
    text: 'A space designed for calm, clarity and comfort.',
    sub: 'Every piece was chosen to say: slow down. Stay as long as you want. No pressure to leave. No pressure to order more.',
  },
  {
    type: 'full' as const,
    bgColor: '#2A2320',
    label: '[Brewing station — pour-over setup / La Carimali close-up]',
    alt: 'Coffee brewing station',
    src: '/images/cafe/tour/tour_brewing_station.png',
  },
  {
    type: 'split' as const,
    left:  { bgColor: '#A0674B', label: '[Window looking out — street view from inside]', alt: 'View from inside the cafe looking out to S End Road', src: '/images/cafe/tour/tour_window_out.png' },
    right: { bgColor: '#C8A96E', label: '[Window looking in — warm glow from street]',   alt: 'View from outside looking into the cafe', src: '/images/cafe/tour/tour_window_in.png' },
  },
  {
    type: 'full' as const,
    bgColor: '#8B6D4A',
    label: '[Evening shot — Edison bulbs, warm light, occupied tables]',
    alt: 'The 11th Bean in the evening with warm Edison bulb lighting',
    src: '/images/cafe/tour/tour_evening.png',
  },
] as const;

// Scale-down reveal: image starts at 1.03, settles to 1.0 — feels like "focusing in"
const scaleReveal = { initial: { opacity: 0, scale: 1.03 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };

export function InteriorTour() {
  return (
    <section aria-labelledby="tour-heading" className="py-10 space-y-3 lg:space-y-4">
      <SectionReveal className="px-6 max-w-[1400px] mx-auto mb-8">
        <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-2" id="tour-heading">A walk through</p>
        <h2 className="text-espresso text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}>
          The Space
        </h2>
      </SectionReveal>

      {TOUR_BLOCKS.map((block, i) => {
        if (block.type === 'full') {
          return (
            <motion.div key={i} {...scaleReveal} className="w-full overflow-hidden relative" style={{ height: 'clamp(300px, 55vw, 680px)' }}>
              <Image src={block.src} alt={block.alt} fill className="object-cover" />
            </motion.div>
          );
        }
        if (block.type === 'split') {
          return (
            <div key={i} className="flex flex-col md:flex-row gap-3 lg:gap-4">
              {[block.left, block.right].map((img, j) => (
                <motion.div key={j} {...scaleReveal} className="flex-1 overflow-hidden rounded-xl relative" style={{ height: 'clamp(200px, 35vw, 480px)' }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          );
        }
        // callout
        return (
          <SectionReveal key={i} className="max-w-[1400px] mx-auto px-6 py-10 lg:py-14">
            <blockquote className="max-w-xl">
              <p className="text-espresso text-xl md:text-2xl font-medium mb-3" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                "{block.text}"
              </p>
              <p className="text-espresso/55 text-base leading-relaxed">{block.sub}</p>
            </blockquote>
          </SectionReveal>
        );
      })}
    </section>
  );
}
