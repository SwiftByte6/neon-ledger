import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FilterState = {
  crypto: string;
  timeRange: string;
  category: string;
};

const CRYPTOS = [
  { id: "all", label: "All Assets" },
  { id: "BTC", label: "Bitcoin" },
  { id: "ETH", label: "Ethereum" },
  { id: "SOL", label: "Solana" },
  { id: "AVAX", label: "Avalanche" },
  { id: "LINK", label: "Chainlink" },
  { id: "ARB", label: "Arbitrum" },
];

const TIME_RANGES = [
  { id: "1h", label: "1 Hour" },
  { id: "1d", label: "1 Day" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "1y", label: "1 Year" },
];

const CATEGORIES = [
  { id: "trending", label: "Trending" },
  { id: "gainers", label: "Top Gainers" },
  { id: "losers", label: "Top Losers" },
  { id: "highvol", label: "High Volume" },
  { id: "all", label: "All Markets" },
];

interface MarketFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function MarketFilters({ onFilterChange }: MarketFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    crypto: "all",
    timeRange: "7d",
    category: "trending",
  });

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div
      data-dashboard-entrance
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-border/40 bg-gradient-to-br from-white/5 to-white/2 p-3 backdrop-blur-sm"
    >
      {/* Crypto Filter */}
      <div className="relative">
        <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
          Asset
        </label>
        <div className="relative">
          <select
            value={filters.crypto}
            onChange={(e) => handleChange("crypto", e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg bg-white/8 border border-white/15 text-sm text-white/90 font-medium transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/30 cursor-pointer"
          >
            {CRYPTOS.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900">
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="relative">
        <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
          Time Range
        </label>
        <div className="relative">
          <select
            value={filters.timeRange}
            onChange={(e) => handleChange("timeRange", e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg bg-white/8 border border-white/15 text-sm text-white/90 font-medium transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/30 cursor-pointer"
          >
            {TIME_RANGES.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900">
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Market Category Filter */}
      <div className="relative">
        <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
          Category
        </label>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg bg-white/8 border border-white/15 text-sm text-white/90 font-medium transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/30 cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900">
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
 
