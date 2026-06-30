import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.privacy' });
  return buildPageMetadata({
    locale,
    href: '/politique-confidentialite',
    title: t('title'),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages.privacy');

  const sections = [
    { title: t('dataTitle'), text: t('dataText') },
    { title: t('cookiesTitle'), text: t('cookiesText') },
    { title: t('mapsTitle'), text: t('mapsText') },
    { title: t('rightsTitle'), text: t('rightsText') },
  ];

  return (
    <>
      <PageHeader title={t('title')} />
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl space-y-10">
          <p className="text-muted leading-[1.8]">{t('intro')}</p>
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="display font-normal text-2xl text-ink mb-3">{s.title}</h2>
              <p className="text-muted leading-[1.8]">{s.text}</p>
            </section>
          ))}
          <p className="text-sm text-muted/70 italic border-t border-line pt-6">
            {t('note')}
          </p>
        </div>
      </Container>
    </>
  );
}
