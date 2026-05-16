'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, type NavItem } from '@/lib/constants';

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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on route change (skip the initial mount); also reset accordion
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onClose();
    setOpenAccordion(null);
  }, [pathname, onClose]);

  // Reset accordion when the menu is closed
  useEffect(() => {
    if (!isOpen) setOpenAccordion(null);
  }, [isOpen]);

  const toggleAccordion = (label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label));
  };

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
          <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
            {NAV_LINKS.map((item, i) => {
              if (item.type === 'link') {
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.05 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-center text-cream text-4xl font-serif font-medium tracking-tight py-3 hover:text-rattan transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              }

              // Dropdown → accordion
              const isOpen = openAccordion === item.label;
              const isChildActive = item.children.some((c) => pathname === c.href);

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[280px]"
                >
                  <button
                    onClick={() => toggleAccordion(item.label)}
                    className="flex items-center justify-center gap-3 text-cream text-4xl font-serif font-medium tracking-tight py-3 hover:text-rattan transition-colors duration-200 w-full text-center"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                    aria-expanded={isOpen}
                  >
                    <span className={isChildActive ? 'text-rattan' : ''}>{item.label}</span>
                    {/* Chevron */}
                    <motion.svg
                      width="16"
                      height="10"
                      viewBox="0 0 10 6"
                      fill="none"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="text-cream/70 mt-1 flex-shrink-0"
                    >
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>

                  {/* Accordion children */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="pb-2 flex flex-col items-center gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="block text-center text-xl font-sans text-cream/80 hover:text-rattan py-2 transition-colors duration-200"
                              aria-current={pathname === child.href ? 'page' : undefined}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

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
              42/1, Near Shell Petrol Pump, South End Road, Basavanagudi, Bengaluru - 560004
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
