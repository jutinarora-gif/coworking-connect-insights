# Fix duplicate "five spaces" section on homepage

## Problem
The homepage currently renders the same set of spaces twice:
1. **Image strip** (`Talk of the week` / "Five spaces people are talking about") combines `spaceOfWeek` + `winners` into image cards.
2. **Winners list** (`Weekly winners` / "Five spaces India is talking about") renders the same `winners` data as ranked rows.

This creates a repetitive scroll and the two sections compete for the same idea.

## Fix
Remove the `ImageStrip` from `src/routes/index.tsx` and keep the `Winners` section, which already has a clearer heading, rank numbers, and scores.

## Changes
- Delete the `ImageStrip` component and its import/usage in `src/routes/index.tsx`.
- Remove the `strip` array construction in the `Home` component.
- Keep `SpaceOfWeek`, `Leaderboard`, `Winners`, and all other sections untouched.

## Outcome
The homepage will show the weekly winners once, in the ranked list format, eliminating the duplicate visual strip.
