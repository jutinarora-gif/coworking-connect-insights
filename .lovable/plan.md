# Escape the Bad Office: a top-down maze game

A one-screen, top-down maze game at `/play`. The player starts at the office entrance and must fight their way through Dead Zones, Burnt Brew, and other office monsters to reach the Wonderland exit, where everything finally works.

The whole maze is visible at once. No scrolling, no camera. Half the page is the board, the other half is the HUD.

## The board

- Top-down office floorplan drawn as a maze: corridors, meeting rooms, phone booths, a pantry, a printer alcove.
- Walls are drawn as office furniture and partitions, not generic blocks, so it reads as a floorplan rather than a puzzle grid.
- Fixed grid, roughly 21 x 15 cells, scaled to fit the container. Entire maze visible with no scrolling.
- Entry tile bottom-left marked "Reception". Exit tile top-right marked "Wonderland" and glows mint.
- The Wonderland door stays locked until the player clears the required monsters or collects the keycards.

## Monsters

Each monster is a coworking pain point given a form. All are killable.

- **Dead Zone** — a flickering wifi-wave blob. Drifts along corridors. Slows the player briefly on contact.
- **Burnt Brew** — a coffee-cup creature leaving hot puddle trails.
- **The Jam** — a stationary printer beast that spits paper projectiles down its corridor.
- **Meeting Swarm** — small notification squares that chase the player in a loose group.
- **The Loud One** — patrols a fixed path, moves fast, sends out shout rings that push the player back.

## Combat

- Arrow keys / WASD move the player one direction at a time, grid-smooth.
- Space fires a short-range burst in the direction currently faced.
- Each monster takes 1-3 hits. Killed monsters pop into a small mint burst and drop a "fix" token.
- The player has 3 lives. Contact with a monster costs half a heart and triggers a brief invulnerability flash.
- A short cooldown on Space so the game is not a spam-fest.

## Progression

- Three floors of increasing difficulty. Each floor is a distinct maze layout.
- Floor 1: 4 monsters, simple layout, teaches movement and attack.
- Floor 2: adds The Jam and projectiles, more dead ends.
- Floor 3: all monster types, tighter corridors, a patrolling Loud One.
- Clearing a floor opens the Wonderland door. Stepping through advances to the next floor.
- Beating floor 3 shows a Wonderland end screen: perfect wifi, hot coffee, an empty phone booth.

## The clock: fastest escape wins

Time is the score. Everything else is a modifier.

- A timer starts on the first keypress and runs to hundredths of a second. It is the biggest number in the HUD.
- Per-floor splits are recorded and shown at each floor transition, green if faster than your best split, muted if slower.
- A "Time to beat" line sits under the clock: your personal best for that floor, plus a fixed par time set per floor.
- A ghost pace bar shows whether you are currently ahead or behind your best run, updating live.
- Deaths cost time rather than ending the run: each hit adds a 3 second penalty to the clock instead of burning a life outright. Lives still exist as a hard fail at zero.
- Fix tokens dropped by killed monsters shave 1 second each, so fighting is a real choice against running past.
- End screen shows total time, per-floor splits, penalty seconds, and whether it is a new personal best.
- Persist best total time and best per-floor splits in `localStorage`. Best run replaces the old "best score" idea entirely.

## HUD and layout

- Left / top half: the maze canvas in a rounded card on the greige `--mist` band.
- Right / bottom half: the running clock, time to beat, ahead/behind pace, lives, floor number, monsters remaining, a compact legend of monster types, and controls.
- Below the board: a start / pause / restart control row and your best escape time.
- On mobile the board sits on top and the HUD stacks beneath. On-screen d-pad plus an attack button appear on touch devices.


## Visual design

Same language as the rest of the site.

- Paper cream background, near-black ink walls, mint reserved for the player, the exit, and kill effects.
- Flat shapes, thick black outlines, no gradients or drop shadows inside the canvas.
- Schibsted Grotesk for HUD numbers, uppercase tracked labels for legends, matching the existing `label` style.
- Monsters are simple silhouettes in charcoal with a single mint or muted-red detail so they read instantly at small size.
- Wonderland exit is the only place that uses a soft mint glow.

## Tech approach

- New route `src/routes/play.tsx` at `/play`, with its own head metadata.
- Game component `src/components/site/office-maze/` split into: `maze-game.tsx` (canvas + loop), `levels.ts` (grid layouts), `entities.ts` (player, monster behaviours), `render.ts` (drawing), `hud.tsx`.
- HTML5 Canvas with `requestAnimationFrame`. No game library.
- Grid-based collision, per-monster simple AI: drift, patrol path, and chase-within-radius.
- Canvas sized by container with device pixel ratio scaling so it stays crisp.
- Timer driven off the animation loop's accumulated delta, not wall clock, so pausing and tab blur never inflate the run.
- Best total time, best per-floor splits, and total escapes persisted in `localStorage`.
- Pause on tab blur. Keyboard events scoped so arrow keys do not scroll the page.

## Site integration

- Add "Play" to the header nav.
- Add a compact teaser card on the homepage linking to `/play`, styled like the existing section cards.

## Build order

1. Route + page shell + HUD layout.
2. Grid, walls, player movement, and rendering.
3. Exit door, floor completion, and floor progression.
4. Monsters one at a time, starting with Dead Zone and Burnt Brew.
5. Attack, hit detection, lives, and kill effects.
6. Mobile touch controls and responsive board sizing.
7. localStorage persistence, end screen, header and homepage links.
8. Playtest on desktop and mobile for frame rate and control feel.

## Out of scope for now

- Server leaderboards and accounts.
- Sound.
- Power-ups beyond the fix tokens.
