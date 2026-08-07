# Next step: About page + functional footer links

## Goal
Add the missing About page and turn the dead footer links into real, lightweight pages so the site feels complete and every navigation path works.

## What we will build

1. **About page** (`/about`)
   - Our story: India-first, 70/30 split, reported from real desks.
   - Editorial principles: no sponsored reviews, member-verified ratings.
   - Team/contributors teaser (reuse existing community profiles).
   - Mint-accented CTA to join or submit a space.

2. **Suggest a feed** (`/suggest-feed`)
   - Simple public form: feed URL, city/region, why it fits.
   - Stores submissions in a new `suggested_feeds` table (or emails them if no DB table is preferred).
   - Mint submit button, success state.

3. **Submit a space** (`/submit-space`)
   - Public form: space name, city, website, one-line pitch.
   - Stores in a new `submitted_spaces` table.
   - Mint submit button, success state.

4. **Footer updates**
   - Replace `#` hrefs with `/about`, `/suggest-feed`, `/submit-space`.
   - Keep the existing Careers link.

## Technical notes
- Use TanStack Start route files under `src/routes/`.
- Use `createServerFn` for form submissions.
- Add the two new tables in a Supabase migration with GRANTs and RLS.
- Reuse existing `PageHeading`, `Button`, `Input`, and mint design tokens.
- Add route-specific `head()` metadata for SEO.

## Out of scope
- Admin dashboard to review submissions (can be added later).
- Email notifications (can be added later via backend integration).
