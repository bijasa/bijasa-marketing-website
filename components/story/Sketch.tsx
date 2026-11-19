/* Hand-sketched story graphics. The whole site follows one tree:
   bija (the seed) -> roots (what makes software last) -> trunk -> branches (the sectors we reach)
   -> what grows on it (software: web apps, mobile, AI, business systems).
   Above the ground is ink on paper. Below the ground is chalk on an ultramarine blueprint.
   Lines carry class "sk" and draw themselves in (see studio.css and StoryMotion). */
import type { CSSProperties, ReactNode } from 'react';

export const INK = '#1b1612';
export const CHALK = '#f6f1e8';
export const BLUE = '#0332c7';
export const COPPER = '#c4783f';
export const COPPER_LT = '#eaa66c';

const at = (s: number) => ({ ['--d' as string]: `${s.toFixed(2)}s` }) as CSSProperties;

/** Shared filters. Rendered once in the layout, at zero size (never display:none, or references break). */
export function SketchDefs() {
  return <svg className="sk-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <filter id="sk-wobble" filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="3000">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sk-wash" filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="3000">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="9" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation="5" />
      </filter>
      <pattern id="sk-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" />
      </pattern>
      <radialGradient id="sk-seed" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffe2c4" /><stop offset="0.5" stopColor="#e08a45" /><stop offset="1" stopColor="#8a4519" />
      </radialGradient>
      <radialGradient id="sk-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffb26b" stopOpacity="0.85" /><stop offset="0.45" stopColor="#e08a45" stopOpacity="0.3" /><stop offset="1" stopColor="#e08a45" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>;
}

/** A pen line drawn twice, slightly offset, like a quick sketch. */
export function L({ d, c = INK, w = 2.2, t = 0, o = 1 }: { d: string; c?: string; w?: number; t?: number; o?: number }) {
  return <>
    <path className="sk" pathLength={1} d={d} stroke={c} strokeWidth={w} strokeOpacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" style={at(t)} />
    <path className="sk" pathLength={1} d={d} transform="translate(1.3 -0.9)" stroke={c} strokeWidth={w * 0.45} strokeOpacity={0.4 * o} fill="none" strokeLinecap="round" strokeLinejoin="round" style={at(t + 0.12)} />
  </>;
}
/** A watercolour wash. */
export function Wash({ cx, cy, rx, ry = rx, c, o = 0.2, t = 0 }: { cx: number; cy: number; rx: number; ry?: number; c: string; o?: number; t?: number }) {
  return <ellipse className="sk-pop" cx={cx} cy={cy} rx={rx} ry={ry} fill={c} opacity={o} filter="url(#sk-wash)" style={at(t)} />;
}
/** Handwritten note. */
export function Note({ x, y, children, c = INK, a = 'start', s = 24, t = 0, r = 0 }: { x: number; y: number; children: ReactNode; c?: string; a?: 'start' | 'middle' | 'end'; s?: number; t?: number; r?: number }) {
  return <text className="sk-note sk-pop" x={x} y={y} fill={c} fontSize={s} textAnchor={a} transform={r ? `rotate(${r} ${x} ${y})` : undefined} style={at(t)}>{children}</text>;
}
function Seed({ x, y, s = 1, t = 0 }: { x: number; y: number; s?: number; t?: number }) {
  return <g className="sk-pop" style={at(t)}>
    <circle className="sk-pulse" cx={x} cy={y} r={46 * s} fill="url(#sk-glow)" />
    <ellipse cx={x} cy={y} rx={15 * s} ry={10.5 * s} transform={`rotate(-20 ${x} ${y})`} fill="url(#sk-seed)" stroke="#ffd7b0" strokeOpacity="0.7" />
  </g>;
}
function Leaf({ x, y, r = 0, s = 1, t = 0, c = INK }: { x: number; y: number; r?: number; s?: number; t?: number; c?: string }) {
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path className="sk-pop" d="M0 0 C 7 -11, 21 -13, 28 -4 C 19 5, 7 5, 0 0 Z" fill={BLUE} opacity="0.28" style={at(t)} />
    <L d="M0 0 C 7 -11, 21 -13, 28 -4 C 19 5, 7 5, 0 0 M3 -1 C 10 -3, 17 -4, 24 -4" c={c} w={1.6} t={t} />
  </g>;
}
/** Circuit pad at a root tip: roots end as engineering. */
function Pad({ x, y, t = 0, c = CHALK }: { x: number; y: number; t?: number; c?: string }) {
  return <g className="sk-pop" style={at(t)}>
    <circle cx={x} cy={y} r="7" fill="none" stroke={c} strokeWidth="2" />
    <circle cx={x} cy={y} r="2.6" fill={COPPER_LT} />
  </g>;
}

/* What grows on the tree: software, sketched. Each sits at (x, y) top-left. */
export function SkBrowser({ x, y, t = 0, c = INK }: { x: number; y: number; t?: number; c?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect className="sk-pop" x="2" y="2" width="128" height="88" rx="6" fill="#fffdf8" style={at(t)} />
    <L d="M4 2 H 128 Q 132 2, 132 7 V 86 Q 132 91, 127 91 H 6 Q 1 91, 1 86 V 7 Q 1 2, 6 2 Z" c={c} t={t} />
    <L d="M2 18 H 131 M10 10 h0.1 M18 10 h0.1 M26 10 h0.1" c={c} w={2.6} t={t + 0.3} />
    <L d="M12 32 H 70 M12 42 H 58 M12 52 H 66" c={c} w={1.6} t={t + 0.45} o={0.7} />
    <rect className="sk-pop" x="84" y="56" width="10" height="24" fill={BLUE} opacity="0.85" style={at(t + 0.7)} />
    <rect className="sk-pop" x="98" y="44" width="10" height="36" fill={COPPER} opacity="0.85" style={at(t + 0.75)} />
    <rect className="sk-pop" x="112" y="34" width="10" height="46" fill={BLUE} opacity="0.85" style={at(t + 0.8)} />
    <L d="M80 80 H 126" c={c} w={1.6} t={t + 0.6} />
  </g>;
}
export function SkPhone({ x, y, t = 0, c = INK }: { x: number; y: number; t?: number; c?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect className="sk-pop" x="1" y="1" width="58" height="98" rx="11" fill="#fffdf8" style={at(t)} />
    <L d="M12 1 H 48 Q 59 1, 59 12 V 88 Q 59 99, 48 99 H 12 Q 1 99, 1 88 V 12 Q 1 1, 12 1 Z" c={c} t={t} />
    <L d="M22 9 H 38" c={c} w={2.4} t={t + 0.3} />
    <rect className="sk-pop" x="10" y="20" width="40" height="22" rx="4" fill={BLUE} opacity="0.85" style={at(t + 0.5)} />
    <L d="M10 52 H 46 M10 61 H 38 M10 70 H 42" c={c} w={1.6} t={t + 0.45} o={0.7} />
    <circle className="sk-pop" cx="30" cy="86" r="4.5" fill="none" stroke={c} strokeWidth="1.8" style={at(t + 0.6)} />
  </g>;
}
export function SkAI({ x, y, t = 0, c = INK }: { x: number; y: number; t?: number; c?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <path className="sk-pop" d="M12 2 H 108 Q 118 2, 118 12 V 54 Q 118 64, 108 64 H 34 L 16 80 L 20 64 H 12 Q 2 64, 2 54 V 12 Q 2 2, 12 2 Z" fill="#fffdf8" style={at(t)} />
    <L d="M12 2 H 108 Q 118 2, 118 12 V 54 Q 118 64, 108 64 H 34 L 16 80 L 20 64 H 12 Q 2 64, 2 54 V 12 Q 2 2, 12 2 Z" c={c} t={t} />
    <path className="sk-pop" d="M40 33 C 46 31, 48 27, 50 19 C 52 27, 54 31, 60 33 C 54 35, 52 39, 50 47 C 48 39, 46 35, 40 33 Z" fill={COPPER} style={at(t + 0.5)} />
    <path className="sk-pop" d="M70 22 C 73 21, 74 19, 75 15 C 76 19, 77 21, 80 22 C 77 23, 76 25, 75 29 C 74 25, 73 23, 70 22 Z" fill={BLUE} style={at(t + 0.6)} />
    <L d="M68 40 H 100 M68 48 H 92" c={c} w={1.6} t={t + 0.55} o={0.7} />
  </g>;
}
export function SkFlow({ x, y, t = 0, c = INK }: { x: number; y: number; t?: number; c?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect className="sk-pop" x="1" y="1" width="36" height="26" rx="4" fill={BLUE} opacity="0.85" style={at(t + 0.4)} />
    <rect className="sk-pop" x="61" y="1" width="36" height="26" rx="4" fill="#fffdf8" style={at(t)} />
    <rect className="sk-pop" x="121" y="1" width="36" height="26" rx="4" fill={COPPER} opacity="0.85" style={at(t + 0.5)} />
    <L d="M1 5 Q 1 1, 5 1 H 33 Q 37 1, 37 5 V 23 Q 37 27, 33 27 H 5 Q 1 27, 1 23 Z M61 5 Q 61 1, 65 1 H 93 Q 97 1, 97 5 V 23 Q 97 27, 93 27 H 65 Q 61 27, 61 23 Z M121 5 Q 121 1, 125 1 H 153 Q 157 1, 157 5 V 23 Q 157 27, 153 27 H 125 Q 121 27, 121 23 Z" c={c} t={t} />
    <L d="M38 14 H 58 M52 9 L 58 14 L 52 19 M98 14 H 118 M112 9 L 118 14 L 112 19 M79 28 V 44 Q 79 50, 85 50 H 133 Q 139 50, 139 44 V 30 M134 35 L 139 29 L 144 35" c={c} w={1.8} t={t + 0.3} />
  </g>;
}

/* ---------- Hero: the whole tree, from seed to software ---------- */
const GROUND = 'M0 362 C 80 354, 160 368, 240 360 S 420 354, 600 364';
const leftRoots = [450, 540, 630], rightRoots = [480, 570, 660];
const leftLabels = ['how the work runs', 'the data model', 'permissions'];
const rightLabels = ['integrations', 'failure & recovery', 'tests & monitoring'];

function heroRoot(L: number, side: -1 | 1) {
  const y0 = L - 52, mx = (v: number) => 300 + side * (300 - v);
  return {
    organic: `M300 ${y0} C ${mx(288)} ${y0 + 18}, ${mx(252)} ${L - 4}, ${mx(220)} ${L}`,
    trace: `M${mx(220)} ${L} H ${mx(92)}`,
    pad: [mx(84), L] as [number, number],
    label: [mx(100), L + 30] as [number, number],
  };
}

export function HeroTree() {
  return <svg className="hero-art" viewBox="0 0 600 720" role="img" aria-labelledby="hero-art-t">
    <title id="hero-art-t">A hand-sketched tree. Below the ground, the seed and six roots: how the work runs, the data model, permissions, integrations, failure and recovery, tests and monitoring. Above the ground, what grows from it: web apps, mobile apps, AI features and business software.</title>
    <defs><linearGradient id="hero-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#011a73" stopOpacity="0" /><stop offset="1" stopColor="#011a73" stopOpacity="0.75" /></linearGradient><clipPath id="hero-soil-clip"><path d={`${GROUND} V 692 Q 600 720, 572 720 H 28 Q 0 720, 0 692 Z`} /></clipPath></defs>

    {/* Below the ground: blueprint */}
    <g clipPath="url(#hero-soil-clip)">
      <rect y="300" width="600" height="420" fill={BLUE} />
      <rect y="300" width="600" height="420" fill="url(#sk-grid)" />
      <rect y="360" width="600" height="360" fill="url(#hero-deep)" />
    </g>
    <g filter="url(#sk-wobble)">
      <L d={GROUND} w={2.6} t={0} />
      <L d="M40 362 l -4 -9 M46 361 l 2 -11 M52 362 l 5 -8 M520 363 l -3 -10 M527 363 l 3 -9 M190 362 l -3 -8 M196 362 l 3 -9" w={1.6} t={0.2} />
      {/* Taproot and roots in chalk */}
      <L d="M300 384 C 296 450, 306 540, 298 620 S 302 680, 300 708" c={CHALK} w={3.2} t={0.5} />
      {leftRoots.map((y, i) => { const r = heroRoot(y, -1); return <g key={y}><L d={r.organic} c={CHALK} w={2.4} t={0.7 + i * 0.18} /><L d={r.trace} c={CHALK} w={1.8} t={1.0 + i * 0.18} /></g>; })}
      {rightRoots.map((y, i) => { const r = heroRoot(y, 1); return <g key={y}><L d={r.organic} c={CHALK} w={2.4} t={0.8 + i * 0.18} /><L d={r.trace} c={CHALK} w={1.8} t={1.1 + i * 0.18} /></g>; })}
      <L d="M299 470 c -6 10, -6 20, -14 26 M301 560 c 6 8, 8 18, 16 22 M299 640 c -8 6, -10 14, -18 16" c={CHALK} w={1.2} t={1.2} o={0.7} />

      {/* Trunk and branches in ink */}
      <L d="M286 362 C 290 332, 284 302, 290 272 C 292 254, 280 236, 232 206" w={2.6} t={1.3} />
      <L d="M316 362 C 312 332, 318 302, 312 272 C 310 254, 324 236, 376 204" w={2.6} t={1.35} />
      <L d="M296 272 C 294 230, 304 170, 300 122" w={2.4} t={1.5} />
      <L d="M313 306 C 340 296, 362 290, 392 288" w={2} t={1.6} />
      <L d="M288 312 C 262 302, 236 300, 206 304" w={2} t={1.6} />
      <L d="M292 352 l 16 -14 M291 336 l 18 -16 M292 318 l 16 -14 M293 300 l 14 -12" w={1.1} t={1.6} o={0.6} />
    </g>
    <Wash cx={300} cy={150} rx={190} ry={130} c={BLUE} o={0.12} t={1.4} />
    <Wash cx={180} cy={150} rx={70} c={COPPER} o={0.14} t={1.6} />
    <g filter="url(#sk-wobble)">
      <SkBrowser x={92} y={110} t={1.8} />
      <SkPhone x={271} y={18} t={2.0} />
      <SkAI x={380} y={112} t={2.2} />
      <SkFlow x={392} y={274} t={2.4} />
      <Leaf x={206} y={304} r={170} t={2.0} />
      <Leaf x={226} y={300} r={-150} s={0.8} t={2.05} />
      <Leaf x={300} y={150} r={-40} s={0.9} t={2.1} />
      <Leaf x={300} y={176} r={210} s={0.85} t={2.15} />
      <Leaf x={350} y={226} r={-20} s={0.8} t={2.2} />
      <Leaf x={250} y={232} r={200} s={0.8} t={2.25} />
    </g>

    {Array.from({ length: 6 }, (_, i) => {
      const side = i < 3 ? -1 : 1, r = heroRoot(side < 0 ? leftRoots[i] : rightRoots[i - 3], side as -1 | 1);
      return <g key={i}>
        <Pad x={r.pad[0]} y={r.pad[1]} t={1.4 + (i % 3) * 0.18} />
        <Note x={r.label[0]} y={r.label[1]} c={CHALK} a={side < 0 ? 'start' : 'end'} s={23} t={1.6 + (i % 3) * 0.18}>{side < 0 ? leftLabels[i] : rightLabels[i - 3]}</Note>
      </g>;
    })}
    <Seed x={300} y={380} t={0} />

    <Note x={92} y={226} c={INK} s={23} t={2.6}>web apps</Note>
    <Note x={340} y={52} c={INK} s={23} t={2.6}>mobile</Note>
    <Note x={500} y={218} c={INK} s={23} a="end" t={2.6}>AI features</Note>
    <Note x={392} y={346} c={INK} s={23} t={2.7}>business software</Note>
    <Note x={20} y={44} c={BLUE} s={26} r={-4} t={2.8}>what people see</Note>
    <g filter="url(#sk-wobble)"><L d="M60 54 C 70 76, 84 90, 100 100 M92 98 l 9 3 l -3 -9" c={BLUE} w={1.8} t={2.9} /></g>
    <Note x={140} y={340} c={COPPER} s={24} a="middle" r={-3} t={0.4}>bija · the seed</Note>
    <g filter="url(#sk-wobble)"><L d="M196 342 C 230 346, 262 356, 284 374 M276 372 l 9 3 l -4 -9" c={COPPER} w={1.8} t={0.5} /></g>
    <Note x={326} y={410} c={COPPER_LT} s={24} r={-2} t={0.9}>what makes it last</Note>
  </svg>;
}

/* ---------- Philosophy: one root per belief ---------- */
/** The chalk taproot that grows down the philosophy section as you scroll. */
export function Taproot() {
  return <svg className="taproot-svg" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M20 0 C 16 120, 25 220, 19 340 S 24 560, 18 700 S 22 900, 20 1000" stroke={CHALK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M21 0 C 17 120, 26 220, 20 340 S 25 560, 19 700 S 23 900, 21 1000" stroke={CHALK} strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
  </svg>;
}
/** A side root from the taproot to a belief card: organic, then a circuit trace, then a pad. */
export function RootLink() {
  return <svg className="root-link" viewBox="0 0 120 60" aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      <L d="M0 6 C 18 8, 34 18, 52 30" c={CHALK} w={2.4} t={0} />
      <L d="M52 30 H 100" c={CHALK} w={1.8} t={0.35} />
      <L d="M22 12 c 4 8, 4 14, 0 20" c={CHALK} w={1.1} t={0.4} o={0.6} />
    </g>
    <Pad x={108} y={30} t={0.6} />
  </svg>;
}

/* ---------- Sectors: the branches that reach out ---------- */
const branchPaths = [
  'M640 336 C 560 276, 470 146, 380 122', 'M640 466 C 560 428, 470 384, 380 380', 'M640 600 C 560 606, 470 640, 380 638',
  'M640 336 C 720 276, 810 146, 900 122', 'M640 466 C 720 428, 810 384, 900 380', 'M640 600 C 720 606, 810 640, 900 638',
];
const tips: [number, number][] = [[380, 122], [380, 380], [380, 638], [900, 122], [900, 380], [900, 638]];

export function SectorTree() {
  return <svg className="tree-art" viewBox="0 0 1280 760" aria-hidden="true" focusable="false">
    <Wash cx={640} cy={250} rx={240} ry={180} c={BLUE} o={0.06} t={0.2} />
    <Wash cx={600} cy={300} rx={120} ry={100} c={COPPER} o={0.08} t={0.3} />
    <Wash cx={640} cy={730} rx={160} ry={50} c={COPPER} o={0.22} t={0} />
    <g filter="url(#sk-wobble)">
      <L d="M500 748 C 560 740, 720 740, 780 750" w={2.4} t={0} />
      <L d="M626 748 C 630 640, 622 520, 630 420 C 634 360, 626 300, 612 250" w={2.6} t={0.1} />
      <L d="M654 748 C 650 640, 658 520, 650 420 C 646 360, 654 300, 668 250" w={2.6} t={0.15} />
      <L d="M630 720 l 20 -14 M630 690 l 20 -14 M630 660 l 20 -14 M630 630 l 20 -14 M630 600 l 20 -14 M632 570 l 18 -12" w={1.1} t={0.4} o={0.55} />
      <L d="M612 250 C 600 220, 590 200, 572 186 M668 250 C 680 220, 694 200, 712 184 M640 300 C 638 260, 642 220, 640 190" w={2} t={0.5} />
      {branchPaths.map((b, i) => <L key={b} d={b} w={2.4} t={0.6 + (i % 3) * 0.2} />)}
      <Leaf x={560} y={192} r={200} t={1.0} /><Leaf x={712} y={184} r={-30} t={1.05} /><Leaf x={640} y={190} r={-90} s={0.9} t={1.1} />
      <Leaf x={520} y={232} r={190} s={0.8} t={1.1} /><Leaf x={760} y={232} r={-10} s={0.8} t={1.15} />
      <Leaf x={490} y={420} r={160} s={0.8} t={1.2} /><Leaf x={790} y={420} r={20} s={0.8} t={1.2} />
      <Leaf x={480} y={612} r={200} s={0.75} t={1.3} /><Leaf x={800} y={612} r={-20} s={0.75} t={1.3} />
    </g>
    <SkPhone x={612} y={86} t={1.3} />
    {tips.map(([x, y], i) => <g key={i} className="sk-pop" style={at(1.2 + (i % 3) * 0.2)}>
      <circle cx={x} cy={y} r="10" fill="#fffdf8" stroke={INK} strokeWidth="2.2" />
      <circle cx={x} cy={y} r="4" fill={i % 2 ? COPPER : BLUE} />
    </g>)}
  </svg>;
}

/* ---------- How we work: four stages of growth ---------- */
const SOIL = 'M0 128 C 70 120, 140 134, 210 126 S 300 122, 320 128';
export function StageArt({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  const id = `st-${stage}`;
  return <svg className="stage-art" viewBox="0 -28 320 278" aria-hidden="true" focusable="false">
    <defs><clipPath id={id}><path d={`${SOIL} V 250 H 0 Z`} /></clipPath></defs>
    <g clipPath={`url(#${id})`}><rect y="100" width="320" height="150" fill={BLUE} /><rect y="100" width="320" height="150" fill="url(#sk-grid)" /></g>
    <g filter="url(#sk-wobble)">
      <L d={SOIL} c={CHALK} w={2} t={0} />
      {stage >= 1 && <>
        <L d="M160 150 C 157 180, 163 210, 158 240" c={CHALK} w={2.4} t={0.3} />
        <L d="M160 156 C 140 166, 118 172, 94 190 H 60" c={CHALK} w={1.8} t={0.5} />
        <L d="M160 164 C 182 176, 206 184, 230 200 H 262" c={CHALK} w={1.8} t={0.6} />
      </>}
      {stage >= 2 && <>
        <L d="M159 196 C 136 206, 112 216, 84 222" c={CHALK} w={1.4} t={0.7} />
        <L d="M160 204 C 190 212, 220 220, 250 230" c={CHALK} w={1.4} t={0.8} />
      </>}
      {stage === 1 && <L d="M160 134 C 159 128, 161 122, 160 116" c={CHALK} w={2} t={0.9} />}
      {stage === 2 && <>
        <L d="M160 134 C 158 112, 163 92, 159 70" c={CHALK} w={2.4} t={0.9} />
        <L d="M159 100 C 146 80, 118 76, 104 88 C 118 104, 144 108, 159 100 Z" c={CHALK} w={1.8} t={1.1} />
        <L d="M159 82 C 172 58, 202 52, 220 62 C 206 84, 180 90, 159 82 Z" c={CHALK} w={1.8} t={1.2} />
      </>}
      {stage === 3 && <>
        <L d="M152 134 C 154 100, 150 70, 146 52 M168 134 C 166 100, 170 70, 176 52 M146 52 C 130 40, 112 36, 96 40 M176 52 C 192 40, 210 36, 226 40 M160 120 C 160 90, 160 60, 160 36" c={CHALK} w={2.2} t={0.9} />
        <L d="M154 126 l 12 -10 M154 108 l 12 -10 M154 90 l 12 -10" c={CHALK} w={1} t={1.1} o={0.6} />
      </>}
      {stage === 3 && <>
        <g transform="translate(70 4) scale(0.38)"><SkBrowser x={0} y={0} c={CHALK} t={1.3} /></g>
        <g transform="translate(150 0) scale(0.32)"><SkPhone x={0} y={0} c={CHALK} t={1.4} /></g>
        <g transform="translate(196 6) scale(0.42)"><SkAI x={0} y={0} c={CHALK} t={1.5} /></g>
      </>}
    </g>
    <Seed x={160} y={142} s={stage === 0 ? 1.1 : 0.8} t={0} />
  </svg>;
}

/* ---------- Contact: plant the seed ---------- */
export function PlantSeed() {
  return <svg className="plant-art" viewBox="0 0 260 200" aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      <L d="M10 150 C 70 142, 150 156, 250 146" c={CHALK} w={2.2} t={0} />
      <L d="M130 160 C 128 176, 132 186, 129 198 M130 166 C 116 172, 104 176, 92 186 M131 170 C 146 176, 158 180, 170 190" c={CHALK} w={1.6} t={0.4} o={0.8} />
      <L d="M130 146 C 128 120, 133 100, 129 76" c={CHALK} w={2.4} t={0.6} />
      <L d="M129 110 C 116 90, 88 86, 74 98 C 88 114, 114 118, 129 110 Z" c={CHALK} w={1.8} t={0.8} />
      <L d="M129 92 C 142 68, 172 62, 190 72 C 176 94, 150 100, 129 92 Z" c={CHALK} w={1.8} t={0.9} />
    </g>
    <Seed x={130} y={158} s={0.9} t={0.2} />
  </svg>;
}

/* ---------- A small tree for the other pages ---------- */
export function TreeVignette({ dark = false }: { dark?: boolean }) {
  const c = dark ? CHALK : INK;
  return <svg className="tree-vignette" viewBox="0 0 320 300" aria-hidden="true" focusable="false">
    {!dark && <Wash cx={160} cy={110} rx={120} ry={90} c={BLUE} o={0.12} t={0} />}
    <g filter="url(#sk-wobble)">
      <L d="M40 236 C 110 228, 210 242, 280 232" c={c} w={2.2} t={0} />
      <L d="M152 236 C 154 214, 148 200, 120 190 M168 236 C 166 214, 176 196, 222 178 M160 236 C 158 180, 162 140, 162 104" c={c} w={2.2} t={0.2} />
      <L d="M158 240 C 156 256, 162 270, 158 290 M158 246 C 140 254, 124 258, 104 270 H 84 M160 250 C 180 258, 196 262, 216 272 H 236" c={dark ? CHALK : BLUE} w={1.8} t={0.4} />
      <SkBrowser x={0} y={96} c={c} t={0.6} />
      <SkPhone x={138} y={2} c={c} t={0.7} />
      <SkAI x={204} y={96} c={c} t={0.8} />
    </g>
    <Seed x={160} y={244} s={0.6} t={0.3} />
  </svg>;
}
