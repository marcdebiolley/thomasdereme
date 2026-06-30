import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { SITE } from '@/lib/site';

type Href = Parameters<typeof getPathname>[0]['href'];

/**
 * Build canonical + hreflang + OpenGraph metadata for a localized page.
 * Pass the canonical (FR-keyed) href; localized URLs are derived per locale.
 */
export async function buildPageMetadata({
  locale,
  title,
  description,
  href,
}: {
  locale: Locale;
  title: string;
  description?: string;
  href: Href;
}): Promise<Metadata> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE.url}${getPathname({ locale: l, href })}`;
  }
  const canonical = `${SITE.url}${getPathname({ locale, href })}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'Thomas Derême Physiothérapeute',
      locale: locale === 'fr' ? 'fr_CH' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
