import { searchMetadata } from '@/lib/search-metadata';
import { TreeVignette } from '@/components/story/Sketch';
import { CONTACT_EMAIL } from '@/lib/content';

export const metadata = searchMetadata('Software and Marketing Internships (Remote, Unpaid)',
  'Remote internships for students in software development (React, Node.js, TypeScript) and marketing. Real projects, a mentor and a certificate. No fee, ever.', '/careers/internships/', '/og-internships.png');

const DATE_POSTED = '2026-11-22';
const VALID_THROUGH = '2027-05-31';

const roles = [
  {
    id: 'software-development-intern',
    title: 'Software Development Intern',
    seats: 'Most of the 5 seats',
    who: 'Students of computer science, IT, electronics or any branch who already write some code.',
    work: [
      'Build and test features for web and mobile apps with React, Next.js, Node.js and TypeScript.',
      'Work on live products: retail billing software, a free invoicing tool and a typing practice platform.',
      'Write automated tests, fix bugs and deploy to cloud hosting.',
      'Use Git and GitHub with code reviews, as a working team does.',
      'Help with AI and LLM integration work and write technical documentation.',
    ],
    skills: ['JavaScript or TypeScript basics', 'HTML and CSS', 'Git (or willing to learn in week one)'],
  },
  {
    id: 'marketing-business-development-intern',
    title: 'Marketing and Business Development Intern',
    seats: 'One or two seats',
    who: 'Students of management, commerce, mass media or any branch who write clearly and like talking to people.',
    work: [
      'Plan and write content for LinkedIn, social media and the company website.',
      'Work on search engine optimisation (SEO) and track results with analytics tools.',
      'Research markets and find potential clients for software services and products.',
      'Write outreach emails and proposals and support client conversations.',
      'Prepare product demos, presentations and case studies.',
    ],
    skills: ['Clear written English', 'Comfort with Google Docs and Sheets', 'Curiosity about software and business'],
  },
] as const;

const facts = [
  ['Mode', 'Online, work from anywhere in India'],
  ['Stipend', 'Unpaid. Strong interns may be offered a full-time role.'],
  ['Fee', 'None. Bijasa never charges students.'],
  ['Duration', '2 to 6 months, fitted to your college calendar'],
  ['Time', 'About 15 to 25 hours a week'],
  ['You get', 'A mentor, weekly check-ins and a completion certificate'],
] as const;

const faqs = [
  ['Do I have to pay anything?', 'No. Bijasa does not charge any fee from students, for applying, for training or for the certificate. If anyone asks you for money in our name, it is not us. Write to us.'],
  ['Is it paid?', 'No, the internship is unpaid. Interns who do strong work may be offered a full-time position when the internship ends.'],
  ['Can I apply through the AICTE Internship Portal?', 'Yes. Bijasa is registered as a recruiter on the AICTE National Internship Portal. You can apply there or by email to us directly. Both reach the same team.'],
  ['Who can apply?', 'Students in any year of a diploma, undergraduate or postgraduate course in India, and recent graduates. Skills matter more than your branch.'],
  ['Will I work on real software?', 'Yes. Software interns work in the same codebases as our team, with code review. Marketing interns publish real content for Bijasa and its products.'],
  ['When do internships start?', 'We take interns in small batches through the year. Apply any time; we reply to every application.'],
] as const;

function applyHref(role: string) {
  const subject = encodeURIComponent(`Internship application: ${role}`);
  const body = encodeURIComponent([
    'Name:', 'College and course:', 'Year of study:', 'City:', 'Hours per week I can give:', 'Preferred start date and duration:',
    'Links (GitHub, portfolio, LinkedIn):', '', 'Why I want this internship:', '', '(Please attach your resume as a PDF.)',
  ].join('\n'));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ...roles.map(r => ({
      '@type': 'JobPosting',
      '@id': `https://bijasa.com/careers/internships/#${r.id}`,
      title: r.title,
      description: `<p>${r.who}</p><ul>${r.work.map(w => `<li>${w}</li>`).join('')}</ul><p>Unpaid, remote internship. No fee is charged. Mentor, weekly check-ins and a completion certificate.</p>`,
      datePosted: DATE_POSTED,
      validThrough: `${VALID_THROUGH}T23:59:59+05:30`,
      employmentType: 'INTERN',
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      directApply: true,
      hiringOrganization: { '@type': 'Organization', '@id': 'https://bijasa.com/#organization', name: 'Bijasa', sameAs: 'https://bijasa.com/', logo: 'https://bijasa.com/icon-512.png' },
      url: `https://bijasa.com/careers/internships/#${r.id}`,
    })),
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bijasa.com/' },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://bijasa.com/careers/' },
        { '@type': 'ListItem', position: 3, name: 'Internships', item: 'https://bijasa.com/careers/internships/' },
      ],
    },
  ],
};

export default function Internships() {
  return <main id="main" className="legal internships">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <div className="legal-wrap">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/careers/">Careers</a> / <span aria-current="page">Internships</span></nav>
      <header className="legal-head">
        <div>
          <div className="eyebrow">Internships · open now</div>
          <h1 className="legal-h">Grow your first roots with us.</h1>
        </div>
        <div className="legal-tree"><TreeVignette /></div>
      </header>
      <p className="legal-lede">Remote internships for students in software development and marketing. You work on real products with our team, with a mentor beside you. No fee, ever.</p>
      <div className="actions intern-cta">
        <a className="btn btn-primary" href="#apply">Apply now</a>
        <a className="btn btn-ghost" href="#roles">See the roles</a>
      </div>

      <section aria-labelledby="facts-h">
        <h2 id="facts-h">At a glance</h2>
        <dl className="intern-facts">
          {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>

      <span id="roles" className="anchor" aria-hidden="true" />
      {roles.map(r => <section key={r.id} id={r.id} aria-labelledby={`${r.id}-h`}>
        <p className="intern-seats">{r.seats}</p>
        <h2 id={`${r.id}-h`}>{r.title}</h2>
        <p>{r.who}</p>
        <h3>What you will do</h3>
        <ul>{r.work.map(w => <li key={w}>{w}</li>)}</ul>
        <h3>Good to have</h3>
        <ul>{r.skills.map(s => <li key={s}>{s}</li>)}</ul>
        <p><a className="btn" href={applyHref(r.title)} data-track="internship_apply" data-track-role={r.id.startsWith('software') ? 'software' : 'marketing'}>Apply for this role</a></p>
      </section>)}

      <section aria-labelledby="how-h">
        <h2 id="how-h">How it works</h2>
        <ol>
          <li><strong>Apply.</strong> Email us your resume, or apply on the AICTE Internship Portal.</li>
          <li><strong>Short task.</strong> A small task close to the real work, done in your own time.</li>
          <li><strong>Call.</strong> A 20-minute video call about the task and what you want to learn.</li>
          <li><strong>Start.</strong> You get a mentor, a first project and a weekly check-in.</li>
          <li><strong>Finish.</strong> A completion certificate, and a full-time offer for strong work.</li>
        </ol>
      </section>

      <section id="apply" aria-labelledby="apply-h" className="intern-apply">
        <h2 id="apply-h">Apply</h2>
        <p>Send your resume (PDF) and a few lines about yourself to <a href={applyHref('Software Development Intern')} data-track="internship_apply" data-track-role="software">{CONTACT_EMAIL}</a>. Put the role in the subject. We reply to every application, usually within a week.</p>
        <div className="actions">
          <a className="btn btn-primary" href={applyHref('Software Development Intern')} data-track="internship_apply" data-track-role="software">Apply: software</a>
          <a className="btn btn-ghost" href={applyHref('Marketing and Business Development Intern')} data-track="internship_apply" data-track-role="marketing">Apply: marketing</a>
        </div>
        <p>You can also apply through the <a href="https://internship.aicte-india.org/" target="_blank" rel="noopener noreferrer">AICTE National Internship Portal</a>.</p>
      </section>

      <section aria-labelledby="faq-h">
        <h2 id="faq-h">Questions</h2>
        <dl className="intern-faq">
          {faqs.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}
        </dl>
      </section>

      <section aria-label="Explore Bijasa">
        <h2>Learn about us first</h2>
        <p><a href="/#philosophy">How we think</a> · <a href="/products/">Products you could work on</a> · <a href="/services/">What we build for clients</a> · <a href="/work/">Case studies</a></p>
      </section>
    </div>
  </main>;
}
