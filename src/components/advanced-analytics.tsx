import { BarChart3, LineChart, Activity, Zap } from "lucide-react";

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function AdvancedAnalytics() {
  const metrics: AnalyticsMetric[] = [
    {
      label: "Market Cap",
      value: "$2.34T",
      change: 2.35,
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      label: "24h Volume",
      value: "$128.4B",
      change: -5.12,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "BTC Dominance",
      value: "52.8%",
      change: 1.24,
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      label: "Fear Index",
      value: "Neutral",
      change: 3.45,
      icon: <Zap className="h-4 w-4" />,
    },
  ];

  return (
    <div
      data-dashboard-entrance
      className="rounded-xl border border-border/40 bg-gradient-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm"
    >
      <h3 className="text-sm font-semibold text-white/90 mb-4">Key Metrics</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="group relative rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3 transition-all hover:border-lime-400/30 hover:bg-white/15"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-lime-500/30 to-emerald-500/20 flex items-center justify-center text-lime-400">
                {metric.icon}
              </div>
              <div
                className={`text-xs font-bold ${metric.change >= 0 ? "text-lime-400" : "text-rose-400"}`}
              >
                {metric.change >= 0 ? "↑" : "↓"} {Math.abs(metric.change).toFixed(2)}%
              </div>
            </div>

            <div className="text-[10px] text-white/60 font-medium mb-1">{metric.label}</div>
            <div className="text-lg font-bold text-white/90">{metric.value}</div>

            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-lime-400/10 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Overview</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] text-white/50 font-medium">Bullish</div>
                <div className="text-sm font-bold text-lime-400 mt-1">47%</div>
              </div>
              <div>
                <div className="text-[10px] text-white/50 font-medium">Neutral</div>
                <div className="text-sm font-bold text-slate-400 mt-1">32%</div>
              </div>
              <div>
                <div className="text-[10px] text-white/50 font-medium">Bearish</div>
                <div className="text-sm font-bold text-rose-400 mt-1">21%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
