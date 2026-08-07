import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { getHomeData, subscribeNewsletter } from "@/lib/data.functions";
import { IndiaHeatmap } from "@/components/site/india-heatmap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const homeQuery = queryOptions({ queryKey: ["home"], queryFn: () => getHomeData() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Coworking Dispatch , India-first coworking news & reviews" },
      { name: "description", content: "News, real-user reviews, Space of the Week, weekly winners, and a community Q&A for India's coworking scene." },
      { property: "og:title", content: "The Coworking Dispatch" },
      { property: "og:description", content: "India-first coworking news & community." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery),
  component: Home,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
});

const WRAP = "mx-auto w-full max-w-[1400px] px-5 sm:px-8";

function Home() {
  const { data } = useSuspenseQuery(homeQuery);
  const strip = [
    data.spaceOfWeek?.space,
    ...data.winners.map((w) => w.space),
  ].filter(Boolean).slice(0, 5) as { slug: string; name: string; cover_url: string | null; city_name: string | null }[];

  return (
    <div className="pb-32">
      <Hero />
      <ImageStrip items={strip} />
      <Marquee />
      <SpaceOfWeek data={data.spaceOfWeek} />
      <Winners winners={data.winners} />
      <SalesQuestions items={data.salesQuestions} />
      <RedFlags />
      <Dispatches items={data.dispatches.slice(0, 6)} />
      <MapReveal />
      <NewsletterCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className={`${WRAP} pt-16 sm:pt-24 pb-10`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <div className="label">India-first coworking desk , since 2026</div>
          <h1 className="mt-5 font-display text-[13vw] leading-[0.88] tracking-[-0.045em] sm:text-[9vw] lg:text-[7.2vw]">
            Coworking,
            <br />
            reported from
            <br />
            the inside.
          </h1>
        </div>
        <div className="max-w-sm lg:pb-3">
          <p className="text-base leading-relaxed text-muted-foreground">
            The news, the receipts, the honest reviews. 70% India, 30% world, written by people who actually pay for the desk.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/dispatches">Read the dispatches <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/spaces">Browse spaces</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageStrip({ items }: { items: { slug: string; name: string; cover_url: string | null; city_name: string | null }[] }) {
  if (!items.length) return null;
  return (
    <section className={`${WRAP} mt-6`}>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-6">
        {items.map((s, i) => (
          <Link
            key={s.slug}
            to="/spaces/$slug"
            params={{ slug: s.slug }}
            className={`group relative overflow-hidden bg-muted ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"}`}
          >
            {s.cover_url && (
              <img
                src={s.cover_url}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-foreground/70 to-transparent p-3">
              <span className="truncate text-xs font-medium text-background">{s.name}</span>
              <span className="shrink-0 text-[10px] uppercase tracking-widest text-background/70">{s.city_name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Hot desks", "Real reviews", "Weekly winners", "Sales-tour questions", "Red flags", "India, mapped"];
  return (
    <div className="mt-14 overflow-hidden rule border-b border-border py-4">
      <div className="flex gap-10 whitespace-nowrap px-5 text-sm uppercase tracking-[0.18em] text-muted-foreground sm:px-8">
        {words.map((w) => (
          <span key={w} className="flex items-center gap-10">
            {w}
            <span className="h-1 w-1 rounded-full bg-border" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
      <div className="min-w-0">
        <div className="label">{eyebrow}</div>
        <h2 className="mt-2 font-display text-3xl leading-none sm:text-5xl">{title}</h2>
      </div>
      {href && (
        <Link to={href} className="shrink-0 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">
          {cta ?? "View all"}
        </Link>
      )}
    </div>
  );
}

function SpaceOfWeek({ data }: { data: any }) {
  if (!data?.space) return null;
  const s = data.space;
  return (
    <section className={`${WRAP} mt-24`}>
      <SectionHead eyebrow="Space of the week" title="This week's pick" href="/spaces" cta="All spaces" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        {s.cover_url && (
          <div className="aspect-[16/11] overflow-hidden bg-muted">
            <img src={s.cover_url} alt={s.name} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="max-w-xl">
          <h3 className="font-display text-4xl leading-[0.95] sm:text-6xl">{s.name}</h3>
          <div className="label mt-3">{s.city_name}</div>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.note}</p>
          <Link
            to="/spaces/$slug"
            params={{ slug: s.slug }}
            className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium"
          >
            Visit the profile <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Winners({ winners }: { winners: any[] }) {
  if (!winners?.length) return null;
  return (
    <section className={`${WRAP} mt-24`}>
      <SectionHead eyebrow="Weekly winners" title="Five spaces India is talking about" href="/winners" cta="Full leaderboard" />
      <ul className="mt-2">
        {winners.map((w) => (
          <li key={w.rank}>
            <Link
              to="/spaces/$slug"
              params={{ slug: w.space.slug }}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 border-b border-border py-5 transition-colors hover:bg-accent/50"
            >
              <span className="w-8 font-display text-sm tabular-nums text-muted-foreground">{String(w.rank).padStart(2, "0")}</span>
              <div className="flex min-w-0 items-center gap-4">
                {w.space.cover_url && (
                  <img src={w.space.cover_url} alt="" loading="lazy" className="hidden h-14 w-20 shrink-0 object-cover sm:block" />
                )}
                <div className="min-w-0">
                  <div className="truncate font-display text-xl sm:text-2xl">{w.space.name}</div>
                  <div className="label mt-0.5">{w.space.city_name}</div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-sm tabular-nums text-muted-foreground">{w.score.toFixed(1)}</span>
                <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SalesQuestions({ items }: { items: { id: string; text: string; category: string | null }[] }) {
  if (!items?.length) return null;
  return (
    <section className={`${WRAP} mt-24`}>
      <SectionHead eyebrow="Before you sign" title="Ask the salesperson this" href="/questions" cta="Full checklist" />
      <div className="mt-2 grid md:grid-cols-2 md:gap-x-12">
        {items.map((q, i) => (
          <Link key={q.id} to="/questions" className="group flex gap-5 border-b border-border py-5">
            <span className="font-display text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <p className="text-lg leading-snug transition-colors group-hover:text-muted-foreground">{q.text}</p>
              {q.category && <div className="label mt-1.5">{q.category}</div>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const RED_FLAGS = [
  "The wi-fi keeps dropping mid-call",
  "The washrooms smell, and nobody owns cleaning",
  "Your complaint disappears into a WhatsApp group",
  "It is always noisy, phone booths are permanently booked",
  "The community manager plays favourites with a few clients",
  "Printers, coffee, or meeting rooms are always 'out of order'",
  "Contracts have quiet auto-renewal and steep exit fees",
];

function RedFlags() {
  return (
    <section className={`${WRAP} mt-24`}>
      <div className="border border-border bg-card p-7 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <div>
            <div className="label text-signal">Red flags</div>
            <h2 className="mt-3 font-display text-3xl leading-[0.98] sm:text-4xl">
              Spot two of these? Time to rethink your coworking space.
            </h2>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {RED_FLAGS.map((f, i) => (
              <li key={f} className="flex gap-3 border-b border-border py-3 text-sm last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <span className="tabular-nums text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-snug text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Dispatches({ items }: { items: any[] }) {
  if (!items?.length) return null;
  return (
    <section className={`${WRAP} mt-24`}>
      <SectionHead eyebrow="Latest dispatches" title="Fresh from the wire" href="/dispatches" />
      <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <Link key={d.id} to="/dispatches/$slug" params={{ slug: d.slug }} className="group block">
            {d.cover_url && (
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={d.cover_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
            )}
            <div className="label mt-4 flex items-center gap-2">
              <span>{d.region === "india" ? "India" : "Global"}</span>
              <span>/</span>
              <span className="truncate">{d.source_name}</span>
            </div>
            <h3 className="mt-2 font-display text-xl leading-snug">{d.title}</h3>
            {d.excerpt && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.excerpt}</p>}
            <div className="label mt-3">{formatDistanceToNow(new Date(d.published_at), { addSuffix: true })}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MapReveal() {
  const [open, setOpen] = useState(false);
  return (
    <section className={`${WRAP} mt-24`}>
      {open ? (
        <>
          <SectionHead eyebrow="India, mapped" title="Where India works" href="/spaces" cta="All spaces" />
          <div className="mt-8"><IndiaHeatmap /></div>
          <button onClick={() => setOpen(false)} className="mx-auto mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            Collapse map <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
          </button>
        </>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-y border-border py-8 text-left transition-colors hover:bg-accent/50"
        >
          <div className="min-w-0">
            <div className="label">India, mapped</div>
            <div className="mt-2 font-display text-2xl sm:text-4xl">Coworking density across 12 cities</div>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            Show map <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      )}
    </section>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const mut = useMutation({
    mutationFn: () => subscribeNewsletter({ data: { email } }),
    onSuccess: () => { toast.success("You're in. Watch for the Wednesday Dispatch."); setEmail(""); },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <section className={`${WRAP} mt-28`}>
      <div className="border border-border bg-foreground p-10 text-background sm:p-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
          <div className="min-w-0">
            <div className="label text-background/60">The Wednesday Dispatch</div>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] sm:text-6xl">
              India's coworking week,
              <br />
              in five minutes.
            </h2>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); mut.mutate(); }} className="flex gap-2">
            <Input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-none border-background/30 bg-transparent text-background placeholder:text-background/50"
            />
            <Button type="submit" disabled={mut.isPending} variant="secondary" className="h-12 rounded-none px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
