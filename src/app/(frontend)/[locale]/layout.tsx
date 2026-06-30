import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hanken_Grotesk, Spectral } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { ConsentProvider } from '@/components/analytics/ConsentProvider';
import { ConsentBanner } from '@/components/analytics/ConsentBanner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import '../../globals.css';

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken',
  display: 'swap',
});
const serif = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('defaultTitle'), template: t('titleTemplate') },
    description: t('home.description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>
        {/* top accent bar */}
        <div className="h-2 bg-dark" />
        <NextIntlClientProvider>
          <ConsentProvider>
            <Header />
            <main id="content">{children}</main>
            <Footer />
            <ConsentBanner />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          </ConsentProvider>
        </NextIntlClientProvider>
        {/* bottom accent bar */}
        <div className="h-2 bg-dark" />
        <RevealObserver />
      </body>
    </html>
  );
}
