# Property pages without fake reviews

Fair pushback. Most of my earlier list needed data neither of us has for 200 spaces. This version only uses things that are either already true, computable, or genuinely user-generated.

## What we actually have per space today
Checked the database: 20 published spaces, and every one has name, city, address, cover image, description, price_from, amenities and vibe tags. None have lat/lng, and only one has a website URL.

Worth flagging: the descriptions and prices came from the same seeding pass as the reviews. If they were invented too, they carry the same trust risk and should be re-sourced from each space's own website or listing before launch. Everything below assumes facts are copied from the operator's public page, not written by us.

## Principle
No voice on the page pretends to be a person. Anything subjective is either labelled as the operator's own claim, or computed from real data, or clearly editorial and signed by TCD as an outsider view.

## What replaces reviews

### 1. Honest empty state, front and centre
Where reviews sat: "No verified reviews yet." Plus a one-line explanation that TCD refuses to seed reviews, and that ratings appear only after real coworkers submit them. This is a differentiator, not an apology. Everyone else fakes it.

### 2. 30-second rating, not a review
Point 7 is correct, Indian users won't write paragraphs. So don't ask for paragraphs. Ask for five taps: wifi, quiet, coffee, value, community, on a 5-point scale, no text field, no login wall until submit. Optional one-line comment. This is the only realistic path to real data at 200-space scale, and it's what actually fills the page over time.

### 3. Rating unlocks at a threshold
Hide the score until a space has, say, 5 ratings. Below that show "3 of 5 ratings needed to unlock this score" with a progress bar. Turns the empty state into a nudge and stops one angry ex-member defining a space.

### 4. Price in context (computed, not claimed)
"₹8,500/mo hot desk. That is 12% below the Bengaluru median of ₹9,650 across 14 listed spaces." Pure arithmetic on data we already hold, useful, and impossible to fake. Needs prices to be real, see the flag above.

### 5. The facts strip, sourced not invented
Only fields we can copy verbatim from the operator's own site: address, hot desk price, amenities, official website, map link. Each carries a "Listed by the operator, last checked <date>" line. Honest about provenance, cheap to maintain, no site visit needed.

### 6. Ask the salesperson (keep, promote)
Already real and already curated. Move it from a sidebar afterthought to a primary block. It is the most useful thing on the page for someone about to tour, and it costs no per-space data.

### 7. Tour checklist, printable
The red flags idea, reframed as a checkable list the user takes on their tour. Generic across all spaces so it scales to 200. Not forced if it is presented as a tool rather than as content padding.

### 8. Dispatches mentioning this space
Auto-linked from the news we already aggregate. Real coverage, zero manual work, and it grows on its own.

### 9. Also in this city
Two or three other spaces at a similar price point. Keeps the page useful when we have little to say about this one, and pushes users deeper into the directory.

## Q&A on the space page
Point 6 stands: seeded questions are fabricated and should go. Keep the block only as an empty invitation, "Worked here? Answer a question", with real submissions surfacing as they arrive. If that stays empty for weeks, we drop it.

## Seeded data
Reviews, questions and answers get hidden from public display rather than deleted, so the tables and any future real rows stay intact. Ratings, review counts and the leaderboard all recompute from real rows only, which means they show nothing at first. The homepage leaderboard and space cards need the same treatment or the fabrication just moves elsewhere.

## Page order after the change
1. Hero: name, city, tags, cover
2. Facts strip with source and last-checked date
3. Price in context
4. Ratings, unlocked or progress bar
5. Rate this space, the five-tap widget
6. Ask the salesperson
7. Tour checklist
8. Dispatches mentioning this space
9. Also in this city

## Technical notes
- Hide seeded rows via `is_hidden` on `reviews`, `questions`, `answers`, no schema change needed.
- Add `verified_at` to `spaces` for the last-checked date.
- New server functions: city price stats, dispatches by linked space, nearby spaces.
- New rating submission server function plus a compact `SpaceRating` component; auth required at submit only.
- Strip `avg_rating` and `review_count` from `SpaceCard` and the spaces index until real counts exist.
- Homepage leaderboard needs a real-data threshold or a temporary hide.

## Before building
1. Are the current descriptions and prices real, or seeded like the reviews?
2. Where do the 200 spaces live, the database has 20. A CSV or sheet import changes the shape of this work.
3. Ratings threshold before a score shows, 5 feels right, your call.
