'use client';
import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | 'idle';

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('idle');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY.current;

      if (Math.abs(diff) < threshold) return;

      setDirection(diff > 0 ? 'down' : 'up');
      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return direction;
}
