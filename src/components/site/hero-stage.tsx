import { useEffect, useRef, useState } from "react";

const LINES = ["Coworking news,", "reviews, and real talk", "from everywhere."];

/**
 * Editorial showstopper: a dot-matrix field plus an inverted "ink lens" that
 * follows the cursor and repaints the headline in negative as it passes.
 * Falls back to a slow auto-orbiting lens when there is no pointer.
 */
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 30, y: 45 });
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (live) return;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const p = (t - start) / 7000;
      setPos({ x: 50 + Math.cos(p * Math.PI * 2) * 34, y: 50 + Math.sin(p * Math.PI * 2 * 1.3) * 26 });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [live]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setLive(true);
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const lens = `circle(clamp(90px, 13vw, 190px) at ${pos.x}% ${pos.y}%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setLive(false)}
      className="relative isolate overflow-hidden border border-border bg-card"
    >
      {/* dot matrix field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* flare bloom trailing the lens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(340px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--flare) 22%, transparent), transparent 70%)`,
        }}
      />

      <Type className="relative z-10" />

      {/* inverted layer, revealed only inside the lens */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-foreground text-background"
        style={{ clipPath: lens, WebkitClipPath: lens }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(color-mix(in oklab, var(--flare) 70%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <Type inverted />
      </div>
    </div>
  );
}

function Type({ inverted, className = "" }: { inverted?: boolean; className?: string }) {
  return (
    <div className={`px-5 py-14 sm:px-10 sm:py-20 ${className}`}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
        <span className={`h-1.5 w-1.5 rounded-full ${inverted ? "bg-flare" : "bg-flare"}`} />
        Live , 70% India, 30% world
      </div>
      <h1 className="mt-7 font-display text-[11.5vw] leading-[0.88] tracking-[-0.045em] sm:text-[8vw] lg:text-[6.2vw]">
        {LINES.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h1>
    </div>
  );
}
