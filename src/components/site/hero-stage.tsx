/**
 * Minimal hero: a warm grey band, one oversized headline, and a single
 * mint mark under the last word. No imagery, no animated ornament.
 */
export function HeroStage() {
  return (
    <div className="relative py-20 sm:py-28 lg:py-32">
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="acid-dot inline-block h-2 w-2" />
        Live, 70% India, 30% world
      </div>

      <h1 className="mt-8 max-w-[16ch] font-display text-[14vw] font-bold leading-[0.82] tracking-[-0.055em] sm:text-[10vw] lg:text-[7.4vw]">
        Coworking, reported from the{" "}
        <span className="relative inline-block">
          desks
          <span className="absolute inset-x-0 -bottom-[0.06em] h-[0.1em] origin-left animate-[hero-rule_1.1s_cubic-bezier(0.65,0,0.35,1)_forwards] bg-flare" />
        </span>
        .
      </h1>
    </div>
  );
}
