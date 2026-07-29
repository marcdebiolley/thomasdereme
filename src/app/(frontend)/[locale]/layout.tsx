import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Hanken_Grotesk, Spectral } from 'next/font/google';
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
/* Seule la 400 (titres, dont le H1 = élément LCP) est préchargée ; les
   graisses secondaires se chargent dès que le CSS s'applique, sans
   concurrencer le chemin critique. Même famille « Spectral » : les
   @font-face des trois loaders fusionnent. */
const serif = Spectral({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-spectral',
  display: 'swap',
});
const serifSecondary = Spectral({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  style: ['normal'],
  variable: '--font-spectral-secondary',
  display: 'swap',
  preload: false,
});
/* L'italique serif n'est utilisé qu'en 400 : loader séparé pour ne pas
   charger les italiques 300/500/600 (perf LCP mobile). */
const serifItalic = Spectral({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-spectral-italic',
  display: 'swap',
});
/* Police du monogramme « td » uniquement (charte TD8b) */
const logo = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['italic'],
  variable: '--font-logo',
  display: 'swap',
  /* Utilisée seulement pour le « td » du logo : pas besoin de la précharger. */
  preload: false,
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
    keywords: t.raw('keywords') as string[],
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
    <html
      lang={locale}
      className={`${sans.variable} ${serif.variable} ${serifSecondary.variable} ${serifItalic.variable} ${logo.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <ConsentProvider>
            <Header />
            <main id="content">{children}</main>
            <Footer />
            <ConsentBanner />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          </ConsentProvider>
        </NextIntlClientProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
