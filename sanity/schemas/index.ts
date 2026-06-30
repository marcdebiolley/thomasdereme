import type { SchemaTypeDefinition } from 'sanity';
import { seo } from './objects/seo';
import { author } from './documents/author';
import { category } from './documents/category';
import { treatment } from './documents/treatment';
import { article } from './documents/article';
import { siteSettings } from './documents/siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  // documents
  siteSettings,
  article,
  category,
  treatment,
  author,
];
