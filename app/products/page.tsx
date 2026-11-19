import { caseStudies } from '@/lib/case-studies';
import { searchMetadata } from '@/lib/search-metadata';

export const metadata = searchMetadata('Products Made by Bijasa',
  'Products Bijasa builds and runs itself: Bijadex desktop billing, GearShift operations software, a free invoicing platform and free typing practice.', '/products/');

/* Why each product exists, in a line. The rest comes from the case study data. */
const why: Record<string, string> = {
  bijadex: 'Desktop software that keeps working when the internet does not.',
  gearshift: 'One clear screen for a place where many jobs run at once.',
  'invoicing-platform': 'A free tool that asks for nothing: no signup, and records that stay on your own device.',
  'typing-practice': 'Three languages, many keyboard layouts and feedback that explains each mistake.',
};

export default function Products() {
  return <main id="main" className="products-page">
    <section className="pp-hero">
      <div className="container">
        <p className="label">Products</p>
        <h1>Things we make for ourselves.</h1>
        <div className="pp-intro">
          <p>Most of our work is software for other people. Alongside it, we build and run a few products of our own. They are where we practise what we preach, and where we try an idea on ourselves before we recommend it to anyone else.</p>
          <p>They are not what we sell. If you need something built around your own work, <a href="/#contact">start a conversation</a>.</p>
        </div>
      </div>
    </section>

    <section className="pp-list" aria-label="Products">
      <div className="container">
        {caseStudies.map((p, i) => {
          const external = p.url.startsWith('http');
          return <article key={p.slug} className="pp-item">
            <div className="pp-meta">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <p>{p.kind}<br /><span>{p.status}</span></p>
            </div>
            <div className="pp-copy">
              <h2>{p.brand}</h2>
              <p className="pp-why">{why[p.slug]}</p>
              <p>{p.intro}</p>
              <div className="actions">
                <a className="btn" href={p.url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{p.cta}</a>
                <a className="text-link" href={`/work/${p.slug}/`}>Read the case study</a>
              </div>
            </div>
            <figure className="pp-shot">
              <img src={p.image} alt={p.imageAlt} width={p.width} height={p.height} loading={i < 1 ? 'eager' : 'lazy'} decoding="async" />
            </figure>
          </article>;
        })}
      </div>
    </section>

    <section className="pp-cta">
      <div className="container">
        <h2>Need something built around your own work?</h2>
        <a className="btn btn-light" href="/#contact">Start a conversation</a>
      </div>
    </section>
  </main>;
}
