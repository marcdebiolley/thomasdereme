import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { SITE } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Prestations.esthetic' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations/esthetique',
    title: t('title').replace(/\.$/, ''),
    description: t('metaDescription'),
  });
}

export default async function EsthetiquePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const te = await getTranslations('Prestations.esthetic');

  return (
    <PrestationDetail
      eyebrow={te('eyebrow')}
      title={te('title')}
      lead={te('lead')}
      body={te('body')}
      durations={te.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={te.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/esthetique.webp"
      alt={`${SITE.name} - ${te('eyebrow')}`}
    />
  );
}
