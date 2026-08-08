import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import type { HomePriceStats } from "@/lib/data.functions";

function formatCurrency(n: number, currency: string) {
  const symbol = currency === "INR" ? "₹" : "$";
  return `${symbol}${Math.round(n).toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function PriceShowstopper({ stats }: { stats: HomePriceStats }) {
  const [active, setActive] = useState<string | null>(null);

  const cities = useMemo(
    () => [...stats.cities].sort((a, b) => b.median - a.median),
    [stats.cities],
  );
  const maxMedian = Math.max(...cities.map((c) => c.median), 1);
  const selected = cities.find((c) => c.name === active) ?? null;

  return (
    <section className="section-mist py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          {/* Left: headline + big number */}
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="acid-dot inline-block h-2 w-2 rounded-full" />
              Price intelligence
            </div>
            <h2 className="mt-5 font-display text-4xl leading-[0.92] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
              The price of a hot desk
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Median monthly desk price across every space we track. No paid placements, no invented reviews.
            </p>

            <div className="mt-8">
              <div className="font-display text-6xl leading-none tracking-[-0.05em] sm:text-7xl">
                {formatCurrency(stats.national.median, "INR")}
              </div>
              <div className="label mt-2 flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5" />
                National median across {stats.national.count} listed spaces
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xs">
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Cheapest</div>
                <div className="mt-1 font-display text-xl">{formatCurrency(stats.national.min, "INR")}</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Priciest</div>
                <div className="mt-1 font-display text-xl">{formatCurrency(stats.national.max, "INR")}</div>
              </div>
            </div>
          </div>

          {/* Right: ranked city rows */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Median price by city
              </div>
              {stats.lastUpdated && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last checked {formatDate(stats.lastUpdated)}
                </div>
              )}
            </div>

            <ul className="mt-5 divide-y divide-border/50 border-y border-border/50">
              {cities.map((city) => {
                const pct = Math.max((city.median / maxMedian) * 100, 4);
                const isActive = active === city.name;
                return (
                  <li key={city.name}>
                    <Link
                      to="/spaces"
                      search={{ city: city.name }}
                      onMouseEnter={() => setActive(city.name)}
                      onFocus={() => setActive(city.name)}
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      className="group flex items-center gap-4 py-2.5 outline-none"
                      aria-label={`Browse spaces in ${city.name}, median ${formatCurrency(city.median, "INR")}`}
                    >
                      <span className="w-[104px] shrink-0 truncate text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground sm:w-[132px]">
                        {city.name}
                      </span>

                      <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-foreground/8">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-300"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isActive ? "var(--flare)" : "var(--foreground)",
                          }}
                        />
                      </span>

                      <span className="w-[76px] shrink-0 text-right font-display text-sm tabular-nums sm:w-[92px] sm:text-base">
                        {formatCurrency(city.median, "INR")}
                      </span>
                      <span className="hidden w-[64px] shrink-0 text-right text-xs text-muted-foreground tabular-nums sm:block">
                        {city.count} {city.count === 1 ? "space" : "spaces"}
                      </span>
                      <ArrowUpRight className="hidden h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5">
              {selected ? (
                <SelectedCity city={selected} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Hover a city for its range and cheapest listed space. Click to browse every space there.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom strip: newest spaces */}
        {stats.newest.length > 0 && (
          <div className="mt-14 border-t border-border/60 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">New this week</div>
              <Link to="/spaces" search={{ city: undefined }} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                Browse all spaces
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {stats.newest.map((s) => (
                <Link
                  key={s.id}
                  to="/spaces/$slug"
                  params={{ slug: s.slug }}
                  className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition-all hover:border-foreground hover:bg-background"
                >
                  <div className="truncate font-display text-sm leading-tight">{s.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.city_name}</div>
                  <div className="mt-3 font-display text-lg leading-none">
                    {formatCurrency(s.price_from ?? 0, s.currency)}
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <ArrowUpRight className="mt-3 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SelectedCity({ city }: { city: HomePriceStats["cities"][0] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-border/60 bg-background/40 p-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{city.name} median</div>
        <div className="mt-0.5 font-display text-2xl">{formatCurrency(city.median, "INR")}</div>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Range</div>
        <div className="mt-0.5 text-sm tabular-nums">
          {formatCurrency(city.min, "INR")} – {formatCurrency(city.max, "INR")}
        </div>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Spaces tracked</div>
        <div className="mt-0.5 text-sm tabular-nums">{city.count}</div>
      </div>
      {city.cheapest && (
        <div className="min-w-[140px]">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Cheapest</div>
          <Link
            to="/spaces/$slug"
            params={{ slug: city.cheapest.slug }}
            className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {city.cheapest.name}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
