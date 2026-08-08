import { useState } from "react";
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
  const [hovered, setHovered] = useState<string | null>(null);
  const maxMedian = Math.max(...stats.cities.map((c) => c.median), 1);

  return (
    <section className="section-mist py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
          {/* Left: headline + big number */}
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="acid-dot inline-block h-2 w-2 rounded-full" />
              Price intelligence
            </div>
            <h2 className="mt-5 font-display text-4xl leading-[0.92] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
              The price of a hot desk in India
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

            <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-xs">
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Cheapest</div>
                <div className="mt-1 font-display text-xl">{formatCurrency(stats.national.min, "INR")}</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Priciest</div>
                <div className="mt-1 font-display text-xl">{formatCurrency(stats.national.max, "INR")}</div>
              </div>
            </div>
          </div>

          {/* Right: city bar chart */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Median price by city</div>
              {stats.lastUpdated && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last checked {formatDate(stats.lastUpdated)}
                </div>
              )}
            </div>

            <div className="mt-6 flex-1">
              <div className="relative h-[300px] sm:h-[360px]">
                <svg
                  viewBox={`0 0 ${stats.cities.length * 72 + 32} 360`}
                  preserveAspectRatio="xMinYMid meet"
                  className="h-full w-full overflow-visible"
                >
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = 300 - ratio * 260;
                    return (
                      <line
                        key={ratio}
                        x1={16}
                        y1={y}
                        x2={stats.cities.length * 72 + 16}
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity={0.12}
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {stats.cities.map((city, i) => {
                    const barHeight = (city.median / maxMedian) * 260;
                    const x = i * 72 + 28;
                    const y = 300 - barHeight;
                    const isHovered = hovered === city.name;
                    const isActive = hovered === null || isHovered;

                    return (
                      <g
                        key={city.name}
                        className="cursor-pointer"
                        onMouseEnter={() => setHovered(city.name)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <Link to="/spaces" search={{ city: city.name }}>
                          <rect
                            x={x}
                            y={y}
                            width={36}
                            rx={10}
                            height={barHeight}
                            fill={isHovered ? "var(--flare)" : "var(--foreground)"}
                            opacity={isActive ? 1 : 0.35}
                            className="transition-all duration-200"
                          />
                          {/* Median label on top */}
                          <text
                            x={x + 18}
                            y={y - 12}
                            textAnchor="middle"
                            className="font-display text-[13px] tabular-nums"
                            fill="currentColor"
                            opacity={isActive ? 1 : 0.4}
                          >
                            {formatCurrency(city.median, "INR").replace("₹", "")}
                          </text>
                          {/* City name below, rotated */}
                          <text
                            x={x + 18}
                            y={328}
                            textAnchor="start"
                            transform={`rotate(35, ${x + 18}, 328)`}
                            className="text-[11px] uppercase tracking-wider"
                            fill="currentColor"
                            opacity={isActive ? 1 : 0.5}
                          >
                            {city.name}
                          </text>
                        </Link>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Hover detail card */}
              <div className="mt-6 min-h-[80px]">
                {hovered ? (
                  <HoveredCity city={stats.cities.find((c) => c.name === hovered)!} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Hover a city to see the median, range, and cheapest listed space. Click a bar to browse spaces in that city.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip: newest spaces */}
        {stats.newest.length > 0 && (
          <div className="mt-14 border-t border-border/60 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">New this week</div>
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

function HoveredCity({ city }: { city: HomePriceStats["cities"][0] }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-background/40 p-4 sm:gap-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{city.name} median</div>
        <div className="mt-0.5 font-display text-2xl">{formatCurrency(city.median, "INR")}</div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Range</div>
        <div className="mt-0.5 text-sm">
          {formatCurrency(city.min, "INR")} – {formatCurrency(city.max, "INR")}
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Spaces tracked</div>
        <div className="mt-0.5 text-sm">{city.count}</div>
      </div>
      {city.cheapest && (
        <div className="min-w-[140px]">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Cheapest</div>
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
