import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import ProductSwitcher from '@/components/ProductSwitcher';
import { CONTACT_EMAIL, caps } from '@/lib/content';
import { caseStudies } from '@/lib/case-studies';

export const metadata: Metadata = { title: 'Software for Indian Shops, Garages and Small Businesses | Bijasa', alternates: { canonical: 'https://bijasa.com/' } };

const serviceLinks: Record<string, string> = {
  'Web & mobile engineering': '/services/web-mobile-development/',
  'Cloud platforms & DevOps': '/services/cloud-platforms-devops/',
  'Data engineering & AI': '/services/data-engineering-ai/',
};

const process = [
  ['Listen', 'We learn how your work runs today, who does what and where it gets stuck.'],
  ['Plan', 'We agree on what to build first, what it costs and how we will know it works.'],
  ['Build', 'You see working screens early and often, not a big reveal at the end.'],
  ['Test', 'We try it with real people and real data before anyone depends on it.'],
  ['Launch and support', 'We hand it over, show your team how it works and stay to fix and improve it.'],
];

export default function Home() {
  return <main id="main">
    <section className="hero" id="top">
      <div className="container">
        <h1>We build software for Indian shops, garages and the people who run them.</h1>
        <p className="hero-sub">Bijasa makes its own products and builds custom software for other businesses. Every product below is real software we designed and built ourselves.</p>
        <div className="actions">
          <a className="btn" href="#contact">Tell us what you need</a>
          <a className="text-link" href="#products">See all four products</a>
        </div>
        <ProductSwitcher />
      </div>
    </section>

    <section className="section products" id="products">
      <span className="anchor" id="tools" aria-hidden="true" />
      <div className="container">
        <h2>Our products</h2>
        <p className="section-intro">We build our own software first. It is how we learn what small businesses actually need, and it is proof you can see before you hire us.</p>
        <ul className="product-index">
          {caseStudies.map(p => {
            const external = p.url.startsWith('http');
            return <li className={`product-row tone-${p.tone}`} key={p.slug}>
              <div>
                <div className="product-name"><span className="swatch" aria-hidden="true" /><h3>{p.brand}</h3></div>
                <p className="product-for">{p.for}</p>
              </div>
              <div className="product-what">
                <p>{p.intro}</p>
                <ul>{p.outcomes.map(o => <li key={o}>{o}</li>)}</ul>
              </div>
              <div className="product-links">
                <span className="product-status">{p.status}</span>
                <a className="text-link" href={p.url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{p.cta}</a>
                <a className="text-link" href={`/work/${p.slug}/`}>Read the case study</a>
              </div>
            </li>;
          })}
        </ul>
      </div>
    </section>

    <section className="section" id="capabilities">
      <span className="anchor" id="domains" aria-hidden="true" />
      <span className="anchor" id="expertise" aria-hidden="true" />
      <span className="anchor" id="approach" aria-hidden="true" />
      <div className="container services-layout">
        <div>
          <h2>Software built for your business</h2>
          <p className="section-intro">The team that built these products can build yours. Bring a rough idea, a slow spreadsheet or an old system that needs replacing.</p>
          <a className="btn btn-ghost" href="/services/">All services</a>
        </div>
        <dl className="service-list">
          {caps.map(c => <div key={c.n}>
            <dt>{serviceLinks[c.t] ? <a href={serviceLinks[c.t]}>{c.t}</a> : c.t}</dt>
            <dd>{c.d}</dd>
          </div>)}
        </dl>
      </div>
    </section>

    <section className="section process" id="process">
      <div className="container">
        <h2>How we work</h2>
        <p className="section-intro">Five steps, the same for a small tool or a large system.</p>
        <ol className="process-list">{process.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </div>
    </section>

    <section className="section" id="contact">
      <div className="container contact-layout">
        <aside>
          <h2>Tell us what you need</h2>
          <p>A new product, an old system or a question you are still working through. Start wherever you are.</p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a>
          <SocialLinks />
          <div className="engagement-note">
            <h3>Ways to work together</h3>
            <p>A short planning project, a fixed build, or ongoing support. We agree on scope and cost before any work starts.</p>
          </div>
        </aside>
        <ContactForm />
      </div>
    </section>
  </main>;
}
