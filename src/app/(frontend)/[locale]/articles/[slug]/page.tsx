import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { MdxContent } from '@/components/blog/MdxContent';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link, getPathname } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { getArticle, listSlugs, relatedArticles } from '@/lib/blog';

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return listSlugs()
    .filter((s) => s.locale === params.locale)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) return {};
  return buildPageMetadata({
    locale,
    href: { pathname: '/articles/[slug]', params: { slug } },
    title: article.title,
    description: article.description,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blog');

  const article = getArticle(locale, slug);
  if (!article) notFound();

  const related = relatedArticles(locale, slug);
  const date = article.date
    ? new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CH' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(article.date))
    : null;

  const url = `${SITE.url}${getPathname({ locale, href: { pathname: '/articles/[slug]', params: { slug } } })}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Person', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    ...(article.image ? { image: `${SITE.url}${article.image}` } : {}),
    mainEntityOfPage: url,
    inLanguage: locale,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Articles',
        item: `${SITE.url}${getPathname({ locale, href: '/articles' })}`,
      },
      { '@type': 'ListItem', position: 2, name: article.title, item: url },
    ],
  };

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container className="pt-12 md:pt-16 pb-10 max-w-[760px]">
        <Link
          href="/articles"
          className="ph hover:text-ink transition-colors inline-block mb-8"
        >
          ← {t('back')}
        </Link>
        {article.category && <div className="eyebrow mb-4">{article.category}</div>}
        <h1 className="display font-normal text-[clamp(32px,4.5vw,56px)] leading-[1.08] tracking-[-0.01em] text-ink">
          {article.title}
        </h1>
        {date && (
          <p className="ph mt-5">
            {t('published')} {date}
          </p>
        )}
      </Container>

      {article.image && (
        <Container className="pb-12 max-w-[1000px]">
          <div className="relative aspect-[16/10] rounded-[14px] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              quality={75}
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[680px]">
          <MdxContent source={article.content} />
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line">
          <Container className="py-16 md:py-20">
            <h2 className="display font-normal text-2xl md:text-3xl text-ink mb-10">
              {t('related')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </article>
  );
}
