import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { Link } from '@/i18n/navigation';
import { sanityFetch } from '@/lib/sanity/fetch';
import { articlesListQuery, categoriesQuery } from '@/lib/sanity/queries';
import type { ArticleCard as ArticleCardType, Category } from '@/lib/sanity/types';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

const PAGE_SIZE = 9;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.articles' });
  const meta = await buildPageMetadata({ locale, href: '/articles', title: t('title') });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { 'application/rss+xml': `${SITE.url}/${locale}/feed.xml` },
    },
  };
}

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ cat?: string; page?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { cat, page: pageParam } = await searchParams;
  const t = await getTranslations('Pages.articles');

  const [articles, categories] = await Promise.all([
    sanityFetch<ArticleCardType[]>(articlesListQuery, { locale }, []),
    sanityFetch<Category[]>(categoriesQuery, {}, []),
  ]);
  const filtered = cat ? articles.filter((a) => a.category?.slug === cat) : articles;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, Number(pageParam) || 1));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pageQuery = (p: number) => ({
    ...(cat ? { cat } : {}),
    ...(p > 1 ? { page: String(p) } : {}),
  });

  const chip = (active: boolean) =>
    cn(
      'font-sans text-[11px] font-semibold tracking-[0.08em] uppercase rounded-full px-4 py-2 transition-colors',
      active ? 'bg-dark text-sand' : 'border border-line text-muted hover:text-ink',
    );

  return (
    <>
      <PageHeader eyebrow={t('title')} title={t('title')} lead={t('lead')} />
      <Container className="py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <Link href="/articles" className={chip(!cat)}>
                {t('all')}
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={{ pathname: '/articles', query: { cat: c.slug } }}
                  className={chip(cat === c.slug)}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          ) : (
            <span />
          )}
          <a
            href={`/${locale}/feed.xml`}
            className="ph hover:text-ink transition-colors"
          >
            {t('rss')} ↗
          </a>
        </div>

        {pageItems.length === 0 ? (
          <p className="text-muted text-lg py-16 text-center">{t('empty')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {pageItems.map((article) => (
              <ArticleCard key={article._id} article={article} locale={locale} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex items-center justify-between mt-16 pt-8 border-t border-line">
            {page > 1 ? (
              <Link
                href={{ pathname: '/articles', query: pageQuery(page - 1) }}
                className="ph hover:text-ink transition-colors"
              >
                ← {t('prev')}
              </Link>
            ) : (
              <span />
            )}
            <span className="ph">
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={{ pathname: '/articles', query: pageQuery(page + 1) }}
                className="ph hover:text-ink transition-colors"
              >
                {t('next')} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </Container>
    </>
  );
}
