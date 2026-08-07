import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Mail, Coffee, Globe2, PenTool, Code2, Megaphone } from "lucide-react";
import { PageHeading } from "@/components/site/page-heading";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers , The Coworking Dispatch" },
      { name: "description", content: "Join the small team reporting coworking from the desks. Open roles in writing, engineering, and community across India and remote." },
      { property: "og:title", content: "Careers at The Coworking Dispatch" },
      { property: "og:description", content: "Write, build, and report the real coworking story. Open roles, India first, remote friendly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Reporter, India Desk",
    type: "Full time",
    place: "Bengaluru or remote",
    icon: PenTool,
    blurb: "Break coworking stories before the press releases land. Visit spaces, talk to members, write dispatches people forward to their founders.",
  },
  {
    title: "Product Engineer",
    type: "Full time",
    place: "Remote, India hours",
    icon: Code2,
    blurb: "Ship the search, the leaderboards and the review engine. React, TypeScript, and a strong opinion about page speed.",
  },
  {
    title: "Community Lead",
    type: "Full time",
    place: "Mumbai or Delhi NCR",
    icon: Megaphone,
    blurb: "Grow the reviewer network across 20 cities. Run meetups, keep the ratings honest, turn regulars into contributors.",
  },
  {
    title: "Global Correspondent",
    type: "Part time",
    place: "Anywhere outside India",
    icon: Globe2,
    blurb: "Own the other 30%. Cover flex space news from London, Lisbon, Singapore or wherever your desk happens to be.",
  },
];

const perks = [
  { title: "Any desk, anywhere", body: "A monthly coworking pass at the space of your choice. Testing the product is the job." },
  { title: "Editorial independence", body: "No sponsored reviews, ever. Your byline stays yours." },
  { title: "Four day deep work", body: "Fridays are for writing, shipping, and no meetings." },
  { title: "Real equity", body: "Everyone on the team owns a piece of what we build." },
];

function CareersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <PageHeading
        eyebrow="Work with us"
        icon={<Briefcase className="h-3.5 w-3.5" />}
        title="Careers"
        sub="We are a small team reporting coworking from the desks, not the press releases. If you like spaces, people, and clean writing, you will fit."
        right={
          <Button asChild variant="mint" className="rounded-full">
            <a href="mailto:jobs@coworkingdispatch.com">
              <Mail className="mr-1 h-4 w-4" /> Send an intro
            </a>
          </Button>
        }
      />

      <section className="mt-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="acid-dot inline-block h-1.5 w-1.5 rounded-full" />
          Open roles
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {roles.map((r) => (
            <li key={r.title} className="glass rounded-2xl p-5 hover-glow hover:hover-glow-hover">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flare text-flare-ink">
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl leading-tight">{r.title}</h2>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {r.type} , {r.place}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.blurb}</p>
                  <a
                    href={`mailto:jobs@coworkingdispatch.com?subject=${encodeURIComponent(r.title)}`}
                    className="mt-4 inline-block text-sm font-medium hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4"
                  >
                    Apply for this role
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="acid-dot inline-block h-1.5 w-1.5 rounded-full" />
          Why here
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border/60 p-5">
              <h3 className="font-display text-lg leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-flare p-8 text-flare-ink sm:p-10">
        <Coffee className="h-6 w-6" />
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">Nothing fits? Pitch us anyway.</h2>
        <p className="mt-3 max-w-2xl text-sm opacity-80">
          Send three lines about you, one coworking space you love, and one thing you would fix about it. That is the whole application.
        </p>
        <Button asChild className="mt-6 rounded-full bg-flare-ink text-flare hover:opacity-90">
          <a href="mailto:jobs@coworkingdispatch.com?subject=Open%20pitch">jobs@coworkingdispatch.com</a>
        </Button>
      </section>
    </div>
  );
}
