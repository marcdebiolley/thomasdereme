import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Blog file-based (MDX) - même convention que marcodb.be / blog-cms :
 * un fichier par langue dans content/blog, nommé `<slug>.<locale>.mdx`,
 * avec un front-matter { title, description, date, category, image }.
 * Publier = committer un fichier (via l'admin blog-cms ou à la main).
 */

export type BlogMeta = {
  slug: string;
  locale: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  /** Slug d'URL de la catégorie (dérivé du libellé). */
  categorySlug?: string;
  /** Chemin public de l'image de couverture (ex. /images/blog/x.jpg). */
  image?: string;
};

export type BlogArticle = BlogMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function slugifyCategory(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseFile(fileName: string): BlogArticle | null {
  const m = fileName.match(/^(.+)\.([a-z]{2})\.mdx$/);
  if (!m) return null;
  const [, slug, locale] = m;
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  if (!data.title) return null;
  const category = typeof data.category === 'string' ? data.category : undefined;
  return {
    slug,
    locale,
    title: String(data.title),
    description: data.description ? String(data.description) : undefined,
    date: data.date ? String(data.date) : undefined,
    category,
    categorySlug: category ? slugifyCategory(category) : undefined,
    image: data.image ? String(data.image) : undefined,
    content,
  };
}

function allFiles(): string[] {
  try {
    return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  } catch {
    return [];
  }
}

/** Tous les articles d'une locale, du plus récent au plus ancien. */
export function listArticles(locale: string): BlogArticle[] {
  return allFiles()
    .filter((f) => f.endsWith(`.${locale}.mdx`))
    .map(parseFile)
    .filter((a): a is BlogArticle => a !== null)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

export function getArticle(locale: string, slug: string): BlogArticle | null {
  const file = `${slug}.${locale}.mdx`;
  if (!allFiles().includes(file)) return null;
  return parseFile(file);
}

/** Catégories distinctes d'une locale (libellé + slug d'URL). */
export function listCategories(locale: string): { title: string; slug: string }[] {
  const seen = new Map<string, string>();
  for (const a of listArticles(locale)) {
    if (a.category && a.categorySlug && !seen.has(a.categorySlug)) {
      seen.set(a.categorySlug, a.category);
    }
  }
  return [...seen.entries()].map(([slug, title]) => ({ title, slug }));
}

/** Articles de la même catégorie (pour « À lire aussi »). */
export function relatedArticles(locale: string, slug: string, limit = 3): BlogArticle[] {
  const current = getArticle(locale, slug);
  if (!current?.categorySlug) return [];
  return listArticles(locale)
    .filter((a) => a.slug !== slug && a.categorySlug === current.categorySlug)
    .slice(0, limit);
}

/** Paires slug/locale existantes (sitemap, generateStaticParams). */
export function listSlugs(): { slug: string; locale: string }[] {
  return allFiles()
    .map((f) => f.match(/^(.+)\.([a-z]{2})\.mdx$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({ slug: m[1], locale: m[2] }));
}
