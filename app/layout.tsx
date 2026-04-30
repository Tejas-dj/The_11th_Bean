import type { Metadata } from 'next';
import './globals.css';
import { lora, dmSans } from '@/lib/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { PageLoader } from '@/components/shared/PageLoader';
import { EventAnnouncement } from '@/components/shared/EventAnnouncement';


export const metadata: Metadata = {
  title: 'The 11th Bean | Artisanal Cafe in Basavanagudi, Bengaluru',
  description:
    'An artisanal cafe in Basavanagudi, Bengaluru. Coffee crafted with obsession, a space built for community. Come for the brew, stay for the story.',
  openGraph: {
    title: 'The 11th Bean | Artisanal Cafe in Basavanagudi, Bengaluru',
    description:
      'He counted ten beans. None were right. Then came the eleventh.',
    url: 'https://the11thbean.com',
    siteName: 'The 11th Bean',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso antialiased" suppressHydrationWarning>
        <LenisProvider>
          <PageLoader />

          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <EventAnnouncement />
        </LenisProvider>
      </body>
    </html>
  );
}
