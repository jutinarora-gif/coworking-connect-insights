import { useEffect, useState } from "react";

/**
 * Minimal, bold banner: paper, one oversized headline, and a single
 * coworking signal, a wi-fi arc that breathes.
 */
export function HeroStage() {
  const [step, setStep] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s % 3) + 1), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative border-y border-foreground/15 py-14 sm:py-20">
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <Signal step={step} />
        Live , 70% India, 30% world
      </div>

      <h1 className="mt-8 max-w-[16ch] font-display text-[14vw] font-bold leading-[0.82] tracking-[-0.055em] sm:text-[10vw] lg:text-[7.4vw]">
        Coworking, reported from the <span className="box-decoration-clone bg-flare px-[0.12em] text-flare-ink">desks</span>.
      </h1>
    </div>
  );
}

function Signal({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 24 18" className="h-4 w-5 shrink-0" aria-hidden>
      {[1, 2, 3].map((n) => (
        <path
          key={n}
          d={
            n === 1
              ? "M9 13.5a4.5 4.5 0 0 1 6 0"
              : n === 2
                ? "M6 10a9 9 0 0 1 12 0"
                : "M3 6.5a14 14 0 0 1 18 0"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="transition-opacity duration-300"
          style={{ opacity: step >= n ? 1 : 0.18 }}
        />
      ))}
      <circle cx="12" cy="16.4" r="1.2" fill="currentColor" />
    </svg>
  );
}
