import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import { sanityFetch } from '@/lib/sanity/fetch';
import { articleSlugsQuery } from '@/lib/sanity/queries';
import type { ArticleSlug } from '@/lib/sanity/types';

const routes = [
  '/',
  '/le-physio',
  '/les-traitements',
  '/le-cabinet',
  '/rendez-vous',
  '/articles',
  '/mentions-legales',
  '/politique-confidentialite',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = routes.map((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE.url}${getPathname({ locale: l, href })}`]),
    );
    return {
      url: `${SITE.url}${getPathname({ locale: routing.defaultLocale, href })}`,
      alternates: { languages },
    };
  });

  const slugs = await sanityFetch<ArticleSlug[]>(articleSlugsQuery, {}, []);
  const articleEntries = slugs.map((s) => ({
    url: `${SITE.url}${getPathname({
      locale: (s.language as (typeof routing.locales)[number]) ?? routing.defaultLocale,
      href: { pathname: '/articles/[slug]', params: { slug: s.slug } },
    })}`,
  }));

  return [...staticEntries, ...articleEntries];
}
