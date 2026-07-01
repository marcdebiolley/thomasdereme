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
  const t = await getTranslations({ locale, namespace: 'Prestations.medical' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations/physio-medicale',
    title: t('title').replace(/\.$/, ''),
    description: t('metaDescription'),
  });
}

export default async function PhysioMedicalePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const tm = await getTranslations('Prestations.medical');

  return (
    <PrestationDetail
      eyebrow={tm('eyebrow')}
      title={tm('title')}
      lead={tm('lead')}
      body={tm('body')}
      durations={tm.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={tm.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/medical.webp"
      alt={`${SITE.name} - ${tm('eyebrow')}`}
    />
  );
}
