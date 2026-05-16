'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ArtifactProps {
  label: string;
  caption: string;
  rotation?: number;
  offsetTop?: string;
  offsetRight?: string;
  offsetLeft?: string;
  imageSrc?: string;
  cardWidth?: string;
  imageAspect?: string;
}

// On desktop: draggable polaroid that snaps back on release.
// On mobile: static with slight rotation — dragging is too frustrating on touch.
export function Artifact({ label, caption, rotation = -3, offsetTop = '10%', offsetRight, offsetLeft, imageSrc, cardWidth = 'w-32 md:w-36', imageAspect = 'aspect-square' }: ArtifactProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => setIsDesktop(window.matchMedia('(min-width: 1024px)').matches), []);

  const positionStyle = offsetLeft
    ? { top: offsetTop, left: offsetLeft }
    : { top: offsetTop, right: offsetRight ?? '-40px' };

  return (
    <motion.div
      drag={isDesktop}
      dragSnapToOrigin
      whileDrag={{ scale: 1.06, rotate: rotation * 0.5, zIndex: 50, cursor: 'grabbing' }}
      className="absolute z-10 select-none"
      style={{ ...positionStyle, rotate: rotation, cursor: isDesktop ? 'grab' : 'default' }}
      aria-hidden="true"
    >
      {/* Polaroid-style card */}
      <div className={`bg-cream-light p-2.5 pb-7 shadow-2xl ${cardWidth}`}>
        <div
          className={`w-full ${imageAspect} relative flex items-center justify-center overflow-hidden`}
          style={!imageSrc ? { backgroundColor: '#C8A96E' } : undefined}
        >
          {imageSrc ? (
            <Image src={imageSrc} alt={label} fill className="object-cover" />
          ) : (
            <span className="text-cream/40 text-[8px] uppercase tracking-wider text-center px-2 leading-relaxed">
              {label}
            </span>
          )}
        </div>
        <p className="text-espresso/40 text-[8px] text-center mt-2 px-1 font-sans leading-tight">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}
