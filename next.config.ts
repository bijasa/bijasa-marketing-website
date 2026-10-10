import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site, exported to ./out and served by GitHub Pages.
  output: 'export',
  // Emit /privacy/index.html so GitHub Pages serves clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
