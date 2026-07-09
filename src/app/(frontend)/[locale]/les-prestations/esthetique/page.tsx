import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { MachinesSection, type Machine } from '@/components/sections/MachinesSection';

const MACHINE_IMAGES = [
  { main: '/images/lpg-cellu-m6-infinity-endermologie.webp', detail: '/images/lpg-cellu-m6-infinity-ecran.webp' },
] as const;

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
  const ta = await getTranslations('Alt');
  const machines = (te.raw('machines') as Omit<Machine, 'images'>[]).map((m, i) => ({
    ...m,
    images: MACHINE_IMAGES[i],
  }));

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
      image="/images/machine-lpg-endermologie-salle-soin.webp"
      alt={ta('esthetique')}
    >
      <MachinesSection
        eyebrow={te('machinesEyebrow')}
        title={te('machinesTitle')}
        intro={te('machinesIntro')}
        machines={machines}
      />
    </PrestationDetail>
  );
}
