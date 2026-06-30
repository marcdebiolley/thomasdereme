import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { physiotherapyJsonLd } from '@/lib/jsonld';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Quote } from '@/components/sections/Quote';
import { CabinetSection } from '@/components/sections/CabinetSection';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return buildPageMetadata({
    locale,
    href: '/',
    title: t('home.title'),
    description: t('home.description'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={physiotherapyJsonLd()} />
      <Hero />
      <Services />
      <Quote />
      <CabinetSection />
      <Faq />
      <Contact />
    </>
  );
}
