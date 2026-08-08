/**
 * Preview file for `npm run dev`.
 * Uses sample data so you can style the template without touching the database.
 */
import * as React from "react";
import { DispatchEmail } from "../template";
import type { IssueData } from "../fetch-data";
import { guides, redFlags } from "../static-content";

const sample: IssueData = {
  spaceOfWeek: {
    name: "Bombay Works, Lower Parel",
    slug: "bombay-works-lower-parel",
    city: "Mumbai",
    coverUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    note: "Members keep mentioning the same thing: it is quiet at 4pm. That is rarer than any amenity list.",
    priceFrom: 9500,
    currency: "INR",
  },
  winners: [
    { rank: 1, name: "Bombay Works, Lower Parel", slug: "bombay-works-lower-parel", city: "Mumbai", score: 9.2 },
    { rank: 2, name: "Third Wave, Indiranagar", slug: "third-wave-indiranagar", city: "Bengaluru", score: 8.9 },
    { rank: 3, name: "Studio 91, Kalyani Nagar", slug: "studio-91-kalyani-nagar", city: "Pune", score: 8.6 },
  ],
  dispatches: [
    {
      title: "Bengaluru desk rates climbed 14 percent this quarter",
      slug: "bengaluru-desk-rates-q3",
      excerpt: "Operators blame fit-out costs. Members are quietly moving to the suburbs.",
      sourceName: "Mint",
      region: "india",
    },
    {
      title: "Why Gurugram spaces are betting on private cabins again",
      slug: "gurugram-private-cabins",
      excerpt: "Hybrid teams want doors, not beanbags.",
      sourceName: "ET Realty",
      region: "india",
    },
    {
      title: "London coworking occupancy hits a post-2020 high",
      slug: "london-occupancy-high",
      excerpt: "Small teams, long leases, tighter margins.",
      sourceName: "Financial Times",
      region: "global",
    },
    {
      title: "Hyderabad's new campuses are chasing enterprise floors",
      slug: "hyderabad-enterprise-floors",
      excerpt: "The hot desk is no longer the product.",
      sourceName: "Deccan Herald",
      region: "india",
    },
    {
      title: "Chennai operators experiment with day passes",
      slug: "chennai-day-passes",
      excerpt: "Flexible pricing, or a churn problem in disguise?",
      sourceName: "The Hindu",
      region: "india",
    },
  ],
  salesQuestion: "What is the actual member-to-desk ratio on the floor I would be sitting on?",
  redFlag: redFlags[0]!,
  guide: guides[0]!,
};

export default function Preview() {
  return (
    <DispatchEmail
      preheader="One space to book, three that earned it, and the question that saves you money."
      dateLabel="Wednesday, 12 August 2026"
      issueNumber={1}
      editorsNote={`Every operator will tell you their wifi is fast. Almost none will tell you what happens at 4pm on a Thursday when the whole floor is on a call.

That gap is why this exists. Below: the space that actually held up this week, the three that ranked, and one question to put to the next salesperson who walks you around a floor.`}
      signature={{ name: "The Coworking Dispatch", role: "India first, since 2026" }}
      data={sample}
    />
  );
}
