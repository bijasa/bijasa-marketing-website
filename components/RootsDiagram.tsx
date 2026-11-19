/* The philosophy as a drawing: a small sprout above the ground line (what people see),
   and the roots below it (what decides whether software lasts). Two layouts:
   wide for tablet and desktop, tall for phones. Decorative copy is repeated as a list for screen readers. */

const roots = [
  'How the work really runs',
  'The data model',
  'Permissions and audit trails',
  'Integrations with what you already use',
  'Failure cases and recovery',
  'Tests and monitoring',
];

type Branch = { d: string; tip: [number, number]; label: string; anchor: 'start' | 'end'; dx: number };

const wide: Branch[] = [
  { d: 'M600 118 C 560 132, 470 140, 392 168', tip: [392, 168], label: roots[0], anchor: 'end', dx: -14 },
  { d: 'M600 170 C 540 196, 380 220, 268 262', tip: [268, 262], label: roots[1], anchor: 'end', dx: -14 },
  { d: 'M600 236 C 560 280, 500 318, 430 346', tip: [430, 346], label: roots[2], anchor: 'end', dx: -14 },
  { d: 'M600 132 C 650 146, 740 152, 812 182', tip: [812, 182], label: roots[3], anchor: 'start', dx: 14 },
  { d: 'M600 200 C 670 222, 820 236, 930 278', tip: [930, 278], label: roots[4], anchor: 'start', dx: 14 },
  { d: 'M600 276 C 630 316, 700 344, 772 362', tip: [772, 362], label: roots[5], anchor: 'start', dx: 14 },
];
/* Rootlets grow from points along each branch, so every line is attached. */
function pt(d: string, t: number) {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n, u = 1 - t;
  return [u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3, u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3];
}
function rootlets(branches: Branch[], len: number) {
  return branches.flatMap(b => [0.42, 0.72].map((t, i) => {
    const [x, y] = pt(b.d, t), dir = b.anchor === 'end' ? -1 : 1, l = len * (i ? 0.7 : 1);
    return `M${x.toFixed(1)} ${y.toFixed(1)} C ${(x + dir * l * 0.15).toFixed(1)} ${(y + l * 0.4).toFixed(1)}, ${(x + dir * l * 0.1).toFixed(1)} ${(y + l * 0.75).toFixed(1)}, ${(x + dir * l * 0.35).toFixed(1)} ${(y + l).toFixed(1)}`;
  }));
}

const tall: Branch[] = roots.map((label, i) => {
  const y0 = 108 + i * 64, y1 = y0 + 30;
  return { d: `M40 ${y0} C 64 ${y0 + 4}, 92 ${y1 - 6}, 118 ${y1}`, tip: [118, y1], label, anchor: 'start', dx: 14 };
});

function Drawing({ branches, fine, w, h, ground, stem, kind }: {
  branches: Branch[]; fine: string[]; w: number; h: number; ground: number; stem: number; kind: 'wide' | 'tall';
}) {
  const tap = kind === 'wide' ? `M${stem} ${ground} C ${stem - 1} 200, ${stem + 2} 300, ${stem - 2} ${h - 6}` : `M${stem} ${ground} C ${stem - 3} 220, ${stem + 4} 400, ${stem - 2} ${h - 10}`;
  const seeLabel = kind === 'wide' ? { x: stem + 30, y: ground - 40, a: 'start' as const } : { x: stem + 30, y: ground - 34, a: 'start' as const };
  return <svg className={`roots-svg roots-${kind}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
    <line className="roots-ground" x1="0" y1={ground} x2={w} y2={ground} />
    <text className="roots-note" x={w} y={ground + 24} textAnchor="end">What decides whether it lasts</text>
    {/* Sprout */}
    <path className="roots-sprout" d={`M${stem} ${ground} C ${stem} ${ground - 16}, ${stem + 2} ${ground - 30}, ${stem} ${ground - 44}`} />
    <path className="roots-leaf" d={`M${stem} ${ground - 30} C ${stem - 8} ${ground - 46}, ${stem - 26} ${ground - 48}, ${stem - 30} ${ground - 40} C ${stem - 22} ${ground - 30}, ${stem - 10} ${ground - 28}, ${stem} ${ground - 30} Z`} />
    <path className="roots-leaf" d={`M${stem} ${ground - 40} C ${stem + 8} ${ground - 58}, ${stem + 26} ${ground - 60}, ${stem + 32} ${ground - 52} C ${stem + 24} ${ground - 40}, ${stem + 10} ${ground - 38}, ${stem} ${ground - 40} Z`} />
    <text className="roots-label roots-label-see" x={seeLabel.x + 12} y={seeLabel.y} textAnchor={seeLabel.a}>The screens people see</text>
    {/* Roots */}
    <path className="roots-tap" d={tap} />
    {fine.map(d => <path key={d} className="roots-fine" d={d} />)}
    {branches.map(b => <g key={b.label}>
      <path className="roots-branch" d={b.d} />
      <circle className="roots-tip" cx={b.tip[0]} cy={b.tip[1]} r="4" />
      <text className="roots-label" x={b.tip[0] + b.dx} y={b.tip[1] + 4} textAnchor={b.anchor}>{b.label}</text>
    </g>)}
  </svg>;
}

export default function RootsDiagram() {
  return <figure className="roots">
    <Drawing kind="wide" branches={wide} fine={rootlets(wide, 46)} w={1200} h={400} ground={88} stem={600} />
    <Drawing kind="tall" branches={tall} fine={rootlets(tall, 20)} w={360} h={500} ground={70} stem={40} />
    <figcaption className="sr-only">What people see is the screen. What decides whether software lasts is underneath: {roots.join(', ')}.</figcaption>
  </figure>;
}
