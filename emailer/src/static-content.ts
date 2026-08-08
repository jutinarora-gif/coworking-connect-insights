/**
 * Content that does not live in the database yet.
 * The builder rotates through each list, one per issue, so nothing repeats
 * until you have run out.
 */

export type Guide = {
  title: string;
  promise: string;
  path: string;
};

export const guides: Guide[] = [
  {
    title: "How to choose a coworking space",
    promise: "A practical checklist for picking the right one, not just the closest one.",
    path: "/guides/how-to-choose-a-coworking-space",
  },
  {
    title: "Coworking vs. traditional office",
    promise: "A real cost breakdown for small teams deciding between the two.",
    path: "/guides/coworking-vs-traditional-office-cost-breakdown",
  },
  {
    title: "GST registration and virtual offices",
    promise: "What founders actually need to know before signing up.",
    path: "/guides/gst-registration-virtual-offices-guide",
  },
  {
    title: "Getting your first reviews",
    promise: "A founder's guide to building trust early on.",
    path: "/guides/getting-your-first-reviews",
  },
  {
    title: "Community management 101",
    promise: "Keeping members engaged once they've signed up.",
    path: "/guides/community-management-101",
  },
];

export type RedFlag = {
  flag: string;
  why: string;
};

export const redFlags: RedFlag[] = [
  {
    flag: "The tour only happens at 11am",
    why: "Mid-morning is the quietest hour on most floors. Ask to come back at 3pm and see the same desk.",
  },
  {
    flag: "Wifi speed quoted, never demonstrated",
    why: "A number on a brochure is not a speed test. Run one yourself, on the desk you would actually sit at.",
  },
  {
    flag: "Meeting room credits that expire monthly",
    why: "Unused credits are pure margin for the operator. Ask what rolls over and get it in writing.",
  },
  {
    flag: "A lock-in longer than six months on a hot desk",
    why: "Hot desks are meant to be flexible. A long lock-in means they are worried about churn for a reason.",
  },
  {
    flag: "No written notice period",
    why: "If leaving is vague in the contract, it will be expensive in practice.",
  },
  {
    flag: "The community manager seat is empty",
    why: "Every space sells community. Only some staff it. Look for the desk, not the promise.",
  },
];

/** Fallback questions, used only if the database has none. */
export const fallbackQuestions: string[] = [
  "What is the actual member-to-desk ratio on the floor I would be sitting on?",
  "What happens to my rate at renewal, and is that capped anywhere in writing?",
  "How many meeting room hours are included, and do unused hours roll over?",
];
