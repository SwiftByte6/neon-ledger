import { Bell, Search, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        <div className="md:hidden font-bold tracking-tight text-primary text-lg">LIMEX</div>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search markets, assets, news…"
            className="w-full h-10 pl-10 pr-16 rounded-xl bg-[var(--surface-2)]/70 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(212,255,63,0.12)] transition"
          />
          <kbd className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-6 px-1.5 items-center text-[10px] rounded-md border border-border bg-background/60 font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="relative h-10 w-10 rounded-xl border border-border bg-[var(--surface-2)]/70 grid place-items-center hover:border-primary/40 transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(212,255,63,0.8)]" />
          </button>
          <div className="flex items-center gap-2 pl-1 pr-2 h-10 rounded-xl border border-border bg-[var(--surface-2)]/70 hover-lift">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-emerald-400 grid place-items-center text-primary-foreground text-xs font-bold">
              AX
            </div>
            <div className="hidden sm:block text-xs leading-tight">
              <div className="font-medium">Alex Chen</div>
              <div className="text-muted-foreground">Pro</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
