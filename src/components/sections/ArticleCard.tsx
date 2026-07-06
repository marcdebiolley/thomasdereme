import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { BlogMeta } from '@/lib/blog';

export function ArticleCard({ article, locale }: { article: BlogMeta; locale: string }) {
  const date = article.date
    ? new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CH' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(article.date))
    : null;

  return (
    <Link
      href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
      className="svc group block"
    >
      <div className="relative aspect-[5/4] rounded-[14px] overflow-hidden bg-[#e4e3dd] mb-4">
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            fill
            quality={75}
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>
      {article.category && <div className="eyebrow mb-2">{article.category}</div>}
      <h3 className="display font-medium text-xl text-ink leading-snug">{article.title}</h3>
      {article.description && (
        <p className="text-muted text-sm leading-[1.7] mt-2 line-clamp-2">
          {article.description}
        </p>
      )}
      {date && <p className="ph mt-3">{date}</p>}
    </Link>
  );
}
