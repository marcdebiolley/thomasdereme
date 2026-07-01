import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity/image';
import type { ArticleCard as ArticleCardType } from '@/lib/sanity/types';

export function ArticleCard({
  article,
  locale,
}: {
  article: ArticleCardType;
  locale: string;
}) {
  const cover = article.coverImage
    ? urlFor(article.coverImage).width(800).height(560).fit('crop').auto('format').url()
    : null;
  const date = article.publishedAt
    ? new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CH' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(article.publishedAt))
    : null;

  return (
    <Link
      href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
      className="svc group block"
    >
      <div className="relative aspect-[5/4] rounded-[14px] overflow-hidden bg-[#e4e3dd] mb-4">
        {cover && (
          <Image
            src={cover}
            alt={article.title}
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>
      {article.category && (
        <div className="eyebrow mb-2">{article.category.title}</div>
      )}
      <h3 className="display font-medium text-xl text-ink leading-snug">{article.title}</h3>
      {article.excerpt && (
        <p className="text-muted text-sm leading-[1.7] mt-2 line-clamp-2">{article.excerpt}</p>
      )}
      {date && <p className="ph mt-3">{date}</p>}
    </Link>
  );
}
