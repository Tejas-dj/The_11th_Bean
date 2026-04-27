'use client';
import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ColorTransitionProps {
  fromColor: string;
  toColor: string;
  children: ReactNode;
  className?: string;
}

// Background color shifts as the user scrolls through this section,
// mirroring the cafe's three-band wall scheme moving from ground to ceiling.
export function ColorTransition({ fromColor, toColor, children, className }: ColorTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.fromTo(
        el,
        { backgroundColor: fromColor },
        {
          backgroundColor: toColor,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => cleanup?.();
  }, [fromColor, toColor]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ backgroundColor: reduced ? toColor : fromColor }}
    >
      {children}
    </div>
  );
}
