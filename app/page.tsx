import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import StoryMotion from '@/components/story/StoryMotion';
import { HeroTree, TaprootBend, SpineLine, SchemaRoots, schemaGeom, BranchGraph, CanopyStrip, BuildArt, GrowthRings, PlantTerminal } from '@/components/story/Sketch';
import { CONTACT_EMAIL, sectors } from '@/lib/content';

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
  { art: 'web', t: 'Web applications', d: 'Customer-facing products, portals and internal tools that run in any browser and stay fast as they grow.', e: ['Products and platforms', 'Customer portals', 'Dashboards and admin'] },
  { art: 'mobile', t: 'Mobile apps', d: 'iOS and Android apps for people on the move, designed for one hand, small screens and patchy networks.', e: ['iOS and Android', 'Offline-first', 'Field and on-site tools'] },
  { art: 'ai', t: 'AI applications and integrations', d: 'AI features with a clear job: search, extraction, classification and assisted drafting, measured against real tasks.', e: ['LLM applications', 'Document workflows', 'Evaluation and guard rails'] },
  { art: 'flow', t: 'Business software', d: 'The systems a team runs on every day: workflows, approvals, records, billing and the integrations between them.', e: ['Operations systems', 'Workflow automation', 'Replacing spreadsheets'] },
] as const;

const tables = ['understand_the_work', 'decide_hard_things_early', 'show_working_software', 'proven_tools', 'others_can_own_it', 'stay_after_launch'];
const branchNames = ['fintech', 'healthcare', 'logistics', 'climate-energy', 'commerce', 'education'];

const steps = [
  ['Understand', 'A first conversation about what you want to change. Then we learn how the work runs today, who is involved and what a good result looks like.'],
  ['Shape', 'We agree on what to build first, how it will be measured, what it costs and when you will see it. Scope and cost are settled before work starts.'],
  ['Build', 'Short cycles with working software at the end of each. You test it on real cases, and we adjust while change is still cheap.'],
  ['Grow', 'Launch, handover and support. We stay to measure how it is used, fix what gets in the way and plan what comes next.'],
] as const;

/** A section's commit on the main trunk. */
function Commit({ id, note }: { id: string; note: string }) {
  return <p className="commit"><span className="commit-dot" aria-hidden="true" /><span className="commit-ref">main · {id}</span><span className="commit-note">{note}</span></p>;
}

export default function Home() {
  const all = [...principles.roots, ...principles.reach];
  const { SW, SH, CW, colX, rowY } = schemaGeom;
  return <main id="main" className="home">
    <StoryMotion />
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker"><SeedMarkInline /><span>Bijasa comes from <em>bija</em>, the seed</span></p>
          <h1 className="hero-title">Software, built <span>from the roots up.</span></h1>
          <p className="hero-sub">Before we design a single screen, we learn how the work really happens and build the structure underneath it: the data, the rules, the connections. That is what lets software last, change and grow.</p>
          <div className="hero-act">
            <a className="btn btn-primary" href="#contact">Start a conversation</a>
            <p className="hero-direct">Or write to <a href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a></p>
          </div>
          <a className="hero-intern" href="/careers/internships/" data-track="internship_link" data-track-placement="home_hero"><b>students</b>Internships are open. Apply now →</a>
        </div>
        <figure className="hero-figure"><HeroTree /></figure>
      </div>
      <div className="container bend-wrap"><TaprootBend /></div>
    </section>

    <div className="trunk" data-grow>
      <div className="spine" aria-hidden="true">
        <SpineLine />
        <div className="head"><svg viewBox="-4 -32 44 52"><path d="M7.5 2 V -10 A11 14 0 0 1 29.5 -10 C29.5 4 19.5 12 7.5 18" fill="none" stroke="#c3773e" strokeWidth="9" strokeLinecap="round" /></svg><span>HEAD</span></div>
      </div>

      <section className="section philosophy dark" id="philosophy">
        <span className="anchor" id="approach" aria-hidden="true" />
        <div className="container railed">
          <Commit id="philosophy" note="the roots" />
          <div className="sec-head">
            <h2>Most of what makes software good is the part nobody sees.</h2>
            <p className="sec-lede">Our name comes from <em>bija</em>, a seed. What grows depends on the roots, so that is where we put our effort. Six beliefs shape every project, whatever its size.</p>
          </div>
          <div className="schema" data-reveal style={{ ['--sw' as string]: SW, ['--sh' as string]: SH }}>
            <SchemaRoots />
            <ol className="tables">
              {all.map(([t, d], i) => {
                const col = i % 3, row = i < 3 ? 0 : 1;
                return <li key={t} className="table-card" style={{ left: `${(colX[col] / SW) * 100}%`, top: `${(rowY[row] / SH) * 100}%`, width: `${(CW / SW) * 100}%`, ['--i' as string]: i }}>
                  <p className="table-name"><span aria-hidden="true">⚿</span>{row ? 'long_reach' : 'deep_roots'}.<wbr />{tables[i]}</p>
                  <div className="table-body">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>;
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="section sectors" id="sectors">
        <span className="anchor" id="domains" aria-hidden="true" />
        <div className="container railed">
          <Commit id="sectors" note="the branches" />
          <div className="sec-head">
            <h2>Bijasa works across sectors. The discipline underneath stays the same.</h2>
            <p className="sec-lede">Every sector has its own rules, risks and vocabulary. We learn them first, then apply the same engineering care to all of them.</p>
          </div>
          <ul className="gitlog">
            {sectors.map((s, i) => <li key={s.t} data-reveal>
              <BranchGraph name={branchNames[i]} lane={(i % 2) as 0 | 1} i={i} />
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>)}
          </ul>
          <p className="sector-note">Not on this list? The approach travels. <a href="#contact">Tell us about your sector.</a></p>
        </div>
      </section>

      <section className="section build" id="capabilities">
        <div className="container railed">
          <Commit id="build" note="what grows" />
          <div className="sec-head">
            <h2>Any kind of custom software, built to the same standard.</h2>
          </div>
          <div className="canopy" data-reveal><CanopyStrip /></div>
          <div className="build-grid">
            {builds.map((b, i) => <article key={b.t} data-reveal style={{ ['--i' as string]: i * 0.4 }}>
              <BuildArt art={b.art} />
              <h3>{b.t}</h3>
              <p>{b.d}</p>
              <ul>{b.e.map(x => <li key={x}>{x}</li>)}</ul>
            </article>)}
          </div>
          <div className="build-foot">
            <p>Underneath all of it: cloud platforms, data pipelines and delivery practices that keep software running. <a href="/services/">See all services</a></p>
          </div>
          <p className="products-note" id="products"><span className="anchor" id="tools" aria-hidden="true" />We also build and run a few products of our own. <a href="/products/">See our products</a></p>
          <p className="products-note" id="internships">Students: we run remote internships in software development and marketing. <a href="/careers/internships/" data-track="internship_link" data-track-placement="home_build">See internships and apply</a></p>
        </div>
      </section>

      <section className="section process dark" id="process">
        <span className="anchor" id="expertise" aria-hidden="true" />
        <div className="container railed">
          <Commit id="process" note="how it grows" />
          <div className="sec-head">
            <h2>One conversation first. Working software soon after.</h2>
          </div>
          <div className="rings-layout">
            <div className="rings" data-reveal><GrowthRings labels={steps.map(s => s[0].toLowerCase())} /></div>
            <ol className="steps">
              {steps.map(([t, d], i) => <li key={t}>
                <span className="num">ring {String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container railed contact-layout">
          <aside>
            <Commit id="contact" note="plant the seed" />
            <h2>Tell us what you want to change.</h2>
            <p>A new product, a system that has outgrown its spreadsheet, an AI idea you want to test, or a question you are still working through. Start wherever you are.</p>
            <div className="terminal" data-reveal><PlantTerminal /></div>
            <dl className="contact-direct">
              <div><dt>email</dt><dd><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`} data-track="contact_handoff" data-track-method="email_button">{CONTACT_EMAIL}</a></dd></div>
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
    </div>
  </main>;
}

function SeedMarkInline() {
  return <svg className="kicker-seed" viewBox="-2 -32 40 52" aria-hidden="true" focusable="false"><path d="M7.5 2 V -10 A11 14 0 0 1 29.5 -10 C29.5 4 19.5 12 7.5 18" fill="none" stroke="#c3773e" strokeWidth="9" strokeLinecap="round" /></svg>;
}
