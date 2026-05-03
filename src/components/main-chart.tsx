import { useEffect, useMemo, useRef, useState } from "react";
import { buildCandles, buildSeries } from "@/lib/mock-data";

type Mode = "line" | "candles";

export function MainChart() {
  const [mode, setMode] = useState<Mode>("line");
  const [tick, setTick] = useState(0);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const W = 1000;
  const H = 360;
  const PAD = { l: 50, r: 12, t: 18, b: 28 };

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const line = useMemo(() => buildSeries(120, 100, 3.2, 99 + (tick % 7)), [tick]);
  const candles = useMemo(() => buildCandles(60, 64000, 51 + (tick % 5)), [tick]);

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
  const range = mode === "line" ? { min: lineGeom.min, max: lineGeom.max } : { min: candleGeom.min, max: candleGeom.max };

  return (
    <section className="rounded-3xl glass p-5 md:p-6 hover-lift">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">BTC / USDT</h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 animate-pulse-glow">
              LIVE
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-2xl font-semibold neon-text">$64,231.42</span>
            <span className="text-primary text-xs font-medium">+2.34%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-[var(--surface-2)]/70 border border-border">
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
          className="w-full h-[300px] md:h-[380px]"
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
            const v = range.max - ((range.max - range.min) / (yTicks - 1)) * i;
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
              <path d={lineGeom.area} fill="url(#chart-fill)" />
              <path d={lineGeom.d} fill="none" stroke="#D4FF3F" strokeWidth={2} filter="url(#chart-glow)" />
              {hover && (
                <>
                  <line x1={hover.x} x2={hover.x} y1={PAD.t} y2={H - PAD.b} stroke="rgba(212,255,63,0.4)" strokeDasharray="3 3" />
                  <circle cx={hover.x} cy={hover.y} r={5} fill="#D4FF3F" filter="url(#chart-glow)" />
                  <circle cx={hover.x} cy={hover.y} r={10} fill="rgba(212,255,63,0.2)" />
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
            <div className="font-mono text-sm neon-text">${(line[hover.i] * 642).toFixed(2)}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">tick {hover.i}</div>
          </div>
        )}
      </div>
    </section>
  );
}
