import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      validation: (r) => r.max(60).warning('Keep under ~60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Keep under ~160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
    }),
  ],
});
