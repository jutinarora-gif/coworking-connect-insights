import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSpace, getPriceStats, type PriceStats } from "@/lib/data.functions";
import { MapPin, ClipboardCheck, ArrowLeft, IndianRupee, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const q = (slug: string) => queryOptions({ queryKey: ["space", slug], queryFn: () => getSpace({ data: { slug } }) });
const priceQ = (slug: string) => queryOptions({ queryKey: ["space-price", slug], queryFn: () => getPriceStats({ data: { slug } }) });

export const Route = createFileRoute("/spaces/$slug")({
  loader: async ({ context, params }) => {
    const d = await context.queryClient.ensureQueryData(q(params.slug));
    if (!d) throw notFound();
    await context.queryClient.ensureQueryData(priceQ(params.slug));
    return d;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.space.name} , Pricing & details | The Coworking Dispatch` },
      { name: "description", content: loaderData.space.description ?? `Pricing and details for ${loaderData.space.name}` },
      { property: "og:title", content: `${loaderData.space.name} , The Coworking Dispatch` },
      { property: "og:description", content: loaderData.space.description ?? "" },
      ...(loaderData.space.cover_url ? [{ property: "og:image", content: loaderData.space.cover_url }, { name: "twitter:image", content: loaderData.space.cover_url }] : []),
    ] : [{ title: "Space" }],
  }),
  component: SpacePage,
  notFoundComponent: () => <div className="p-16 text-center">Space not found</div>,
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
});

function SpacePage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(q(slug));
  const { data: price } = useSuspenseQuery(priceQ(slug));
  if (!data) return null;
  const { space, salesQuestions } = data;
  return (
    <div>
      <div className="relative h-[45vh] min-h-[380px] overflow-hidden">
        {space.cover_url && <img src={space.cover_url} alt={space.name} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-8">
          <Link to="/spaces" search={{ city: undefined }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3" />All spaces</Link>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-3">
            <div>
              <h1 className="font-display text-4xl md:text-6xl">{space.name}</h1>
              <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />{space.city_name} · {space.address}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {space.vibe_tags?.map((t: string) => <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full glass">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {space.description && (
            <section className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><span className="acid-dot inline-block h-1.5 w-1.5 rounded-full" />Overview</div>
              <p className="mt-3 text-lg leading-relaxed">{space.description}</p>
              {space.price_from && (
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">Hot desk from</span>{" "}
                  <span className="font-medium text-lg">{space.currency === "INR" ? "₹" : "$"}{space.price_from.toLocaleString()}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              )}
              {space.amenities && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(space.amenities as string[]).map((a) => <span key={a} className="text-xs px-2 py-1 rounded-md bg-muted">{a}</span>)}
                </div>
              )}
            </section>
          )}

          <PriceContext price={price ?? null} space={space} />

          <TrustLine verifiedAt={space.verified_at} />
        </div>

        <aside className="space-y-6">
          <section className="glass rounded-2xl p-6 sticky top-20">
            <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><span className="acid-dot inline-block h-1.5 w-1.5 rounded-full" /><ClipboardCheck className="h-3.5 w-3.5" />Ask the salesperson</div>
            <h3 className="mt-2 font-display text-xl">Before you sign</h3>
            <p className="text-xs text-muted-foreground mt-1">Copy-paste these to your tour email. Community-curated.</p>
            <ol className="mt-4 space-y-2.5">
              {salesQuestions.map((sq: any, i: number) => (
                <li key={sq.id} className="text-sm flex gap-2">
                  <span className="acid-mark font-display text-lg leading-none">{i + 1}.</span>
                  <span>{sq.text}</span>
                </li>
              ))}
            </ol>
            <Button className="mt-4 w-full" variant="mint" size="lg" onClick={() => {
              const text = salesQuestions.map((q: any, i: number) => `${i + 1}. ${q.text}`).join("\n");
              navigator.clipboard.writeText(text);
            }}>Copy all questions</Button>
          </section>
        </aside>
      </div>
    </div>
  );
}

function TrustLine({ verifiedAt }: { verifiedAt: string | null }) {
  return (
    <section className="rounded-2xl border border-border p-6">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-flare" />
        <div>
          <h3 className="font-display text-lg">No paid placement. No seeded reviews.</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Prices, amenities and addresses are sourced from each operator's own listing. We do not invent reviews or quality claims we cannot verify.
          </p>
          {verifiedAt && (
            <p className="mt-2 text-xs text-muted-foreground">Last checked: {new Date(verifiedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PriceContext({ price, space }: { price: PriceStats | null; space: any }) {
  if (!price || !space.price_from) return null;
  const currency = space.currency === "INR" ? "₹" : "$";
  const diff = space.price_from - price.city.median;
  const pct = price.city.median > 0 ? Math.round((diff / price.city.median) * 100) : 0;
  const below = diff < 0;
  return (
    <section className="glass rounded-2xl p-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><span className="acid-dot inline-block h-1.5 w-1.5 rounded-full" /><IndianRupee className="h-3.5 w-3.5" />Price in context</div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="font-display text-4xl">{currency}{space.price_from.toLocaleString()}</div>
          <p className="mt-2 text-sm text-muted-foreground">
            That's <span className={`font-medium ${below ? "text-flare" : "text-foreground"}`}>{below ? "" : "+"}{pct}% {below ? "below" : "above"}</span> the {space.city_name} median across {price.city.count} listed spaces.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Median</span><span className="font-medium">{currency}{Math.round(price.city.median).toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Range</span><span className="font-medium">{currency}{price.city.min.toLocaleString()} – {currency}{price.city.max.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Spaces cheaper</span><span className="font-medium">{price.cheaperCount}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Spaces pricier</span><span className="font-medium">{price.pricierCount}</span></div>
        </div>
      </div>

      {price.sameCity.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Also in {space.city_name}</h4>
          <ul className="mt-3 space-y-2">
            {price.sameCity.slice(0, 4).map((s: any) => (
              <li key={s.id}>
                <Link to="/spaces/$slug" params={{ slug: s.slug }} className="group flex items-center justify-between rounded-xl p-2 hover:bg-accent/50">
                  <span className="font-medium group-hover:text-muted-foreground transition-colors">{s.name}</span>
                  <span className="text-sm tabular-nums">{currency}{s.price_from?.toLocaleString()}<span className="text-muted-foreground text-xs">/mo</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
