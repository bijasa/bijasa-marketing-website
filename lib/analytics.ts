// Google Analytics 4. Loaded only after the visitor accepts cookies (see CookieConsent).

export const GA_ID = 'G-VQ2CJHF54W';
export const CONSENT_KEY = 'bj-consent'; // 'granted' | 'denied'
export const OPEN_CONSENT_EVENT = 'bj:open-consent';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function readConsent(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(v: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* storage blocked: choice lasts for this page view only */
  }
}

let loaded = false;

export function loadAnalytics() {
  if (loaded || !GA_ID) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Removes GA cookies (used when a visitor withdraws consent). */
export function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
}

/** Sends a GA event if analytics is active; no-op otherwise. */
export function track(name: string, params?: Record<string, string | number>) {
  window.gtag?.('event', name, params ?? {});
}
