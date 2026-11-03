import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/ContentPage';
import { services } from '@/lib/services';
import { searchMetadata } from '@/lib/search-metadata';

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return searchMetadata(service.name, service.description, `/services/${slug}/`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const url = `https://bijasa.com/services/${slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service', '@id': `${url}#service`,
    name: service.name, description: service.intro, url,
    provider: { '@id': 'https://bijasa.com/#organization' },
  };
  return <ContentPage title={service.name} eyebrow="Bijasa services" intro={service.intro}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    {service.sections.map(section => <section key={section.heading}>
      <h2>{section.heading}</h2><p>{section.text}</p>
    </section>)}
    <section>
      <h2>Discuss your project</h2>
      <p>Describe the outcome you want and the constraints you already know. We can use that context to discuss a sensible next step.</p>
      <p><a href="/#contact">Contact Bijasa →</a></p>
    </section>
  </ContentPage>;
}
