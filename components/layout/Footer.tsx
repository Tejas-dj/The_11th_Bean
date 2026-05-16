import Link from 'next/link';
import Image from 'next/image';

const HOURS = [
  { day: 'Open on all days', hours: '9:00 AM - 1:00 AM' },
];

/* TODO: Replace with real social handles from Shishir */
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/the11thbean',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@the11thbean',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      className="bg-caramel text-cream"
      aria-label="Site footer"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Column 1: Branding */}
          <div className="flex flex-col gap-3">
            <Image
              src="/Main_Logo.svg"
              alt="The Eleventh Bean Café"
              width={220}
              height={110}
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.85, width: '200px', height: 'auto' }}
            />
            <p className="text-cream/70 text-sm leading-relaxed max-w-[220px]">
              A unit of Maison Aranya. Built on Indian craftsmanship.
            </p>
          </div>

          {/* Column 2: Address & Hours */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-cream/50 mb-2">Find Us</p>
              <address className="not-italic text-sm text-cream/80 leading-relaxed">
                42/1, Near Shell Petrol Pump,<br />
                South End Road, Basavanagudi,<br />
                Bengaluru - 560004
              </address>
              <a
                href="https://maps.app.goo.gl/fNYWaYGMFMGKJidN8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-rattan text-sm link-underline hover:text-rattan"
                aria-label="Get directions to The 11th Bean (opens Google Maps in new tab)"
              >
                Get Directions →
              </a>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-cream/50 mb-2">Hours</p>
              <ul className="text-sm space-y-1">
                {HOURS.map(({ day, hours }) => (
                  <li key={day} className="flex justify-between gap-4 text-cream/80">
                    <span>{day}</span>
                    <span className="text-cream/60">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-xs font-medium tracking-widest uppercase text-cream/50 md:text-right">Follow Along</p>
            <div className="flex gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-rattan transition-colors duration-200"
                  aria-label={`${s.label} (opens in new tab)`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="mt-2 flex flex-col md:items-end gap-2">
              <Link
                href="/manifesto"
                className="text-sm text-cream/50 hover:text-rattan transition-colors duration-200 link-underline"
              >
                Why we exist →
              </Link>
              <Link
                href="/visit"
                className="inline-block px-5 py-2 border border-cream/30 rounded-full text-sm text-cream/80 hover:border-rattan hover:text-rattan transition-colors duration-200"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3 text-cream/40 text-xs">
          <p>© {new Date().getFullYear()} The 11th Bean. All rights reserved.</p>
          {/* TODO: Replace with your studio name */}
          <p className="text-l">Crafted with care by <a href="https://www.linkedin.com/in/tejas-d-jaiprakash/" target="_blank" rel="noopener noreferrer" className="text-cream underline underline-offset-2 hover:text-rattan transition-colors duration-200">Tejas.D.Jaiprakash</a></p>
        </div>
      </div>
    </footer>
  );
}
