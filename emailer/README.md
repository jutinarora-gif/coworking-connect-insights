# The Wednesday Dispatch - emailer

A standalone builder for the newsletter. It pulls the week's content from the live
Coworking Dispatch database, renders a finished HTML email, and drops it in `out/`.

It sends nothing. You paste the HTML into whatever tool you send from.

This folder is fully self-contained. It shares no code, no config and no build step
with the website. Zip it, move it to its own repo, it keeps working.

## Setup, once

```bash
cd emailer
cp .env.example .env
npm install
```

The credentials in `.env.example` are the public read-only keys. They can only see
published content. Nothing secret lives in this folder.

## Every Wednesday

1. Open `src/issue.ts`. Write the subject line and the editor's note. That is the
   only hand-written part.
2. Run the build.

```bash
npm run build
```

3. Grab the files from `out/`:
   - `wednesday-dispatch-YYYY-MM-DD.html` - paste into your sender
   - `wednesday-dispatch-YYYY-MM-DD.txt` - plain text fallback
   - The subject line prints in the terminal.

Everything else fills itself in from live data.

## Previewing while you edit

```bash
npm run dev
```

Opens a live preview at http://localhost:3030 with sample data, so you can style
the template without hitting the database.

## What auto-fills

| Block | Source |
| --- | --- |
| Space of the Week | `space_of_week`, latest week |
| This week's winners | `weekly_winners`, top 3 by rank |
| Latest dispatches | `dispatches`, 5 most recent, 70/30 India to global |
| Ask your salesperson | `sales_questions`, rotates weekly |
| Red flag of the week | `src/static-content.ts`, rotates weekly |
| One guide | `src/static-content.ts`, rotates weekly |

Any block with no data drops out of the email instead of rendering an empty box.

## Files

```text
src/
  config.ts          brand tokens, env, site URL
  issue.ts           the one file you edit each week
  static-content.ts  guides and red flags
  fetch-data.ts      pulls the week's content
  template.tsx       the email itself
  components/        header, section, space card, dispatch list, callout, footer
  emails/            react-email dev preview
  build.ts           fetch, render, write
out/                 the finished files
```
