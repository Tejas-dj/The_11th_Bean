'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationControls } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS, type NavItem } from '@/lib/constants';

const LIGHT_BG_ROUTES = ['/menu', '/visit', '/loyalty'];
const LIGHT_BG_PREFIXES = ['/blog'];

export function Navbar() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showBg = scrolled || LIGHT_BG_ROUTES.includes(pathname) || LIGHT_BG_PREFIXES.some(p => pathname.startsWith(p)) || menuOpen;
  const isHidden = scrollDir === 'down' && scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[999]"
        style={{
          backgroundColor: showBg ? 'rgba(139,109,74,0.97)' : 'transparent',
          backdropFilter: showBg ? 'blur(8px)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
          pointerEvents: 'auto',
        }}
        aria-label="Main navigation"
      >
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div
          className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between overflow-visible"
          style={{
            height: scrolled ? '56px' : '80px',
            transition: 'height 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-rattan"
            aria-label="The Eleventh Bean Café, home"
          >
            <LogoLockup scrolled={scrolled} pathname={pathname} />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Site navigation"
          >
            {NAV_LINKS.map((item) => {
              if (item.type === 'link') {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-cream/90 hover:text-cream text-sm font-medium tracking-wide transition-colors duration-200 pb-1"
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rattan"
                      />
                    )}
                  </Link>
                );
              }

              return (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  isOpen={openDropdown === item.label}
                  onOpen={() => setOpenDropdown(item.label)}
                  onClose={() => setOpenDropdown(null)}
                />
              );
            })}

            <MagneticButton href="/visit" active={pathname === '/visit'} />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[1001]"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon open={menuOpen} scrolled={scrolled} />
          </button>
        </div>
      </motion.header>

      <div id="mobile-menu">
        <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
      </div>
    </>
  );
}

/* ─── Desktop dropdown group ─── */
function DesktopDropdown({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: Extract<NavItem, { type: 'dropdown' }>;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const isChildActive = item.children.some((c) => pathname === c.href);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {/* Trigger */}
      <button
        className="relative flex items-center gap-1 text-cream/90 hover:text-cream text-sm font-medium tracking-wide transition-colors duration-200 pb-1 cursor-default"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {item.label}
        {/* Chevron */}
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/70"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        {/* Active dot when a child route is current */}
        {isChildActive && (
          <motion.span
            layoutId="nav-dot"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rattan"
          />
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 min-w-[160px] py-2 rounded-lg z-50"
            style={{
              backgroundColor: 'rgba(42,35,32,0.97)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,169,110,0.2)',
            }}
            role="menu"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-cream/80 hover:text-rattan transition-colors duration-150"
                aria-current={pathname === child.href ? 'page' : undefined}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Logo lockup — official Main_Logo.svg with route-change bounce + hover spring ─── */
function LogoLockup({ scrolled, pathname }: { scrolled: boolean; pathname: string }) {
  const controls = useAnimationControls();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    controls.start({
      scale: [1, 1.22, 0.88, 1.08, 1],
      rotate: [0, -8, 6, -3, 0],
      transition: { duration: 0.55, ease: 'easeInOut' },
    });
  }, [pathname, controls]);

  return (
    <motion.div
      animate={controls}
      whileHover={{ rotate: 6, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 380, damping: 14 }}
      aria-hidden="true"
      className="flex-shrink-0 select-none"
    >
      <Image
        src="/Main_Logo.svg"
        alt="The Eleventh Bean Café"
        width={200}
        height={100}
        priority
        style={{
          filter: 'brightness(0) invert(1)',
          width: scrolled ? '150px' : '200px',
          height: 'auto',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </motion.div>
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

/* ─── Magnetic "Visit Us" CTA ─── */
function MagneticButton({ href, active }: { href: string; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="ml-4">
      <motion.div style={{ x: sx, y: sy }}>
        <Link
          href={href}
          className="inline-block px-5 py-2 bg-rattan text-espresso text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
          aria-current={active ? 'page' : undefined}
        >
          Visit Us
        </Link>
      </motion.div>
    </div>
  );
}
