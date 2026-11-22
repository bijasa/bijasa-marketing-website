import type { Metadata } from 'next';

export function searchMetadata(title: string, description: string, path: string, image = '/og-image.png'): Metadata {
  const url = new URL(path, 'https://bijasa.com/').href;
  return {
    title: `${title} | Bijasa`, description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Bijasa`, description, url, siteName: 'Bijasa', type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title: `${title} | Bijasa`, description, images: [image] },
  };
}
