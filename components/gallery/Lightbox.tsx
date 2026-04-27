'use client';
import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryImage } from '@/data/gallery';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const image = images[index];

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo lightbox: ${image.alt}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-cream/50 hover:text-cream transition-colors"
        aria-label="Close lightbox"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
        </svg>
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-cream/35 text-xs">
        {index + 1} / {images.length}
      </span>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-cream/50 hover:text-cream transition-colors"
          aria-label="Previous photo"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4L6 10L12 16"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.22 }}
          className="relative mx-16 md:mx-24 max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '80vh' }}
        >
          {/* Placeholder block */}
          <div
            className="w-full rounded-xl"
            style={{
              backgroundColor: image.bgColor,
              aspectRatio: `1 / ${image.aspectRatio}`,
              maxHeight: '70vh',
            }}
            role="img"
            aria-label={image.alt}
          />

          {/* Caption */}
          <div className="mt-3 flex items-end justify-between gap-4">
            <p
              className="text-cream/75 text-sm"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              {image.caption}
            </p>
            <p className="text-cream/30 text-xs font-mono flex-shrink-0">{image.alt}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-cream/50 hover:text-cream transition-colors"
          aria-label="Next photo"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 4L14 10L8 16"/>
          </svg>
        </button>
      )}
    </motion.div>
  );
}
