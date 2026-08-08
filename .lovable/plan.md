# Plan: A standalone emailer for The Wednesday Dispatch

## What you asked for
A self-contained newsletter codebase, separate from the website, that auto-pulls live data (Space of the Week, Winners, Latest Dispatches, Guides) and outputs a finished HTML email you can paste into whatever tool you send from. No sending logic, no admin UI, no database changes.

## What gets built

A new top-level `emailer/` folder that stands on its own. It does not import site components, does not touch site routes, and can be zipped or moved into its own repo at any time.

```text
emailer/
  package.json          own deps, own scripts
  .env.example          read-only database credentials
  src/
    fetch-data.ts       pulls the week's content from the live database
    template.tsx        the Wednesday Dispatch email, React Email
    components/         reusable blocks (header, story, space card, footer)
    build.ts            fetch -> render -> write HTML
  out/
    wednesday-dispatch-YYYY-MM-DD.html   the file you paste into your sender
    wednesday-dispatch-YYYY-MM-DD.txt    plain-text fallback
```

### 1. Auto-pull the week's content
`fetch-data.ts` connects read-only using the public key and pulls:
- **Space of the Week** with its editorial note
- **Top 3 Weekly Winners** with rank and score
- **5 latest Dispatches**, respecting the 70/30 India-to-global split
- **One sales question** and **one red flag** from the live question set
- **One featured guide** from the guides list

Every block degrades gracefully. If a week has no winners, that section drops out instead of rendering an empty box.

### 2. The template
Built with React Email so it renders reliably in Gmail, Outlook, and Apple Mail. Styling matches the site: cream paper, near-black ink, mint accent, Work Sans style headings, generous whitespace, single column, mobile first.

Blocks, top to bottom:
- Masthead: The Coworking Dispatch wordmark, issue date, issue number
- Editor's note: the one hand-written slot, edited in a single file per issue
- Space of the Week: cover image, name, city, editorial note, link
- This week's winners: ranked 1 to 3, clean numbered list, no clutter
- Latest dispatches: five headlines with source and one-line excerpt
- One guide: title, promise, link
- Ask your salesperson this: one question, mint block
- Red flag of the week: one warning, ink block
- Footer: site link, socials, address placeholder, unsubscribe placeholder your sender fills in

### 3. Build and preview
Two commands:
- `npm run dev` opens a live local preview at `localhost:3030` so you can see the email as you edit
- `npm run build` writes the finished HTML and plain-text files into `out/`

The HTML is fully inlined and self-contained. Paste it into Mailchimp, Brevo, Beehiiv, Resend broadcasts, or anything else that accepts raw HTML.

### 4. Per-issue workflow
1. Open `emailer/src/issue.ts`, write the editor's note and the subject line
2. Run `npm run build`
3. Grab the HTML from `out/`, paste into your sender, hit send

Everything else fills itself in from live data.

## Notes
- Nothing in the website codebase changes, except one small fix: the navbar is missing the **Guides** link that is live on coworkingdispatch.com. I will add it unless you want it left alone.
- Sender domain: since you are sending from your own tool, no domain setup is needed inside this project. You will point `coworkingdispatch.com` at whichever sender you choose.
- The emailer reads the database with the public read-only key, so it can only see published, public content. Same as any site visitor.

## Technical detail
- `emailer/` has its own `package.json` with `react-email`, `@react-email/components`, `@supabase/supabase-js`, and `tsx`. It shares no build config with the site.
- `build.ts` uses `render()` from `@react-email/render` with `pretty: true` and a plain-text pass for the fallback file.
- Database reads go through the publishable key against existing public RLS policies. No migrations, no new tables, no service-role key anywhere in the folder.
- Images are referenced by absolute URL from the live site so they resolve in inboxes.
