'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    let raf: number;
    function raf_loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(raf_loop);
    }
    raf = requestAnimationFrame(raf_loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
