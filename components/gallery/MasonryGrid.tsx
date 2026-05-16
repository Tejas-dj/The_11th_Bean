'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionReveal } from '@/components/shared/SectionReveal';
import type { GalleryImage } from '@/data/gallery';

interface MasonryGridProps {
  images: GalleryImage[];
  collectionId: string;
  onImageClick: (image: GalleryImage, index: number) => void;
}

export function MasonryGrid({ images, collectionId, onImageClick }: MasonryGridProps) {
  return (
    <div
      id={`collection-${collectionId}`}
      role="tabpanel"
      aria-label={`${collectionId} photos`}
      className="columns-2 md:columns-3 gap-x-3"
    >
      {images.map((img, i) => (
        <SectionReveal key={img.id} delay={i * 0.04} className="mb-3 break-inside-avoid">
          <motion.button
            onClick={() => onImageClick(img, i)}
            whileHover="hovered"
            className="relative w-full block rounded-xl overflow-hidden group focus-visible:outline-2 focus-visible:outline-rattan focus-visible:outline-offset-2"
            aria-label={`View: ${img.alt}`}
            style={{ aspectRatio: `1 / ${img.aspectRatio}` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />

            {/* Hover overlay */}
            <motion.div
              variants={{ hovered: { opacity: 1 }, initial: { opacity: 0 } }}
              initial="initial"
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }}
            >
              <motion.p
                variants={{ hovered: { y: 0, opacity: 1 }, initial: { y: 8, opacity: 0 } }}
                transition={{ duration: 0.22 }}
                className="text-cream text-xs leading-snug text-left"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                {img.caption}
              </motion.p>
            </motion.div>
          </motion.button>
        </SectionReveal>
      ))}
    </div>
  );
}
