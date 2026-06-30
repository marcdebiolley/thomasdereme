import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/navigation';
import { getPathname } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { urlFor } from '@/lib/sanity/image';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  articleBySlugQuery,
  articleSlugsQuery,
  relatedArticlesQuery,
} from '@/lib/sanity/queries';
import type { Article, ArticleCard as ArticleCardType, ArticleSlug } from '@/lib/sanity/types';

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const slugs = await sanityFetch<ArticleSlug[]>(articleSlugsQuery, {}, []);
  return slugs.filter((s) => s.language === params.locale).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await sanityFetch<Article | null>(
    articleBySlugQuery,
    { slug, locale },
    null,
  );
  if (!article) return {};
  return buildPageMetadata({
    locale,
    href: { pathname: '/articles/[slug]', params: { slug } },
    title: article.seo?.metaTitle ?? article.title,
    description: article.seo?.metaDescription ?? article.excerpt,
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

  const article = await sanityFetch<Article | null>(
    articleBySlugQuery,
    { slug, locale },
    null,
  );
  if (!article) notFound();

  const related = article.category?.slug
    ? await sanityFetch<ArticleCardType[]>(
        relatedArticlesQuery,
        { locale, id: article._id, categorySlug: article.category.slug },
        [],
      )
    : [];

  const cover = article.coverImage
    ? urlFor(article.coverImage).width(1400).height(875).fit('crop').auto('format').url()
    : null;
  const date = article.publishedAt
    ? new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CH' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(article.publishedAt))
    : null;

  const url = `${SITE.url}${getPathname({ locale, href: { pathname: '/articles/[slug]', params: { slug } } })}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: article.author?.name ?? SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    ...(cover ? { image: cover } : {}),
    mainEntityOfPage: url,
    inLanguage: locale,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Articles', item: `${SITE.url}${getPathname({ locale, href: '/articles' })}` },
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
        {article.category && <div className="eyebrow mb-4">{article.category.title}</div>}
        <h1 className="display font-normal text-[clamp(32px,4.5vw,56px)] leading-[1.08] tracking-[-0.01em] text-ink">
          {article.title}
        </h1>
        {date && (
          <p className="ph mt-5">
            {t('published')} {date}
            {article.author?.name ? ` · ${article.author.name}` : ''}
          </p>
        )}
      </Container>

      {cover && (
        <Container className="pb-12 max-w-[1000px]">
          <div className="relative aspect-[16/10] rounded-[14px] overflow-hidden">
            <Image
              src={cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="pb-16 md:pb-24">
        <div className="mx-auto">
          {article.body && <PortableTextRenderer value={article.body} />}
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
                <ArticleCard key={a._id} article={a} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </article>
  );
}

export const dynamicParams = true;
