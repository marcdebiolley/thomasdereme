import { listArticles } from '@/lib/blog';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const articles = listArticles(locale);

  const listUrl = `${SITE.url}${getPathname({ locale, href: '/articles' })}`;
  const selfUrl = `${SITE.url}/${locale}/feed.xml`;
  const title = `${SITE.name} - Articles`;
  const description = isFr
    ? 'Prévention, récupération, trail & performance, techniques et conseils.'
    : 'Prevention, recovery, trail & performance, techniques and tips.';

  const items = articles
    .map((a) => {
      const url = `${SITE.url}${getPathname({
        locale,
        href: { pathname: '/articles/[slug]', params: { slug: a.slug } },
      })}`;
      const pubDate = a.date ? new Date(a.date).toUTCString() : '';
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      ${a.category ? `<category>${esc(a.category)}</category>` : ''}
      ${a.description ? `<description>${esc(a.description)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${listUrl}</link>
    <description>${esc(description)}</description>
    <language>${isFr ? 'fr-CH' : 'en'}</language>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
