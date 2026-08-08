/**
 * THE ONLY FILE YOU EDIT EACH WEEK.
 *
 * Write the subject line and the editor's note. Everything else in the email
 * pulls itself from live data.
 */

export const issue = {
  /** Shows in the inbox. Keep it under 55 characters. */
  subject: "The desks worth your money this week",

  /** The grey line under the subject in most inboxes. Keep it short and different from the subject. */
  preheader: "One space to book, three that earned it, and the question that saves you money.",

  /** Bumps by one every week. */
  number: 1,

  /** Leave null to use today. Otherwise "2026-08-12". */
  date: null as string | null,

  /** Two or three sentences, in your voice. This is the only handwritten part. */
  editorsNote: `Every operator will tell you their wifi is fast. Almost none will tell you what happens at 4pm on a Thursday when the whole floor is on a call.

That gap is why this exists. Below: the space that actually held up this week, the three that ranked, and one question to put to the next salesperson who walks you around a floor.`,

  /** Who signs off. */
  signature: {
    name: "The Coworking Dispatch",
    role: "India first, since 2026",
  },
};
