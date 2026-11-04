import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/ContentPage';
import { caseStudies } from '@/lib/case-studies';
import { searchMetadata } from '@/lib/search-metadata';
import styles from '../work.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map(study => ({ slug: study.slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find(item => item.slug === slug);
  if (!study) notFound();
  const metadata = searchMetadata(study.searchTitle, study.description, `/work/${slug}/`);
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: 'article', images: [{ url: study.image, width: 1280, height: 720, alt: study.imageAlt }] },
    twitter: { card: 'summary_large_image', title: `${study.searchTitle} | Bijasa`, description: study.description, images: [study.image] },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find(item => item.slug === slug);
  if (!study) notFound();
  const url = `https://bijasa.com/work/${slug}/`;
  const other = caseStudies.find(item => item.slug !== slug)!;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article',
    '@id': `${url}#article`, headline: study.searchTitle,
    description: study.description, mainEntityOfPage: url,
    image: `https://bijasa.com${study.image}`,
    datePublished: '2026-11-03',
    author: { '@type': 'Organization', name: 'Bijasa', url: 'https://bijasa.com/' },
    publisher: { '@id': 'https://bijasa.com/#organization' },
    about: { '@type': 'SoftwareApplication', name: study.product, url: study.url },
  };
  return <ContentPage title={study.name} eyebrow="Product case study · Built by Bijasa" intro={study.intro}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <figure className={styles.figure}>
      <img className={styles.image} src={study.image} alt={study.imageAlt} width={1280} height={720} loading="eager" decoding="async" />
      <figcaption className={styles.caption}>{study.caption}</figcaption>
    </figure>
    <dl className={styles.facts}>
      <div><dt>Ownership</dt><dd>Bijasa-owned product</dd></div>
      <div><dt>Audience</dt><dd>{study.audience}</dd></div>
      <div><dt>Focus</dt><dd>{study.focus}</dd></div>
    </dl>
    {study.sections.map(section => <section key={section.heading}>
      <h2>{section.heading}</h2>
      {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </section>)}
    <section>
      <h2>Engineering structure and tradeoffs</h2>
      <div className="architecture-flow" aria-label="Product workflow">{(slug === 'invoicing-platform' ? ['Document inputs', 'Browser-local records', 'Branded PDF / backup export'] : ['Language & keyboard input', 'Practice / mock session', 'Mistake feedback & next practice']).map((step,i) => <div key={step}><span className="mono">0{i+1}</span><strong>{step}</strong></div>)}</div>
      <p>{slug === 'invoicing-platform' ? 'Keeping records in the browser avoids a central invoice database and an account requirement for the core workflow. The tradeoff is that storage belongs to that device and browser: users need exportable backups, and records are not automatically synced.' : 'The practice experience connects multilingual input to session feedback. Core practice can work offline after an initial visit; account and group features have separate online requirements. Keyboard behavior and skipped-word handling need to preserve useful feedback across scripts.'}</p>
      <p>These descriptions are based on the verified product behavior documented here. Framework versions, infrastructure details and private implementation specifics have not been verified and are intentionally not presented as facts.</p>
    </section>
    <section>
      <h2>What is live</h2>
      <ul className={styles.outcomes}>{study.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
      <p>Explore the product and its published guides:</p>
      <ul className={styles.outcomes}>{study.evidence.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
    </section>
    <section>
      <h2>Build around your own workflow</h2>
      <p>Need an application shaped around your business? Explore our <a href={study.relatedService}>{study.relatedServiceLabel.toLowerCase()} services</a> or <a href="/#contact">discuss your project with Bijasa</a>.</p>
      <p><a href={`/work/${other.slug}/`}>Next case study: {other.product} →</a></p>
      <p><a href="/work/">All product case studies →</a></p>
    </section>
  </ContentPage>;
}
