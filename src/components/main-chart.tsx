import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { buildCandles, buildSeries, type Asset } from "@/lib/mock-data";

type Mode = "line" | "candles";
type ChartRange = "1D" | "1W" | "1M" | "1Y";

type MainChartProps = {
  asset?: Asset;
  range?: ChartRange;
  categoryLabel?: string;
};

const RANGE_CONFIG: Record<ChartRange, { len: number; vol: number; seed: number }> = {
  "1D": { len: 48, vol: 0.8, seed: 11 },
  "1W": { len: 72, vol: 1.5, seed: 21 },
  "1M": { len: 120, vol: 2.4, seed: 31 },
  "1Y": { len: 180, vol: 4.8, seed: 41 },
};

export function MainChart({ asset, range = "1W", categoryLabel = "All markets" }: MainChartProps) {
  const [mode, setMode] = useState<Mode>("line");
  const [tick, setTick] = useState(0);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const hasDrawnRef = useRef(false);
  const W = 1000;
  const H = 360;
  const PAD = { l: 50, r: 12, t: 18, b: 28 };

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const activeAsset = asset ?? { symbol: "BTC", name: "Bitcoin", price: 64231.42, change: 2.34, spark: [], color: "#D4FF3F" };
  const bullish = activeAsset.change >= 0;
  const rangeConfig = RANGE_CONFIG[range];
  const symbolSeed = useMemo(
    () => activeAsset.symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0),
    [activeAsset.symbol]
  );

  const line = useMemo(
    () => buildSeries(rangeConfig.len, 100, rangeConfig.vol, rangeConfig.seed + symbolSeed + (tick % 11)),
    [rangeConfig, symbolSeed, tick]
  );
  const candles = useMemo(() => buildCandles(Math.max(24, Math.round(rangeConfig.len / 2)), 64000, rangeConfig.seed + symbolSeed), [rangeConfig.len, rangeConfig.seed, symbolSeed]);

  const lineGeom = useMemo(() => {
    const min = Math.min(...line);
    const max = Math.max(...line);
    const r = max - min || 1;
    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;
    const step = iw / (line.length - 1);
    const pts = line.map((v, i) => [PAD.l + i * step, PAD.t + ih - ((v - min) / r) * ih] as const);
    const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
    const area = `${d} L${pts[pts.length - 1][0]},${PAD.t + ih} L${pts[0][0]},${PAD.t + ih} Z`;
    return { pts, d, area, min, max };
  }, [line]);

  const candleGeom = useMemo(() => {
    const all = candles.flatMap((c) => [c.h, c.l]);
    const min = Math.min(...all);
    const max = Math.max(...all);
    const r = max - min || 1;
    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;
    const step = iw / candles.length;
    const cw = Math.max(2, step * 0.6);
    const y = (v: number) => PAD.t + ih - ((v - min) / r) * ih;
    return { min, max, step, cw, y, ih };
  }, [candles]);

  useEffect(() => {
    if (mode !== "line" || !linePathRef.current || hasDrawnRef.current) return;

    const linePath = linePathRef.current;
    const fillPath = fillPathRef.current;
    const length = linePath.getTotalLength();

    gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });
    if (fillPath) {
      gsap.set(fillPath, { opacity: 0 });
    }

    const timeline = gsap.timeline();
    timeline.to(linePath, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" });
    if (fillPath) {
      timeline.to(fillPath, { opacity: 1, duration: 0.6, ease: "power1.out" }, 0.35);
    }
    hasDrawnRef.current = true;

    return () => {
      timeline.kill();
    };
  }, [mode, range, activeAsset.symbol]);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    if (mode !== "line") return;
    const i = Math.max(0, Math.min(line.length - 1, Math.round(((x - PAD.l) / (W - PAD.l - PAD.r)) * (line.length - 1))));
    const p = lineGeom.pts[i];
    setHover({ i, x: p[0], y: p[1] });
  };

  const yTicks = 5;
  const yAxisRange = mode === "line" ? { min: lineGeom.min, max: lineGeom.max } : { min: candleGeom.min, max: candleGeom.max };

  return (
    <section className="rounded-3xl glass p-5 md:p-6 hover-lift">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{activeAsset.symbol} / USDT</h2>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded-md border animate-pulse-glow ${
                bullish ? "bg-primary/15 text-primary border-primary/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"
              }`}
            >
              {bullish ? "BULLISH" : "BEARISH"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-(--surface-2)/70 text-muted-foreground border border-border">
              {range}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-mono text-2xl font-semibold ${bullish ? "neon-text" : "text-rose-300"}`}>
              ${activeAsset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-xs font-medium ${bullish ? "text-primary" : "text-rose-400"}`}>
              {activeAsset.change >= 0 ? "+" : ""}{activeAsset.change.toFixed(2)}%
            </span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {activeAsset.name} · {categoryLabel}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-(--surface-2)/70 border border-border">
            {(["line", "candles"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 h-7 rounded-lg text-xs font-medium capitalize transition ${
                  mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-75 md:h-95"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D4FF3F" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4FF3F" stopOpacity="0" />
            </linearGradient>
            <filter id="chart-glow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {Array.from({ length: yTicks }).map((_, i) => {
            const y = PAD.t + ((H - PAD.t - PAD.b) / (yTicks - 1)) * i;
            const v = yAxisRange.max - ((yAxisRange.max - yAxisRange.min) / (yTicks - 1)) * i;
            return (
              <g key={i}>
                <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
                <text x={PAD.l - 8} y={y + 4} fontSize="10" textAnchor="end" fill="rgba(255,255,255,0.4)" className="font-mono">
                  {v.toFixed(0)}
                </text>
              </g>
            );
          })}

          {mode === "line" ? (
            <>
              <path ref={fillPathRef} d={lineGeom.area} fill="url(#chart-fill)" />
              <path
                ref={linePathRef}
                d={lineGeom.d}
                fill="none"
                stroke={bullish ? "#D4FF3F" : "#FF5577"}
                strokeWidth={2}
                filter="url(#chart-glow)"
              />
              {hover && (
                <>
                  <line
                    x1={hover.x}
                    x2={hover.x}
                    y1={PAD.t}
                    y2={H - PAD.b}
                    stroke={bullish ? "rgba(212,255,63,0.4)" : "rgba(255,85,119,0.35)"}
                    strokeDasharray="3 3"
                  />
                  <circle cx={hover.x} cy={hover.y} r={5} fill={bullish ? "#D4FF3F" : "#FF5577"} filter="url(#chart-glow)" />
                  <circle cx={hover.x} cy={hover.y} r={10} fill={bullish ? "rgba(212,255,63,0.2)" : "rgba(255,85,119,0.18)"} />
                </>
              )}
            </>
          ) : (
            candles.map((c, i) => {
              const x = PAD.l + i * candleGeom.step + candleGeom.step / 2;
              const up = c.c >= c.o;
              const color = up ? "#D4FF3F" : "#FF5577";
              return (
                <g key={i}>
                  <line x1={x} x2={x} y1={candleGeom.y(c.h)} y2={candleGeom.y(c.l)} stroke={color} strokeWidth={1} opacity={0.7} />
                  <rect
                    x={x - candleGeom.cw / 2}
                    y={candleGeom.y(Math.max(c.o, c.c))}
                    width={candleGeom.cw}
                    height={Math.max(1, Math.abs(candleGeom.y(c.o) - candleGeom.y(c.c)))}
                    fill={color}
                    opacity={up ? 0.95 : 0.85}
                  />
                </g>
              );
            })
          )}
        </svg>

        {hover && mode === "line" && (
          <div
            className="pointer-events-none absolute glass-strong rounded-lg px-3 py-2 text-xs shadow-xl"
            style={{
              left: `min(calc(${(hover.x / W) * 100}% + 12px), calc(100% - 140px))`,
              top: `${(hover.y / H) * 100}%`,
            }}
          >
            <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Price</div>
            <div className={`font-mono text-sm ${bullish ? "neon-text" : "text-rose-300"}`}>
              ${(activeAsset.price * (line[hover.i] / line[0])).toFixed(2)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">tick {hover.i}</div>
          </div>
        )}
      </div>
    </section>
  );
}
