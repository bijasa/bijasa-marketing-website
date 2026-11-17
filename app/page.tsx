import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import { CONTACT_EMAIL } from '@/lib/content';
import { caseStudies } from '@/lib/case-studies';

export const metadata: Metadata = { title: 'Bijasa | Software Engineering, From Idea to Launch', alternates: { canonical: 'https://bijasa.com/' } };

const bySlug = Object.fromEntries(caseStudies.map(p => [p.slug, p]));

/* What we build. Tiles with a product are proven by software we shipped ourselves. */
const range = [
  { t: 'Web platforms', d: 'Browser apps people use every day, fast on any device.', proof: 'invoicing-platform', tone: 'cobalt', size: 'wide' },
  { t: 'Desktop apps', d: 'Installable software that keeps working offline.', proof: 'bijadex', tone: 'copper', size: 'tall' },
  { t: 'Operations systems', d: 'Workflows, roles and records that keep a team in step.', proof: 'gearshift', tone: 'navy', size: 'normal' },
  { t: 'Learning tools', d: 'Interactive practice with feedback that teaches.', proof: 'typing-practice', tone: 'lime', size: 'normal' },
  { t: 'Mobile apps', d: 'iOS and Android apps built for real hands and patchy networks.', tone: 'plain', size: 'normal' },
  { t: 'APIs and integrations', d: 'Connect the tools you already use so data moves on its own.', tone: 'plain', size: 'normal' },
  { t: 'Cloud and DevOps', d: 'Hosting, deployments and monitoring that grow with you.', tone: 'plain', size: 'wide', href: '/services/cloud-platforms-devops/' },
  { t: 'Data and AI', d: 'Dashboards, pipelines and AI features that earn their place.', tone: 'plain', size: 'wide', href: '/services/data-engineering-ai/' },
] as const;

const process = [
  ['Listen', 'We learn how your work runs today and what a good result looks like.'],
  ['Plan', 'We agree on what to build first, what it costs and how we will measure it.'],
  ['Build', 'You see working screens early and often, never one big reveal.'],
  ['Test', 'Real people and real data try it before anyone depends on it.'],
  ['Launch and support', 'We hand it over, show your team how it works and stay to improve it.'],
];

export default function Home() {
  return <main id="main">
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1><span>Ideas in.</span><span>Working</span><span>software out.</span></h1>
          <p className="hero-sub">Bijasa designs and builds software of every kind: web platforms, desktop and mobile apps, business systems, data and AI. We prove it by shipping our own products.</p>
          <div className="actions">
            <a className="btn" href="#contact">Start a project</a>
            <a className="btn btn-outline" href="#products">See our products</a>
          </div>
        </div>
        <div className="hero-stage" aria-hidden="true">
          {caseStudies.map((p, i) => <img key={p.slug} className={`stage-shot stage-${i}`} src={p.image} alt="" width={p.width} height={p.height} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />)}
        </div>
      </div>
    </section>

    <section className="section range" id="capabilities">
      <span className="anchor" id="domains" aria-hidden="true" />
      <div className="container">
        <h2>What we build</h2>
        <p className="section-intro">If it is software, we can build it. Where you see a product name, we have already shipped one ourselves.</p>
        <div className="range-grid">
          {range.map(r => {
            const p = 'proof' in r ? bySlug[r.proof] : null;
            const href = p ? `/work/${p.slug}/` : 'href' in r ? r.href : '/services/';
            return <a key={r.t} href={href} className={`tile tile-${r.tone} tile-${r.size}`}>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
              {p ? <span className="tile-proof">Proof: {p.brand}</span> : <span className="tile-proof">Learn more</span>}
            </a>;
          })}
        </div>
      </div>
    </section>

    <section className="products" id="products">
      <span className="anchor" id="tools" aria-hidden="true" />
      {caseStudies.map((p, i) => {
        const external = p.url.startsWith('http');
        return <article key={p.slug} className={`product-band band-${p.tone}`}>
          <div className={`container band-grid ${i % 2 ? 'band-flip' : ''}`}>
            <div className="band-copy">
              <p className="band-kind">{p.kind}</p>
              <h2>{p.brand}</h2>
              <p className="band-intro">{p.intro}</p>
              <ul>{p.outcomes.map(o => <li key={o}>{o}</li>)}</ul>
              <div className="actions">
                <a className="btn btn-on-band" href={p.url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{p.cta}</a>
                <a className="text-link" href={`/work/${p.slug}/`}>How we built it</a>
              </div>
            </div>
            <figure className="band-shot">
              <img src={p.image} alt={p.imageAlt} width={p.width} height={p.height} loading="lazy" decoding="async" />
            </figure>
          </div>
        </article>;
      })}
    </section>

    <section className="section process" id="process">
      <span className="anchor" id="expertise" aria-hidden="true" />
      <span className="anchor" id="approach" aria-hidden="true" />
      <div className="container">
        <h2>How we work</h2>
        <p className="section-intro">Five steps, the same for a small tool or a large system.</p>
        <ol className="process-list">{process.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </div>
    </section>

    <section className="section contact" id="contact">
      <div className="container contact-layout">
        <aside>
          <h2>Got an idea? Let’s build it.</h2>
          <p>A new product, an old system that needs replacing or a question you are still working through. Start wherever you are.</p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a>
          <SocialLinks />
          <div className="engagement-note">
            <h3>Ways to work together</h3>
            <p>A short planning project, a fixed build or ongoing support. We agree on scope and cost before any work starts.</p>
          </div>
        </aside>
        <ContactForm />
      </div>
    </section>
  </main>;
}
