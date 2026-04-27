import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center pt-20">
      <Image
        src="/mascot/lost.svg"
        alt=""
        width={200}
        height={200}
        className="mb-8 opacity-75 animate-bean-bob"
        aria-hidden="true"
      />
      <p className="text-espresso/30 font-mono text-[10px] tracking-[0.25em] uppercase mb-4">404</p>
      <h1
        className="text-espresso text-3xl md:text-4xl mb-4 leading-snug"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
      >
        We seem to have lost this page.
      </h1>
      <p className="text-espresso/55 text-base max-w-sm mb-10 leading-relaxed">
        Maybe it wandered off for a coffee. Head back and we'll sort you out.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-caramel text-cream text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
      >
        Back to the cafe →
      </Link>
    </div>
  );
}
