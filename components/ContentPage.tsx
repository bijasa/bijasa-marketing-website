import type { ReactNode } from 'react';
import { TreeVignette } from './story/Sketch';

export function ContentPage({ title, eyebrow, intro, children }: {
  title: string; eyebrow: string; intro: string; children: ReactNode;
}) {
  return <>
    <main id="main" className="legal">
      <div className="legal-wrap">
        <header className="legal-head">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="legal-h">{title}</h1>
          </div>
          <div className="legal-tree"><TreeVignette /></div>
        </header>
        <p className="legal-lede">{intro}</p>
        {children}
        <section aria-label="Explore Bijasa">
          <h2>Keep exploring</h2>
          <p><a href="/services/">Services</a> · <a href="/products/">Products</a> · <a href="/work/">Case studies</a> · <a href="/tools/">Free tools</a> · <a href="/careers/">Careers</a> · <a href="/#contact">Discuss a project</a></p>
        </section>
      </div>
    </main>
  </>;
}
