const LOOP = 'M7.5 -14V-26A11 14 0 0 1 29.5 -26C29.5 -12 19.5 -4 7.5 2';
const STEM = 'M7.5 64V-14';

/** The lowercase b symbol (stem + bowl in `ink`, loop always copper). */
export function BSymbol({ ink, className }: { ink: string; className?: string }) {
  return (
    <svg viewBox="-2 -44 64 120" className={className} aria-hidden="true" focusable="false">
      <path d={LOOP} fill="none" strokeLinejoin="round" stroke="#c3773e" strokeWidth={13} />
      <path d={STEM} fill="none" strokeLinejoin="round" stroke={ink} strokeWidth={15} />
      <circle cx={32} cy={32} r={24.5} fill="none" strokeLinejoin="round" stroke={ink} strokeWidth={15} />
    </svg>
  );
}

/** Hero artwork: the full wordmark. Every stroke is drawn on by ScrollEffects. */
export function HeroMark() {
  return (
    <svg id="bj-svg" className="hero-svg" aria-hidden="true" focusable="false">
      <g id="bj-g">
        <path className="acc draw" data-in="0.6,1" pathLength={1} d={LOOP} />
        <path className="ink draw" data-in="0.25,0.8" pathLength={1} d={STEM} />
        <circle className="ink draw" data-in="0,0.6" pathLength={1} cx={32} cy={32} r={24.5} />
        <g transform="translate(71 0)">
          <path className="ink draw" data-d="0" pathLength={1} d="M7.5 0V64" />
          <path className="ink draw" data-d="0.6" pathLength={1} d="M29.5 0V70.5A16 16 0 0 1 13.5 86.5H9.5" />
          <rect className="dot" data-fade="0" x={0} y={-24} width={37} height={15} />
          <circle className="ink draw" data-d="1" pathLength={1} cx={76} cy={32} r={24.5} />
          <path className="ink draw" data-d="1.4" pathLength={1} d="M100.5 0V64" />
          <path
            className="ink draw"
            data-d="2"
            pathLength={1}
            d="M149.021 12.900A14.5 12.25 0 1 0 137 32A14.5 12.25 0 1 1 124.979 51.100"
          />
          <circle className="ink draw" data-d="3" pathLength={1} cx={198} cy={32} r={24.5} />
          <path className="ink draw" data-d="3.4" pathLength={1} d="M222.5 0V64" />
        </g>
      </g>
    </svg>
  );
}
