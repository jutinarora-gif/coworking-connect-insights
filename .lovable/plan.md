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

### 3. Header adjustment
- Header must read cleanly over the warm grey hero.
- Logo "TCD" wordmark stays black; the accent tick becomes mint.
- Mobile menu unchanged.

### 4. Rest of page untouched
- Sections below the hero keep the existing cream paper background and ink type.
- No warm grey bands elsewhere.
- No change to Space of the Week, Leaderboard, Red Flags, Sales Questions, or Newsletter sections beyond ensuring they sit on cream as they do now.

### 5. Cleanup
- Replace the hero stage in `src/components/site/hero-stage.tsx` with the new minimal treatment and drop the `Broadcast` arcs.
- Swap every sulphur/yellow token in `src/styles.css` for the mint accent, and sweep the codebase for leftover yellow or orange accent classes.

## Outcome
A quieter, more original homepage: one warm grey slab at the top with bold type and a single mint accent, then the existing editorial cream body below. It keeps the sophisticated grey texture without borrowing the reference site's yellow.
