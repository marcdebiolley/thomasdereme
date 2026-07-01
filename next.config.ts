import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    remotePatterns: [
      // Sanity-hosted images
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    // 301 redirects from the old Odoo URLs (from the live sitemap).
    // next.config redirects run BEFORE the next-intl middleware, so these
    // fire before any locale rewrite.
    return [
      { source: '/qui-suis-je', destination: '/fr/le-physio', statusCode: 301 },
      { source: '/about-us', destination: '/fr/le-physio', statusCode: 301 },
      { source: '/les-traitements', destination: '/fr/les-traitements', statusCode: 301 },
      { source: '/le-cabinet', destination: '/fr/le-cabinet', statusCode: 301 },
      { source: '/contactus', destination: '/fr/rendez-vous', statusCode: 301 },
      { source: '/privacy', destination: '/fr/politique-confidentialite', statusCode: 301 },
      { source: '/blog', destination: '/fr/articles', statusCode: 301 },
      { source: '/blog/:path*', destination: '/fr/articles', statusCode: 301 },
      { source: '/jobs', destination: '/fr', statusCode: 301 },
    ];
  },
};

export default withNextIntl(nextConfig);
