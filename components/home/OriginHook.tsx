'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionReveal } from '@/components/shared/SectionReveal';

export function OriginHook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Each portrait moves at a slightly different rate — creates subtle depth between the two
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageY2 = useTransform(scrollYProgress, [0, 1], ['-5%', '11%']);
  return (
    // Slight background warmth shift signals the story section
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 px-6 overflow-hidden"
      style={{ backgroundColor: '#EAE0CE' }}
      aria-labelledby="story-hook-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Portraits — 55% on desktop, two side-by-side with scroll parallax */}
          <SectionReveal direction="left" className="w-full lg:w-[55%]">
            <div className="flex gap-3" aria-label="Portraits of Shishir and Priya, co-founders of The 11th Bean">
              {/* Shishir */}
              <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden relative">
                <motion.div className="absolute inset-[-10%]" style={{ y: imageY }}>
                  <Image
                    src="/images/Shishir_HeadShot.jpeg"
                    alt="Shishir, co-founder of The 11th Bean"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 27vw"
                  />
                </motion.div>
              </div>
              {/* Priya */}
              <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden relative">
                <motion.div className="absolute inset-[-10%]" style={{ y: imageY2 }}>
                  <Image
                    src="/images/Priya_HeadShot.jpeg"
                    alt="Priya, co-founder of The 11th Bean"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 27vw"
                  />
                </motion.div>
              </div>
            </div>
          </SectionReveal>

          {/* Text — 45% on desktop */}
          <SectionReveal direction="right" delay={0.1} className="w-full lg:w-[45%]">
            <div className="space-y-6 relative">
              {/* Heading + mascot row — on mobile mascot sits inline to the right of the title */}
              <div className="flex items-start gap-3">
                <h2
                  id="story-hook-heading"
                  className="flex-1 text-espresso text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight relative z-20"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  Before this café, life looked very different.
                </h2>
                {/* Stressed mascot — hover jiggles to show personality */}
                <motion.div
                  className="flex-shrink-0 w-20 md:w-28 lg:w-32 opacity-55 select-none cursor-default self-start"
                  aria-hidden="true"
                  whileHover={{
                    rotate: [0, -8, 8, -6, 6, 0],
                    scale: [1, 1.05, 1.05, 1.05, 1.05, 1],
                    transition: { duration: 0.5, ease: 'easeInOut' },
                  }}
                >
                  <Image
                    src="/mascot/stressed.svg"
                    alt=""
                    width={128}
                    height={128}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                Shishir spent over 15 years in IT, working across India, France and Germany. Priya was on a parallel path, before stepping away to pursue a Master's in Psychology.
              </p>
              <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                Coming back to India brought a different perspective. The work felt distant from what we wanted to build. That frustration became the clarity we needed.
              </p>

              <Link
                href="/our-story"
                className="inline-block text-caramel font-medium text-base link-underline hover:text-rattan transition-colors duration-200 mt-2"
              >
                Read the full story →
              </Link>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
