'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BSymbol } from './Logo';
import SocialLinks from './SocialLinks';
const links = [['Home','/'],['Services','/services/'],['Industries','/#domains'],['Our Work','/work/'],['Free Tools','/tools/'],['About','/#expertise'],['Contact','/#contact']];
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    function dismiss(e: KeyboardEvent) { if(e.key === 'Escape') { setOpen(false); button.current?.focus(); } }
    function outside(e: PointerEvent) { if (!header.current?.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('keydown', dismiss); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside); };
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header" ref={header} onBlur={e => { if(!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <a href="/" className="brand" aria-label="Bijasa home"><BSymbol ink="#f4f0e7"/><span>bijasa<span className="brand-dot">.</span></span></a>
    <button ref={button} type="button" className="menu-toggle" aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
    <nav id="site-navigation" className={`site-navigation ${open ? 'is-open' : ''}`} aria-label="Main">{links.map(([label, href]) => <a key={label} href={href} aria-current={href !== '/' && !href.includes('#') && path.startsWith(href.slice(0,-1)) ? 'page' : href === '/' && path === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}<div className="mobile-social"><SocialLinks/></div></nav>
    <a className="header-cta" href="/#contact">Discuss a Project <span aria-hidden="true">↗</span></a>
  </header></>;
}
