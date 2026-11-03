import type { Metadata } from 'next';

export function searchMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, 'https://bijasa.com/').href;
  return {
    title: `${title} | Bijasa`, description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Bijasa`, description, url, siteName: 'Bijasa', type: 'website',
      images: [{ url: '/icon-512.png', width: 512, height: 512 }] },
    twitter: { card: 'summary', title: `${title} | Bijasa`, description, images: ['/icon-512.png'] },
  };
}
