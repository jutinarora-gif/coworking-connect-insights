import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--flare)]">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="group grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-foreground">
              <span className="font-display text-[13px] font-bold leading-none tracking-[-0.05em] text-background">TCD</span>
            </span>
            <span className="font-display text-sm font-semibold tracking-[-0.02em]">The Coworking Dispatch</span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            India-first coworking news, price intelligence and honest directories. 70% India, 30% the rest of the world.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dispatches" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Dispatches</Link></li>
            <li><Link to="/spaces" search={{ city: undefined }} className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Spaces</Link></li>
            <li><Link to="/winners" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Winners</Link></li>
            <li><Link to="/questions" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Q&A</Link></li>
            <li><Link to="/blog" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Blog</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Community</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/auth" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Sign in / Join</Link></li>
            <li><a href="#" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Suggest a feed</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Submit a space</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">About</div>
          <p className="text-sm text-muted-foreground">
            Made in India, by coworkers, for coworkers.
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/careers" className="hover:text-foreground hover:underline hover:decoration-[var(--flare)] hover:decoration-2 hover:underline-offset-4">Careers</Link></li>
          </ul>


        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © 2026 The Coworking Dispatch
      </div>
    </footer>
  );
}
