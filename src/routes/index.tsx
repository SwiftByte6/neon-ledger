import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SideNav } from "@/components/side-nav";
import { TopBar } from "@/components/top-bar";
import { Spotlight, Particles, HeroSpotlight } from "@/components/ambient";
import { GlowCard, GlobalSpotlight } from "@/components/glow-card";
import { HeroBalance } from "@/components/hero-balance";
import { MainChart } from "@/components/main-chart";
import { Watchlist } from "@/components/watchlist";
import { Transactions } from "@/components/transactions";
import { NewsFeed } from "@/components/news-feed";
import { Allocation } from "@/components/allocation";
import { MarketMood } from "@/components/market-mood";
import MagicBento from "@/components/magic-bento";
import ProfileCard from "@/components/profile-card";
import { MarketFilters } from "@/components/market-filters";
import { TrendIndicators } from "@/components/market-indicators";
import { AdvancedAnalytics } from "@/components/advanced-analytics";
import { assets } from "@/lib/mock-data";

const PROFILE_USER = {
  name: "Urusa",
  title: "Head of Product",
  handle: "urusa",
  contactText: "Contact Me",
  avatarUrl: "/image14.jpeg",
  miniAvatarUrl: "/image14.jpeg",
  iconUrl: "/image14.jpeg",
  innerGradient: "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
};

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  useEffect(() => {
    if (showProfileCard) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-dashboard-entrance]",
        { opacity: 0, y: 18, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", stagger: 0.09 }
      );

      const textNodes = gridRef.current?.querySelectorAll("h1,h2,h3,h4,p,button,span,small,label,text");
      if (textNodes?.length) {
        gsap.fromTo(
          textNodes,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.015, delay: 0.1 }
        );
      }
    }, gridRef);

    return () => context.revert();
  }, [showProfileCard]);

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
          <TopBar onProfileToggle={() => setShowProfileCard((current) => !current)} profileActive={showProfileCard} />
          <main
            ref={gridRef}
            className="px-4 sm:px-6 lg:px-8 py-5 space-y-5 max-w-400 mx-auto relative min-h-[calc(100vh-4rem)]"
          >
            <h1 className="sr-only">Crypto Analytics Dashboard</h1>

            {showProfileCard ? (
              <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
                <div className="w-full max-w-107.5">
                  <ProfileCard
                    name={PROFILE_USER.name}
                    title={PROFILE_USER.title}
                    handle={PROFILE_USER.handle}
                    status="Online"
                    contactText={PROFILE_USER.contactText}
                    avatarUrl={PROFILE_USER.avatarUrl}
                    miniAvatarUrl={PROFILE_USER.miniAvatarUrl}
                    iconUrl={PROFILE_USER.iconUrl}
                    behindGlowEnabled={false}
                    enableTilt={false}
                    enableMobileTilt={false}
                    innerGradient={PROFILE_USER.innerGradient}
                     stocks={assets}
                    onContactClick={() => console.log("Contact clicked")}
                  />
                </div>
              </div>
            ) : (
              <>
                <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3.5 backdrop-blur-sm card--border-glow">
                  <HeroBalance />
                </GlowCard>

                <MarketFilters />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3 backdrop-blur-sm card--border-glow">
                    <TrendIndicators />
                  </GlowCard>
                  <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3 backdrop-blur-sm card--border-glow">
                    <AdvancedAnalytics />
                  </GlowCard>
                </div>


                <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4.5">
                  <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-5 backdrop-blur-sm card--border-glow">
                    <MainChart />
                  </GlowCard>
                  <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-5 backdrop-blur-sm card--border-glow">
                    <Watchlist />
                  </GlowCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] xl:grid-cols-[0.84fr_1.16fr] gap-3.5">
                  <div className="grid gap-3">
                    <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3 backdrop-blur-sm card--border-glow">
                      <MarketMood />
                    </GlowCard>
                    <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3 backdrop-blur-sm card--border-glow">
                      <Allocation />
                    </GlowCard>
                  </div>
                  <div className="grid gap-3">
                    <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-3 backdrop-blur-sm card--border-glow">
                      <Transactions />
                    </GlowCard>
                    <GlowCard data-dashboard-entrance className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-4 backdrop-blur-sm card--border-glow">
                      <NewsFeed />
                    </GlowCard>
                  </div>
                </div>

                <footer data-dashboard-entrance className="text-center text-xs text-muted-foreground py-8">
                  LIMEX · Real-time analytics · Data simulated for demo
                </footer>

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
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
