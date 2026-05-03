import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/side-nav";
import { TopBar } from "@/components/top-bar";
import { Spotlight, Particles } from "@/components/ambient";
import { HeroBalance } from "@/components/hero-balance";
import { MainChart } from "@/components/main-chart";
import { Watchlist } from "@/components/watchlist";
import { Transactions } from "@/components/transactions";
import { NewsFeed } from "@/components/news-feed";
import { Allocation } from "@/components/allocation";
import { MarketMood } from "@/components/market-mood";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Particles />
      <Spotlight />

      <div className="relative z-10 flex">
        <SideNav />
        <div className="flex-1 min-w-0">
          <TopBar />
          <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
            <h1 className="sr-only">Crypto Analytics Dashboard</h1>

            <HeroBalance />

            <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
              <MainChart />
              <div className="grid gap-6">
                <MarketMood />
                <Allocation />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Watchlist />
              <Transactions />
            </div>

            <NewsFeed />

            <footer className="text-center text-xs text-muted-foreground py-8">
              LIMEX · Real-time analytics · Data simulated for demo
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
