import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { MachinesSection, type Machine } from '@/components/sections/MachinesSection';
import { Container } from '@/components/ui/Container';

const MACHINE_IMAGES = [
  { main: '/images/lpg-cellu-m6-infinity-endermologie.webp', detail: '/images/lpg-cellu-m6-infinity-ecran.webp' },
] as const;

const h2 =
  'display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5';

/** Liste à tirets, même motif que les indications de la page médicale. */
function DashList({ items, cols = 3 }: { items: string[]; cols?: 2 | 3 }) {
  return (
    <ul
      className={`mt-10 grid sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''} gap-x-10 gap-y-0 text-muted text-[15px] leading-[1.7]`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-4 border-t border-line py-4">
          <span className="text-brun shrink-0" aria-hidden>
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

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
      body={te.raw('bodyParas') as string[]}
      durations={te.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={te.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/physiotherapie-dermato-fonctionnelle-soin.webp"
      alt={ta('dermatoSoin')}
    >
      {/* Avant, pendant et après la chirurgie - même motif que « Mes formations » */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-20 items-start">
            <div data-reveal className="lg:sticky lg:top-24">
              <div className="eyebrow">{te('surgery.eyebrow')}</div>
              <h2 className={h2}>{te('surgery.title')}</h2>
              <h3 className="display font-medium text-[20px] leading-[1.3] text-ink mt-8">
                {te('surgery.prehabTitle')}
              </h3>
              <p className="mt-4 text-muted text-base leading-[1.8] max-w-[44ch]">
                {te('surgery.prehabText')}
              </p>
            </div>

            <div data-reveal>
              <h3 className="display font-medium text-[20px] leading-[1.3] text-ink mb-2">
                {te('surgery.rehabTitle')}
              </h3>
              <p className="text-muted text-base leading-[1.8] mb-6">
                {te('surgery.rehabIntro')}
              </p>
              <div>
                {(te.raw('surgery.rehabItems') as string[]).map((item) => (
                  <div key={item} className="flex gap-6 py-4 border-t border-line">
                    <span className="text-brun shrink-0" aria-hidden>
                      —
                    </span>
                    <p className="display font-normal text-[18px] leading-[1.4] text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[14.5px] leading-[1.75] text-muted max-w-[56ch]">
                {te('surgery.rehabOutro')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Drainage lymphatique manuel */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-3xl">
            <div className="eyebrow">{te('drainage.eyebrow')}</div>
            <h2 className={h2}>{te('drainage.title')}</h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">{te('drainage.intro')}</p>
            <p className="mt-4 text-ink font-medium">{te('drainage.listIntro')}</p>
          </div>
          <div data-reveal>
            <DashList items={te.raw('drainage.items') as string[]} />
          </div>
          <p data-reveal className="mt-8 text-muted text-base leading-[1.8] max-w-3xl">
            {te('drainage.outro')}
          </p>
        </Container>
      </section>

      {/* Cicatrices & fibroses */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-3xl">
            <div className="eyebrow">{te('scars.eyebrow')}</div>
            <h2 className={h2}>{te('scars.title')}</h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">{te('scars.intro')}</p>
          </div>
          <div data-reveal>
            <DashList items={te.raw('scars.items') as string[]} />
          </div>
          <p data-reveal className="mt-8 text-muted text-base leading-[1.8] max-w-3xl">
            {te('scars.outro')}
          </p>
        </Container>
      </section>

      {/* Complications post-opératoires */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-3xl">
            <div className="eyebrow">{te('complications.eyebrow')}</div>
            <h2 className={h2}>{te('complications.title')}</h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">
              {te('complications.intro')}
            </p>
          </div>
          <div data-reveal>
            <DashList items={te.raw('complications.items') as string[]} />
          </div>
          <p data-reveal className="mt-8 text-muted text-base leading-[1.8] max-w-3xl">
            {te('complications.outro')}
          </p>
        </Container>
      </section>

      {/* Lipœdème & lymphœdème */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-3xl">
            <div className="eyebrow">{te('lipo.eyebrow')}</div>
            <h2 className={h2}>{te('lipo.title')}</h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">{te('lipo.intro')}</p>
          </div>
          <div data-reveal>
            <DashList items={te.raw('lipo.items') as string[]} />
          </div>
          <p data-reveal className="mt-8 text-muted text-base leading-[1.8] max-w-3xl">
            {te('lipo.outro')}
          </p>
        </Container>
      </section>

      {/* Endermologie médicale LPG® - texte + photo de la salle */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <div className="eyebrow">{te('endermo.eyebrow')}</div>
              <h2 className={h2}>{te('endermo.title')}</h2>
              <div className="mt-6 text-muted text-base leading-[1.8] space-y-4 max-w-[520px]">
                {(te.raw('endermo.paras') as string[]).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div
              data-reveal
              className="relative aspect-[4/5] rounded-[14px] overflow-hidden"
            >
              <Image
                src="/images/salle-soin-endermologie-lpg-cabinet.webp"
                alt={ta('salleLpg')}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <MachinesSection
        eyebrow={te('machinesEyebrow')}
        title={te('machinesTitle')}
        intro={te('machinesIntro')}
        machines={machines}
      />

      {/* Rééducation fonctionnelle + engagement */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div data-reveal>
              <div className="eyebrow">{te('reeduc.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(24px,2.6vw,34px)] leading-[1.16] tracking-[-0.01em] text-ink mt-5">
                {te('reeduc.title')}
              </h2>
              <div className="mt-5 text-muted text-base leading-[1.8] space-y-4">
                {(te.raw('reeduc.paras') as string[]).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div data-reveal>
              <div className="eyebrow">{te('expertise.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(24px,2.6vw,34px)] leading-[1.16] tracking-[-0.01em] text-ink mt-5">
                {te('expertise.title')}
              </h2>
              <div className="mt-5 text-muted text-base leading-[1.8] space-y-4">
                {(te.raw('expertise.paras') as string[]).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PrestationDetail>
  );
}
