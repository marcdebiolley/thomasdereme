import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';
import { ConsentMap } from '@/components/map/ConsentMap';
import { SITE } from '@/lib/site';

function Figure({
  src,
  caption,
  className,
  priority,
}: {
  src: string;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure data-reveal className={className}>
      <div className="relative h-full w-full rounded-[14px] overflow-hidden">
        <Image
          src={src}
          alt={caption}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <figcaption className="ph mt-3">{caption}</figcaption>
    </figure>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.cabinet' });
  return buildPageMetadata({
    locale,
    href: '/le-cabinet',
    title: t('title'),
    description: t('metaDescription'),
  });
}

export default async function CabinetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CabinetPage');
  const spaces = t.raw('spaces') as { name: string; text: string }[];
  const equipments = t.raw('equipments') as { name: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      {/* Gallery */}
      <Container className="py-14 md:py-20">
        <Figure
          src="/images/entree.webp"
          caption={t('galleryEntree')}
          className="h-[260px] md:h-[440px] mb-6"
          priority
        />
        <div className="grid sm:grid-cols-3 gap-6">
          <Figure
            src="/images/salle.webp"
            caption={t('gallerySalle')}
            className="h-[280px] md:h-[360px]"
          />
          <Figure
            src="/images/sanitaires.webp"
            caption={t('gallerySanitaires')}
            className="h-[280px] md:h-[360px]"
          />
          <Figure
            src="/images/equipement.webp"
            caption={t('galleryEquipement')}
            className="h-[280px] md:h-[360px]"
          />
        </div>
      </Container>

      {/* Spaces */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="eyebrow">{t('spacesEyebrow')}</div>
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5 max-w-2xl">
            {t('spacesTitle')}
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mt-10">
            {spaces.map((s) => (
              <div key={s.name} className="border-t border-line pt-4">
                <dt className="display font-medium text-lg text-ink">{s.name}</dt>
                <dd className="text-muted leading-[1.7] mt-1">{s.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Equipment */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="eyebrow">{t('equipEyebrow')}</div>
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5 max-w-2xl">
            {t('equipTitle')}
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mt-10">
            {equipments.map((e) => (
              <div key={e.name} className="border-t border-line pt-4">
                <dt className="display font-medium text-lg text-ink">{e.name}</dt>
                <dd className="text-muted leading-[1.7] mt-1">{e.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Access */}
      <Container className="py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="eyebrow">{t('accessEyebrow')}</div>
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
            {t('accessTitle')}
          </h2>
          <p className="text-ink font-medium mt-6 text-lg">
            {SITE.address.street} — {SITE.address.postalCode} {SITE.address.locality}
          </p>
          <p className="text-muted leading-[1.8] mt-3 max-w-md">{t('accessText')}</p>
        </div>
        <div className="h-[280px] md:h-[340px]">
          <ConsentMap
            query={`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}`}
          />
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
