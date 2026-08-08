# Cold start: earn the visit before asking for anything

You're right on both counts. With no traffic, anything that depends on users is dead on arrival, and there is currently no honest reason to make an account. So the fix is not a better sign-up prompt. It's removing sign-up from the critical path entirely and making the site useful to a total stranger on their first visit.

## The reframe

The reviews were trying to be the product. They shouldn't be. We already have two things that are real and need nobody: **the news we aggregate daily**, and **the price and amenity data across the directory**. Everything below is built from those two, plus arithmetic.

No account. No login wall. Nothing on the site requires a user until the day we have users.

## What makes the site worth an hour, from day one

### 1. Price intelligence, computed across the directory
The one thing nobody in India publishes. From data we already hold:

- City price bands: what a hot desk actually costs in Bengaluru vs Pune vs Gurgaon, with the median, the range, and every space plotted on it.
- Per space: "₹8,500. That's 12% below the Bengaluru median across 14 listed spaces, and the 4th cheapest with a meeting room."
- Cheapest and priciest per city, per amenity combination.

This is real, it is verifiable, it is genuinely useful, and it gets better with every space added rather than every user added. It's also the most linkable, most quotable thing we could own.

### 2. Compare, side by side
Pick up to three spaces, get a table: price, amenities, tags, city. Works signed out, stored locally. This is how people actually shop, and it costs us no data we don't have.

### 3. Find my space
Six taps, no account: city, budget, team size, what matters most, how often, vibe. Out comes a ranked shortlist with a plain reason each. Pure client-side scoring over the existing directory. Nothing collected, nothing stored, nothing fabricated.

### 4. The tour kit
The salesperson questions, promoted from a sidebar to the thing we're known for. Add a printable tour checklist and a "what to negotiate" note. Free, no email, take it and go. This is the asset people forward to a colleague.

### 5. The dispatch, front and centre
The daily news is already real and already working. It should be the reason to come back, not a strip near the footer. Space pages link to any dispatch mentioning them, which costs nothing and grows on its own.

## The single, honest ask

One thing, one place: **the Wednesday Dispatch**. "One email a week. India's coworking news, new spaces, price moves. No spam, unsubscribe anytime."

That's it. No account, no profile, no gate on any feature. Email is the only conversion we chase until there's a real reason to offer more, and the emailer to deliver it already exists.

Accounts come later, when the honest pitch exists: save your shortlist across devices, get alerted when a space in your city changes price. We build that when there are spaces changing price and people to tell.

## Trust, stated plainly
A short, permanent line on every space page and in the footer: no paid placement, no seeded reviews, facts sourced from the operator's own listing with the date last checked. Right now, saying "we have no reviews yet, and we won't invent them" is a stronger trust signal than any five-star average. It's also a differentiator, because everyone else fakes it.

## What goes away
Seeded reviews, questions and answers hidden from public view. Ratings, review counts and the leaderboard recompute from real rows only, so they show nothing until they show something true. Space cards and the homepage leaderboard get the same treatment.

The weekly winners and space of the week need a new basis, since they currently rank on fabricated ratings. Suggested replacement: an editorial pick, signed by TCD and clearly framed as one, plus a "best value in <city>" computed purely on price and amenities. Both honest, neither dependent on users.

## Space page after the change
1. Hero, with Compare
2. Facts strip, sourced from the operator, last-checked date
3. Price in context, with the city band chart
4. Ask the salesperson, promoted
5. Tour checklist
6. Dispatches mentioning this space
7. Also in this city, similar price
8. Trust line

## Technical notes
- No new tables and no auth work. Everything runs on the existing `spaces`, `cities` and `dispatches` data.
- Price stats: a new server function computing per-city median, range and percentile rank, cached.
- Compare tray and shortlist in local storage only.
- Matchmaker: client-side scoring, no persistence.
- Hide seeded rows via `is_hidden`. Strip `avg_rating` and `review_count` from `SpaceCard` and the spaces index.
- Add `verified_at` to `spaces` for the last-checked date.
- Weekly winners and space of the week switch to an editorial pick plus a computed value ranking.

## Build order
1. Hide the fabricated data and add the trust line. Ships the honesty first.
2. Price intelligence, per space and per city. The reason to visit.
3. Compare tray.
4. Tour kit and matchmaker.

## One thing I need
The database has 20 published spaces; you mentioned 200. Price intelligence and compare are only as good as the directory behind them, and at 200 spaces they become genuinely authoritative. Where do the other 180 live, and are the current prices and descriptions real or seeded like the reviews?
