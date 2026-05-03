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

export function HeroBalance() {
  const [range, setRange] = useState<Range>("1W");
  const [balance, setBalance] = useState(284_516.42);
  const series = useMemo(() => {
    const c = seedFor[range];
    return buildSeries(c.len, c.base, c.vol, c.seed);
  }, [range]);

  useEffect(() => {
    const id = setInterval(() => {
      setBalance((b) => b + (Math.random() - 0.45) * 80);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const display = useCountUp(balance, 800, 2);
  const change = 12.84;
  const changeAbs = 32_412.18;

  return (
    <section className="relative overflow-hidden rounded-3xl glass p-6 md:p-8 grid-bg">
      <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

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
                    : "bg-[var(--surface-2)]/70 text-muted-foreground hover:text-foreground border border-border"
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
          <div key={s.l} className="rounded-xl bg-[var(--surface-2)]/40 border border-border/60 p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
            <div className="font-mono text-lg font-semibold mt-1">{s.v}</div>
            <div className={`text-[11px] mt-0.5 ${s.up ? "text-primary" : "text-muted-foreground"}`}>
              {s.up ? <ArrowUpRight className="inline h-3 w-3" /> : <ArrowDownRight className="inline h-3 w-3" />} {s.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
