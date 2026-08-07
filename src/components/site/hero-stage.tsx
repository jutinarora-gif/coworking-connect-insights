import { useEffect, useRef, useState } from "react";

/**
 * Big, calm banner: cream paper, one oversized headline, and a large
 * broadcast of wi-fi arcs that pulse outward from the corner mark.
 */
export function HeroStage() {
  const [pulse, setPulse] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => p + 1), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-foreground/15 py-16 sm:py-24"
    >
      <Broadcast key={pulse} />

      <div className="relative">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="inline-block h-2 w-2 bg-flare" />
          Live , 70% India, 30% world
        </div>

        <h1 className="mt-8 max-w-[16ch] font-display text-[14vw] font-bold leading-[0.82] tracking-[-0.055em] sm:text-[10vw] lg:text-[7.4vw]">
          Coworking, reported from the{" "}
          <span className="relative inline-block">
            desks
            <span className="absolute inset-x-0 -bottom-[0.06em] h-[0.09em] origin-left animate-[hero-rule_1.1s_cubic-bezier(0.65,0,0.35,1)_forwards] bg-flare" />
          </span>
          .
        </h1>
      </div>
    </div>
  );
}

/** Oversized wi-fi arcs sweeping out from the right edge. */
function Broadcast() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className="pointer-events-none absolute bottom-[-34%] right-[-6%] aspect-square h-[175%] opacity-70"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="none" stroke="var(--flare)" strokeLinecap="round">
        {[60, 110, 160, 210, 260].map((r, i) => (
          <circle
            key={r}
            cx="330"
            cy="330"
            r={r}
            strokeWidth={i === 0 ? 10 : 2}
            strokeDasharray={`${r * 1.6} ${r * 6}`}
            strokeDashoffset={r * 0.2}
            transform="rotate(-135 330 330)"
            style={{
              transformOrigin: "330px 330px",
              animation: `hero-broadcast 2.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.16}s both`,
            }}
          />
        ))}
        <circle cx="330" cy="330" r="12" fill="var(--flare)" stroke="none" />
      </g>
    </svg>
  );
}
