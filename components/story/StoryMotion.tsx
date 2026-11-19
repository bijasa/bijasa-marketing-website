'use client';
import { useEffect } from 'react';

/* Scroll story, about 1 kB. Adds "motion" to <html> only when motion is allowed,
   so without JavaScript or with reduced motion every graphic is shown complete.
   - [data-reveal]: gets "is-in" once it enters the viewport (draw-in and pop-in).
   - [data-grow]: gets --grow (0 to 1) from how far the reader has scrolled through it. */
export default function StoryMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('motion');
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { threshold: 0.18 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    const growers = Array.from(document.querySelectorAll<HTMLElement>('[data-grow]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of growers) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
        el.style.setProperty('--grow', p.toFixed(3));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); root.classList.remove('motion'); };
  }, []);
  return null;
}
