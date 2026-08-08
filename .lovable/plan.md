# Make the space page a tool, not a review page

Reviews are content. Content needs 200 people who have been there. We don't have them. Tools need nothing except the visitor, and they are what keeps someone on a site for ten minutes instead of eight seconds.

Everything below is authentic by construction: it is either the visitor's own input, real arithmetic on real numbers, or an anonymous aggregate that shows its own sample size honestly.

## The five that carry the page

### 1. Compare tray
A persistent "Compare" button on every space card and space page. Pick up to three, get a side-by-side table: price, city, amenities, tags, distance apart. Sticky bar at the bottom shows what's in the tray as you browse.

This is the single biggest time-on-site lever in any directory. Nobody picks a coworking space by reading one page. They open four tabs. We replace the four tabs.

### 2. Space matchmaker
Six taps: city, budget, team size, what matters most (quiet / community / late nights / calls), how often you'd go, and one vibe. Out comes a ranked shortlist with a one-line reason each: "Matches your ₹8k budget and quiet-first preference."

Runs entirely on data we already hold. Every answer is the user's own, so nothing is fabricated. It also gives us the single most valuable thing we could collect right now: what people are actually looking for, city by city, which becomes dispatch material.

### 3. What did you actually pay
The one thing Indian users will absolutely submit. Not a review, one number: "I paid ₹X/month for a hot desk here, in <month>." Anonymous, no login until submit, ten seconds.

The page then shows: listed price vs what people report paying, and the gap. "Listed ₹9,000. Three people report paying ₹7,500 after negotiating." That is information no other site in India has, it is genuinely user-generated, and it is the strongest reason to come back and contribute. Sample size is always shown, so three reports read as three reports.

### 4. Would you work here
One tap, yes or no, on every space page. Live result bar with the vote count next to it. No text, no account, no fabrication possible.

Low-friction voting is how you get a cold directory warm. Once a space has 40 votes, the page has real social proof without a single written review.

### 5. Tour planner
The user shortlists spaces, picks a day, and gets a printable or WhatsApp-able plan: order of visits, the salesperson questions to ask at each, and the tour checklist. Ends with a place to jot what they thought.

This turns the existing sales-questions asset into the reason someone bookmarks us. It also brings them back after the tour, which is exactly when they might leave that first real rating.

## Supporting, cheap to add
- **Cost reality calculator.** Desk price plus commute plus coffee, monthly, against working from home or a café. Pure arithmetic, endlessly fiddled with.
- **Price in context.** "12% below the Bengaluru median across 14 listed spaces." Computed, not claimed.
- **Trending this week.** Most compared, most voted, most matched. Real behaviour, updates itself, gives the homepage a live pulse.
- **Also in this city** at a similar price, to keep the browse loop going.

## What goes away
Seeded reviews, questions and answers get hidden from public view, not deleted. Ratings, review counts and the leaderboard recompute from real rows only, which means they show nothing until they show something true. Space cards and the homepage leaderboard need the same treatment.

## Space page order after the change
1. Hero, with Compare and Would-you-work-here in reach
2. Facts strip, sourced from the operator, with a last-checked date
3. Price in context and what people report paying
4. Vote result
5. Ask the salesperson, promoted from the sidebar
6. Add to tour plan
7. Also in this city
8. Trending nearby

## Technical notes
- New tables: `space_votes` (anonymous, IP or device-hashed, one per space), `price_reports` (space, amount, desk type, month, optional profile), `shortlists` (device or profile scoped).
- Compare tray and shortlist live in local storage for signed-out users, sync to the profile on sign-in.
- Matchmaker is pure client-side scoring over the existing spaces query, no new data needed.
- Trending reads from vote and compare counts, with a minimum threshold before anything is shown.
- Hide seeded rows with `is_hidden`, no schema change.
- Strip `avg_rating` and `review_count` from `SpaceCard` and the spaces index until real counts exist.

## Build order
Compare tray and Would-you-work-here first, they are the fastest path to a page that does something. Matchmaker second, it is the shareable one. Price reports third, tour planner fourth.

## One question before building
The database holds 20 published spaces, you mentioned 200. Where do the other 180 live? A sheet or CSV import changes the shape of this work, and the compare and matchmaker features get much better with the full set.
