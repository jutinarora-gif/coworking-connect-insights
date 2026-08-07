# Kill the orange. Black hero, cream body, one sulphur accent.

Where the orange came from: the reference site's stylesheet does carry a hot orange (`rgb(255,105,0)`) next to a pale sulphur yellow (`#f7f788`) — but both sit on a near-black base. I took the accent and left the background cream, so the accent had to shout to be seen. Fix: bring the black back where it belongs and drop the orange entirely.

## The new system

- **Hero and select feature blocks**: near-black (`#0A0A0A`), off-white type.
- **Everything below**: warm cream paper (`#FAF7F0`) with ink type, unchanged reading comfort.
- **One accent**: sulphur yellow `#F7F788`. It reads brilliantly on black, so it lives there — filled blocks, the logo tick, the live marker, rank numerals inside dark surfaces.
- **On cream**: no yellow text (invisible). Emphasis on light surfaces is ink-on-ink: heavier weight, a black rule, or a small black-filled block with off-white type.
- **No orange anywhere.** Every `--flare` orange usage gets reassigned.

## What changes on screen

1. **Hero**: black slab, edge to edge. Off-white oversized headline. The broadcast arcs redraw in sulphur yellow on black, where they finally read. The word "desks" gets a sulphur underline instead of orange.
2. **Header**: stays cream, but the TCD square is black with a sulphur tick. When scrolled over the black hero it inverts.
3. **Space of the Week**: promoted to the second black block, so the page has a black-cream-black rhythm rather than one lonely dark banner.
4. **Red Flags**: black block, sulphur bullet markers. It's a warning section, it earns the contrast.
5. **Leaderboard, dispatches, spaces, Q&A**: stay cream and ink. Rank numerals become black-filled squares with off-white numbers.
6. **Buttons**: primary is black with off-white type on cream; on black sections it flips to sulphur fill with black type.

## Technical notes

- `src/styles.css`: replace `--flare: oklch(0.665 0.212 44)` with the sulphur token, set `--flare-ink` to near-black, and add `--ink-surface` / `--ink-surface-foreground` tokens for the dark blocks. Add a `.section-ink` utility that flips background, foreground, border, and muted-foreground inside dark blocks so existing semantic classes work unmodified.
- `src/components/site/hero-stage.tsx`: wrap in the dark surface, restroke the arcs to `var(--flare)`, drop the cream-specific border treatment.
- `src/routes/index.tsx`: wrap Space of the Week and Red Flags in `.section-ink`; swap orange rank/badge treatments to the block style.
- `src/components/site/header.tsx`: sulphur tick on the black square.
- Grep the whole `src/` tree for remaining `flare`/orange usages and reassign each one rather than leaving stragglers.
