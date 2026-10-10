import type { Metadata } from 'next';
import { CookieSettingsLink } from '@/components/CookieConsent';
import { BSymbol } from '@/components/Logo';
import { CONTACT_EMAIL } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy policy — Bijasa',
  description: 'How bijasa.com handles your data: contact enquiries, cookies and Google Analytics.',
  alternates: { canonical: '/privacy/' },
};

const UPDATED = '10 October 2026';

export default function Privacy() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <>
      <header className="legal-nav">
        <a href="/" className="legal-home" aria-label="Bijasa home">
          <BSymbol ink="#f4f0e7" />
        </a>
        <a href="/" className="legal-back">
          ← Back to bijasa.com
        </a>
      </header>

      <main className="legal">
        <div className="legal-wrap">
          <div className="eyebrow">Privacy policy</div>
          <h1 className="legal-h">Your data, plainly.</h1>
          <p className="legal-lede">
            This page explains what information bijasa.com collects, why, and the choices you have. Last updated{' '}
            {UPDATED}.
          </p>

          <section>
            <h2>Who we are</h2>
            <p>
              This website is run by Bijasa (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For any privacy question or request,
              email {mail}.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <h3>When you contact us</h3>
            <p>
              The contact form does not send or store anything on our servers. When you press <em>Send message</em>,
              your browser prepares an email to {CONTACT_EMAIL} in the email service you choose (Gmail, Outlook or your
              own email app). We only receive what you choose to send: usually your name, email address, company and
              message. We use it to reply to you and discuss your enquiry, and keep it only as long as needed for that
              conversation and any work that follows.
            </p>
            <h3>Analytics, only with your consent</h3>
            <p>
              If you click <strong>Accept</strong> on our cookie banner, we use Google Analytics 4 to understand how
              people find and use the site. It records things like the pages you view, how you arrived (for example a
              search or a link), your general location (country or city), device and browser type, and clicks on our
              navigation and contact options. Google Analytics 4 does not store full IP addresses. We cannot identify
              you from this data and never use it for advertising.
            </p>
            <p>
              If you click <strong>Decline</strong>, or make no choice, Google Analytics is not loaded and no analytics
              cookies are set.
            </p>
            <h3>Hosting</h3>
            <p>
              The site is hosted on GitHub Pages. Like most web hosts, GitHub may log technical data such as your IP
              address when you load the site, to keep the service secure. See{' '}
              <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
                GitHub&rsquo;s privacy statement
              </a>
              . Our fonts are served from this site itself, so no font provider sees your visit.
            </p>
          </section>

          <section>
            <h2>Cookies and local storage</h2>
            <div className="legal-table" role="table" aria-label="Cookies used on this site">
              <div role="row" className="legal-row legal-row-h">
                <span role="columnheader">Name</span>
                <span role="columnheader">Purpose</span>
                <span role="columnheader">Duration</span>
              </div>
              <div role="row" className="legal-row">
                <span role="cell">
                  <code>bj-consent</code>
                </span>
                <span role="cell">Remembers your cookie choice (stored in your browser, not a cookie).</span>
                <span role="cell">Until you clear it</span>
              </div>
              <div role="row" className="legal-row">
                <span role="cell">
                  <code>_ga</code>
                </span>
                <span role="cell">Google Analytics: tells visits apart. Only after you accept.</span>
                <span role="cell">2 years</span>
              </div>
              <div role="row" className="legal-row">
                <span role="cell">
                  <code>_ga_VQ2CJHF54W</code>
                </span>
                <span role="cell">Google Analytics: keeps track of your session. Only after you accept.</span>
                <span role="cell">2 years</span>
              </div>
            </div>
            <p>
              You can change your choice at any time: <CookieSettingsLink label="open cookie settings" />. If you
              withdraw consent, we delete the analytics cookies from your browser.
            </p>
          </section>

          <section>
            <h2>Who else processes your data</h2>
            <p>
              Google (for analytics, if you accept), GitHub (hosting) and the email provider you choose to contact us
              with. Google may process analytics data outside your country, including in the United States, under its
              own data-protection safeguards. We do not sell or share your personal data with anyone else.
            </p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>
              Analytics data is kept for the period set in our Google Analytics account, at most 14 months, and then
              deleted automatically. Emails you send us are kept only as long as needed to handle your enquiry and any
              work that follows.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              Depending on where you live, including under India&rsquo;s Digital Personal Data Protection Act, 2023
              and the EU/UK GDPR, you can ask to access, correct or delete the personal data we hold about you, withdraw
              consent, or complain to your data-protection authority. Email {mail} and we will respond within 30 days.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>If we change this policy, we will update this page and the date at the top.</p>
          </section>
        </div>

        <footer className="legal-foot">
          <span>© 2026 Bijasa</span>
          <strong>Deep roots. Long reach.</strong>
        </footer>
      </main>
    </>
  );
}
