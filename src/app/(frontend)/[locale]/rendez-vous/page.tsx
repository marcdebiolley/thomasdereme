import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { OneDocEmbed } from '@/components/booking/OneDocEmbed';
import { SITE, emailHref } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.booking' });
  return buildPageMetadata({ locale, href: '/rendez-vous', title: t('title') });
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages.booking');

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />
      <Container className="py-16 md:py-24 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <OneDocEmbed placeholder={t('widgetPlaceholder')} />
        </div>
        <aside className="text-sm text-muted space-y-4">
          <div>
            <p className="text-ink font-medium">
              {SITE.address.street} — {SITE.address.postalCode} {SITE.address.locality}
            </p>
            <p>Maison-B (cabinet Dr Burgener)</p>
          </div>
          <p>
            <a href={SITE.phoneHref} className="hover:text-ink transition-colors">
              {SITE.phone}
            </a>
          </p>
          <p>
            <a href={emailHref} className="hover:text-ink transition-colors">
              {SITE.email}
            </a>
          </p>
        </aside>
      </Container>
    </>
  );
}
