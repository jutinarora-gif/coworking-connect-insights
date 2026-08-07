import { Link, useRouterState } from "@tanstack/react-router";
import { Search, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SearchDialog } from "./search-dialog";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dispatches", label: "Dispatches" },
  { to: "/spaces", label: "Spaces" },
  { to: "/winners", label: "Winners" },
  { to: "/questions", label: "Q&A" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="mx-auto grid h-16 w-full max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-5 sm:px-8 md:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link to="/" className="group flex min-w-0 items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-[-0.06em]">
            TCD<span className="text-flare">.</span>
          </span>
          <span className="hidden truncate border-l border-foreground/20 pl-2 font-display text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            The Coworking Dispatch
          </span>
        </Link>


        <nav className="hidden items-center justify-center gap-7 md:flex">
          {nav.map((n) => {
            const active = path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Search"
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="ml-2 hidden rounded bg-muted px-1.5 py-0.5 text-[10px] lg:inline">⌘K</kbd>
          </button>
          {session ? (
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="rounded-full">
              <Link to="/auth"><LogIn className="mr-1 h-4 w-4" />Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </header>
  );
}
