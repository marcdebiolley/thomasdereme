import { defineArrayMember, defineField, defineType } from 'sanity';

export const treatment = defineType({
  name: 'treatment',
  title: 'Traitement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'universe',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: 'Médical', value: 'medical' },
          { title: 'Sport', value: 'sport' },
          { title: 'Esthétique', value: 'aesthetic' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'duration', title: 'Durée', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Résumé', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      type: 'number',
    }),
  ],
});
