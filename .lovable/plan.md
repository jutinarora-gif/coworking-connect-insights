# The Coworking Dispatch — Homepage Hero Refresh

## Direction
Move away from the Kümmerlein reference layout while keeping one borrowed texture: a **warm grey hero slab**. The rest of the page stays editorial cream-and-ink. The sulphur yellow is replaced entirely by a **fresh mint green** accent so the palette no longer echoes the reference site.

## New accent colour
- Accent: **#8DF688** mint green (`oklch(0.9 0.16 143)`).
- Because mint is light, it is always paired with near-black ink type on top, never used as light text on a light surface.
- Usage: solid mint blocks/underlines with dark ink type, mint dots, and mint fills behind key words.
- Every existing sulphur/yellow token and class is retired.

## What we will build

### 1. Warm grey hero section
- Background: sampled warm grey **#D7D7CD** (`oklch(0.88 0.01 100)`).
- Full-width section, generous vertical padding.
- No background image, no broadcast arcs, no rounded photo frame.
- Content: oversized headline + short subheadline + one CTA.
- Headline: "Coworking, reported from the desks." with "desks" sitting on a solid mint block or thick mint underline.

### 2. Minimal typographic hero
- Large display type, left-aligned, near-black ink on warm grey.
- One mint marker (block highlight, thick underline, or dot) as the only colour.
- CTA styled as a text link with a mint underline or a small mint filled square, not a heavy button.

### 3. Logo and header
- Remove the small accent dot/tick from the logo entirely. The mark becomes a clean "TCD" wordmark only, near-black ink, no coloured element.
- Header must read cleanly over the warm grey hero.
- Nav links unchanged: Dispatches, Spaces, Winners, Questions, plus search and sign in.
- Mobile menu unchanged.

### 4. Existing structure stays intact
The homepage keeps every section currently live, in this order, all on cream below the hero:
1. Hero (now warm grey, minimal type)
2. India Leaderboard, top 3 per category (Best Wifi, Best Community, Cleanest Spaces, Best On-Ground Support, Most Consistent AC, Most Private Meeting Rooms)
3. Space of the Week
4. Top winners this week, ranked five
5. Questions to ask the salesperson, numbered checklist with category tags
6. Red flags, seven numbered points
7. Leave a review prompt
8. Latest dispatches, India and Global mix
9. The Wednesday Dispatch newsletter signup
10. Footer, unchanged links and "Made in India, by coworkers, for coworkers."

No sections are added, removed, or reordered. Only the hero band and the accent colour change.

### 5. Cleanup
- Replace the hero stage in `src/components/site/hero-stage.tsx` with the new minimal treatment and drop the `Broadcast` arcs.
- Swap every sulphur/yellow token in `src/styles.css` for the mint accent, and sweep the codebase for leftover yellow or orange accent classes.
- Remove the logo dot markup from `src/components/site/header.tsx`.

## Outcome
A quieter, more original homepage: one warm grey slab at the top with bold type and a single mint accent, a clean wordmark logo, then the full existing editorial cream body below, unchanged in structure.
