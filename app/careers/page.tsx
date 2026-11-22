import { ContentPage } from '@/components/ContentPage';
import { searchMetadata } from '@/lib/search-metadata';

export const metadata = searchMetadata('Careers and Internships',
  'Careers at Bijasa, a software engineering firm. Remote internships are open now in software development and marketing, with a path to full-time roles.', '/careers/', '/og-internships.png');

export default function Careers() {
  return <ContentPage title="Careers at Bijasa." eyebrow="Join the team"
    intro="We are a small software team that likes to grow people from the roots up. Most people join us through an internship first.">
    <section>
      <h2><a href="/careers/internships/">Internships: open now</a></h2>
      <p>Remote, unpaid internships for students in software development and in marketing and business development. Real projects, a mentor, weekly check-ins and a completion certificate. Strong interns may be offered a full-time role. We never charge students a fee.</p>
      <p><a className="btn btn-primary" href="/careers/internships/">See internships and apply</a></p>
    </section>
    <section>
      <h2>Full-time roles</h2>
      <p>No open full-time roles right now. If you think you would fit, write to <a href="mailto:hello@bijasa.com?subject=Careers%20at%20Bijasa">hello@bijasa.com</a> with your work and what you want to build.</p>
    </section>
  </ContentPage>;
}
