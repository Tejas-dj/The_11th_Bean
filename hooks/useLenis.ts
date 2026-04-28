'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // lerp is the sole easing controller — DO NOT set duration alongside it,
      // as duration overrides lerp and causes rapid trackpad input to queue up
      // and freeze. 0.1 = 10% of remaining distance per frame = smooth glide.
      lerp: 0.1,
      // Reduce wheel overshoot on trackpads (default 1.0 is too aggressive).
      wheelMultiplier: 0.85,
      // Touch-like trackpad gestures need a slightly higher multiplier.
      touchMultiplier: 1.8,
      // Ensures Lenis respects native scroll inertia on trackpads.
      syncTouch: false,
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
