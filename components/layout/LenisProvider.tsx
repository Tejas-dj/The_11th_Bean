'use client';
import { useLenis } from '@/hooks/useLenis';

// Initializes Lenis smooth scrolling for the entire app.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
