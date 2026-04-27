'use client';
import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SectionRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const fromVars: gsap.TweenVars = { opacity: 0 };
      if (direction === 'up')    fromVars.y = 30;
      if (direction === 'left')  fromVars.x = -30;
      if (direction === 'right') fromVars.x = 30;

      gsap.set(el, fromVars);

      const tween = gsap.to(el, {
        opacity: 1, x: 0, y: 0,
        duration, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: 'all' });
      };
    })();

    return () => cleanup?.();
  }, [direction, delay, duration, reduced]);

  return (
    <div ref={ref} className={className} style={reduced ? {} : { opacity: 0 }}>
      {children}
    </div>
  );
}
