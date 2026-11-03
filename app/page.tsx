import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { CookieSettingsLink } from '@/components/CookieConsent';
import { BSymbol, HeroMark } from '@/components/Logo';
import ScrollEffects from '@/components/ScrollEffects';
import { CONTACT_EMAIL, caps, domains, teams } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Custom Software Development & Product Engineering | Bijasa',
  alternates: { canonical: 'https://bijasa.com/' },
};

export default function Home() {
  return (
    <>
      <nav id="bj-nav" className="nav" aria-label="Main">
        <a href="#top" id="bj-navb" className="nav-b" aria-label="Bijasa — back to top">
          <BSymbol ink="#f4f0e7" />
        </a>
        <div id="bj-links" className="nav-links">
          <a href="#tools" data-track="nav_click" data-track-section="tools">Free tools</a>
          <a href="#domains" data-track="nav_click" data-track-section="domains">Domains</a>
          <a href="#capabilities" data-track="nav_click" data-track-section="capabilities">Capabilities</a>
          <a href="#expertise" data-track="nav_click" data-track-section="expertise">Expertise</a>
          <a href="#contact" data-track="nav_click" data-track-section="contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="bj-hero" className="hero" aria-label="Bijasa">
          <div id="bj-stage" className="stage">
            <div id="top" style={{ position: 'absolute', top: 0 }} />
            <h1 className="sr-only">Bijasa — software company</h1>
            <HeroMark />
            <div id="bj-rule" className="hero-rule" />
            <p id="bj-tag" className="hero-tag">
              Deep roots. Long reach.
            </p>
            <div id="bj-cue" className="hero-cue" aria-hidden="true">
              Scroll
              <span />
            </div>
          </div>
        </section>

        <div id="bj-body" className="body">
          <div id="bj-track" className="track" aria-hidden="true">
            <div id="bj-fill" className="fill" />
            <div id="bj-head" className="head" />
          </div>

          <section id="approach" className="approach on-dark">
            <div className="wrap">
              <div data-rv className="eyebrow">
                Approach
              </div>
              <h2 data-rv className="statement">
                Software that grows from the ground up.
              </h2>
              <div className="pillars">
                <div data-rv className="pillar">
                  <div className="pillar-t">Deep roots.</div>
                  <p>We start with the foundation: clear thinking, honest architecture and code the next team can read.</p>
                </div>
                <div data-rv className="pillar copper">
                  <div className="pillar-t">Long reach.</div>
                  <p>Then we build outward, to more users, more markets and more years, without starting over.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="domains" className="sec on-bone">
            <div className="wrap domains-grid">
              <div className="domains-intro">
                <div className="eyebrow">Domains</div>
                <h2 className="h2">Where we operate.</h2>
                <p>Industries where the software has to be right, and has to last.</p>
              </div>
              <div>
                {domains.map((d) => (
                  <div key={d.n} data-focus className="domain">
                    <div className="domain-l">
                      <span className="domain-n">{d.n}</span>
                      <span className="domain-t">{d.t}</span>
                    </div>
                    <span className="domain-d">{d.d}</span>
                  </div>
                ))}
                <div className="close-rule" />
              </div>
            </div>
          </section>

          <section id="capabilities" className="sec on-dark caps">
            <div className="wrap">
              <div data-rv className="eyebrow">
                Capabilities
              </div>
              <h2 data-rv className="h2">
                Everything between idea and years of use.
              </h2>
              {caps.map((c) => (
                <div key={c.n} data-rv className="cap">
                  <div className="cap-n">{c.n}</div>
                  <div className="cap-t">{c.t}</div>
                  <div className="cap-d">{c.d}</div>
                </div>
              ))}
              <div className="close-rule" />
            </div>
          </section>

          <section id="expertise" className="sec on-bone expertise">
            <div className="wrap">
              <div data-rv className="eyebrow">
                Team expertise
              </div>
              <h2 data-rv className="h2">
                One team, five disciplines.
              </h2>
              <div className="teams">
                {teams.map((g) => (
                  <div key={g.t} data-rv className="team">
                    <div className="team-t">{g.t}</div>
                    <p>{g.d}</p>
                    <div className="team-s">{g.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="tools" className="sec on-dark caps tools" aria-labelledby="tools-heading">
            <div className="wrap">
              <div data-rv className="eyebrow">Free tools · Built by Bijasa</div>
              <h2 data-rv id="tools-heading" className="h2">Useful by design.</h2>
              <p data-rv className="cap-d tools-intro">
                Free tools for everyday work and practice. Built by Bijasa.
              </p>
              <a data-rv className="cap tool-link" href="https://invoicing.bijasa.com/">
                <span className="cap-n">01</span>
                <h3 className="cap-t">Invoicing Platform</h3>
                <span className="cap-d">
                  Create invoices, quotations and polished PDFs. Free to use, with your records stored on your device.
                  <span className="tool-action">Open invoicing ↗</span>
                </span>
              </a>
              <a data-rv className="cap tool-link" href="https://typing.bijasa.com/">
                <span className="cap-n">02</span>
                <h3 className="cap-t">Typing Practice</h3>
                <span className="cap-d">
                  Practise in English, Hindi and Marathi, with exam mocks, lessons and detailed feedback.
                  <span className="tool-action">Open typing practice ↗</span>
                </span>
              </a>
              <div className="close-rule" />
              <p className="tools-more"><a href="/tools/">Explore the tools and their guides →</a> · <a href="/work/">Read the product case studies →</a></p>
            </div>
          </section>

          <section id="contact" className="contact on-dark">
            <BSymbol ink="#241c13" className="ghost-b" />
            <div className="wrap">
              <h2 data-rv className="contact-h">
                Let&rsquo;s plant something.
              </h2>
              <div className="contact-grid">
                <ContactForm />
                <aside className="contact-aside">
                  <p>Prefer email? Write to us directly and we&rsquo;ll reply within two working days.</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Hello Bijasa')}`}
                    className="btn"
                    data-track="generate_lead"
                    data-track-method="email_button"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </aside>
              </div>
              <footer className="footer">
                <span>
                  © 2026 Bijasa · <a href="/services/" className="footer-link">Services</a> · <a href="/tools/" className="footer-link">Free tools</a> · <a href="/privacy/" className="footer-link">Privacy</a> · <CookieSettingsLink />
                </span>
                <strong>Deep roots. Long reach.</strong>
              </footer>
            </div>
          </section>
        </div>
      </main>

      <ScrollEffects />
    </>
  );
}
