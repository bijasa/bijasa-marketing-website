const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/analytics.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function setup({ consent = null, host = 'bijasa.com', blocked = false } = {}) {
  const local = new Map(consent ? [['bj-consent', consent]] : []);
  const session = new Map();
  const appended = [], cookies = [];
  const storage = map => ({
    getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value),
    removeItem: key => map.delete(key),
  });
  const window = {
    location: { hostname: host, origin: 'https://' + host, pathname: '/', search: '?email=PrivateCanary' },
    localStorage: blocked ? { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } } : storage(local),
    sessionStorage: storage(session),
  };
  const document = {
    referrer: 'https://search.example/private?message=PrivateCanary',
    createElement: () => ({}), head: { appendChild: script => appended.push(script) },
  };
  Object.defineProperty(document, 'cookie', {
    get: () => '_ga=old; bijasa_marketing_ga=old; unrelated=keep',
    set: value => cookies.push(value),
  });
  const module = { exports: {} };
  vm.runInNewContext(compiled, { window, document, module, exports: module.exports, URL, URLSearchParams, Date, Reflect });
  return { a: module.exports, window, document, local, session, appended, cookies,
    queue: () => (window.dataLayer || []).map(value => Array.from(value)) };
}
test('no script or events before consent, after refusal, or on an unknown host', () => {
  for (const input of [{}, { consent: 'denied' }, { consent: 'granted', host: 'localhost' }]) {
    const h = setup(input); h.a.loadAnalytics(); h.a.track('generate_lead', { method: 'gmail' });
    assert.equal(h.appended.length, 0); assert.equal(h.queue().length, 0);
  }
});
test('one manual page view, no advertising, and host-only prefixed cookies', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics(); h.a.trackPage('/');
  assert.equal(h.appended.length, 1);
  assert.equal(h.queue().filter(x => x[0] === 'event' && x[1] === 'page_view').length, 1);
  const config = h.queue().find(x => x[0] === 'config')[2];
  assert.equal(config.send_page_view, false); assert.equal(config.cookie_domain, 'none');
  assert.equal(config.allow_google_signals, false); assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(h.appended[0].referrerPolicy, 'no-referrer');
  assert.equal(h.queue().find(x => x[0] === 'consent' && x[1] === 'default')[2].ad_storage, 'denied');
});
test('private URL values, arbitrary events and parameters never reach the queue', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics();
  h.a.trackPage('/private/PrivateCanary?customer=PrivateCanary');
  h.a.track('generate_lead', { method: 'gmail', name: 'PrivateCanary', message: 'PrivateCanary' });
  h.a.track('generate_lead', { method: 'PrivateCanary' });
  h.a.track('PrivateCanary', { message: 'PrivateCanary' });
  h.a.track('constructor', { message: 'PrivateCanary' });
  const body = JSON.stringify(h.queue());
  assert.ok(!body.includes('PrivateCanary'));
  assert.ok(body.includes('https://bijasa.com/other'));
  assert.ok(body.includes('https://search.example'));
  assert.equal(h.a.safeAnalyticsPage('constructor').path, '/other');
});
test('mail-compose and unrelated outbound URLs are ignored', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics(); const count = h.queue().length;
  h.a.trackLink('https://mail.google.com/mail/?body=PrivateCanary');
  h.a.trackLink('mailto:hello@bijasa.com?body=PrivateCanary');
  h.a.trackLink('javascript:PrivateCanary');
  assert.equal(h.queue().length, count);
});
test('owned-tool and case-study links send fixed enums without raw URLs', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics();
  h.a.trackLink('https://invoicing.bijasa.com/doc/PrivateCanary');
  h.a.trackLink('https://typing.bijasa.com/history/PrivateCanary');
  h.a.trackLink('/work/invoicing-platform/?email=PrivateCanary');
  const events = h.queue().filter(x => x[0] === 'event');
  assert.ok(events.some(x => x[1] === 'tool_open' && x[2].tool === 'invoicing'));
  assert.ok(events.some(x => x[1] === 'tool_open' && x[2].tool === 'typing'));
  assert.ok(events.some(x => x[1] === 'case_study_open' && x[2].case_study === 'invoicing_platform'));
  assert.ok(!JSON.stringify(events).includes('PrivateCanary'));
});
test('case-study page views and enquiry clicks retain an owned-product referral', () => {
  const h = setup({ consent: 'granted' });
  h.window.location.search = '?via=typing&email=PrivateCanary';
  h.a.trackPage('/work/typing-practice/');
  h.window.location.pathname = '/work/typing-practice/';
  h.a.trackLink('/#contact');
  const events = h.queue().filter(x => x[0] === 'event');
  assert.ok(events.some(x => x[1] === 'case_study_view' && x[2].source_product === 'typing'));
  assert.ok(events.some(x => x[1] === 'enquiry_cta_click' && x[2].entry_point === 'case_study'));
  assert.ok(!JSON.stringify(events).includes('PrivateCanary'));
});
test('withdrawal stops events immediately without reloading or deleting unrelated cookies', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics();
  h.a.saveConsent('denied'); h.a.disableAnalytics(); const count = h.queue().length;
  h.a.track('generate_lead', { method: 'copy' }); h.a.trackPage('/tools');
  assert.equal(h.queue().length, count);
  assert.equal(h.window['ga-disable-G-VQ2CJHF54W'], true);
  assert.ok(h.cookies.every(x => !x.startsWith('unrelated=')));
  assert.equal(h.session.size, 0);
});
test('cross-tab withdrawal is honoured and re-consent reuses the tag', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics();
  h.local.set('bj-consent', 'denied'); assert.equal(h.a.refreshConsent(), 'denied');
  h.a.disableAnalytics(); h.a.saveConsent('granted'); h.a.loadAnalytics();
  assert.equal(h.appended.length, 1); assert.equal(h.window['ga-disable-G-VQ2CJHF54W'], false);
});
test('blocked storage permits an explicit choice for this visit', () => {
  const h = setup({ blocked: true }); h.a.loadAnalytics(); assert.equal(h.appended.length, 0);
  h.a.saveConsent('granted'); h.a.loadAnalytics(); assert.equal(h.appended.length, 1);
});
test('third-party failures cannot interrupt contact actions or withdrawal', () => {
  const h = setup({ consent: 'granted' }); h.a.loadAnalytics();
  h.window.gtag = () => { throw Error('blocked tag'); };
  assert.doesNotThrow(() => h.a.track('contact_form_ready'));
  assert.doesNotThrow(() => h.a.trackPage('/tools'));
  assert.doesNotThrow(() => h.a.disableAnalytics());
});
