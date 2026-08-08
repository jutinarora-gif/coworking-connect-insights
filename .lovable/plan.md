# Plan: Build and send the first Wednesday Dispatch newsletter

## Goal
Create a branded newsletter email template ("The Wednesday Dispatch") and a one-click send path that delivers it to every email in the `newsletter_subscribers` table. You will supply the actual issue content; the system handles rendering and delivery.

## Current state
- Homepage has 9 content sections: Hero, India Leaderboard, Space of the Week, Weekly Winners, Sales Questions, Red Flags, Review CTA, Latest Dispatches, Newsletter signup.
- The published site also has a **Guides** section at `/guides` with guides for coworkers and operators.
- The current navbar code is missing the **Guides** link (it shows Dispatches, Spaces, Winners, Q&A, Blog).
- `newsletter_subscribers` table exists with `id`, `email`, `source`, `created_at`.
- No sender domain is configured, so emails cannot be sent yet.
- No email templates or send helpers exist in the project.

## Plan

### 1. Sync the navbar with the published site
- Add **Guides** to the header nav between Q&A and Blog.
- Verify the route `/guides` exists in the codebase; if not, create the guides index route to match the live page.

### 2. Configure a sender domain (your action)
Emails must come from a domain you own (e.g. `notify.yourdomain.com`).
- Open the email domain setup dialog and add your domain.
- Add the NS records shown in Cloud -> Emails at your registrar.
- Wait for DNS verification (usually minutes to a few hours).

### 3. Scaffold Lovable transactional email infrastructure
- Run the transactional email scaffold to create `src/lib/email-templates/` (registry, send helper, preview route).
- This gives the project a reusable, brandable email system.

### 4. Design the newsletter email template
Create `src/lib/email-templates/wednesday-dispatch.tsx` with:
- Editorial look matching the site: cream paper background, near-black ink type, mint (#8DF688) accent dots and CTA.
- Header: "The Wednesday Dispatch" wordmark + issue date.
- Body blocks you can fill per issue:
  - Lead story / editor's note
  - Space of the Week feature block
  - Weekly Winners top 3 list
  - Latest Dispatches 3-item grid
  - Featured guide from `/guides`
  - One red flag or one question to ask the salesperson
- Footer: unsubscribe link (managed by Lovable), website link, address placeholder.
- Mobile-first, table-based layout for email client compatibility.

### 5. Build the send path
- Create `src/routes/api/public/send-newsletter.ts` as a POST server route.
- The route:
  - Reads the request body for issue metadata (subject line, issue date, content blocks, optional featured image URLs).
  - Validates a simple secret/API key check or admin session (to prevent public abuse).
  - Fetches all subscriber emails from `newsletter_subscribers`.
  - Sends one email per subscriber using the scaffolded `sendTemplateEmail` helper.
  - Records the send in a new `newsletter_sends` table (issue slug, sent_at, recipient_count) to prevent duplicate sends and give you a history log.
  - Returns `{ sent: number, failed: number }`.

### 6. Create the send history table
Migration adds `public.newsletter_sends`:
- `id uuid primary key`
- `issue_slug text not null`
- `subject text not null`
- `recipient_count integer`
- `sent_at timestamptz default now()`
- `created_by uuid references auth.users(id)`
- GRANTs and RLS so only service_role/admin can insert/read.

### 7. Add a minimal admin UI for you to compose and send
Create `src/routes/admin/newsletter.tsx` (or reuse an admin area if one exists):
- Form fields: Issue slug, Subject, Date, Lead story, Space of the Week, Winners, Dispatches, Featured guide, Red flag / Question.
- "Preview" button renders the email in a modal/iframe using the template preview route.
- "Send to all subscribers" button POSTs to `/api/public/send-newsletter`.
- Shows last send history from `newsletter_sends`.

### 8. Test the first send
- Subscribe a test email via the homepage form.
- Send a test issue to yourself first (optional `test_email` field in the admin form).
- Verify delivery, links, and mobile rendering.

## What I need from you
1. Do you own a domain we can use as the sender domain? If yes, what is it?
2. Should the admin send UI be password-protected or admin-role-only, or is a simple secret-token check enough for now?
3. For the first issue, do you want the template to auto-pull live data from the database (Space of the Week, Winners, Dispatches), or do you want to paste the content manually each week?
