import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import RootsDiagram from '@/components/RootsDiagram';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, sectors } from '@/lib/content';

export const metadata: Metadata = { title: 'Bijasa | Custom Software, Built From the Roots Up', alternates: { canonical: 'https://bijasa.com/' } };

const principles = {
  roots: [
    ['Understand the work before the code', 'We start with the people who will use the software and the way their work really runs. The real process is rarely the one in the document, and the gap is where most projects go wrong.'],
    ['Decide the hard things early', 'The data model, permissions, integrations and what happens when something fails. They are invisible on a screen and the most expensive things to change later, so we settle them first.'],
    ['Show working software, not slides', 'You see real screens running on real data within the first weeks, and every few weeks after that. Feedback arrives while it is still cheap to act on.'],
  ],
  reach: [
    ['Use proven tools, and new ones when they earn it', 'Boring technology where reliability matters. AI and newer tools where they measurably help, with a person in the loop wherever a wrong answer would cost something.'],
    ['Build it so others can own it', 'Readable code, written decisions and a handover your own team can run with. You should never need us just to understand what you have.'],
    ['Stay for what comes after launch', 'Launch is the first day people depend on the software. We watch how it is used, fix what gets in the way and help it grow with you.'],
  ],
} as const;

const builds = [
  { t: 'Web applications', d: 'Customer-facing products, portals and internal tools that run in any browser and stay fast as they grow.', e: ['Products and platforms', 'Customer portals', 'Dashboards and admin'] },
  { t: 'Mobile apps', d: 'iOS and Android apps for people on the move, designed for one hand, small screens and patchy networks.', e: ['iOS and Android', 'Offline-first', 'Field and on-site tools'] },
  { t: 'AI applications and integrations', d: 'AI features with a clear job: search, extraction, classification and assisted drafting, measured against real tasks.', e: ['LLM applications', 'Document workflows', 'Evaluation and guard rails'] },
  { t: 'Business software', d: 'The systems a team runs on every day: workflows, approvals, records, billing and the integrations between them.', e: ['Operations systems', 'Workflow automation', 'Replacing spreadsheets'] },
] as const;

const steps = [
  ['Understand', 'A first conversation about what you want to change. Then we learn how the work runs today, who is involved and what a good result looks like.'],
  ['Shape', 'We agree on what to build first, how it will be measured, what it costs and when you will see it. Scope and cost are settled before work starts.'],
  ['Build', 'Short cycles with working software at the end of each. You test it on real cases, and we adjust while change is still cheap.'],
  ['Grow', 'Launch, handover and support. We stay to measure how it is used, fix what gets in the way and plan what comes next.'],
] as const;

export default function Home() {
  return <main id="main" className="home">
    <section className="hero" id="top">
      <div className="container">
        <p className="kicker"><span className="kicker-mark" aria-hidden="true" />Bijasa · Software engineering firm</p>
        <h1 className="hero-title">Software, built <span>from the roots up.</span></h1>
        <div className="hero-row">
          <p className="hero-sub">Before we design a single screen, we learn how the work really happens and build the structure underneath it: the data, the rules, the connections. That is what lets software last, change and grow.</p>
          <div className="hero-act">
            <a className="btn" href="#contact">Start a conversation</a>
            <p className="hero-direct">Or write to <a href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a><br />Call <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a></p>
          </div>
        </div>
      </div>
      <div className="container roots-wrap"><RootsDiagram /></div>
    </section>

    <section className="section philosophy" id="philosophy">
      <span className="anchor" id="approach" aria-hidden="true" />
      <div className="container">
        <div className="sec-head">
          <p className="label">Philosophy</p>
          <h2>Most of what makes software good is the part nobody sees.</h2>
        </div>
        <p className="sec-lede">Our name comes from <em>bija</em>, a seed. What grows depends on the roots, so that is where we put our effort. Six beliefs shape every project, whatever its size.</p>
        <div className="beliefs">
          {(['roots', 'reach'] as const).map((k, col) => <div key={k} className="beliefs-col">
            <h3 className="beliefs-h">{k === 'roots' ? 'Deep roots' : 'Long reach'}<span>{k === 'roots' ? 'What we do below the surface' : 'What that makes possible'}</span></h3>
            <ol start={col * 3 + 1}>
              {principles[k].map(([t, d], i) => <li key={t}>
                <span className="num">{String(col * 3 + i + 1).padStart(2, '0')}</span>
                <div><h4>{t}</h4><p>{d}</p></div>
              </li>)}
            </ol>
          </div>)}
        </div>
      </div>
    </section>

    <section className="section sectors" id="sectors">
      <span className="anchor" id="domains" aria-hidden="true" />
      <div className="container">
        <div className="sec-head">
          <p className="label">Sectors</p>
          <h2>Bijasa works across sectors. The discipline underneath stays the same.</h2>
        </div>
        <p className="sec-lede">Every sector has its own rules, risks and vocabulary. We learn them first, then apply the same engineering care to all of them.</p>
        <ul className="sector-list">
          {sectors.map(s => <li key={s.t}>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>)}
        </ul>
        <p className="sector-note">Not on this list? The approach travels. <a href="#contact">Tell us about your sector.</a></p>
      </div>
    </section>

    <section className="section build" id="capabilities">
      <div className="container">
        <div className="sec-head">
          <p className="label">What we build</p>
          <h2>Any kind of custom software, built to the same standard.</h2>
        </div>
        <div className="build-grid">
          {builds.map(b => <article key={b.t}>
            <h3>{b.t}</h3>
            <p>{b.d}</p>
            <ul>{b.e.map(x => <li key={x}>{x}</li>)}</ul>
          </article>)}
        </div>
        <div className="build-foot">
          <p>Underneath all of it: cloud platforms, data pipelines and delivery practices that keep software running. <a href="/services/">See all services</a></p>
        </div>
        <p className="products-note" id="products"><span className="anchor" id="tools" aria-hidden="true" />We also build and run a few products of our own. <a href="/products/">See our products</a></p>
      </div>
    </section>

    <section className="section process" id="process">
      <span className="anchor" id="expertise" aria-hidden="true" />
      <div className="container">
        <div className="sec-head">
          <p className="label">How we work</p>
          <h2>One conversation first. Working software soon after.</h2>
        </div>
        <ol className="steps">
          {steps.map(([t, d], i) => <li key={t}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section contact" id="contact">
      <div className="container contact-layout">
        <aside>
          <p className="label label-on-blue">Contact</p>
          <h2>Tell us what you want to change.</h2>
          <p>A new product, a system that has outgrown its spreadsheet, an AI idea you want to test, or a question you are still working through. Start wherever you are.</p>
          <dl className="contact-direct">
            <div><dt>Email</dt><dd><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a></dd></div>
            <div><dt>Phone</dt><dd><a className="contact-phone" href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a></dd></div>
          </dl>
          <SocialLinks />
          <div className="engagement-note">
            <h3>Ways to work together</h3>
            <p>A short discovery project, a fixed build or ongoing development and support. We agree on scope and cost before any work starts.</p>
          </div>
        </aside>
        <ContactForm />
      </div>
    </section>
  </main>;
}
