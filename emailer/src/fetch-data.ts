import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./config";
import { fallbackQuestions, guides, redFlags, type Guide, type RedFlag } from "./static-content";

let client: SupabaseClient | null = null;
function db() {
  if (!client) {
    client = createClient(supabaseUrl(), supabaseKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export type SpaceCardData = {
  name: string;
  slug: string;
  city: string | null;
  coverUrl: string | null;
  note: string | null;
  priceFrom: number | null;
  currency: string;
};

export type WinnerData = {
  rank: number;
  name: string;
  slug: string;
  city: string | null;
  score: number;
};

export type DispatchData = {
  title: string;
  slug: string;
  excerpt: string | null;
  sourceName: string | null;
  region: "india" | "global";
};

export type IssueData = {
  spaceOfWeek: SpaceCardData | null;
  winners: WinnerData[];
  dispatches: DispatchData[];
  salesQuestion: string;
  redFlag: RedFlag;
  guide: Guide;
};

/** Rotates a list by issue number so nothing repeats until the list runs out. */
function pick<T>(list: T[], issueNumber: number): T {
  return list[(issueNumber - 1 + list.length * 100) % list.length]!;
}

async function getSpaceOfWeek(): Promise<SpaceCardData | null> {
  const { data } = await db()
    .from("space_of_week")
    .select(
      "editorial_note, spaces:space_id(name, slug, cover_url, price_from, currency, cities:city_id(name))",
    )
    .order("week_start", { ascending: false })
    .limit(1)
    .maybeSingle();

  const space = (data as any)?.spaces;
  if (!space) return null;

  return {
    name: space.name,
    slug: space.slug,
    city: space.cities?.name ?? null,
    coverUrl: space.cover_url ?? null,
    note: (data as any).editorial_note ?? null,
    priceFrom: space.price_from ?? null,
    currency: space.currency ?? "INR",
  };
}

async function getWinners(): Promise<WinnerData[]> {
  const { data: latest } = await db()
    .from("weekly_winners")
    .select("week_start")
    .order("week_start", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latest) return [];

  const { data } = await db()
    .from("weekly_winners")
    .select("rank, score, spaces:space_id(name, slug, cities:city_id(name))")
    .eq("week_start", (latest as any).week_start)
    .order("rank", { ascending: true })
    .limit(3);

  return ((data as any[]) ?? [])
    .filter((row) => row.spaces)
    .map((row) => ({
      rank: row.rank,
      name: row.spaces.name,
      slug: row.spaces.slug,
      city: row.spaces.cities?.name ?? null,
      score: Number(row.score),
    }));
}

/** Five dispatches, weighted 70 percent India to 30 percent rest of world. */
async function getDispatches(): Promise<DispatchData[]> {
  const shape = (rows: any[]): DispatchData[] =>
    rows.map((row) => ({
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt ?? null,
      sourceName: row.source_name ?? null,
      region: row.region,
    }));

  const select = "title, slug, excerpt, source_name, region, published_at";

  const [india, global] = await Promise.all([
    db()
      .from("dispatches")
      .select(select)
      .eq("region", "india")
      .eq("is_hidden", false)
      .order("published_at", { ascending: false })
      .limit(4),
    db()
      .from("dispatches")
      .select(select)
      .eq("region", "global")
      .eq("is_hidden", false)
      .order("published_at", { ascending: false })
      .limit(2),
  ]);

  const indiaRows = shape((india.data as any[]) ?? []).slice(0, 4);
  const globalRows = shape((global.data as any[]) ?? []).slice(0, 2);

  // Interleave so the email does not read as two separate blocks.
  const out: DispatchData[] = [];
  const order = ["india", "india", "global", "india", "india", "global"] as const;
  const queues = { india: [...indiaRows], global: [...globalRows] };
  for (const region of order) {
    const next = queues[region].shift() ?? queues[region === "india" ? "global" : "india"].shift();
    if (next) out.push(next);
    if (out.length === 5) break;
  }
  return out;
}

async function getSalesQuestion(issueNumber: number): Promise<string> {
  const { data } = await db()
    .from("sales_questions")
    .select("text")
    .eq("approved", true)
    .order("upvotes_denorm", { ascending: false })
    .limit(20);

  const list = ((data as any[]) ?? []).map((row) => row.text as string);
  return pick(list.length ? list : fallbackQuestions, issueNumber);
}

export async function fetchIssueData(issueNumber: number): Promise<IssueData> {
  const [spaceOfWeek, winners, dispatches, salesQuestion] = await Promise.all([
    getSpaceOfWeek(),
    getWinners(),
    getDispatches(),
    getSalesQuestion(issueNumber),
  ]);

  return {
    spaceOfWeek,
    winners,
    dispatches,
    salesQuestion,
    redFlag: pick(redFlags, issueNumber),
    guide: pick(guides, issueNumber),
  };
}
