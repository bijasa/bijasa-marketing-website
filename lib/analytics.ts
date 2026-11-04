// Only fixed event names, routes and enum values may reach GA4.
export const GA_ID = 'G-VQ2CJHF54W';
export const CONSENT_KEY = 'bj-consent';
export const OPEN_CONSENT_EVENT = 'bj:open-consent';
const SOURCE_KEY = 'bj-attribution-source';
type Consent = 'granted' | 'denied' | null;
type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag; } }

const routes: Record<string, string> = {
  '/': 'Bijasa', '/privacy': 'Privacy', '/tools': 'Free tools',
  '/services': 'Software development services',
  '/services/web-mobile-development': 'Web and mobile development',
  '/services/cloud-platforms-devops': 'Cloud platforms and DevOps',
  '/services/data-engineering-ai': 'Data engineering and AI',
  '/work': 'Product case studies',
  '/work/invoicing-platform': 'Invoicing platform case study',
  '/work/typing-practice': 'Typing practice case study',
};
const studies: Record<string, string> = {
  '/work/invoicing-platform': 'invoicing_platform', '/work/typing-practice': 'typing_practice',
};
const rules: Record<string, Record<string, readonly string[]>> = {
  nav_click: { section: ['tools', 'domains', 'capabilities', 'expertise', 'contact'] },
  tool_open: { tool: ['invoicing', 'typing'] },
  case_study_open: { case_study: ['invoicing_platform', 'typing_practice'] },
  case_study_view: { case_study: ['invoicing_platform', 'typing_practice'] },
  enquiry_cta_click: { entry_point: ['home', 'services', 'tools', 'case_study', 'other'] },
  contact_start: {}, contact_form_ready: {},
  generate_lead: { method: ['gmail', 'outlook', 'mail_app', 'copy', 'email_button'] },
};
let sessionConsent: Consent | undefined;
let loaded = false;
let lastPath = '';
let context: Record<string, string> | null = null;

export function analyticsAvailable() {
  return typeof window !== 'undefined' &&
    ['bijasa.com', 'www.bijasa.com'].includes(window.location.hostname);
}
export function readConsent(): Consent {
  if (sessionConsent !== undefined) return sessionConsent;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch { return null; }
}
export function saveConsent(value: 'granted' | 'denied') {
  sessionConsent = value;
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* This visit only. */ }
}
export function refreshConsent() {
  sessionConsent = undefined;
  return readConsent();
}
function normalise(path: string) {
  let value = path.split('?')[0].split('#')[0];
  while (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  return value || '/';
}
export function safeAnalyticsPage(path: string) {
  const value = normalise(path);
  return Object.hasOwn(routes, value)
    ? { path: value, title: routes[value] }
    : { path: '/other', title: 'Other page' };
}
function referrerOrigin() {
  try {
    const url = new URL(document.referrer);
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : '';
  } catch { return ''; }
}
function sourceProduct() {
  const referrer = referrerOrigin();
  const via = new URLSearchParams(window.location.search).get('via');
  const incoming = via === 'invoicing' || referrer === 'https://invoicing.bijasa.com' ? 'invoicing'
    : via === 'typing' || referrer === 'https://typing.bijasa.com' ? 'typing' : null;
  try {
    if (incoming) window.sessionStorage.setItem(SOURCE_KEY, incoming);
    const saved = window.sessionStorage.getItem(SOURCE_KEY);
    return saved === 'invoicing' || saved === 'typing' ? saved : 'direct_or_external';
  } catch { return incoming ?? 'direct_or_external'; }
}
export function clearAnalyticsCookies() {
  try {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('bijasa_marketing_ga') && !name.startsWith('_ga')) continue;
      for (const domain of ['', window.location.hostname, '.' + window.location.hostname]) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' +
          (domain ? '; Domain=' + domain : '');
      }
    }
  } catch { /* Storage may be blocked. */ }
}
export function disableAnalytics() {
  clearCampaign();
  Reflect.set(window, 'ga-disable-' + GA_ID, true);
  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
  } catch { /* Never interrupt an enquiry. */ }
  clearAnalyticsCookies();
  try { window.sessionStorage.removeItem(SOURCE_KEY); } catch { /* Storage blocked. */ }
  lastPath = '';
  context = null;
}
function initialise(next: Record<string, string>) {
  Reflect.set(window, 'ga-disable-' + GA_ID, false);
  if (loaded) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // Google's queue expects an Arguments payload.
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('set', next);
  window.gtag('config', GA_ID, {
    ...next, send_page_view: false,
    allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_domain: 'none', cookie_prefix: 'bijasa_marketing',
    cookie_expires: 15552000, cookie_flags: 'SameSite=Lax;Secure',
  });
  const script = document.createElement('script');
  script.async = true;
  script.referrerPolicy = 'no-referrer';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);
  loaded = true;
}
// Only these public campaign labels can reach GA4. Never forward raw query values.
const campaignLinks: Record<string, readonly [string, string, string]> = {
  combined_launch: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  invoicing_launch: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  typing_launch: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  invoicing_case_study: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  engineering_story: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  project_enquiry: ['linkedin', 'organic_social', 'bijasa_tools_launch'],
  invoice_review: ['bijasa_content', 'referral', 'bijasa_tools_launch'],
  practice_routine: ['bijasa_content', 'referral', 'bijasa_tools_launch'],
  adviser_review: ['direct_outreach', 'email', 'bijasa_tools_launch'],
  educator_review: ['direct_outreach', 'email', 'bijasa_tools_launch'],
  project_examples: ['direct_outreach', 'email', 'bijasa_tools_launch'],
  delivery_check: ['qa', 'internal_test', 'bijasa_analytics_qa'],
};
const campaignStorageKey = 'bj-campaign.v1';
let campaignChoice: string | null = null;
function knownCampaign(value: string): boolean {
  return Object.prototype.hasOwnProperty.call(campaignLinks, value);
}
function campaignFields(): Record<string, string> {
  try {
    const query = new URLSearchParams(window.location.search);
    const content = query.get('utm_content') ?? '';
    const definition = knownCampaign(content) ? campaignLinks[content] : undefined;
    if (definition && query.get('utm_source') === definition[0] &&
        query.get('utm_medium') === definition[1] && query.get('utm_campaign') === definition[2]) {
      campaignChoice = content;
      try { window.sessionStorage.setItem(campaignStorageKey, content); } catch { /* Memory only. */ }
    }
    if (!campaignChoice) {
      const restored = window.sessionStorage.getItem(campaignStorageKey);
      if (restored && knownCampaign(restored)) campaignChoice = restored;
    }
  } catch { /* Blocked storage cannot interrupt the product. */ }
  const definition = campaignChoice && knownCampaign(campaignChoice) ? campaignLinks[campaignChoice] : undefined;
  return definition ? {
    campaign_source: definition[0], campaign_medium: definition[1],
    campaign_name: definition[2], campaign_content: campaignChoice!,
  } : {};
}
function clearCampaign() {
  campaignChoice = null;
  try { window.sessionStorage.removeItem(campaignStorageKey); } catch { /* Storage may be blocked. */ }
  try {
    window.gtag?.('set', {
      campaign_source: undefined, campaign_medium: undefined,
      campaign_name: undefined, campaign_content: undefined,
    });
  } catch { /* Withdrawing consent must always work. */ }
}

export function trackPage(pathname: string) {
  if (!analyticsAvailable() || readConsent() !== 'granted') return;
  const page = safeAnalyticsPage(pathname);
  if (lastPath === page.path) return;
  const next = {
    page_location: window.location.origin + page.path,
    page_title: page.title + ' | Bijasa',
    page_referrer: referrerOrigin(),
    source_product: sourceProduct(),
    ...campaignFields(),
  };
  try {
    initialise(next);
    context = next;
    window.gtag?.('set', context);
    window.gtag?.('event', 'page_view', context);
    lastPath = page.path;
    const study = studies[page.path];
    if (study) track('case_study_view', { case_study: study });
  } catch { /* Analytics must never break the site. */ }
}
export function loadAnalytics() { trackPage(window.location.pathname); }
export function track(name: string, params: Record<string, string | number> = {}) {
  if (!analyticsAvailable() || readConsent() !== 'granted' || !loaded || !Object.hasOwn(rules, name)) return;
  const safe: Record<string, string> = {};
  for (const [key, allowed] of Object.entries(rules[name])) {
    const value = params[key];
    if (typeof value === 'string' && allowed.includes(value)) safe[key] = value;
  }
  try { window.gtag?.('event', name, { ...context, ...safe }); } catch { /* No impact on navigation. */ }
}
export function trackLink(href: string) {
  if (!analyticsAvailable() || readConsent() !== 'granted') return;
  let url: URL;
  try { url = new URL(href, window.location.origin); } catch { return; }
  if (!['https:', 'http:'].includes(url.protocol)) return;
  if (url.hostname === 'invoicing.bijasa.com') { track('tool_open', { tool: 'invoicing' }); return; }
  if (url.hostname === 'typing.bijasa.com') { track('tool_open', { tool: 'typing' }); return; }
  if (url.origin !== window.location.origin) return;
  const path = normalise(url.pathname);
  if (Object.hasOwn(studies, path)) track('case_study_open', { case_study: studies[path] });
  if (path === '/' && url.hash === '#contact') {
    const current = safeAnalyticsPage(window.location.pathname).path;
    const entry = current === '/' ? 'home' : current.startsWith('/work/') ? 'case_study'
      : current.startsWith('/services') ? 'services' : current === '/tools' ? 'tools' : 'other';
    track('enquiry_cta_click', { entry_point: entry });
  }
}

