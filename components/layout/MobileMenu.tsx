'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/the11thbean' },
  { label: 'YouTube',   href: 'https://youtube.com/@the11thbean' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const firstRender = useRef(true);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on route change (skip the initial mount)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] flex flex-col"
          style={{ backgroundColor: 'rgba(139,109,74,0.96)' }}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Namaste mascot — large background decoration, bottom-right */}
          <div
            className="absolute bottom-20 right-4 w-40 pointer-events-none select-none"
            aria-hidden="true"
            style={{ opacity: 0.18 }}
          >
            <Image
              src="/mascot/namaste.svg"
              alt=""
              width={160}
              height={160}
              className="w-full h-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          {/* Nav items */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-cream text-4xl font-serif font-medium tracking-tight py-3 hover:text-rattan transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05 + NAV_LINKS.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <Link
                href="/visit"
                onClick={onClose}
                className="inline-block px-8 py-3 bg-rattan text-espresso font-sans font-semibold rounded-full hover:opacity-90 transition-opacity"
                aria-current={pathname === '/visit' ? 'page' : undefined}
              >
                Visit Us
              </Link>
            </motion.div>
          </nav>

          {/* Footer strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex flex-col items-center gap-4 px-8 pb-10 text-cream/70"
          >
            <div className="flex gap-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-cream transition-colors"
                  aria-label={`${s.label} (opens in new tab)`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-center">
              42, Tata Silk Farm, Basavanagudi, Bengaluru
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
