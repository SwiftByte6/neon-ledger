import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

export function MarketMood() {
  const [score, setScore] = useState(72);
  useEffect(() => {
    const id = setInterval(() => {
      setScore((s) => Math.max(8, Math.min(96, s + (Math.random() - 0.45) * 6)));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const angle = -90 + (score / 100) * 180;
  const label = score > 70 ? "Extreme Greed" : score > 55 ? "Bullish" : score > 45 ? "Neutral" : score > 30 ? "Bearish" : "Extreme Fear";

  return (
    <section className="rounded-3xl glass p-3 hover-lift relative overflow-hidden">
      <div className="absolute -top-8 -right-8 h-28 w-28 bg-primary/15 blur-3xl rounded-full pointer-events-none" />
      <div className="flex items-center justify-between mb-2.5 relative">
        <h3 className="font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Market Mood
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Live · F&G</span>
      </div>
      <div className="relative w-full aspect-[2/1] max-h-[120px]">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            <linearGradient id="mood" x1="0" x2="1">
              <stop offset="0%" stopColor="#FF5577" />
              <stop offset="50%" stopColor="#FFD23F" />
              <stop offset="100%" stopColor="#D4FF3F" />
            </linearGradient>
          </defs>
          <path d="M 15 100 A 85 85 0 0 1 185 100" stroke="url(#mood)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 1s cubic-bezier(.5,1.6,.4,1)" }}>
            <line x1="100" y1="100" x2="100" y2="28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="28" r="5" fill="#D4FF3F" filter="drop-shadow(0 0 6px #D4FF3F)" />
          </g>
          <circle cx="100" cy="100" r="6" fill="#15181D" stroke="#2A2F36" strokeWidth="2" />
        </svg>
      </div>
      <div className="text-center mt-1">
        <div className="font-mono text-lg font-semibold neon-text">{Math.round(score)}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</div>
      </div>
    </section>
  );
}
 
