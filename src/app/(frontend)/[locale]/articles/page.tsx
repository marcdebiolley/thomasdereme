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
import { cn } from '@/lib/cn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.articles' });
  return buildPageMetadata({ locale, href: '/articles', title: t('title') });
}

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { cat } = await searchParams;
  const t = await getTranslations('Pages.articles');

  const [articles, categories] = await Promise.all([
    sanityFetch<ArticleCardType[]>(articlesListQuery, { locale }, []),
    sanityFetch<Category[]>(categoriesQuery, {}, []),
  ]);
  const filtered = cat ? articles.filter((a) => a.category?.slug === cat) : articles;

  const chip = (active: boolean) =>
    cn(
      'font-sans text-[11px] font-semibold tracking-[0.08em] uppercase rounded-full px-4 py-2 transition-colors',
      active ? 'bg-dark text-sand' : 'border border-line text-muted hover:text-ink',
    );

  return (
    <>
      <PageHeader eyebrow={t('title')} title={t('title')} lead={t('lead')} />
      <Container className="py-14 md:py-20">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
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
        )}

        {filtered.length === 0 ? (
          <p className="text-muted text-lg py-16 text-center">{t('empty')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filtered.map((article) => (
              <ArticleCard key={article._id} article={article} locale={locale} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
