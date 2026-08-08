# Desk Hop: an arcade game for The Coworking Dispatch

Build a one-button arcade game at `/play` (and a compact teaser on the homepage) that matches the TCD editorial aesthetic: warm paper, black ink, mint accent.

## Core loop

- Player controls a tiny remote worker who automatically runs across a long coworking floor.
- Tap, click, or press `Space` to jump from desk to desk.
- Fall into a gap or hit an obstacle and the round ends.
- Score = desks hopped + collectibles grabbed.
- Difficulty ramps every ~10 desks: faster run speed, wider gaps, more obstacles.

## Game objects

- **Desks**: Platforms of varying width. Some are stable, some wobble after landing.
- **Obstacles**: coffee spill, "meeting in 5 min" popup, printer jam, wobbly chair.
- **Collectibles**: coffee cup (+small score), wifi icon (+small score), mint coin (+bonus, ties to brand colour).
- **Background**: subtle parallax office floor, floor-to-ceiling windows, hanging pendant lights.

## Controls & platforms

- Desktop: `Space` / `ArrowUp` to jump; `P` to pause.
- Mobile: tap anywhere to jump; long-press for higher jump.
- Touch and keyboard must both feel tight; target 60 fps on Canvas.

## Route & surface

- New route `src/routes/play.tsx` at `/play`.
- Hero-style intro card with "Start run" button, quick instructions, and the current local high score.
- Game renders full-width inside a contained rounded card so it never feel like a different website.
- Add a small "Play Desk Hop" teaser card on the homepage below the newsletter section.

## Tech approach

- HTML5 Canvas inside a React component; `requestAnimationFrame` game loop.
- No external game library; keep the bundle light.
- Physics: simple gravity + jump impulse; AABB collision for obstacles/collectibles.
- State persisted to `localStorage`: high score, total runs, total desks hopped.
- Optional: a lightweight "share score" button that copies a text result to clipboard.

## Visual design

- Canvas art style: flat, editorial, thick black outlines, mint highlights.
- Player: small silhouette with a laptop bag.
- Desks: rounded rectangles in greige/black.
- Obstacles use the existing red-flag language (coffee, printer, meeting popup).
- Mint is reserved for collectibles and the high-score badge.
- Rounded corners, contained shadow, and the same page-heading dot rule above the section.

## Build order

1. Create `src/routes/play.tsx` with route metadata and page shell.
2. Build `src/components/site/desk-hop-game.tsx` Canvas component: loop, input, physics, spawning, collision, scoring.
3. Add game objects: desk, player, obstacles, collectibles, background parallax.
4. Implement localStorage persistence and share-score copy.
5. Add a small `DeskHopTeaser` component and insert it on the homepage after the newsletter.
6. Test desktop and mobile; ensure 60 fps and responsive Canvas sizing.

## Out of scope for now

- Server-side leaderboards or user accounts.
- Sound effects.
- Multiple characters or power-ups beyond the mint coin.

These can be added in a follow-up if the game gets traction.
