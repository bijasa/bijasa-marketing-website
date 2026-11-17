'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import { caseStudies } from '@/lib/case-studies';

/** Hero switcher: pick who you are, see the Bijasa product made for you. ARIA tabs pattern. */
export default function ProductSwitcher() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = caseStudies.length - 1;
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className="switcher">
    <p className="switcher-label" id="switcher-label">Who are you building for? Pick one to see the product we made for them.</p>
    <div className="switcher-tabs" role="tablist" aria-labelledby="switcher-label">
      {caseStudies.map((p, i) => <button key={p.slug} ref={el => { tabs.current[i] = el; }} type="button" role="tab"
        id={`tab-${p.slug}`} aria-controls={`panel-${p.slug}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1}
        className="switcher-tab" onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}>{p.who}</button>)}
    </div>
    {caseStudies.map((p, i) => {
      const external = p.url.startsWith('http');
      return <div key={p.slug} id={`panel-${p.slug}`} role="tabpanel" aria-labelledby={`tab-${p.slug}`} hidden={active !== i}
        className={`switcher-panel tone-${p.tone}`}>
        <div className="switcher-copy">
          <p className="switcher-status">{p.status}</p>
          <h3>{p.brand}</h3>
          <p>{p.intro}</p>
          <div className="actions">
            <a className="btn" href={p.url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{p.cta}</a>
            <a className="text-link" href={`/work/${p.slug}/`}>How we built it</a>
          </div>
        </div>
        <div className="switcher-shot">
          <img src={p.image} alt={p.imageAlt} width={p.width} height={p.height} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
        </div>
      </div>;
    })}
  </div>;
}
