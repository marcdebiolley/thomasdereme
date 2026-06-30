'use client';

import Script from 'next/script';

/**
 * GA4 with Consent Mode v2. Consent defaults to DENIED; storage is only
 * granted once the visitor accepts (see ConsentProvider / ConsentBanner).
 * Renders nothing when NEXT_PUBLIC_GA_ID is unset.
 */
export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            var m = document.cookie.match(/(?:^|; )td_consent=([^;]+)/);
            if (m && m[1] === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
