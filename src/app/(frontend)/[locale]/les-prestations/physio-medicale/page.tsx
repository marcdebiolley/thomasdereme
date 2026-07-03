import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { MachinesSection, type Machine } from '@/components/sections/MachinesSection';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/site';

const MACHINE_IMAGES = [
  { main: '/images/huber-360.webp', detail: '/images/huber-360-detail.webp' },
] as const;

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
  const machines = (tm.raw('machines') as Omit<Machine, 'images'>[]).map((m, i) => ({
    ...m,
    images: MACHINE_IMAGES[i],
  }));

  return (
    <PrestationDetail
      eyebrow={tm('eyebrow')}
      title={tm('title')}
      lead={tm('lead')}
      body={tm.raw('bodyParas') as string[]}
      durations={tm.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={tm.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/medical.webp"
      alt={`${SITE.name} - ${tm('eyebrow')}`}
    >
      {/* Indications */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{tm('indicationsTitle')}</div>
            <p className="display font-normal text-[clamp(24px,2.6vw,34px)] leading-[1.2] text-ink mt-5">
              {tm('indicationsIntro')}
            </p>
          </div>
          <ul
            data-reveal
            className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-3 text-muted text-[15px] leading-[1.7]"
          >
            {(tm.raw('indications') as string[]).map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="text-taupe shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Prise en charge (LAMal / LAA) */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{tm('coverageTitle')}</div>
            <p className="mt-5 text-muted text-base leading-[1.8]">{tm('coverageText')}</p>
          </div>
        </Container>
      </section>

      <MachinesSection
        eyebrow={tm('machinesEyebrow')}
        title={tm('machinesTitle')}
        intro={tm('machinesIntro')}
        machines={machines}
      />
    </PrestationDetail>
  );
}
