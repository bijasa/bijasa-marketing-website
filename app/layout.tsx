import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';
import './studio.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

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

const description = 'Bijasa is a software engineering company. We design and build web platforms, desktop and mobile apps, business systems, cloud, data and AI, from idea to launch.';
const searchTitle = 'Bijasa | Software Engineering, From Idea to Launch';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://bijasa.com/#organization', name: 'Bijasa', url: 'https://bijasa.com/', logo: 'https://bijasa.com/icon-512.png', email: 'hello@bijasa.com', slogan: 'Deep roots. Long reach.', description: 'Bijasa is a software engineering company in Pune, India. It designs and builds web platforms, desktop and mobile apps, business systems, cloud, data and AI, and makes its own products: Bijadex, GearShift, Bijasa Invoice and Bijasa Typing.', foundingLocation: 'Pune, Maharashtra, India', sameAs: ['https://www.linkedin.com/company/bijasa/', 'https://github.com/bijasa'] },
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
  twitter: { card: 'summary', title: searchTitle, description, images: ['/icon-512.png'] },
  robots: { index: true, follow: true },
  openGraph: {
    title: searchTitle,
    description,
    url: 'https://bijasa.com',
    siteName: 'Bijasa',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${bricolage.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
