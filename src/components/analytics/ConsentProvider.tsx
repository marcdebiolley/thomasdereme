'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { readConsent, writeConsent, type Consent } from './consent';

type ConsentContextValue = {
  consent: Consent;
  setConsent: (value: 'granted' | 'denied') => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: 'unset',
  setConsent: () => {},
});

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const serverSnapshot = (): Consent => 'unset';

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Read the cookie via an external store - avoids setState-in-effect and
  // hydrates cleanly ('unset' on the server, real value on the client).
  const consent = useSyncExternalStore(subscribe, readConsent, serverSnapshot);

  const setConsent = useCallback((value: 'granted' | 'denied') => {
    writeConsent(value);
    window.gtag?.('consent', 'update', {
      analytics_storage: value === 'granted' ? 'granted' : 'denied',
    });
    listeners.forEach((l) => l());
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => useContext(ConsentContext);
