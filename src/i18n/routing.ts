import { defineRouting } from 'next-intl/routing';

/**
 * Bilingual routing - FR (default) + EN, both prefixed (/fr, /en).
 * `pathnames` keys are the canonical hrefs you pass to <Link>; next-intl
 * swaps in the localized segment per locale and keeps hreflang in sync.
 */
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/le-physio': { fr: '/le-physio', en: '/the-physio' },
    '/les-prestations': { fr: '/les-prestations', en: '/services' },
    '/les-prestations/physio-medicale': {
      fr: '/les-prestations/physio-medicale',
      en: '/services/medical-physiotherapy',
    },
    '/les-prestations/physio-sport': {
      fr: '/les-prestations/physio-sport',
      en: '/services/sports-physiotherapy',
    },
    '/les-prestations/esthetique': {
      fr: '/les-prestations/esthetique',
      en: '/services/aesthetic-treatments',
    },
    '/le-cabinet': { fr: '/le-cabinet', en: '/the-practice' },
    '/rendez-vous': { fr: '/rendez-vous', en: '/booking' },
    '/articles': '/articles',
    '/articles/[slug]': '/articles/[slug]',
    '/mentions-legales': { fr: '/mentions-legales', en: '/legal-notice' },
    '/politique-confidentialite': {
      fr: '/politique-confidentialite',
      en: '/privacy-policy',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
