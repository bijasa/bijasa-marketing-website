'use client';

import { useEffect, useState } from 'react';
import {
  OPEN_CONSENT_EVENT,
  clearAnalyticsCookies,
  loadAnalytics,
  readConsent,
  saveConsent,
  track,
} from '@/lib/analytics';

/**
 * Cookie banner + analytics loader. Google Analytics only loads after "Accept".
 * Also sends click events for any element with data-track="event_name"
 * (extra params from data-track-* attributes).
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c === 'granted') loadAnalytics();
    if (c === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith('track') && k !== 'track' && v) params[k.slice(5).toLowerCase()] = v;
      }
      track(el.dataset.track!, params);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  function choose(v: 'granted' | 'denied') {
    const before = readConsent();
    saveConsent(v);
    setOpen(false);
    if (v === 'granted') loadAnalytics();
    else if (before === 'granted') {
      // GA can't be unloaded from a running page: clear its cookies and reload without it.
      clearAnalyticsCookies();
      location.reload();
    }
  }

  if (!open) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-t" aria-describedby="consent-d">
      <div className="consent-in">
        <div>
          <div id="consent-t" className="consent-t">
            Cookies
          </div>
          <p id="consent-d">
            We&rsquo;d like to use Google Analytics cookies to understand how people find and use this site. Nothing
            loads unless you accept. <a href="/privacy/">Privacy policy</a>
          </p>
        </div>
        <div className="consent-b">
          <button type="button" className="btn" onClick={() => choose('granted')}>
            Accept
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => choose('denied')}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

/** Link-style button that reopens the banner. */
export function CookieSettingsLink({ label = 'Cookie settings' }: { label?: string }) {
  return (
    <button type="button" className="footer-link" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {label}
    </button>
  );
}
