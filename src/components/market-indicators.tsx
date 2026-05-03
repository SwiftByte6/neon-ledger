import { TrendingUp, TrendingDown, Zap } from "lucide-react";

export interface TrendIndicator {
  id: string;
  symbol: string;
  signal: "bullish" | "bearish" | "neutral";
  strength: "strong" | "moderate" | "weak";
  change: number;
  price: number;
}

const TREND_DATA: TrendIndicator[] = [
  { id: "btc", symbol: "BTC", signal: "bullish", strength: "strong", change: 2.34, price: 64231.42 },
  { id: "eth", symbol: "ETH", signal: "bullish", strength: "moderate", change: 4.12, price: 3128.7 },
  { id: "sol", symbol: "SOL", signal: "bearish", strength: "weak", change: -1.23, price: 152.31 },
  { id: "avax", symbol: "AVAX", signal: "neutral", strength: "moderate", change: 0.84, price: 41.05 },
  { id: "link", symbol: "LINK", signal: "bearish", strength: "moderate", change: -0.42, price: 18.92 },
  { id: "arb", symbol: "ARB", signal: "bullish", strength: "strong", change: 6.78, price: 1.27 },
];

function getSignalColor(signal: string, strength: string) {
  if (signal === "bullish") return "from-lime-500 to-emerald-500";
  if (signal === "bearish") return "from-rose-500 to-red-500";
  return "from-slate-500 to-slate-600";
}

function getSignalGlow(signal: string) {
  if (signal === "bullish") return "shadow-lg shadow-lime-500/20";
  if (signal === "bearish") return "shadow-lg shadow-rose-500/20";
  return "shadow-lg shadow-slate-500/20";
}

export function TrendIndicators() {
  return (
    <div
      data-dashboard-entrance
      className="rounded-xl border border-border/40 bg-gradient-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white/90">Market Signals</h3>
          <p className="text-xs text-white/50 mt-0.5">Bullish, Bearish & Trend Analysis</p>
        </div>
        <Zap className="h-4 w-4 text-lime-400 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {TREND_DATA.map((indicator) => (
          <div
            key={indicator.id}
            className={`group relative rounded-lg border border-white/10 bg-white/5 p-2.5 transition-all hover:bg-white/8 hover:border-lime-400/30 ${getSignalGlow(indicator.signal)}`}
          >
            <div className="flex items-start justify-between gap-1.5 mb-2">
              <div>
                <div className="text-xs font-bold text-white/90">{indicator.symbol}</div>
                <div className="text-[10px] text-white/50 font-medium">${indicator.price.toLocaleString()}</div>
              </div>
              <div className={`p-1.5 rounded-md bg-gradient-to-br ${getSignalColor(indicator.signal, indicator.strength)}/20`}>
                {indicator.signal === "bullish" ? (
                  <TrendingUp className="h-3 w-3 text-lime-400" />
                ) : indicator.signal === "bearish" ? (
                  <TrendingDown className="h-3 w-3 text-rose-400" />
                ) : (
                  <div className="h-3 w-3 rounded-full bg-slate-400/50" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div
                className={`flex-1 h-1.5 rounded-full overflow-hidden bg-white/10`}
              >
                <div
                  className={`h-full bg-gradient-to-r ${getSignalColor(indicator.signal, indicator.strength)}`}
                  style={{
                    width:
                      indicator.strength === "strong"
                        ? "100%"
                        : indicator.strength === "moderate"
                          ? "66%"
                          : "33%",
                  }}
                />
              </div>
            </div>

            <div
              className={`text-[10px] font-semibold mt-1.5 ${indicator.change >= 0 ? "text-lime-400" : "text-rose-400"}`}
            >
              {indicator.change >= 0 ? "+" : ""}{indicator.change.toFixed(2)}%
            </div>

            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-lime-400/10 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
        <div className="text-center">
          <div className="text-xs font-semibold text-lime-400">Bullish</div>
          <div className="text-xl font-bold text-white/90 mt-0.5">3</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold text-slate-400">Neutral</div>
          <div className="text-xl font-bold text-white/90 mt-0.5">1</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold text-rose-400">Bearish</div>
          <div className="text-xl font-bold text-white/90 mt-0.5">2</div>
        </div>
      </div>
    </div>
  );
}
 
