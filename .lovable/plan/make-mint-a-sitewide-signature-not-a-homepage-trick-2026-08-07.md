# Make mint a sitewide signature, not a homepage trick

The mint is technically on the inner pages already, but only in tiny pieces: a 6px dot next to a label, a filter pill, a "Verified" tag. Nothing big enough to register. The fix is not "more mint" - it is mint in the same three predictable roles on every page, so the eye learns it.

## The rule (one system, every page)

1. **Primary action = mint pill.** Every page's main CTA (subscribe, submit review, ask a question, view source, sign in) is a mint capsule with ink type. Secondary actions stay ink-outline.
2. **Active state = mint.** Nav item for the current route, selected filter pill, selected leaderboard tab, current page in pagination. Nothing else gets the fill.
3. **Editorial marker = mint.** The dot before a section label, the rule under a page title, the rank-1 numeral, the top-rated bar in a ratings breakdown, link underlines in body copy.

Everything else stays cream and ink. If a page would end up with more than roughly three mint moments above the fold, cut the weakest one.

## Page by page

- **Header**: current route gets a mint dot under the label; the TCD mark keeps its mint hover. Search icon hover goes mint.
- **Footer**: mint hairline above the columns, mint hover on links, mint dot in the wordmark lockup so it matches the navbar.
- **Dispatches index**: page title gets a short mint rule under it; active region pill is mint (already), plus a mint "Featured" tag on the lead card and a mint hover border on cards.
- **Dispatch detail**: mint rule under the headline, mint "Read at source" pill (currently a soft rounded rectangle, becomes a capsule).
- **Spaces index**: mint rule under title, active region pill mint, mint hover border on cards, mint star-rating fill on the top-rated card only.
- **Space detail**: mint bars for the strongest rating in the breakdown, mint numerals on the "Ask the salesperson" list (already), mint capsule on the primary CTA, mint "Verified" tag.
- **Winners**: rank 1 in mint (already), plus a mint rule under the page title and mint category tabs matching the homepage podium.
- **Questions**: mint left rule on answer threads (already), mint "Answered" tag, mint capsule on "Ask a question".
- **Auth**: mint submit capsule (already), mint focus ring on inputs.
- **Dashboard**: mint rule under the greeting, mint capsule on the primary action, ink-outline sign out.

## Global touches

- Focus rings become mint sitewide, so keyboard navigation reads as branded.
- Text selection already uses mint; keep it.
- Card hover borders shift from grey to mint at low opacity across all card components.

## Technical notes

- Add small reusable pieces rather than repeating classes: a `PageHeading` component in `src/components/site/` that renders the mint dot, eyebrow label, H1, and mint rule; and a `mint` variant on the shadcn button in `src/components/ui/button.tsx` (`bg-flare text-flare-ink rounded-full`).
- Add a `--ring: var(--flare)` override and a `hover-glow-hover` border change to mint in `src/styles.css` so hovers update everywhere at once.
- Update `src/components/site/header.tsx` and `footer.tsx` for active state and lockup parity.
- Sweep `src/routes/*.tsx` to swap ad-hoc heading blocks for `PageHeading` and ad-hoc CTA classNames for the new button variant.
- No data, query, or backend changes.
