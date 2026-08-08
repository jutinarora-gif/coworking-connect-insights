# Cold start: earn the visit before asking for anything

With no traffic, anything that depends on users is dead on arrival, and right now there's no honest reason to make an account. So we don't fix the sign-up prompt. We take sign-up off the critical path and make the site useful to a total stranger on their first visit.

## Differentiation from myhq.in and cofynd.com

Both are transaction marketplaces. Their business model is lead generation: put a user in touch with a space operator, take a cut or a fee. That shapes everything they publish. They can't rank spaces honestly, they can't flag bad deals, and every page is designed to convert a visit into a tour booking.

The Coworking Dispatch is not a marketplace. It is an independent information layer: price intelligence, editorial picks, news, and tools that help someone choose before they ever contact an operator. The incentive is the reader's trust, not a commission from the space.

That gives us three things they cannot copy without breaking their own model:

1. **Independent price data.** They list prices, but they don't benchmark them. We can say "this is 18% below the Noida median" because we are not paid by Noida operators.
2. **Honest negatives.** Red flags, what to negotiate, and "skip this if you need parking" are only possible when the space is not your customer.
3. **Editorial voice.** A weekly pick, a Wednesday newsletter, and dispatches that treat coworking as a beat, not a catalog.

The risk is drifting back toward being a directory with nicer copy. We avoid that by making the tools and the price intelligence the destination, and the space pages secondary proof of the dataset.

## What we actually have

I pulled the live site: **151 spaces**, growing 10-20 a day. Each carries city, area, address, hot-desk price, amenities and vibe tags. That's a real, fast-growing dataset.

What's fabricated on those pages today: the reviews, the star ratings and the ratings breakdown. The overview paragraphs read generated too, so they should be re-sourced from each operator's own listing over time.

The directory itself is the asset. 151 spaces with real prices is a dataset nobody else in India publishes properly. We build on that, not on reviews.

## What makes the site worth an hour, from day one

### 1. Price intelligence across 151 spaces
The strongest thing we own, and it gets better every day you add spaces, not every day we get users.

- City price bands: what a hot desk really costs in Bengaluru vs Noida vs Pune, with median, range, and every space plotted on it.
- Per space: "₹6,499. That's 18% below the Noida median across 23 listed spaces, and the 3rd cheapest with 24/7 access."
- Cheapest and priciest per city, per micro-market, per amenity combination.
- Area-level view: Koramangala vs Indiranagar, Sector 62 vs Sector 44.

Real, verifiable, quotable, and impossible for a competitor to fake without doing the same 151-space legwork.

### 2. Compare, side by side
Pick up to three spaces, get a table: price, amenities, area, tags. Persistent tray while browsing, stored locally, works signed out. Nobody picks a space from one page. We replace the four open tabs.

### 3. Find my space
Six taps, no account: city, budget, team size, what matters most, how often, vibe. Ranked shortlist with a plain reason each. Pure client-side scoring over the directory. Nothing collected, nothing stored.

### 4. The tour kit
The salesperson questions, promoted from sidebar to signature asset. Plus a printable tour checklist and a short "what to negotiate" note. Free, no email. The thing people forward to a colleague.

### 5. The dispatch, front and centre
The news is already real and already running. Make it the reason to come back rather than a strip near the footer. Space pages auto-link any dispatch mentioning them.

## The single, honest ask

One thing, one place: **the Wednesday Dispatch**. "One email a week. India's coworking news, new spaces, price moves. No spam."

No account, no profile, no gate on any feature. Email is the only conversion we chase. The emailer to deliver it already exists.

Accounts come later, when the pitch is honest: save your shortlist across devices, get told when a space in your city moves its price. Build that when there are prices moving and people to tell.

## Trust, stated plainly
A permanent line on space pages and in the footer: no paid placement, no seeded reviews, facts sourced from the operator's own listing, last checked on a date. Right now, "we have no reviews yet and we won't invent them" is a stronger signal than any five-star average, because everyone else fakes it.

## What goes away
Seeded reviews, questions and answers get hidden from public view, not deleted. Ratings, review counts and the ratings breakdown disappear from space pages, space cards and the spaces index until real ones exist.

## Editor's Choice replaces Space of the Week
Yes, and it solves the problem cleanly. Rebrand it **Editor's Choice**, signed by TCD, so the claim is "we picked this" rather than "users rated this". No reviews needed, no scores implied, and one clearly-labelled opinion a week is entirely defensible.

To keep it from reading as arbitrary, each pick carries a short "why this one" note anchored to facts we hold: price against the city median, the amenity or location that stands out, who it suits. So it's an opinion built on real numbers, not a vibe.

Same move for the weekly leaderboard, which currently ranks on fabricated ratings. Replace it with **Best value in <city>**, computed purely on price against amenities. No opinion, no users, just arithmetic on the directory.


## Space page after the change
1. Hero, with Compare
2. Facts strip, sourced from the operator, last-checked date
3. Price in context, with the city band chart
4. Ask the salesperson, promoted
5. Tour checklist
6. Dispatches mentioning this space
7. Also in this area, similar price
8. Trust line

## Technical notes
- No new tables and no auth work. Runs on existing `spaces`, `cities`, `dispatches`, `sales_questions`.
- New server function for price stats: per-city and per-area median, range, percentile rank, cached.
- Compare tray and shortlist in local storage only.
- Matchmaker: client-side scoring, no persistence.
- Hide seeded rows via `is_hidden`. Strip `avg_rating` and `review_count` from `SpaceCard`, the spaces index and the space page.
- Add `verified_at` to `spaces` for the last-checked date.
- Winners and space of the week switch to editorial pick plus computed value ranking.
- The preview database holds 20 spaces against 151 live, so I'll need the full set in here before price intelligence means anything. Simplest route is a CSV export of your spaces table, which I can import directly.

## Build order
1. Hide the fabricated ratings and reviews, add the trust line. Honesty ships first.
2. Price intelligence, per space and per city. The reason to visit.
3. Compare tray.
4. Tour kit and matchmaker.
