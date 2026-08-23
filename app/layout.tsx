import type { Metadata } from 'next';
import './globals.css';
import { lora, dmSans } from '@/lib/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { PageLoader } from '@/components/shared/PageLoader';
import { EventAnnouncement } from '@/components/shared/EventAnnouncement';
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: 'The 11th Bean | Artisanal Cafe in Basavanagudi, Bengaluru',
  description:
    'An artisanal cafe in Basavanagudi, Bengaluru. Coffee crafted with obsession, a space built for community. Come for the brew, stay for the story.',
  icons: {
    icon: [{ url: '/11th_bean_favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/11th_bean_favicon.svg',
  },
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
        <PageLoader />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <EventAnnouncement />
        <Analytics />
      </body>
    </html>
  );
}
