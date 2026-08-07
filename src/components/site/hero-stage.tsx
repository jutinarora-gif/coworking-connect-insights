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
      className="relative overflow-hidden py-20 sm:py-28"
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

/** Oversized wi-fi arcs broadcasting from a solid mark on the right. */
function Broadcast() {
  const R = [64, 116, 168, 220, 272];
  return (
    <svg
      viewBox="0 0 420 300"
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[300px] w-[420px] -translate-y-1/2 lg:block xl:right-6"
    >
      <g fill="none" stroke="var(--flare)" strokeLinecap="round">
        {R.map((r, i) => (
          <path
            key={r}
            d={`M ${210 - r * 0.7071} ${290 - r * 0.7071} A ${r} ${r} 0 0 1 ${210 + r * 0.7071} ${290 - r * 0.7071}`}
            strokeWidth={7 - i}
            style={{
              opacity: 0,
              transformOrigin: "210px 290px",
              animation: `hero-broadcast 2.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.14}s both`,
            }}
          />
        ))}
        <circle cx="210" cy="285" r="14" fill="var(--flare)" stroke="none" />
      </g>
    </svg>
  );
}


