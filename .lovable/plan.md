# The Coworking Dispatch — Homepage Hero Refresh

## Direction
Move away from the Kümmerlein reference layout while keeping one borrowed texture: a **warm grey hero slab**. The rest of the page stays editorial cream-and-ink. Sulphur yellow is retained only as a small accent mark, not a dominant colour.

## What we will build

### 1. Warm grey hero section
- Background: sampled warm grey **#D7D7CD** (`oklch(0.88 0.01 100)`).
- Full-width section, generous vertical padding.
- No background image, no broadcast arcs, no rounded photo frame.
- Content: oversized headline + short subheadline + one CTA.
- Headline idea: "Coworking, reported from the desks." with the word "desks" marked by a sulphur underline or dot.

### 2. Minimal typographic hero
- Large display type, left-aligned.
- One small sulphur yellow marker (underline, dot, or corner tick) as the only colour.
- CTA styled as a simple text link with a sulphur arrow or underline, not a filled button.

### 3. Header adjustment
- Header must read cleanly over the warm grey hero.
- Logo "TCD" wordmark stays black on grey; sulphur tick remains the accent.
- Mobile menu unchanged.

### 4. Rest of page untouched
- Sections below the hero keep the existing cream paper background and ink type.
- No warm grey bands elsewhere.
- No change to Space of the Week, Leaderboard, Red Flags, Sales Questions, or Newsletter sections beyond ensuring they sit on cream as they do now.

### 5. Cleanup
- Remove the unused `Broadcast` animation component from `src/components/site/hero-stage.tsx` or replace the hero stage with the new minimal treatment.
- Delete any leftover orange/flare references if they still exist.

## Outcome
A quieter, more original homepage: one warm grey slab at the top with bold type and a single sulphur accent, then the existing editorial cream body below. Distinct from Kümmerlein, but carrying the sophisticated grey texture the user liked.
