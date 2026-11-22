import { searchMetadata } from '@/lib/search-metadata';
import { posts, formatDate } from '@/lib/blog';
import { TreeVignette } from '@/components/story/Sketch';

const post = posts.find(p => p.slug === 'how-we-build')!;
const url = `https://bijasa.com/blog/${post.slug}/`;

const base = searchMetadata('Most Software Fails Before the First Line of Code', post.description, `/blog/${post.slug}/`, post.image);
export const metadata = { ...base, openGraph: { ...base.openGraph, type: 'article', publishedTime: post.date, authors: [post.author.name] } };

const questions = [
  ['Who will you talk to before you design anything?', 'If the answer is only the person paying, the software will match the brief and miss the work.'],
  ['What will you decide in the first two weeks?', 'Listen for the data model, roles and permissions, integrations and failure cases. If you only hear "screens", be careful.'],
  ['When will I see working software on real data?', 'Weeks, not months. A clickable mock-up is useful, but it is not the same thing.'],
  ['Where will you use AI, and where will you not?', 'A good team can say both. "Everywhere" is not an answer.'],
  ['Who will own the code, and what will I get at handover?', 'Clear, written terms on who owns the source code, plus the decisions and documentation another team would need to take over.'],
  ['What happens in the month after launch?', 'Someone should be watching how the software is used and fixing what gets in the way.'],
  ['Can I see something you built and still run?', 'The best evidence of how a team builds is software it has to live with itself.'],
] as const;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: `https://bijasa.com${post.image}`,
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: post.author.name, jobTitle: 'Founder and CEO', worksFor: { '@id': 'https://bijasa.com/#organization' } },
      publisher: { '@id': 'https://bijasa.com/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bijasa.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bijasa.com/blog/' },
        { '@type': 'ListItem', position: 3, name: 'How we build', item: url },
      ],
    },
  ],
};

export default function HowWeBuild() {
  return <main id="main" className="legal article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <div className="legal-wrap">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog/">Blog</a> / <span aria-current="page">How we build</span></nav>
      <header className="legal-head">
        <div>
          <div className="eyebrow">How we work</div>
          <h1 className="legal-h article-h">Most software fails before the first line of code.</h1>
        </div>
        <div className="legal-tree"><TreeVignette /></div>
      </header>
      <p className="article-meta">By <strong>{post.author.name}</strong>, {post.author.role} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read</p>

      <div className="prose">
        <p className="lede">Most software projects do not fail in the code. They fail in the first two weeks, before anyone writes a line. Here is the pattern we see, the six rules we use to avoid it, and seven questions you can ask any software team before you hire them, including us.</p>

        <h2>It usually goes like this</h2>
        <p>A business asks for &ldquo;an app&rdquo;. Someone draws the screens. Everyone looks at them and nods, because screens are easy to agree on. The project gets estimated by counting screens, and the team starts building them.</p>
        <p>Months later the screens look good. And the team that was meant to use the software still keeps the old spreadsheet open in another tab, because the software does not match how their work really runs. An order that needs two approvals only has one. A field that is &ldquo;always filled in&rdquo; is empty half the time. The report the owner checks every Monday cannot be produced at all.</p>
        <p>None of that is a coding problem. Nobody looked underneath the screens.</p>

        <h2>Why it happens</h2>
        <p>Screens are the visible part of software, so they get the attention. But what decides whether software works is invisible: how the data is shaped, who is allowed to do what, how it connects to the systems around it, and what happens when something goes wrong. These are the hardest things to change later, and the easiest to skip when everyone is looking at a mock-up.</p>
        <p>The second reason is the document. Most projects start from a written description of a process. The real process is almost never the one in the document. People have workarounds, exceptions and habits that nobody wrote down because nobody thought of them as &ldquo;the process&rdquo;. Software built from the document breaks on exactly those cases.</p>

        <h2>Why we are called Bijasa</h2>
        <p><em>Bija</em> means seed. What grows from a seed depends on its roots, long before anything shows above the ground. That is where we put our effort. These are the six rules we follow on every project, whatever its size.</p>

        <h3><span>01</span> Learn the work before the code</h3>
        <p>We start with the people who will use the software, not only the person who asked for it. We watch how the work runs today, including the workarounds. The gap between the written process and the real one is where most projects go wrong, so we look for it first.</p>

        <h3><span>02</span> Decide the hard things first</h3>
        <p>The data model, roles and permissions, integrations, and what happens when something fails. You cannot see any of these on a screen, and they are the most expensive things to change once software is in use. We settle them in the first weeks, write them down, and agree on them with you.</p>

        <h3><span>03</span> Show working software, not slides</h3>
        <p>You see real screens running on real data within the first weeks, and again every few weeks after that. A demo on real data surfaces problems that no slide or mock-up can, and you find them while they are still cheap to fix.</p>

        <h3><span>04</span> Use proven tools, and new ones when they earn it</h3>
        <p>Boring technology where reliability matters. AI where it measurably helps: search, reading documents, sorting and drafting. Wherever a wrong answer would cost money or trust, a person stays in the loop. We test AI features against real tasks before we ship them, not against a demo.</p>

        <h3><span>05</span> Build it so others can run it</h3>
        <p>Readable code, written decisions and a handover your own team can run with. Who owns the source code is agreed in writing before work starts: some clients take full ownership, others prefer that we keep and maintain it. Either way, you should never need us just to understand what you have.</p>

        <h3><span>06</span> Stay for what comes after launch</h3>
        <p>Launch is not the finish line. It is the first day people depend on the software. We watch how it is used, fix what gets in the way and help it grow as your work changes.</p>

        <h2>We hold our own products to the same rules</h2>
        <p>Alongside client work, we build and run a few products of our own. They are where we test these rules on ourselves.</p>
        <ul>
          <li><strong>Bijadex</strong>, our billing and stock software for retail counters, keeps working when the internet does not. A shop counter cannot wait for a network, so that decision came before any screen was designed.</li>
          <li><strong>Bijasa Invoicing</strong> asks for no signup, and records stay on your own device. Nobody should have to hand over their business data to make one invoice.</li>
          <li><strong>Bijasa Typing</strong> explains each mistake in English, Hindi and Marathi, because a score alone does not teach anyone what to practise next.</li>
        </ul>
        <p>Each of those is a decision about the roots: how the software behaves when things go wrong, where the data lives, and what the person using it actually needs. You can read how we built them in our <a href="/work/">case studies</a>.</p>

        <h2>What this looks like if we work together</h2>
        <ol>
          <li><strong>Understand.</strong> A first conversation about what you want to change. Then we learn how the work runs today, who is involved, and what a good result looks like.</li>
          <li><strong>Shape.</strong> We agree on what to build first, how it will be measured, what it costs and when you will see it. Scope and cost are settled before work starts.</li>
          <li><strong>Build.</strong> Short cycles with working software at the end of each. You test it on real cases, and we adjust while change is still cheap.</li>
          <li><strong>Grow.</strong> Launch, handover and support. We stay to measure how it is used and plan what comes next.</li>
        </ol>

        <h2>Seven questions to ask any software team before you hire them</h2>
        <p>Whoever you work with, these questions will tell you quickly whether they start from the screens or from the roots.</p>
        <ol className="qa">
          {questions.map(([q, a]) => <li key={q}><strong>{q}</strong> {a}</li>)}
        </ol>

        <h2>None of this is flashy</h2>
        <p>It is just what makes software last. If you are planning something, a new product, a system that has outgrown its spreadsheet, or an AI idea you want to test, we would be glad to hear about it.</p>
      </div>

      <section className="article-cta" aria-label="Start a conversation">
        <h2>Tell us what you want to change.</h2>
        <p>One conversation first. Working software soon after.</p>
        <p className="actions"><a className="btn btn-primary" href="/#contact">Start a conversation</a><a className="btn btn-ghost" href="/services/">See our services</a></p>
      </section>
    </div>
  </main>;
}
