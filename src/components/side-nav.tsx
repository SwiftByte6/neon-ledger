import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LineChart, Wallet, Star, Settings, Zap } from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/markets", label: "Markets", icon: LineChart },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/watchlist", label: "Watchlist", icon: Star },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function SideNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-19.5 lg:w-57.5 flex-col gap-2 border-r border-border bg-(--surface-1)/60 backdrop-blur-xl px-3 py-5 z-20">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="relative h-9 w-9 grid place-items-center rounded-xl bg-primary text-primary-foreground neon-glow-sm">
          <Zap className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="hidden lg:block">
          <div className="text-[15px] font-semibold tracking-tight">LIMEX</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Crypto OS</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-(--surface-2)/60"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.75 rounded-r-full bg-primary shadow-[0_0_12px_2px_rgba(212,255,63,0.6)]" />
              )}
              <Icon
                className={`h-4.5 w-4.5 shrink-0 ${active ? "text-primary" : ""}`}
                style={active ? { filter: "drop-shadow(0 0 6px rgba(212,255,63,0.6))" } : undefined}
              />
              <span className="hidden lg:block">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-border bg-(--surface-2)/70">
          <video
            className="h-40 w-full object-cover"
            src="/vecteezy_rotating-shot-of-bitcoins-digital-cryptocurrency-bitcoin-0219_1619007.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Spotlight Effect */}
        

        {/* Upgrade Card */}
        <div className="hidden lg:block rounded-2xl border border-border bg-(--surface-2)/70 p-4">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Pro Plan</div>
          <div className="text-sm font-medium mb-3">Unlock real-time signals</div>
          <button className="w-full rounded-lg bg-primary text-primary-foreground text-xs font-semibold py-2 hover:brightness-110 transition neon-glow-sm">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
 
