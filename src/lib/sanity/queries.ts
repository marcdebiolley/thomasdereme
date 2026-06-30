import { groq } from 'next-sanity';

export const articlesListQuery = groq`
  *[_type == "article" && language == $locale && defined(slug.current)]
  | order(publishedAt desc){
    _id, title, "slug": slug.current, excerpt, publishedAt, coverImage,
    "category": category->{title, "slug": slug.current}
  }`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current, language }`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && language == $locale][0]{
    _id, title, "slug": slug.current, excerpt, publishedAt, body, coverImage,
    "category": category->{title, "slug": slug.current},
    "author": author->{name, role, image},
    seo
  }`;

export const relatedArticlesQuery = groq`
  *[_type == "article" && language == $locale && _id != $id
    && category->slug.current == $categorySlug]
  | order(publishedAt desc)[0...3]{
    _id, title, "slug": slug.current, excerpt, publishedAt, coverImage,
    "category": category->{title, "slug": slug.current}
  }`;

export const categoriesQuery = groq`
  *[_type == "category" && defined(slug.current)] | order(title asc){
    title, "slug": slug.current
  }`;
