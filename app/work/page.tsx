import { ContentPage } from '@/components/ContentPage';
import { caseStudies } from '@/lib/case-studies';
import { searchMetadata } from '@/lib/search-metadata';
import styles from './work.module.css';

export const metadata = searchMetadata('Product Case Studies: Invoicing and Typing',
  'Explore two products designed and built by Bijasa: a free invoicing platform and multilingual typing practice. See the decisions behind the working software.', '/work/');

export default function Work() {
  return <ContentPage title="Software you can try." eyebrow="Product case studies"
    intro="Two products designed and built by Bijasa. Explore the problems behind them, the product decisions, and the working software.">
    {caseStudies.map(study => <section key={study.slug}>
      <h2><a href={`/work/${study.slug}/`}>{study.product}</a></h2>
      <p>{study.summary}</p>
      <a href={`/work/${study.slug}/`} aria-label={`Read the ${study.product} case study`}>
        <img className={styles.image} src={study.image} alt={study.imageAlt} width={1280} height={720} loading="lazy" decoding="async" />
      </a>
      <p><a href={`/work/${study.slug}/`}>Read the case study →</a></p>
    </section>)}
    <section>
      <h2>From a working product to your next project</h2>
      <p>These are Bijasa-owned products. They show our approach to interfaces, browser applications and detailed workflows. If your business needs software built around its own work, <a href="/#contact">tell us about the problem you want to solve</a>.</p>
    </section>
  </ContentPage>;
}
