# Put the greige slab back behind the banner

Your preview is already on the newest build. The one thing missing is the approved warm grey (greige) band behind the hero, it is currently rendering on plain cream, which is why the top of the page still reads as the old look.

## What changes

- The banner sits on a full-width warm grey slab (#D7D7CD), edge to edge, with generous top and bottom breathing room.
- The oversized headline, the mint underline under "desks", and the capsule search bar all stay exactly as they are, just on grey instead of cream.
- The header/nav blends into the slab at the top of the page so there is no cream stripe above the grey.
- Everything below the banner keeps its current rhythm: cream sections, the black "Space of the week" slab, the mint newsletter card.
- Quick check on mobile and desktop that text contrast and the search field border still read cleanly on grey.

## Technical notes

- Wrap the hero in the existing `section-mist` utility from `src/styles.css` (already defines `--mist`, card, muted and border overrides), applied in `src/routes/index.tsx` around `HeroStage`.
- Move the hero's horizontal padding container inside the slab so the grey goes full bleed while content stays on the 1400px grid.
- Adjust the header on `/` to sit transparent over the mist band, or give it the same background, so the two do not visibly seam.
- No token changes, no new components, no content edits.
