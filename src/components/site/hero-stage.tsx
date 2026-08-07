import { useEffect, useState } from "react";

const HEADS = ["news", "reviews", "real talk"];

/**
 * Bold hero: an ink-black slab with an animated coworking status console,
 * wi-fi bars climbing, coffee steam rising, a printer spitting pages.
 */
export function HeroStage() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HEADS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-foreground text-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-[90px]"
        style={{ background: "color-mix(in oklab, var(--flare) 55%, transparent)" }}
      />

      <div className="relative z-10 grid gap-10 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-flare px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-background">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-background" />
            Live , 70% India, 30% world
          </div>

          <h1 className="mt-6 font-display text-[13vw] font-bold leading-[0.84] tracking-[-0.05em] sm:text-[9vw] lg:text-[6.6vw]">
            <span className="block">Coworking</span>
            <span className="relative block h-[1em] overflow-hidden text-flare">
              {HEADS.map((w, n) => (
                <span
                  key={w}
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(${(n - i) * 100}%)` }}
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block">from the desks.</span>
          </h1>
        </div>

        <Console />
      </div>
    </div>
  );
}

function Console() {
  const [bars, setBars] = useState([3, 2, 4]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBars([1 + Math.floor(Math.random() * 4), 1 + Math.floor(Math.random() * 4), 1 + Math.floor(Math.random() * 4)]);
      setPages((p) => p + 1);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-px bg-background/20 text-background">
      {/* wi-fi */}
      <Tile label="Wi-fi">
        <div className="flex h-14 items-end gap-1.5">
          {bars.map((b, n) => (
            <span
              key={n}
              className="w-3 bg-flare transition-all duration-500"
              style={{ height: `${b * 25}%` }}
            />
          ))}
        </div>
      </Tile>

      {/* coffee */}
      <Tile label="Coffee">
        <div className="relative h-14 w-full">
          <div className="absolute bottom-0 left-1/2 h-7 w-10 -translate-x-1/2 rounded-b-lg bg-background" />
          <div className="absolute bottom-1.5 left-1/2 h-4 w-2.5 translate-x-[22px] rounded-r-full border-2 border-background" />
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="absolute bottom-7 left-1/2 h-5 w-[3px] rounded-full bg-flare"
              style={{
                transform: `translateX(${(n - 1) * 10}px)`,
                animation: `hero-steam 1.8s ${n * 0.35}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </Tile>

      {/* printer */}
      <Tile label="Printer">
        <div className="relative h-14 w-full overflow-hidden">
          <div className="absolute bottom-0 left-1/2 h-6 w-14 -translate-x-1/2 bg-background" />
          <span
            key={pages}
            className="absolute bottom-5 left-1/2 h-8 w-10 -translate-x-1/2 bg-flare"
            style={{ animation: "hero-page 1.4s ease-out forwards" }}
          />
        </div>
      </Tile>
    </div>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 bg-foreground p-4">
      {children}
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-background/70">{label}</span>
    </div>
  );
}
