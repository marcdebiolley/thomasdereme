import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';

export type Category = { title: string; slug: string };

export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageSource;
  category?: Category;
};

export type Article = ArticleCard & {
  body?: PortableTextBlock[];
  author?: { name: string; role?: string; image?: SanityImageSource };
  seo?: { metaTitle?: string; metaDescription?: string };
};

export type ArticleSlug = { slug: string; language: string };
