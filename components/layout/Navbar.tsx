'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from '@/lib/constants';

export function Navbar() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHidden = scrollDir === 'down' && scrolled;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[999]"
        style={{
          backgroundColor: scrolled ? 'rgba(139,109,74,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-rattan"
            aria-label="The 11th Bean, home"
          >
            <LogoLockup scrolled={scrolled} />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Site navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-cream/90 hover:text-cream text-sm font-medium tracking-wide transition-colors duration-200 pb-1"
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rattan"
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/visit"
              className="ml-4 px-5 py-2 bg-rattan text-espresso text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
              aria-current={pathname === '/visit' ? 'page' : undefined}
            >
              Visit Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[999]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon open={menuOpen} scrolled={scrolled} />
          </button>
        </div>
      </motion.header>

      <div id="mobile-menu">
        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}

/* ─── Logo lockup — blessed mascot mark + wordmark ─── */
function LogoLockup({ scrolled }: { scrolled: boolean }) {
  return (
    <span className="flex items-center gap-3 select-none">
      <motion.div
        whileHover={{ rotate: 14, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <Image
          src="/mascot/blessed.svg"
          alt=""
          width={46}
          height={46}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </motion.div>
      <span
        className="text-cream font-serif italic font-medium text-xl tracking-tight"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        The 11<sup className="text-xs not-italic font-normal">th</sup> Bean
      </span>
    </span>
  );
}

/* ─── Hamburger icon (three lines styled as stirring sticks) ─── */
function HamburgerIcon({ open, scrolled }: { open: boolean; scrolled: boolean }) {
  const color = 'bg-cream';
  return (
    <span className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 9 : 0 }}
        transition={{ duration: 0.25 }}
        className={`block h-[2px] w-full ${color} rounded-full origin-center`}
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className={`block h-[2px] w-full ${color} rounded-full`}
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -9 : 0 }}
        transition={{ duration: 0.25 }}
        className={`block h-[2px] w-full ${color} rounded-full origin-center`}
      />
    </span>
  );
}
