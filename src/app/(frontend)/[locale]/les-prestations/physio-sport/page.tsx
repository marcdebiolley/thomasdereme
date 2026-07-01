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
  const t = await getTranslations({ locale, namespace: 'Prestations.sport' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations/physio-sport',
    title: t('title').replace(/\.$/, ''),
    description: t('metaDescription'),
  });
}

export default async function PhysioSportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const ts = await getTranslations('Prestations.sport');

  return (
    <PrestationDetail
      eyebrow={ts('eyebrow')}
      title={ts('title')}
      lead={ts('lead')}
      body={ts('body')}
      durations={ts.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={ts.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/sport.webp"
      alt={`${SITE.name} - ${ts('eyebrow')}`}
    />
  );
}
