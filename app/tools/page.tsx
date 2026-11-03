import { ContentPage } from '@/components/ContentPage';
import { searchMetadata } from '@/lib/search-metadata';

export const metadata = searchMetadata('Free Online Tools: Invoicing and Typing Practice',
  'Explore free tools built by Bijasa: an invoicing platform for small businesses and typing practice in English, Hindi and Marathi.', '/tools/');

export default function Tools() {
  return <ContentPage title="Useful software. Free to use." eyebrow="Built by Bijasa"
    intro="Try Bijasa software through two free tools: an invoicing platform for independent businesses and typing practice for Indian government exams. Each tool has its own website, guides and workspace.">
    <section>
      <h2><a href="https://invoicing.bijasa.com/">Bijasa Invoicing Platform</a></h2>
      <p>A free invoice maker for freelancers, studios and small businesses. Prepare invoices, quotations and other supported business documents, add your branding, and export a PDF. No signup or subscription is required; invoice records stay in your browser on your device.</p>
      <p>The platform helps prepare documents from the details you supply. It does not verify your business tax status, generate an IRN or file government returns. Keep backups of your locally stored records.</p>
      <p><a href="https://invoicing.bijasa.com/">Open the free invoicing platform →</a></p>
      <p><a href="https://invoicing.bijasa.com/gst-invoice-generator">GST invoice guide</a> · <a href="https://invoicing.bijasa.com/invoice-for-freelancers">Invoices for freelancers</a> · <a href="https://invoicing.bijasa.com/faq">Invoicing questions</a></p>
    </section>
    <section>
      <h2><a href="https://typing.bijasa.com/">Bijasa Typing</a></h2>
      <p>Free typing practice in English, Hindi and Marathi, with lessons, keyboard layouts, drills and mock tests for Indian government exams. Review speed, accuracy and individual mistakes to understand what to practise next.</p>
      <p>Exam profiles list their sources and verification information. Check the current official notice for your own exam before relying on a practice configuration. Bijasa Typing is not affiliated with an exam conducting body.</p>
      <p><a href="https://typing.bijasa.com/">Start free typing practice →</a></p>
      <p><a href="https://typing.bijasa.com/practice">Typing practice</a> · <a href="https://typing.bijasa.com/exam">Exam profiles</a> · <a href="https://typing.bijasa.com/layouts">Keyboard layouts</a></p>
    </section>
    <section>
      <h2>Why we build free tools</h2>
      <p>These tools give you a practical way to experience how Bijasa approaches interfaces and everyday workflows. If your business needs its own application, explore our <a href="/services/">software development services</a> or <a href="/#contact">tell us what you are building</a>.</p>
    </section>
  </ContentPage>;
}
