/**
 * Brand tokens and environment.
 * Kept in one place so the whole email stays on-brand from a single edit.
 */

export const brand = {
  paper: "#faf9f5",
  mist: "#d7d7cd",
  ink: "#111111",
  inkSoft: "#4a4a45",
  inkFaint: "#8a8a82",
  mint: "#8df688",
  line: "#e3e2d9",
  white: "#ffffff",
} as const;

export const type = {
  heading:
    "'Work Sans', 'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  body:
    "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
} as const;

export const siteUrl = (
  process.env["SITE_URL"] ?? "https://www.coworkingdispatch.com"
).replace(/\/$/, "");

export const supabaseUrl =
  process.env["SUPABASE_URL"] ?? "https://jacwhhujqcubmovpuwhj.supabase.co";

export const supabaseKey =
  process.env["SUPABASE_PUBLISHABLE_KEY"] ??
  "sb_publishable_xKniXXHg1TYZ2uh_G_AFFg_l-620XRr";

export function url(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
