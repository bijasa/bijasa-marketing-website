import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

const description = 'Custom software development, web and mobile applications, cloud platforms, and data and AI engineering by Bijasa. Deep roots. Long reach.';
const searchTitle = 'Custom Software Development & Product Engineering | Bijasa';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://bijasa.com/#organization', name: 'Bijasa', url: 'https://bijasa.com/', logo: 'https://bijasa.com/icon-512.png', email: 'hello@bijasa.com', slogan: 'Deep roots. Long reach.' },
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
  themeColor: '#18130e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
