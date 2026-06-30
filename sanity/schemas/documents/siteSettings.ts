import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nom du site', type: 'string' }),
    defineField({ name: 'description', title: 'Description par défaut', type: 'text', rows: 2 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'onedocUrl', title: 'URL de réservation OneDoc', type: 'url' }),
    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),
  ],
});
