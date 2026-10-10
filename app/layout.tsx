import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bijasa.com'),
  title: 'Bijasa — Deep roots. Long reach.',
  description:
    'Bijasa is a software company. We build software that grows from the ground up: clear foundations, then long reach.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Bijasa — Deep roots. Long reach.',
    description: 'Software that grows from the ground up.',
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
      <body>{children}</body>
    </html>
  );
}
