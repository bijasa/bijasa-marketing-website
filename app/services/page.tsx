import { ContentPage } from '@/components/ContentPage';
import { services } from '@/lib/services';
import { searchMetadata } from '@/lib/search-metadata';

export const metadata = searchMetadata('Software Development Services',
  'Explore Bijasa software development services: web and mobile applications, cloud platforms, DevOps, data engineering and AI.', '/services/');

export default function Services() {
  return <ContentPage title="Software built around your work." eyebrow="Services"
    intro="Bijasa is a software company working across product strategy, engineering, design, cloud platforms and data. Start with the problem your business needs to solve, then build the foundations to support it.">
    {services.map(service => <section key={service.slug}>
      <h2><a href={`/services/${service.slug}/`}>{service.name}</a></h2>
      <p>{service.intro}</p>
      <p><a href={`/services/${service.slug}/`}>Explore {service.name.toLowerCase()} →</a></p>
    </section>)}
    <section>
      <h2>From discovery to ongoing use</h2>
      <p>Product strategy and discovery help define what to build. Design systems and UX make the interface consistent and usable. Security and compliance readiness need attention while the system is being designed, and maintenance keeps it useful after launch.</p>
      <p>Tell us about your current workflow, the people who use it and the outcome you need. That provides a practical starting point for discussing scope, priorities and delivery.</p>
      <p><a href="/#contact">Talk to Bijasa about your project →</a></p>
    </section>
    <section>
      <h2>Try something we have built</h2>
      <p>Our free invoicing and typing tools offer a hands-on way to explore Bijasa software. <a href="/tools/">Explore the free tools</a> or read the <a href="/work/">product case studies</a>.</p>
    </section>
  </ContentPage>;
}
