import { useEffect, useState } from "react";
import { allocation } from "@/lib/mock-data";

export function Allocation() {
  const total = allocation.reduce((a, b) => a + b.value, 0);
  const R = 55;
  const C = 2 * Math.PI * R;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(1));
    return () => cancelAnimationFrame(id);
  }, []);

  let acc = 0;
  return (
    <section className="rounded-3xl glass p-4 hover-lift">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Allocation</h3>
        <span className="text-[11px] text-muted-foreground">By asset</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-4">
        <div className="relative">
          <svg width={130} height={130} viewBox="0 0 130 130" className="-rotate-90">
            <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            {allocation.map((a) => {
              const frac = a.value / total;
              const len = C * frac * progress;
              const off = -C * (acc / total) * progress;
              acc += a.value;
              return (
                <circle
                  key={a.label}
                  cx="65"
                  cy="65"
                  r={R}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="12"
                  strokeDasharray={`${len} ${C}`}
                  strokeDashoffset={off}
                  strokeLinecap="butt"
                  style={{ transition: "stroke-dasharray 1.2s ease, stroke-dashoffset 1.2s ease", filter: a.color === "#D4FF3F" ? "drop-shadow(0 0 8px rgba(212,255,63,0.6))" : undefined }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Total</div>
              <div className="font-mono text-base font-semibold">$284.5K</div>
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          {allocation.map((a) => (
            <div key={a.label} className="flex items-center gap-3 text-sm">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: a.color, boxShadow: `0 0 8px ${a.color}66` }} />
              <span className="flex-1 text-sm">{a.label}</span>
              <span className="font-mono text-muted-foreground text-sm">{a.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
