import type { ReactNode } from 'react';
import { BSymbol } from '@/components/Logo';

export function ContentPage({ title, eyebrow, intro, children }: {
  title: string; eyebrow: string; intro: string; children: ReactNode;
}) {
  return <>
    <header className="legal-nav">
      <a href="/" className="legal-home" aria-label="Bijasa home"><BSymbol ink="#f4f0e7" /></a>
      <a href="/" className="legal-back">← Back to bijasa.com</a>
    </header>
    <main className="legal">
      <div className="legal-wrap">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="legal-h">{title}</h1>
        <p className="legal-lede">{intro}</p>
        {children}
        <section aria-label="Explore Bijasa">
          <h2>Keep exploring</h2>
          <p><a href="/services/">Services</a> · <a href="/tools/">Free tools</a> · <a href="/#contact">Discuss a project</a></p>
        </section>
      </div>
      <footer className="legal-foot">
        <span>© {new Date().getFullYear()} Bijasa · <a href="/privacy/">Privacy</a></span>
        <strong>Deep roots. Long reach.</strong>
      </footer>
    </main>
  </>;
}
