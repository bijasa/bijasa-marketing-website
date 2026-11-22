import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';
import './studio.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SketchDefs } from '@/components/story/Sketch';

const archivo = localFont({
  src: '../public/fonts/archivo-latin-wght-normal.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-archivo',
});

const bricolage = localFont({
  src: '../public/fonts/bricolage-grotesque-latin-opsz-normal.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-bricolage',
});

const caveat = localFont({
  src: '../public/fonts/caveat-latin-wght-normal.woff2',
  weight: '400 700',
  display: 'swap',
  variable: '--font-caveat',
});

const description = 'Bijasa is a software engineering firm. We build custom web apps, mobile apps, AI applications and business software, from the roots up, for any sector.';
const searchTitle = 'Bijasa | Custom Software, Built From the Roots Up';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://bijasa.com/#organization', name: 'Bijasa', url: 'https://bijasa.com/', logo: 'https://bijasa.com/icon-512.png', email: 'hello@bijasa.com', telephone: '+91-88061-09348', slogan: 'Deep roots. Long reach.', description: 'Bijasa is a software engineering company in Pune, India. It designs and builds web platforms, desktop and mobile apps, business systems, cloud, data and AI, and makes its own products: Bijadex, GearShift, Bijasa Invoice and Bijasa Typing.', foundingLocation: 'Pune, Maharashtra, India', sameAs: ['https://www.linkedin.com/company/bijasa/', 'https://github.com/bijasa'] },
    { '@type': 'WebSite', '@id': 'https://bijasa.com/#website', name: 'Bijasa', url: 'https://bijasa.com/', publisher: { '@id': 'https://bijasa.com/#organization' } },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bijasa.com'),
  title: 'Bijasa — Deep roots. Long reach.',
  description,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  twitter: { card: 'summary_large_image', title: searchTitle, description, images: ['/og-image.png'] },
  robots: { index: true, follow: true },
  openGraph: {
    title: searchTitle,
    description,
    url: 'https://bijasa.com',
    siteName: 'Bijasa',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bijasa: software, built from the roots up' }],
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f0e7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${bricolage.variable} ${caveat.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        <SketchDefs />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
