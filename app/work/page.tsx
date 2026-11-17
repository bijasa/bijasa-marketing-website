import { ContentPage } from '@/components/ContentPage';
import { caseStudies } from '@/lib/case-studies';
import { searchMetadata } from '@/lib/search-metadata';
import styles from './work.module.css';

export const metadata = searchMetadata('Products and Case Studies: Bijadex, GearShift, Invoicing and Typing',
  'Explore four products designed and built by Bijasa: Bijadex shop billing, GearShift workshop software, a free invoicing platform and multilingual typing practice.', '/work/');

export default function Work() {
  return <ContentPage title="Four products, built by Bijasa." eyebrow="Products and case studies"
    intro="Software for shops, workshops, freelancers and exam aspirants. Read the problem behind each one and the decisions we made building it.">
    {caseStudies.map(study => <section key={study.slug}>
      <h2><a href={`/work/${study.slug}/`}>{study.product}</a></h2>
      <p>{study.summary}</p>
      <a href={`/work/${study.slug}/`} aria-label={`Read the ${study.product} case study`}>
        <img className={styles.image} src={study.image} alt={study.imageAlt} width={study.width} height={study.height} loading="lazy" decoding="async" />
      </a>
      <p><a href={`/work/${study.slug}/`}>Read the {study.product} case study</a></p>
    </section>)}
    <section>
      <h2>From a working product to your next project</h2>
      <p>These are Bijasa-owned products. They show our approach to interfaces, browser applications and detailed workflows. If your business needs software built around its own work, <a href="/#contact">tell us about the problem you want to solve</a>.</p>
    </section>
  </ContentPage>;
}
