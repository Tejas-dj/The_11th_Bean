'use client';
import { useEffect, useState } from 'react';
import { useScrollDirection } from './useScrollDirection';

export function useNavbarHidden(): boolean {
  const scrollDir = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return scrollDir === 'down' && scrolled;
}
