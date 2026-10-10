'use client';

import { useEffect } from 'react';

const HERO_LENGTH_VH = 520;
const SHOW_THREAD = true;

const cl = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;

const BONE = [244, 240, 231];
const BASALT = [24, 19, 14];

/**
 * All scroll-linked motion for the page (hero, nav, thread, reveals, domain focus).
 * One passive scroll/resize listener writes styles directly — no React re-renders.
 * Port of `upd()` from the design handoff prototype.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id) as HTMLElement | null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const hero = $('bj-hero');
    const stage = $('bj-stage');
    const g = $('bj-g');
    const rule = $('bj-rule');
    const tag = $('bj-tag');
    const cue = $('bj-cue');
    const nav = $('bj-nav');
    const navb = $('bj-navb');
    const links = $('bj-links');
    const body = $('bj-body');
    const track = $('bj-track');
    const fill = $('bj-fill');
    const head = $('bj-head');
    if (!hero || !stage || !g || !rule || !tag || !cue || !nav || !navb || !links || !body || !track || !fill || !head) {
      return;
    }

    const inks = Array.from(document.querySelectorAll<SVGElement>('#bj-svg .ink'));
    const intros = Array.from(document.querySelectorAll<SVGElement>('#bj-svg [data-in]'));
    const letters = Array.from(document.querySelectorAll<SVGElement>('#bj-svg [data-d]'));
    const fades = Array.from(document.querySelectorAll<SVGElement>('#bj-svg [data-fade]'));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'));
    const focus = Array.from(document.querySelectorAll<HTMLElement>('[data-focus]'));

    let intro = 0;
    let raf = 0;

    const upd = () => {
      const still = reduce.matches;
      hero.style.height = still ? '100vh' : HERO_LENGTH_VH + 'vh';
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const tot = hero.offsetHeight - vh;
      const p = still || tot <= 0 ? 1 : cl(-hero.getBoundingClientRect().top / tot);

      const t1 = ease(cl((p - 0.04) / 0.46));
      const t2 = cl((p - 0.34) / 0.34);
      const t3 = ease(cl((p - 0.7) / 0.16));
      const t4 = cl((p - 0.84) / 0.1);
      const t5 = ease(cl((p - 0.8) / 0.12));

      const s0 = Math.min(0.72 * vh, vh - 180) / 112;
      const s1 = Math.min(0.84 * vw, 960) / 301;
      const s = s0 * Math.pow(s1 / s0, t1);
      const x0 = vw / 2 - 28 * s0;
      const y0 = 68 + (vh - 68 - 90) / 2 - 15.5 * s0;
      const x1 = vw / 2 - 150.5 * s1;
      const y1 = vh / 2 - 34 * s1;
      const tx = x0 + (x1 - x0) * t1;
      const ty = y0 + (y1 - y0) * t1;
      g.setAttribute('transform', `translate(${tx} ${ty}) scale(${s})`);

      stage.style.background = rgb(mix(BONE, BASALT, t3));
      const ink = rgb(mix(BASALT, BONE, t3));
      inks.forEach((e) => (e.style.stroke = ink));

      const I = still ? 1 : intro;
      intros.forEach((e) => {
        const [a, b] = (e.dataset.in ?? '0,1').split(',').map(Number);
        const o = 1 - ease(cl((I - a) / (b - a)));
        e.style.strokeDashoffset = String(o);
        e.style.strokeDasharray = o <= 0.001 ? 'none' : '1 1';
      });
      letters.forEach((e) => {
        const lt = ease(cl((t2 * 4.2 - Number(e.dataset.d)) / 1.1));
        e.style.strokeDashoffset = String(1 - lt);
        e.style.strokeDasharray = lt >= 0.999 ? 'none' : '1 1';
        e.style.opacity = lt > 0 ? '1' : '0';
      });
      fades.forEach((e) => (e.style.opacity = String(cl((t2 * 4.2 - 0.2) / 0.6))));

      const wmW = 301 * s1;
      const wmB = ty + 100 * s1;
      rule.style.left = vw / 2 - wmW / 2 + 'px';
      rule.style.width = wmW + 'px';
      rule.style.top = wmB + 6 + 'px';
      rule.style.transform = `scaleX(${t5})`;
      tag.style.opacity = String(t4);
      tag.style.top = wmB + 34 + 'px';
      tag.style.transform = `translateY(${(1 - t4) * 16}px)`;
      cue.style.opacity = String(1 - cl(p / 0.03));

      const done = still ? hero.getBoundingClientRect().bottom <= 68 : p > 0.995;
      nav.style.background = done ? '#18130e' : 'transparent';
      navb.style.opacity = done ? '1' : '0';
      links.style.color = done || t3 > 0.5 ? '#f4f0e7' : '#18130e';

      const th = SHOW_THREAD && vw > 700;
      track.style.display = th ? 'block' : 'none';
      if (th) {
        const br = body.getBoundingClientRect();
        const h = cl(vh * 0.55 - br.top, 0, br.height);
        fill.style.height = h + 'px';
        head.style.top = h - 6 + 'px';
      }

      reveals.forEach((e) => {
        if (still) {
          e.style.opacity = '';
          e.style.transform = '';
          return;
        }
        const t = cl((vh * 0.94 - e.getBoundingClientRect().top) / (vh * 0.22));
        e.style.opacity = String(t);
        e.style.transform = `translateY(${(1 - ease(t)) * 36}px)`;
      });
      focus.forEach((e) => {
        if (still) {
          e.style.opacity = '';
          e.style.transform = '';
          return;
        }
        const r = e.getBoundingClientRect();
        const d = cl(Math.abs(r.top + r.height / 2 - vh * 0.55) / (vh * 0.5));
        e.style.opacity = String(1 - d * 0.7);
        e.style.transform = `translateX(${d * 18}px)`;
      });
    };

    const t0 = performance.now();
    const tick = (now: number) => {
      intro = Math.min(1, (now - t0) / 2000);
      upd();
      if (intro < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    reduce.addEventListener('change', upd);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', upd);
      window.removeEventListener('resize', upd);
      reduce.removeEventListener('change', upd);
    };
  }, []);

  return null;
}
