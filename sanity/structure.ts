import type { StructureResolver } from 'sanity/structure';

// siteSettings as a singleton; everything else as standard document lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Paramètres du site')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('category').title('Catégories'),
      S.documentTypeListItem('treatment').title('Traitements'),
      S.documentTypeListItem('author').title('Auteurs'),
    ]);
