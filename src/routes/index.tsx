import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { SideNav } from "@/components/side-nav";
import { TopBar } from "@/components/top-bar";
import { Spotlight, Particles, HeroSpotlight } from "@/components/ambient";
import { HeroBalance } from "@/components/hero-balance";
import { MainChart } from "@/components/main-chart";
import { Watchlist } from "@/components/watchlist";
import { Transactions } from "@/components/transactions";
import { NewsFeed } from "@/components/news-feed";
import { Allocation } from "@/components/allocation";
import { MarketMood } from "@/components/market-mood";
import { GlowCard, GlobalSpotlight } from "@/components/glow-card";
import MagicBento from "@/components/magic-bento";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen text-foreground">
      <Particles />
      <Spotlight />
      <HeroSpotlight />

      <style>
        {`
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(34, 197, 94, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(34, 197, 94, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .card--border-glow:hover::after {
            opacity: 1;
          }
        `}
      </style>

      <GlobalSpotlight gridRef={gridRef} enabled={true} spotlightRadius={300} />

      <div className="relative z-10 flex">
        <SideNav />
        <div className="flex-1 min-w-0">
          <TopBar />
          <main
            ref={gridRef}
            className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto relative"
          >
            <h1 className="sr-only">Crypto Analytics Dashboard</h1>

            <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-4 backdrop-blur-sm card--border-glow">
              <HeroBalance />
            </GlowCard>

            <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
              <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-6 backdrop-blur-sm card--border-glow">
                <MainChart />
              </GlowCard>
              <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-6 backdrop-blur-sm card--border-glow">
                <Watchlist />
              </GlowCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] xl:grid-cols-[0.84fr_1.16fr] gap-4">
              <div className="grid gap-3">
                <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-3 backdrop-blur-sm card--border-glow">
                  <MarketMood />
                </GlowCard>
                <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-3 backdrop-blur-sm card--border-glow">
                  <Allocation />
                </GlowCard>
              </div>
              <div className="grid gap-3">
                <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-3 backdrop-blur-sm card--border-glow">
                  <Transactions />
                </GlowCard>
                <GlowCard className="rounded-2xl border border-border/60 bg-[var(--surface-2)]/45 p-4 backdrop-blur-sm card--border-glow">
                  <NewsFeed />
                </GlowCard>
              </div>
            </div>

            {/* <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Features</h2>
              <MagicBento
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="34, 197, 94"
                disableAnimations={false}
              />
            </div> */}

            <footer className="text-center text-xs text-muted-foreground py-8">
              LIMEX · Real-time analytics · Data simulated for demo
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
