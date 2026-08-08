import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import type { HomePriceStats } from "@/lib/data.functions";

function formatCurrency(n: number, currency = "INR") {
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

type CityStat = HomePriceStats["cities"][0];

/** Rough position of a budget inside a city's price spread, using min/median/max anchors. */
function budgetPosition(budget: number, c: { min: number; median: number; max: number }) {
  if (budget <= c.min) return 0;
  if (budget >= c.max) return 100;
  if (budget <= c.median) {
    const span = Math.max(c.median - c.min, 1);
    return ((budget - c.min) / span) * 50;
  }
  const span = Math.max(c.max - c.median, 1);
  return 50 + ((budget - c.median) / span) * 50;
}

function verdict(budget: number, c: CityStat) {
  if (budget < c.min)
    return {
      title: "Below the floor",
      body: `Nothing we track in ${c.name} starts under ${formatCurrency(c.min)}. Stretch the budget or look at a nearby hub.`,
    };
  if (budget < c.median)
    return {
      title: "Value territory",
      body: `You are under the ${c.name} median of ${formatCurrency(c.median)}. Expect a working desk, not a lounge with a barista.`,
    };
  if (budget < c.median * 1.5)
    return {
      title: "Market rate",
      body: `Right around what ${c.name} actually charges. Ask what is bundled before you pay a rupee more.`,
    };
  return {
    title: "Premium bracket",
    body: `Well above the ${c.name} median. Fine if you want the address, but make them justify the gap.`,
  };
}

export function PriceShowstopper({ stats }: { stats: HomePriceStats }) {
  const cities = useMemo(
    () => [...stats.cities].sort((a, b) => b.count - a.count),
    [stats.cities],
  );
  const [cityName, setCityName] = useState<string>(cities[0]?.name ?? "");
  const city = cities.find((c) => c.name === cityName) ?? cities[0];
  const [budget, setBudget] = useState<number>(
    Math.round(stats.national.median / 500) * 500,
  );

  if (!city) return null;

  const sliderMin = Math.max(Math.floor(stats.national.min / 500) * 500, 0);
  const sliderMax = Math.ceil(Math.min(stats.national.max, stats.national.median * 4) / 500) * 500;
  const pos = budgetPosition(budget, city);
  const v = verdict(budget, city);
  const vsMedian = Math.round(((budget - city.median) / city.median) * 100);
  const affordable = cities.filter((c) => budget >= c.median).length;

  return (
    <section className="section-mist py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="acid-dot inline-block h-2 w-2 rounded-full" />
          Price intelligence
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl leading-[0.92] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]">
            What should you actually pay?
          </h2>
          {stats.lastUpdated && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Last checked {formatDate(stats.lastUpdated)}
            </div>
          )}
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Set your monthly budget, pick a city, and see exactly where you land against {stats.national.count} tracked spaces.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14">
          {/* Interactive budget lab */}
          <div className="rounded-[1.75rem] border border-border/60 bg-background/60 p-6 sm:p-8">
            {/* City chips */}
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 8).map((c) => {
                const on = c.name === cityName;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCityName(c.name)}
                    aria-pressed={on}
                    className={`rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition-colors ${
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/70 text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>

            {/* Budget readout */}
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Your budget</div>
                <div className="font-display text-5xl leading-none tracking-[-0.05em] tabular-nums sm:text-6xl">
                  {formatCurrency(budget)}
                  <span className="ml-1 text-base text-muted-foreground">/mo</span>
                </div>
              </div>
              <div
                className="rounded-full px-3 py-1 text-xs font-medium tabular-nums"
                style={{
                  backgroundColor: vsMedian <= 0 ? "var(--flare)" : "transparent",
                  border: vsMedian <= 0 ? "none" : "1px solid var(--border)",
                  color: vsMedian <= 0 ? "var(--foreground)" : "inherit",
                }}
              >
                {vsMedian === 0
                  ? `Exactly the ${city.name} median`
                  : `${Math.abs(vsMedian)}% ${vsMedian < 0 ? "below" : "above"} ${city.name} median`}
              </div>
            </div>

            {/* Slider */}
            <label className="sr-only" htmlFor="budget-slider">
              Monthly budget
            </label>
            <input
              id="budget-slider"
              type="range"
              min={sliderMin}
              max={sliderMax}
              step={500}
              value={Math.min(Math.max(budget, sliderMin), sliderMax)}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-range mt-7 w-full"
            />
            <div className="mt-2 flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>{formatCurrency(sliderMin)}</span>
              <span>{formatCurrency(sliderMax)}+</span>
            </div>

            {/* Spread track for the selected city */}
            <div className="mt-8">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {city.name} spread · {city.count} spaces
              </div>
              <div className="relative mt-4 h-2.5 rounded-full bg-foreground/10">
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200"
                  style={{ width: `${pos}%`, backgroundColor: "var(--flare)" }}
                />
                <span
                  className="absolute top-1/2 h-5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
                  style={{ left: "50%" }}
                  aria-hidden
                />
                <span
                  className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-background transition-[left] duration-200"
                  style={{ left: `${pos}%` }}
                  aria-hidden
                />
              </div>
              <div className="mt-3 flex justify-between text-xs tabular-nums text-muted-foreground">
                <span>{formatCurrency(city.min)}</span>
                <span className="font-medium text-foreground">Median {formatCurrency(city.median)}</span>
                <span>{formatCurrency(city.max)}</span>
              </div>
            </div>

            {/* Verdict */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background p-5">
              <div className="max-w-md">
                <div className="font-display text-lg leading-tight">{v.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </div>
              <Link
                to="/spaces"
                search={{ city: city.name }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                See {city.name} spaces
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right rail: where the budget travels */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Where your budget goes further
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {formatCurrency(budget)} beats the median in{" "}
              <span className="font-medium text-foreground">
                {affordable} of {cities.length}
              </span>{" "}
              cities we track.
            </p>
            <ul className="mt-5 divide-y divide-border/50 border-y border-border/50">
              {[...cities]
                .sort((a, b) => a.median - b.median)
                .slice(0, 9)
                .map((c) => {
                  const under = budget >= c.median;
                  return (
                    <li key={c.name}>
                      <Link
                        to="/spaces"
                        search={{ city: c.name }}
                        onMouseEnter={() => setCityName(c.name)}
                        className="group flex items-center gap-3 py-2.5 outline-none"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: under ? "var(--flare)" : "var(--border)" }}
                          aria-hidden
                        />
                        <span className="flex-1 truncate text-sm transition-colors group-hover:text-foreground">
                          {c.name}
                        </span>
                        <span className="font-display text-sm tabular-nums">{formatCurrency(c.median)}</span>
                        <span className="w-14 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                          {c.count}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className="mt-4 text-xs text-muted-foreground">
              National median {formatCurrency(stats.national.median)} · range{" "}
              {formatCurrency(stats.national.min)} to {formatCurrency(stats.national.max)}
            </div>
          </div>
        </div>

        {/* Bottom strip: newest spaces */}
        {stats.newest.length > 0 && (
          <div className="mt-14 border-t border-border/60 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">New this week</div>
              <Link
                to="/spaces"
                search={{ city: undefined }}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
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
