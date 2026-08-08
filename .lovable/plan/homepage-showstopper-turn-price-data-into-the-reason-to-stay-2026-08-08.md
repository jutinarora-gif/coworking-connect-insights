# Homepage showstopper: turn price data into the reason to stay

The current homepage is clean but passive. A visitor can scan it in 10 seconds and leave. We own a fast-growing price dataset (151 spaces, 10-20 added daily). The homepage should make that dataset impossible to ignore.

## Three possible showstopper directions

### Option A: "The Price of a Hot Desk in India" — interactive city chart (recommended)

A full-width data section placed directly under the hero, before any editorial picks.

What it shows:
- One giant number: India's median hot-desk price, updated as spaces are added.
- An interactive bar chart of median prices by city (Bengaluru, Delhi NCR, Mumbai, Pune, Hyderabad, Chennai, etc.). Each bar is clickable and routes to `/spaces?city=Bengaluru`.
- Hovering a bar reveals the exact median, space count, and cheapest listed space in that city.
- A right-hand "livedata" strip: newest spaces added this week, last verified date, total spaces tracked.

Why it works:
- It is useful immediately, with no account.
- It proves the directory is alive and growing.
- It leads naturally into space pages (click a bar → see spaces in that city).
- It is honest: every number is derived from listed prices, not opinions.

### Option B: "What can ₹X buy you?" — budget explorer

A single interactive slider: drag your monthly desk budget, see what cities and spaces fall inside it.

What it shows:
- Slider set to the national median by default.
- Two results: "Fits in these cities" and "Specific spaces under your budget".
- A sentence that updates in real time: "₹6,500 fits 23 desks across 4 cities. The cheapest is ___ in Noida."

Why it works:
- It answers the user's actual question, not ours.
- Highly shareable: "I just found 12 desks under ₹5k".

### Option C: "Live tape" — scrolling price ticker

A horizontal, auto-scrolling ticker band that sits between the hero and the first content section.

What it shows:
- City median prices scrolling left.
- "Cheapest today: ___".
- "New this week: +__ spaces".
- "Last verified: __ hours ago".

Why it works:
- Very compact, adds motion without being childish.
- Reinforces that the data is current.

## Recommendation

Build **Option A** as the primary showstopper, and add a thin version of **Option C** as a ticker above or below it. Option A gives the visitor something to do and something to believe; Option C gives the page rhythm and currency.

## What changes on the homepage

1. Insert a new full-width section immediately after the hero capsule/search area.
2. Section background: warm greige (`--mist`) to separate it from the cream body, keeping the editorial palette.
3. Left side: headline "The price of a hot desk in India" + giant national median + short trust line.
4. Right side: SVG bar chart of city medians, mint accent on the active/hovered bar.
5. Below the chart: a compact row of "new this week" spaces and a "last updated" timestamp.
6. Keep existing sections (Best value, Editor's choice, etc.) below it.

## Technical notes

- New server function `getHomePriceStats()` in `src/lib/data.functions.ts` that returns:
  - national median, min, max, total space count
  - per-city median, min, max, space count, cheapest space slug/name/price
  - recently added spaces (limit 5, ordered by `created_at` desc)
- No new database tables or migrations needed. Uses existing `spaces` and `cities` tables.
- Chart is a custom SVG component, no new charting library. Keeps the bundle light and the style controlled.
- All numbers computed at request time; with 151 spaces this is fast. Cache with router `staleTime: 5 * 60_000` (5 minutes) if needed.
- Clicking a city bar navigates to `/spaces` with `search={{ city }}`.
- Fully SSR-friendly: SVG renders server-side.

## Build order

1. Add `getHomePriceStats()` server function.
2. Build the `PriceShowstopper` section component with SVG chart + live-data strip.
3. Insert it into `src/routes/index.tsx` right after the hero.
4. Add hover interactions and city-bar click navigation.
5. Verify on mobile: chart stacks vertically, numbers stay readable.
