import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { MachinesSection, type Machine } from '@/components/sections/MachinesSection';
import { Container } from '@/components/ui/Container';

const MACHINE_IMAGES = [
  { main: '/images/lpg-huber-360-evolution-plateforme.webp', detail: '/images/lpg-huber-360-evolution-detail.webp' },
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
  const ta = await getTranslations('Alt');
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
      image="/images/physiotherapie-massage-jambe-cabinet.webp"
      alt={ta('medicalMassage')}
    >
      {/* Indications */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal>
            <div className="eyebrow">{tm('indicationsTitle')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
              {tm('indicationsIntro')}
            </h2>
          </div>
          <ul
            data-reveal
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0 text-muted text-[15px] leading-[1.7]"
          >
            {(tm.raw('indications') as string[]).map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-line py-5">
                <span className="text-brun shrink-0" aria-hidden>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Dry needling - mis en avant (très recherché à Lausanne) */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <div className="eyebrow">{tm('dry.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
                {tm('dry.title')}
              </h2>
              <p className="mt-6 text-muted text-base leading-[1.8] max-w-[520px]">
                {tm('dry.text')}
              </p>
            </div>
            <div
              data-reveal
              className="relative aspect-[3/2] rounded-[14px] overflow-hidden"
            >
              <Image
                src="/images/dry-needling-gros-plan-aiguille.webp"
                alt={ta('dryNeedling')}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
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
