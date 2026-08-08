# Replace fabricated reviews with authentic property-page content

## The problem
The `/spaces/$slug` property page currently renders a "What coworkers say" reviews section built from seeded/fabricated reviews. This risks breaking trust once users realise the voices are not real. We should remove the fake-review block and fill that space with useful, honest content until real reviews arrive.

## Goal
Turn every property page into a trustworthy, editorially useful destination even with zero user reviews. Keep the page visually rich and on-brand (mint + greige + black), but replace fabricated social proof with transparent, factual, and community-driven modules.

## Proposed content modules (pick/prioritise)

### 1. Space snapshot (objective facts)
A compact at-a-glance card: opening hours, seating capacity, floor count, parking, metro/walkability, power-backup, internet speed claim, pet policy, AC quality, call-booth count. This is the most useful replacement for reviews because it answers practical questions immediately.

### 2. "What to expect" (TCD editorial voice)
A short, clearly labelled editor's note about the vibe, crowd type, best use-case, and caveats. Written by the team, not a fake user. Honest framing builds more trust than generic praise.

### 3. Membership & pricing transparency
Break down desk types, deposit, lock-in period, notice period, GST/inclusions, and any hidden costs. A small "Last verified" date keeps it honest.

### 4. Red flags checklist
Expand the existing red-flags concept into a space-specific checklist: things to watch during a tour (noise, chair quality, meeting-room availability, weekend access). Actionable and shareable.

### 5. Salesperson questions (already exists)
Keep the sticky sidebar block, but make it smarter: category tags, upvote counts, and a "copy all" button. Add space-specific questions first, global ones second.

### 6. Community Q&A for this space
Surface the existing `questions` data that is already fetched for the page but not rendered. Show real questions (even if empty) with a "Ask about this space" CTA. Empty states become invitations, not dead ends.

### 7. "Be the first to review" empty state
If reviews are removed, replace the section with a prominent, honest CTA: "No verified reviews yet. Work here? Leave the first one." Link to an auth-gated review form.

### 8. Nearby alternatives
A small "Also consider in [city]" row with 2-3 other published spaces. Keeps the user in the directory and adds value without fake reviews.

### 9. Photo gallery / tour placeholder
Grid of space photos with captions. If no photos exist, show a "Suggest a photo" CTA or a stylised placeholder.

### 10. Trust bar
A short line explaining how TCD lists spaces: no paid placement, verification steps, and how reviews are moderated. Reinforces honesty.

## Suggested page structure (top to bottom)
1. Hero (name, city, tags, cover image)
2. Space snapshot + pricing strip
3. What to expect (editorial note)
4. Amenities + red flags
5. Community Q&A for this space
6. Salesperson questions (sticky sidebar on desktop)
7. Nearby alternatives
8. "Be the first to review" CTA
9. Trust bar

## Data changes needed
- Add columns to `spaces` for snapshot fields (hours, capacity, parking, metro_distance, pet_policy, internet_speed, deposit_months, lock_in_months, verified_at).
- Add a `space_editorial_notes` table (or reuse `space.description`) for the "What to expect" note.
- Ensure `questions` and `sales_questions` already fetched are rendered.
- Remove or hide the seeded `reviews` from public display; keep the table for future real reviews.

## Front-end changes
- Rewrite `src/routes/spaces.$slug.tsx`:
  - Remove the fabricated-reviews list and aggregate rating block if reviews are fabricated.
  - Render the new modules above.
  - Add an honest empty state when no reviews exist.
- Update `SpaceCard` to stop showing `avg_rating` and `review_count` unless they come from verified real reviews.
- Update `/spaces` index to remove rating filters if ratings are removed.

## Phasing
- **Phase 1:** Remove fabricated reviews from the property page and add the "Be the first to review" CTA + trust bar.
- **Phase 2:** Add space snapshot, editorial note, and red flags using existing/new database fields.
- **Phase 3:** Render space-specific Q&A and nearby alternatives.
- **Phase 4:** Build a lightweight review submission flow so real reviews can start replacing editorial content over time.

## Open questions
1. Do you want to keep the 5-dimension ratings breakdown (wifi, quiet, community, coffee, value) even with no reviews, or hide it entirely until real data exists?
2. Should the seeded reviews be deleted from the database, or only hidden from public display so they can be replaced later?
3. Which 2-3 modules above are most important to ship first?
4. Do you have real photos, pricing, or factual details for the listed spaces, or should we design the UI to gracefully handle missing data?
