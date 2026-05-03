import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Sparkline } from "./sparkline";
import { useCountUp } from "@/hooks/use-count-up";
import { buildSeries } from "@/lib/mock-data";

const ranges = ["1D", "1W", "1M", "1Y"] as const;
type Range = (typeof ranges)[number];
const seedFor: Record<Range, { len: number; vol: number; seed: number; base: number }> = {
  "1D": { len: 48, vol: 0.6, seed: 11, base: 100 },
  "1W": { len: 56, vol: 1.4, seed: 21, base: 96 },
  "1M": { len: 60, vol: 2.6, seed: 31, base: 88 },
  "1Y": { len: 80, vol: 5.5, seed: 41, base: 70 },
};

type MetricCardData = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sparkline: string;
  seed: number;
  base: number;
  vol: number;
};

function MetricCard({ metric, data }: { metric: Pick<MetricCardData, "label" | "value" | "change" | "positive" | "sparkline">; data: number[] }) {
  return (
    <article className="rounded-2xl border border-border/60 bg-(--surface-2)/45 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{metric.label}</div>
          <div className="mt-2 font-mono text-2xl font-semibold tracking-tight">{metric.value}</div>
          <div className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${metric.positive ? "text-emerald-400" : "text-red-400"}`}>
            {metric.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {metric.change}
          </div>
        </div>

        <div className="w-24 shrink-0 opacity-90 sm:w-28">
          <Sparkline
            data={data}
            width={120}
            height={38}
            stroke={metric.sparkline}
            fill
            glow
            className="h-auto w-full"
          />
        </div>
      </div>
    </article>
  );
}

export function HeroBalance() {
  const [range, setRange] = useState<Range>("1W");
  const [balance, setBalance] = useState(284_516.42);
  const [tick, setTick] = useState(0);
  const [snapshot, setSnapshot] = useState({
    marketCap: 2.34,
    marketCapChange: 2.35,
    volume: 108.45,
    volumeChange: -3.42,
    dominance: 52.36,
    dominanceChange: 0.65,
    greed: 68,
    greedChange: 1.2,
  });
  const series = useMemo(() => {
    const c = seedFor[range];
    return buildSeries(c.len, c.base, c.vol, c.seed);
  }, [range]);

  const metrics: MetricCardData[] = [
    {
      label: "Total Market Cap",
      value: `$${snapshot.marketCap.toFixed(2)}T`,
      change: `${snapshot.marketCapChange >= 0 ? "+" : ""}${snapshot.marketCapChange.toFixed(2)}%`,
      positive: snapshot.marketCapChange >= 0,
      sparkline: "#33cc66",
      seed: 11,
      base: 96,
      vol: 1.2,
    },
    {
      label: "24h Volume",
      value: `$${snapshot.volume.toFixed(2)}B`,
      change: `${snapshot.volumeChange >= 0 ? "+" : ""}${snapshot.volumeChange.toFixed(2)}%`,
      positive: snapshot.volumeChange >= 0,
      sparkline: "#ff5c5c",
      seed: 21,
      base: 88,
      vol: 1.6,
    },
    {
      label: "BTC Dominance",
      value: `${snapshot.dominance.toFixed(2)}%`,
      change: `${snapshot.dominanceChange >= 0 ? "+" : ""}${snapshot.dominanceChange.toFixed(2)}%`,
      positive: snapshot.dominanceChange >= 0,
      sparkline: "#5d74ff",
      seed: 31,
      base: 82,
      vol: 1.1,
    },
    {
      label: "Fear & Greed Index",
      value: `${Math.round(snapshot.greed)}`,
      change: `${snapshot.greedChange >= 0 ? "+" : ""}${snapshot.greedChange.toFixed(1)}`,
      positive: snapshot.greedChange >= 0,
      sparkline: "#ffd23f",
      seed: 41,
      base: 76,
      vol: 0.9,
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setBalance((b) => b + (Math.random() - 0.45) * 80);
      setTick((t) => t + 1);
      setSnapshot((current) => {
        const nextMarketCap = Math.max(2.05, Math.min(2.8, current.marketCap + (Math.random() - 0.45) * 0.03));
        const nextVolume = Math.max(92, Math.min(122, current.volume + (Math.random() - 0.5) * 1.6));
        const nextDominance = Math.max(47, Math.min(57, current.dominance + (Math.random() - 0.5) * 0.18));

        return {
          marketCap: nextMarketCap,
          marketCapChange: (nextMarketCap - current.marketCap) * 8.5,
          volume: nextVolume,
          volumeChange: (nextVolume - current.volume) * 2.8,
          dominance: nextDominance,
          dominanceChange: (nextDominance - current.dominance) * 12,
          greed: Math.max(12, Math.min(88, current.greed + (Math.random() - 0.5) * 3.2)),
          greedChange: (Math.random() - 0.45) * 2.4,
        };
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const display = useCountUp(balance, 800, 2);
  const change = 12.84;
  const changeAbs = 32_412.18;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Live Market Snapshot</div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-primary/80">Updated every 2s</div>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {metrics.map((metric) => {
            const data = buildSeries(26, metric.base, metric.vol, metric.seed + tick);
            return <MetricCard key={metric.label} metric={metric} data={data} />;
          })}
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Wallet className="h-3.5 w-3.5 text-primary" /> Total Portfolio Balance
          </div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-muted-foreground text-2xl">$</span>
            <span className="font-mono text-5xl md:text-6xl font-semibold tracking-tight neon-text">
              {display}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +{change}%
            </span>
            <span className="text-sm text-muted-foreground font-mono">
              +${changeAbs.toLocaleString()} ({range})
            </span>
          </div>

          <div className="flex items-center gap-1.5 pt-2">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3.5 h-8 rounded-lg text-xs font-medium transition-all ${
                  range === r
                    ? "bg-primary text-primary-foreground neon-glow-sm"
                    : "bg-(--surface-2)/70 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-44 md:h-56">
          <Sparkline
            data={series}
            width={620}
            height={220}
            stroke="#D4FF3F"
            fill
            glow
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/60">
        {[
          { l: "24h Volume", v: "$48.2M", d: "+8.4%", up: true },
          { l: "Open Positions", v: "12", d: "3 long", up: true },
          { l: "Realized P/L", v: "+$8,124", d: "this week", up: true },
          { l: "Win Rate", v: "68%", d: "30d avg", up: false },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-(--surface-2)/40 border border-border/60 p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
            <div className="font-mono text-lg font-semibold mt-1">{s.v}</div>
            <div className={`text-[11px] mt-0.5 ${s.up ? "text-primary" : "text-muted-foreground"}`}>
              {s.up ? <ArrowUpRight className="inline h-3 w-3" /> : <ArrowDownRight className="inline h-3 w-3" />} {s.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
