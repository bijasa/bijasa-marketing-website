/* Bijasa v6: the codebase tree, hand-drawn. Only the logo's colours: ink, copper and bone, plus their tints.
   The tree is the spine of the page:
   seed (the copper loop from the logo) -> roots drawn as a data model -> trunk as the main branch
   -> branches as git branches (sectors) -> leaves as UI components (what we build) -> growth rings (process).
   Lines carry class "sk" and draw themselves in (see studio.css and StoryMotion). */
import type { CSSProperties, ReactNode } from 'react';

export const INK = '#18130e';
export const BONE = '#f4f0e7';
export const COPPER = '#c3773e';
export const COPPER_LT = '#e0a574';
export const COPPER_DP = '#94522a';
export const BARK = '#5b3a22';
export const PAPER = '#fbf8f2';

const at = (s: number) => ({ ['--d' as string]: `${s.toFixed(2)}s` }) as CSSProperties;

/** Shared filters, rendered once in the layout at zero size (never display:none, or references break). */
export function SketchDefs() {
  return <svg className="sk-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <filter id="sk-wobble" filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="3000">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sk-wash" filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="3000">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="9" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation="5" />
      </filter>
      <radialGradient id="sk-seedglow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={COPPER_LT} stopOpacity="0.7" /><stop offset="1" stopColor={COPPER_LT} stopOpacity="0" />
      </radialGradient>
      <pattern id="sk-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <path d="M0 0V7" stroke={BARK} strokeWidth="1.3" strokeOpacity="0.55" />
      </pattern>
    </defs>
  </svg>;
}

/** A pen line, drawn twice with a slight offset like a quick sketch. */
export function L({ d, c = INK, w = 2.2, t = 0, o = 1 }: { d: string; c?: string; w?: number; t?: number; o?: number }) {
  return <>
    <path className="sk" pathLength={1} d={d} stroke={c} strokeWidth={w} strokeOpacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" style={at(t)} />
    <path className="sk" pathLength={1} d={d} transform="translate(1.2 -0.8)" stroke={c} strokeWidth={w * 0.45} strokeOpacity={0.4 * o} fill="none" strokeLinecap="round" strokeLinejoin="round" style={at(t + 0.12)} />
  </>;
}
export function Wash({ cx, cy, rx, ry = rx, c = COPPER, o = 0.18, t = 0 }: { cx: number; cy: number; rx: number; ry?: number; c?: string; o?: number; t?: number }) {
  return <ellipse className="sk-pop" cx={cx} cy={cy} rx={rx} ry={ry} fill={c} opacity={o} filter="url(#sk-wash)" style={at(t)} />;
}
/** Handwritten note. */
export function Note({ x, y, children, c = INK, a = 'start', s = 24, t = 0, r = 0 }: { x: number; y: number; children: ReactNode; c?: string; a?: 'start' | 'middle' | 'end'; s?: number; t?: number; r?: number }) {
  return <text className="sk-note sk-pop" x={x} y={y} fill={c} fontSize={s} textAnchor={a} transform={r ? `rotate(${r} ${x} ${y})` : undefined} style={at(t)}>{children}</text>;
}
/** Monospace text, for the software parts of the drawing. */
function Code({ x, y, children, c = INK, s = 15, a = 'start', t = 0, w = 500 }: { x: number; y: number; children: ReactNode; c?: string; s?: number; a?: 'start' | 'middle' | 'end'; t?: number; w?: number }) {
  return <text className="sk-code sk-pop" x={x} y={y} fill={c} fontSize={s} fontWeight={w} textAnchor={a} style={at(t)}>{children}</text>;
}
/** A rounded box drawn by hand, with an optional fill. */
function Box({ x, y, w, h, r = 8, c = INK, fill, t = 0, lw = 2 }: { x: number; y: number; w: number; h: number; r?: number; c?: string; fill?: string; t?: number; lw?: number }) {
  const d = `M${x + r} ${y} H ${x + w - r} Q ${x + w} ${y}, ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h}, ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h}, ${x} ${y + h - r} V ${y + r} Q ${x} ${y}, ${x + r} ${y} Z`;
  return <>
    {fill && <path className="sk-pop" d={d} fill={fill} style={at(t)} />}
    <L d={d} c={c} w={lw} t={t} />
  </>;
}

/** The copper loop from the Bijasa logo: the seed. Drawn at (x, y) with height about 40*s. */
export function SeedLoop({ x, y, s = 1, t = 0, glow = true }: { x: number; y: number; s?: number; t?: number; glow?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow && <circle className="sk-pulse" cx="18" cy="-8" r="34" fill="url(#sk-seedglow)" />}
    <path className="sk" pathLength={1} d="M7.5 2 V -10 A11 14 0 0 1 29.5 -10 C29.5 4 19.5 12 7.5 18" fill="none" stroke={COPPER} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={at(t)} />
  </g>;
}

/** A small hand-drawn data table. */
function Table({ x, y, name, fields, t = 0, w = 150, c = INK, bg = PAPER }: { x: number; y: number; name: string; fields: string[]; t?: number; w?: number; c?: string; bg?: string }) {
  const h = 34 + fields.length * 22;
  return <g>
    <Box x={x} y={y} w={w} h={h} r={6} c={c} fill={bg} t={t} />
    <path className="sk-pop" d={`M${x + 1} ${y + 1} H ${x + w - 1} V ${y + 28} H ${x + 1} Z`} fill={COPPER} opacity="0.9" style={at(t + 0.2)} />
    <Code x={x + 10} y={y + 20} c={BONE} s={14} w={700} t={t + 0.3}>{name}</Code>
    {fields.map((f, i) => <Code key={f} x={x + 10} y={y + 50 + i * 22} c={c} s={13} t={t + 0.35 + i * 0.05}>{f}</Code>)}
  </g>;
}

/* ---------------- Hero: the whole codebase tree ---------------- */
export function HeroTree() {
  const G = 432; // ground
  return <svg className="hero-art" viewBox="0 0 600 780" role="img" aria-labelledby="hero-art-t">
    <title id="hero-art-t">A hand-drawn tree. Its leaves are interface components, its branches pass through an architecture of ui, api and auth, its trunk is the main branch, and its roots are a data model of work items, users and events. The copper seed from the Bijasa logo sits where the trunk meets the ground.</title>
    <Wash cx={300} cy={160} rx={250} ry={150} c={COPPER} o={0.16} t={1.6} />
    <Wash cx={300} cy={610} rx={240} ry={140} c={BARK} o={0.1} t={0.4} />

    <g filter="url(#sk-wobble)">
      {/* Canopy outline */}
      <L d="M70 236 C 30 210, 34 150, 80 136 C 70 84, 128 50, 176 66 C 200 24, 276 14, 312 40 C 352 12, 432 22, 446 70 C 506 66, 560 116, 536 168 C 572 200, 556 254, 506 258" c={BARK} w={1.6} o={0.55} t={1.5} />

      {/* Ground */}
      <L d={`M18 ${G} C 120 ${G - 8}, 200 ${G + 6}, 300 ${G - 2} S 480 ${G - 8}, 582 ${G + 2}`} w={2.4} t={0} />
      <L d={`M60 ${G} l -3 -9 M66 ${G} l 3 -10 M520 ${G} l -4 -9 M527 ${G} l 2 -10 M200 ${G + 2} l -3 -8`} w={1.4} t={0.1} />

      {/* Trunk: the main branch, with commits */}
      <path className="sk-pop" d={`M287 ${G} C 290 400, 284 370, 290 336 L 310 336 C 316 370, 310 400, 313 ${G} Z`} fill="url(#sk-hatch)" style={at(1.2)} />
      <L d={`M287 ${G} C 290 400, 284 370, 290 336 C 291 320, 282 306, 258 296`} c={BARK} w={2.6} t={1.0} />
      <L d={`M313 ${G} C 310 400, 316 370, 310 336 C 309 320, 318 306, 342 296`} c={BARK} w={2.6} t={1.05} />
      <L d="M300 340 C 298 318, 302 300, 300 286" c={BARK} w={2.4} t={1.2} />
    </g>

    {/* Branches: an architecture diagram that becomes the canopy */}
    <g filter="url(#sk-wobble)">
      <Box x={196} y={262} w={64} h={32} r={6} fill={PAPER} t={1.4} />
      <Box x={268} y={252} w={64} h={32} r={6} fill={INK} t={1.45} />
      <Box x={340} y={262} w={64} h={32} r={6} fill={PAPER} t={1.5} />
      <L d="M228 262 C 220 236, 196 222, 168 208 M300 252 C 300 232, 296 214, 300 196 M372 262 C 386 238, 410 222, 440 206 M246 262 C 252 240, 262 224, 276 210 M354 262 C 350 240, 340 226, 326 212" c={BARK} w={1.8} t={1.6} />
    </g>
    <Code x={228} y={283} a="middle" s={15} w={700} t={1.6}>ui</Code>
    <Code x={300} y={273} a="middle" s={15} w={700} c={BONE} t={1.65}>api</Code>
    <Code x={372} y={283} a="middle" s={15} w={700} t={1.7}>auth</Code>

    {/* Leaves: interface components */}
    <g filter="url(#sk-wobble)">
      <Box x={82} y={124} w={128} h={84} r={8} fill={PAPER} t={1.9} />
      <L d="M92 140 H 140" w={2.2} t={2.0} />
      {[[100, 30], [120, 46], [140, 22], [160, 54], [180, 38]].map(([bx, bh], i) =>
        <rect key={bx} className="sk-pop" x={bx} y={198 - bh} width="12" height={bh} rx="2" fill={i % 2 ? COPPER : INK} style={at(2.1 + i * 0.05)} />)}
      <Box x={196} y={58} w={112} h={36} r={18} fill={INK} t={2.0} />
      <Box x={326} y={64} w={60} h={30} r={15} fill={COPPER} t={2.1} />
      <circle className="sk-pop" cx="370" cy="79" r="11" fill={PAPER} style={at(2.3)} />
      <Box x={226} y={112} w={176} h={38} r={8} fill={PAPER} t={2.15} />
      <L d="M380 120 V 142" c={COPPER} w={2.4} t={2.4} />
      <circle className="sk-pop" cx="436" cy="128" r="18" fill={COPPER_LT} style={at(2.2)} />
      <L d="M436 128 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0 M429 124 h0.1 M443 124 h0.1 M429 134 Q 436 139, 443 134" w={1.8} t={2.2} />
      <L d="M462 120 H 518 M462 134 H 500" w={2} o={0.7} t={2.3} />
      <Box x={404} y={60} w={58} h={28} r={14} c={INK} fill={PAPER} t={2.25} />
      <Box x={240} y={168} w={128} h={70} r={8} fill={PAPER} t={2.3} />
      {[0, 1, 2].map(i => <g key={i}>
        <Box x={250} y={178 + i * 19} w={13} h={13} r={3} fill={i < 2 ? COPPER : undefined} t={2.4 + i * 0.05} />
        <L d={`M272 ${185 + i * 19} H ${330 - i * 12}`} w={1.8} o={0.7} t={2.45 + i * 0.05} />
      </g>)}
      <Box x={388} y={160} w={130} h={70} r={8} fill={PAPER} t={2.35} />
      <L d="M398 214 C 418 206, 424 186, 444 192 S 470 210, 486 186 S 504 176, 510 172" c={COPPER} w={2.6} t={2.6} />
      <Box x={110} y={224} w={66} h={30} r={6} fill={INK} t={2.4} />
    </g>
    <Code x={252} y={81} c={BONE} s={14} a="middle" w={700} t={2.2}>deploy ▸</Code>
    <Code x={238} y={136} c="#8a7d6f" s={14} t={2.3}>search…</Code>
    <Code x={433} y={79} a="middle" s={13} w={700} t={2.35}>v1.0</Code>
    <Code x={143} y={244} c={COPPER_LT} s={15} a="middle" w={700} t={2.5}>{'</>'}</Code>

    {/* Seed */}
    <SeedLoop x={282} y={G + 26} s={1.05} t={0.2} />

    {/* Roots: the data model */}
    <g filter="url(#sk-wobble)">
      <L d={`M300 ${G + 44} C 298 ${G + 90}, 304 ${G + 130}, 300 ${G + 196}`} c={BARK} w={3} t={0.4} />
      <L d={`M296 ${G + 40} C 260 ${G + 60}, 220 ${G + 70}, 196 ${G + 92}`} c={BARK} w={2.4} t={0.5} />
      <L d={`M306 ${G + 46} C 340 ${G + 60}, 380 ${G + 56}, 408 ${G + 74}`} c={BARK} w={2.4} t={0.55} />
      <L d="M196 524 l -8 -9 M196 524 l -11 0 M196 524 l -8 9" c={BARK} w={1.8} t={0.9} />
      <L d="M408 506 l 8 -9 M408 506 l 11 0 M408 506 l 8 9" c={BARK} w={1.8} t={0.9} />
      <L d="M120 650 C 140 690, 190 700, 224 690" c={BARK} w={1.8} t={1.0} />
      <L d="M486 616 C 470 666, 420 690, 376 690" c={BARK} w={1.8} t={1.05} />
      <L d="M250 470 c -6 12, -4 22, -14 30 M352 478 c 6 10, 10 18, 20 22 M300 560 c -10 8, -14 18, -26 22" c={BARK} w={1.2} o={0.6} t={1.1} />
    </g>
    <Table x={40} y={510} name="work_items" fields={['id', 'owner_id → users', 'status', 'due_at']} t={0.7} />
    <Table x={414} y={492} name="users" fields={['id', 'role', 'team']} t={0.75} />
    <Table x={226} y={630} name="events" fields={['item_id', 'happened_at', 'payload']} w={150} t={0.85} />
    <g filter="url(#sk-wobble)"><L d="M300 726 V 780" c="#a8612f" w={4} t={1.2} /></g>

    <Note x={22} y={44} c={COPPER_DP} s={25} r={-5} t={2.7}>what people see</Note>
    <g filter="url(#sk-wobble)"><L d="M62 54 C 66 76, 72 92, 84 112 M76 106 l 8 7 l 1 -10" c={COPPER_DP} w={1.8} t={2.8} /></g>
    <Note x={330} y={G + 40} c={COPPER_DP} s={24} r={-2} t={0.5}>bija, the seed</Note>
    <Note x={584} y={762} c={COPPER_DP} s={24} a="end" r={-2} t={1.3}>what makes it last</Note>
  </svg>;
}

/** Connects the hero tree's taproot to the page spine. Two shapes: wide (tree on the right) and narrow (tree centred). */
export function TaprootBend() {
  return <>
    <svg className="bend bend-wide" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true" focusable="false" filter="url(#sk-wobble)">
      <path d="M700 84 c -10 10, -14 22, -30 30 M480 92 c 6 12, 4 24, 16 34 M230 96 c -8 10, -8 22, -20 28" fill="none" stroke="#a8612f" strokeOpacity="0.7" strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      <path d="M758 0 C 758 70, 600 84, 330 92 S 0 104, 0 160" fill="none" stroke="#a8612f" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      <path d="M760 0 C 760 72, 602 86, 332 94 S 2 106, 2 160" fill="none" stroke={COPPER_LT} strokeOpacity="0.5" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
    <svg className="bend bend-narrow" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M484 0 C 484 60, 300 50, 150 70 S 0 90, 0 120" fill="none" stroke="#a8612f" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  </>;
}

/** The trunk that runs down the page. Stretches to its box; grows with scroll (see .spine in studio.css). */
export function SpineLine() {
  return <svg className="spine-svg" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M20 0 C 16 120, 25 220, 19 340 S 24 560, 18 700 S 22 900, 20 1000" stroke="#a8612f" strokeWidth="4" fill="none" vectorEffect="non-scaling-stroke" />
    <path d="M22 0 C 18 120, 27 220, 21 340 S 26 560, 20 700 S 24 900, 22 1000" stroke={COPPER} strokeOpacity="0.5" strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke" />
  </svg>;
}

/* ---------------- Philosophy: the roots, drawn as a data model ---------------- */
/* Coordinates match .schema in studio.css: x = 0 is the spine, cards are 3 columns from x = 80. */
const SW = 1236, CW = (SW - 80 - 120) / 3;
const colX = [80, 80 + CW + 60, 80 + 2 * (CW + 60)];
const rowY = [40, 420];
const g1 = colX[1] - 30, g2 = colX[2] - 30, BUS = 362;
function relation(x0: number, y0: number, xg: number, y1: number, x1: number) {
  const r = 14, up = y1 < y0 ? -1 : 1;
  return `M${x0} ${y0} H ${xg - r} Q ${xg} ${y0}, ${xg} ${y0 + up * r} V ${y1 - up * r} Q ${xg} ${y1}, ${xg + r} ${y1} H ${x1}`;
}
export const schemaGeom = { SW, SH: 760, CW, colX, rowY };
export function SchemaRoots() {
  const crow = (x: number, y: number) => `M${x - 12} ${y} L ${x} ${y - 9} M${x - 12} ${y} L ${x} ${y} M${x - 12} ${y} L ${x} ${y + 9}`;
  const pins = [[colX[0], rowY[0] + 52], [colX[0], rowY[1] + 52], [colX[1], rowY[0] + 52], [colX[1], rowY[1] + 52], [colX[2], rowY[0] + 52], [colX[2], rowY[1] + 52]];
  return <svg className="schema-art" viewBox={`0 0 ${SW} 760`} aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      <L d={`M0 ${rowY[0] + 52} C 30 ${rowY[0] + 50}, 50 ${rowY[0] + 54}, ${colX[0]} ${rowY[0] + 52}`} c={COPPER_LT} w={2.4} t={0} />
      <L d={`M0 ${rowY[1] + 52} C 30 ${rowY[1] + 50}, 50 ${rowY[1] + 54}, ${colX[0]} ${rowY[1] + 52}`} c={COPPER_LT} w={2.4} t={0.1} />
      <L d={`M0 ${BUS} C 200 ${BUS - 6}, 500 ${BUS + 6}, ${g2} ${BUS}`} c={COPPER_LT} w={2.6} t={0.2} />
      <L d={relation(g1 - 1, BUS, g1, rowY[0] + 52, colX[1])} c={COPPER_LT} w={2} t={0.5} />
      <L d={relation(g1 - 1, BUS, g1, rowY[1] + 52, colX[1])} c={COPPER_LT} w={2} t={0.55} />
      <L d={relation(g2 - 1, BUS, g2, rowY[0] + 52, colX[2])} c={COPPER_LT} w={2} t={0.7} />
      <L d={relation(g2 - 1, BUS, g2, rowY[1] + 52, colX[2])} c={COPPER_LT} w={2} t={0.75} />
      {pins.map(([x, y], i) => <L key={i} d={crow(x, y)} c={COPPER_LT} w={2} t={0.9 + i * 0.05} />)}
      <L d={`M10 ${BUS - 10} V ${BUS + 10} M16 ${BUS - 10} V ${BUS + 10}`} c={COPPER_LT} w={2} t={0.3} />
      <L d={`M260 ${BUS} c 6 -14, 4 -24, 14 -34 M700 ${BUS} c 8 -12, 6 -22, 18 -30`} c={COPPER_LT} w={1.2} o={0.6} t={0.6} />
    </g>
    <Note x={colX[0] + 2} y={rowY[0] - 12} c={COPPER_LT} s={26} t={0.3}>schema deep_roots</Note>
    <Note x={colX[0] + 2} y={rowY[1] - 12} c={COPPER_LT} s={26} t={0.4}>schema long_reach</Note>
  </svg>;
}

/* ---------------- Sectors: git branches off the trunk ---------------- */
export function BranchGraph({ name, lane, i }: { name: string; lane: 0 | 1; i: number }) {
  const y = lane ? 58 : 46, x2 = lane ? 196 : 176;
  return <svg className="branch-art" viewBox="0 0 250 100" aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      <L d={`M0 6 C 34 6, ${lane ? 52 : 40} ${y}, ${lane ? 96 : 80} ${y} H ${x2}`} c={BARK} w={2.6} t={0} />
      <L d={`M${x2} ${y} c 10 -8, 22 -10, 30 -6 c -6 8, -18 10, -30 6 Z M${x2} ${y} c 8 8, 20 12, 30 8 c -4 -8, -16 -12, -30 -8 Z M${x2 + 2} ${y} c 18 -2, 30 2, 40 0`} c={INK} w={1.6} t={0.5} />
    </g>
    <path className="sk-pop" d={`M${x2} ${y} c 10 -8, 22 -10, 30 -6 c -6 8, -18 10, -30 6 Z`} fill={COPPER} opacity="0.75" style={at(0.6)} />
    <path className="sk-pop" d={`M${x2} ${y} c 8 8, 20 12, 30 8 c -4 -8, -16 -12, -30 -8 Z`} fill={BARK} opacity="0.55" style={at(0.65)} />
    {[0, 1].map(k => <circle key={k} className="sk-pop" cx={(lane ? 118 : 104) + k * 38} cy={y} r="6" fill={PAPER} stroke={INK} strokeWidth="2" style={at(0.3 + k * 0.1)} />)}
    <Code x={lane ? 98 : 84} y={y - 14} s={14} w={600} c={COPPER_DP} t={0.4}>{`${name}`}</Code>
    <Code x={4} y={96} s={11} c="#8a7d6f" t={0.2}>{`#${String(i + 1).padStart(2, '0')}`}</Code>
  </svg>;
}

/* ---------------- What we build: the canopy of UI components ---------------- */
export function CanopyStrip() {
  const drops = [0, 1, 2, 3].map(i => 236 + 288.5 * i);
  return <svg className="canopy-art" viewBox={`0 0 ${SW} 230`} aria-hidden="true" focusable="false">
    <Wash cx={620} cy={90} rx={540} ry={70} c={COPPER} o={0.12} t={0} />
    <g filter="url(#sk-wobble)">
      <L d={`M0 200 C 40 170, 60 110, 140 96 C 320 70, 600 104, 860 80 S 1160 70, ${SW - 10} 96`} c={BARK} w={3.2} t={0} />
      {drops.map((x, i) => <L key={x} d={`M${x} ${88 + (i % 2) * 6} C ${x - 4} 130, ${x + 4} 180, ${x} 230`} c={BARK} w={1.8} t={0.4 + i * 0.1} />)}
      {/* Component leaves */}
      <Box x={196} y={20} w={92} h={30} r={15} fill={INK} t={0.6} />
      <L d="M240 50 V 86" c={BARK} w={1.4} t={0.6} />
      <Box x={420} y={112} w={56} h={28} r={14} fill={COPPER} t={0.7} />
      <circle className="sk-pop" cx="462" cy="126" r="10" fill={PAPER} style={at(0.8)} />
      <L d="M448 112 V 92" c={BARK} w={1.4} t={0.7} />
      <Box x={600} y={22} w={26} h={26} r={5} fill={COPPER} t={0.75} />
      <L d="M606 35 l 5 6 l 10 -12" c={PAPER} w={2.4} t={0.9} />
      <L d="M613 48 V 92" c={BARK} w={1.4} t={0.75} />
      <L d="M700 120 H 820" w={2.6} t={0.8} />
      <circle className="sk-pop" cx="770" cy="120" r="9" fill={COPPER} style={at(0.9)} />
      <L d="M760 120 V 86" c={BARK} w={1.4} t={0.8} />
      <circle className="sk-pop" cx="980" cy="38" r="17" fill={COPPER_LT} style={at(0.85)} />
      <L d="M980 38 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0" w={1.8} t={0.85} />
      <L d="M980 55 V 80" c={BARK} w={1.4} t={0.85} />
      <Box x={1080} y={110} w={86} h={28} r={6} fill={PAPER} t={0.9} />
      <L d="M1120 110 V 86" c={BARK} w={1.4} t={0.9} />
      <Box x={330} y={20} w={66} h={26} r={13} fill={PAPER} t={0.95} />
      <L d="M362 46 V 86" c={BARK} w={1.4} t={0.95} />
    </g>
    <Code x={242} y={40} c={BONE} s={13} a="middle" w={700} t={0.7}>submit</Code>
    <Code x={363} y={38} s={12} a="middle" w={700} t={1.0}>beta</Code>
    <Code x={1123} y={129} s={12} a="middle" c="#8a7d6f" t={1.0}>email…</Code>
    <Note x={150} y={186} c={COPPER_DP} s={26} r={-3} t={1.1}>leaves are components</Note>
  </svg>;
}

/** Card art for each kind of software, all in hand-drawn interface. */
export function BuildArt({ art }: { art: string }) {
  return <svg className="build-art" viewBox="0 0 240 150" aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      {art === 'web' && <>
        <Box x={8} y={8} w={224} h={134} r={8} fill={PAPER} />
        <L d="M8 30 H 232 M20 19 h0.1 M30 19 h0.1 M40 19 h0.1" w={2.4} t={0.2} />
        <Box x={60} y={13} w={120} h={12} r={6} t={0.25} lw={1.4} />
        <L d="M20 44 V 132 M20 44 H 64 M20 60 H 56 M20 76 H 60" w={1.6} o={0.6} t={0.3} />
        <Box x={80} y={44} w={66} h={40} r={5} fill={COPPER} t={0.4} />
        <Box x={154} y={44} w={66} h={40} r={5} t={0.45} />
        <L d="M84 122 C 110 116, 120 96, 146 104 S 190 122, 220 96" c={COPPER_DP} w={2.4} t={0.6} />
      </>}
      {art === 'mobile' && <>
        <Box x={84} y={4} w={74} h={142} r={14} fill={PAPER} />
        <L d="M110 14 H 132" w={2.4} t={0.2} />
        <Box x={94} y={26} w={54} h={30} r={6} fill={INK} t={0.3} />
        {[0, 1, 2].map(i => <g key={i}><circle className="sk-pop" cx={102} cy={70 + i * 18} r="5" fill={i ? 'none' : COPPER} stroke={INK} strokeWidth="1.6" style={at(0.4)} /><L d={`M112 ${70 + i * 18} H ${144 - i * 8}`} w={1.6} o={0.7} t={0.45} /></g>)}
        <L d="M84 122 H 158 M100 132 h0.1 M121 132 h0.1 M142 132 h0.1" w={2} t={0.5} />
        <L d="M30 40 C 44 34, 60 38, 74 46 M168 96 C 184 92, 198 100, 210 112" c={COPPER} w={1.6} t={0.7} />
      </>}
      {art === 'ai' && <>
        <Box x={8} y={8} w={224} h={134} r={8} fill={INK} c={INK} />
        <L d="M20 20 h0.1 M30 20 h0.1 M40 20 h0.1" c={BONE} w={2.4} t={0.2} />
      </>}
      {art === 'flow' && <>
        <Box x={10} y={24} w={60} h={34} r={6} fill={PAPER} />
        <Box x={92} y={24} w={60} h={34} r={6} fill={COPPER} t={0.2} />
        <Box x={174} y={24} w={56} h={34} r={6} fill={PAPER} t={0.3} />
        <L d="M70 41 H 90 M84 35 l 6 6 l -6 6 M152 41 H 172 M166 35 l 6 6 l -6 6" w={2} t={0.4} />
        <L d="M122 58 V 84 M110 84 L 122 100 L 134 84 Z" w={2} t={0.5} />
        <Box x={60} y={110} w={124} h={30} r={6} fill={INK} t={0.6} />
        <L d="M122 100 V 108" w={2} t={0.6} />
      </>}
    </g>
    {art === 'ai' && <>
      <Code x={22} y={48} c={COPPER_LT} s={13} w={700} t={0.3}>{'>'} summarise contract.pdf</Code>
      <Code x={22} y={72} c={BONE} s={12} t={0.5}>· 3 obligations found</Code>
      <Code x={22} y={92} c={BONE} s={12} t={0.6}>· 1 date needs a review</Code>
      <Code x={22} y={118} c={COPPER_LT} s={12} t={0.7}>✓ sent to a person to check</Code>
    </>}
    {art === 'flow' && <>
      <Code x={40} y={46} s={12} a="middle" w={700}>order</Code>
      <Code x={122} y={46} s={12} a="middle" w={700} c={BONE} t={0.2}>approve</Code>
      <Code x={202} y={46} s={12} a="middle" w={700} t={0.3}>invoice</Code>
      <Code x={122} y={130} s={12} a="middle" w={700} c={BONE} t={0.6}>sync → ledger</Code>
    </>}
  </svg>;
}

/* ---------------- How we work: growth rings ---------------- */
function ring(cx: number, cy: number, r: number, seed: number) {
  const n = 28, pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = r * (1 + 0.035 * Math.sin(a * 3 + seed) + 0.02 * Math.sin(a * 7 + seed * 2));
    pts.push([cx + Math.cos(a) * k, cy + Math.sin(a) * k * 0.94]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
}
const RINGS = [{ r: 62, f: COPPER }, { r: 118, f: '#a8612f' }, { r: 172, f: '#7c4826' }, { r: 222, f: '#5b3a22' }];
const BARK_R = 244;
const LEAD = [-52, -24, 4, 32];
function ringPin(cx: number, cy: number, i: number): [number, number] {
  const rad = LEAD[i] * Math.PI / 180, r = RINGS[i].r;
  return [cx + Math.cos(rad) * r * 0.97, cy + Math.sin(rad) * r * 0.9];
}
export function GrowthRings({ labels }: { labels: readonly string[] }) {
  const cx = 260, cy = 260;
  return <svg className="rings-art" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
    <path className="sk-pop" d={ring(cx, cy, BARK_R, 0.3)} fill="#2e1f14" style={at(0)} />
    {[...RINGS].reverse().map((g, i) => <path key={g.r} className="sk-pop ring-fill" d={ring(cx, cy, g.r, i + 1)} fill={g.f} style={at(0.2 + (3 - i) * 0.35)} />)}
    <g filter="url(#sk-wobble)">
      <L d={ring(cx, cy, BARK_R, 0.3)} c={BONE} w={2.4} t={0} />
      {RINGS.map((g, i) => <L key={g.r} d={ring(cx, cy, g.r, 4 - i)} c={BONE} w={1.6} o={0.8} t={0.3 + i * 0.35} />)}
      {[40, 90, 146, 198].map((r, i) => <L key={r} d={ring(cx, cy, r, i * 1.7)} c={BONE} w={0.9} o={0.35} t={0.5 + i * 0.35} />)}
      {LEAD.map((a, i) => {
        const r = RINGS[i].r, rad = a * Math.PI / 180, R = BARK_R + 16;
        const px = cx + Math.cos(rad) * r * 0.97, py = cy + Math.sin(rad) * r * 0.9, ox = cx + Math.cos(rad) * R, oy = cy + Math.sin(rad) * R * 0.94;
        return <L key={a} d={`M${px.toFixed(1)} ${py.toFixed(1)} L ${ox.toFixed(1)} ${oy.toFixed(1)} H 516`} c={COPPER_LT} w={1.5} t={0.5 + i * 0.35} />;
      })}
    </g>
    <SeedLoop x={cx - 12} y={cy + 4} s={0.8} t={0.2} />
    {LEAD.map((a, i) => { const p = ringPin(cx, cy, i); return <circle key={a} className="sk-pop" cx={p[0]} cy={p[1]} r="5" fill={COPPER_LT} style={at(0.5 + i * 0.35)} />; })}
    {labels.map((l, i) => <Note key={l} x={524} y={cy + Math.sin(LEAD[i] * Math.PI / 180) * (BARK_R + 16) * 0.94 + 9} c={COPPER_LT} s={28} t={0.6 + i * 0.35}>{`${String(i + 1).padStart(2, '0')} ${l}`}</Note>)}
  </svg>;
}

/* ---------------- Contact: a terminal where the seed is planted ---------------- */
export function PlantTerminal() {
  return <svg className="terminal-art" viewBox="0 0 420 200" aria-hidden="true" focusable="false">
    <g filter="url(#sk-wobble)">
      <Box x={4} y={4} w={412} h={190} r={12} fill="#241b13" c={INK} lw={2.2} />
      <L d="M20 22 h0.1 M34 22 h0.1 M48 22 h0.1" c={COPPER_LT} w={3} t={0.2} />
    </g>
    <Code x={22} y={62} c={BONE} s={15} t={0.3}>$ git init your-idea</Code>
    <Code x={22} y={90} c={BONE} s={15} t={0.5}>$ git commit -m &quot;first conversation&quot;</Code>
    <Code x={22} y={118} c={COPPER_LT} s={15} t={0.7}>  ✓ planted on main</Code>
    <Code x={22} y={154} c={BONE} s={15} t={0.9}>$ _</Code>
    <SeedLoop x={350} y={136} s={1.1} t={0.8} />
  </svg>;
}

/* ---------------- A small codebase tree for the other pages ---------------- */
export function TreeVignette({ dark = false }: { dark?: boolean }) {
  const c = dark ? BONE : INK, b = dark ? COPPER_LT : BARK, card = dark ? '#241b13' : PAPER;
  return <svg className="tree-vignette" viewBox="0 0 320 300" aria-hidden="true" focusable="false">
    {!dark && <Wash cx={160} cy={100} rx={130} ry={90} c={COPPER} o={0.14} t={0} />}
    <g filter="url(#sk-wobble)">
      <L d="M40 214 C 110 206, 210 220, 280 210" c={c} w={2.2} t={0} />
      <L d="M152 214 C 154 190, 148 172, 120 158 M168 214 C 166 190, 176 172, 206 156 M160 214 C 158 170, 162 130, 160 100" c={b} w={2.4} t={0.2} />
      <Box x={20} y={100} w={110} h={64} r={8} fill={card} c={c} t={0.5} />
      <L d="M30 116 H 80" c={c} w={2} t={0.6} />
      {[0, 1, 2, 3].map(i => <rect key={i} className="sk-pop" x={34 + i * 18} y={154 - (i % 2 ? 24 : 14) - i * 4} width="11" height={(i % 2 ? 24 : 14) + i * 4} fill={i % 2 ? COPPER : c} style={at(0.7)} />)}
      <Box x={112} y={40} w={96} h={30} r={15} fill={dark ? COPPER : INK} c={c} t={0.6} />
      <Box x={196} y={96} w={104} h={56} r={8} fill={card} c={c} t={0.7} />
      <L d="M206 136 C 226 128, 236 110, 256 116 S 284 128, 292 108" c={COPPER} w={2.2} t={0.9} />
      <L d="M160 222 C 158 240, 162 256, 160 276 M158 228 C 136 238, 110 240, 92 254 M162 230 C 186 240, 210 244, 228 256" c={b} w={1.8} t={0.4} />
    </g>
    <Code x={160} y={60} c={BONE} s={12} a="middle" w={700} t={0.7}>deploy ▸</Code>
    <SeedLoop x={146} y={232} s={0.7} t={0.3} glow={false} />
  </svg>;
}
