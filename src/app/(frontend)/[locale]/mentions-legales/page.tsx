import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { SITE, emailHref } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.legalNotice' });
  return buildPageMetadata({ locale, href: '/mentions-legales', title: t('title') });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages.legalNotice');

  return (
    <>
      <PageHeader title={t('title')} />
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl text-sm text-muted space-y-2 leading-relaxed">
          <p className="text-ink font-medium">Thomas Derême - Physiothérapeute</p>
          <p>
            {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality},
            Suisse
          </p>
          <p>
            <a href={emailHref} className="hover:text-ink transition-colors">
              {SITE.email}
            </a>{' '}
            ·{' '}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              {SITE.phone} (WhatsApp)
            </a>
          </p>
          <div className="pt-4 space-y-2">
            <p>{t('status')}</p>
            <p>{t('ide')}</p>
            <p>{t('vat')}</p>
            <p>{t('hosting')}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
