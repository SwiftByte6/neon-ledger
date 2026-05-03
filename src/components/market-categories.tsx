import { BarChart3, TrendingUp, Activity } from "lucide-react";

export interface MarketCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  change: number;
  topSymbols: string[];
  color: string;
}

const MARKET_CATEGORIES: MarketCategory[] = [
  {
    id: "layer1",
    name: "Layer 1",
    icon: "L1",
    count: 12,
    change: 3.24,
    topSymbols: ["BTC", "SOL", "AVAX"],
    color: "lime",
  },
  {
    id: "layer2",
    name: "Layer 2",
    icon: "L2",
    count: 8,
    change: 5.67,
    topSymbols: ["ARB", "OP", "LINEA"],
    color: "emerald",
  },
  {
    id: "defi",
    name: "DeFi",
    icon: "DeFi",
    count: 24,
    change: -2.14,
    topSymbols: ["AAVE", "UNI", "CURVE"],
    color: "cyan",
  },
  {
    id: "nfts",
    name: "NFTs & Gaming",
    icon: "NFT",
    count: 15,
    change: 1.89,
    topSymbols: ["BLUR", "IMX", "SAND"],
    color: "purple",
  },
  {
    id: "staking",
    name: "Staking",
    icon: "Stake",
    count: 18,
    change: 4.32,
    topSymbols: ["ETH", "LIDO", "RETH"],
    color: "blue",
  },
  {
    id: "meme",
    name: "Meme Coins",
    icon: "Meme",
    count: 32,
    change: 12.45,
    topSymbols: ["DOGE", "SHIB", "PEPE"],
    color: "orange",
  },
];

function getColorClasses(color: string) {
  const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    lime: { bg: "from-lime-500/20 to-lime-500/5", text: "text-lime-400", border: "border-lime-500/30", glow: "shadow-lime-500/20" },
    emerald: { bg: "from-emerald-500/20 to-emerald-500/5", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
    cyan: { bg: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20" },
    purple: { bg: "from-purple-500/20 to-purple-500/5", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20" },
    blue: { bg: "from-blue-500/20 to-blue-500/5", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
    orange: { bg: "from-orange-500/20 to-orange-500/5", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
  };
  return colors[color];
}

export function MarketCategories() {
  return (
    <div
      data-dashboard-entrance
      className="space-y-3 rounded-xl border border-border/40 bg-gradient-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white/90">Market Segments</h3>
          <p className="text-xs text-white/50 mt-0.5">Performance by asset category</p>
        </div>
        <BarChart3 className="h-4 w-4 text-lime-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {MARKET_CATEGORIES.map((category) => {
          const colorClass = getColorClasses(category.color);
          const isPositive = category.change >= 0;

          return (
            <div
              key={category.id}
              className={`group relative rounded-lg border ${colorClass.border} bg-gradient-to-br ${colorClass.bg} p-3 transition-all hover:border-opacity-100 hover:shadow-lg ${colorClass.glow} cursor-pointer`}
            >
              <div className="mb-2">
                <div className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-semibold text-xs ${colorClass.text} bg-white/10`}>
                  {category.icon}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-xs font-bold text-white/90">{category.name}</div>
                <div className="text-[10px] text-white/50 font-medium mt-0.5">{category.count} assets</div>
              </div>

              <div className={`text-sm font-bold ${isPositive ? "text-lime-400" : "text-rose-400"}`}>
                {isPositive ? "+" : ""}{category.change.toFixed(2)}%
              </div>

              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="text-[9px] text-white/60 font-medium mb-1">Top</div>
                <div className="flex gap-1">
                  {category.topSymbols.map((symbol) => (
                    <span key={symbol} className="text-[9px] font-bold text-white/70 bg-white/10 rounded px-1.5 py-0.5">
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
