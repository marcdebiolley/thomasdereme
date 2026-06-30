'use client';

import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';

type OdMessage = {
  'od-widget-id'?: string;
  'od-widget-height'?: number;
  'od-widget-ios'?: boolean;
  GA4?: { name: string; properties?: Record<string, unknown> };
};

/**
 * OneDoc booking widget. Lazy-loads the iframe, auto-resizes it from the
 * postMessage events, and forwards OneDoc's GA4 events to gtag (respecting
 * Consent Mode). Ported from OneDoc's official embed snippet.
 */
export function OneDocWidget({ locale = 'fr' }: { locale?: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const id = SITE.onedocWidgetId;

  useEffect(() => {
    if (!id) return;
    const iframe = ref.current;
    const src = `https://www.onedoc.ch/${locale}/widget/${id}`;
    if (iframe && iframe.src !== src) iframe.src = src;

    function onMessage(e: MessageEvent) {
      const data = e.data as OdMessage | undefined;
      if (!data || data['od-widget-id'] !== id || !iframe) return;

      const height = data['od-widget-height'];
      if (height) iframe.style.height = `${height}px`;
      if (data['od-widget-ios'] === true) {
        iframe.style.width = '100px';
        iframe.style.minWidth = '100%';
        iframe.setAttribute('scrolling', 'no');
      }

      const ev = data.GA4;
      if (ev?.name && typeof window.gtag === 'function') {
        window.gtag('event', ev.name, { ...(ev.properties ?? {}) });
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [id, locale]);

  if (!id) return null;

  return (
    <iframe
      ref={ref}
      id={`od-widget-${id}`}
      title="Réservation en ligne — OneDoc"
      src="about:blank"
      className="od-widget w-full rounded-2xl border border-line"
      style={{ maxWidth: 1024, height: 400 }}
    />
  );
}
