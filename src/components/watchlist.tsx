import { useEffect, useState } from "react";
import { Sparkline } from "./sparkline";
import { assets as initial, type Asset } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import type { IconType } from "react-icons";
import { FaHillAvalanche, FaLayerGroup } from "react-icons/fa6";
import { SiBitcoin, SiChainlink, SiEthereum, SiSolana } from "react-icons/si";

const ASSET_ICONS: Record<string, IconType> = {
  BTC: SiBitcoin,
  ETH: SiEthereum,
  SOL: SiSolana,
  AVAX: FaHillAvalanche,
  LINK: SiChainlink,
  ARB: FaLayerGroup,
};

type WatchlistProps = {
  assets?: Asset[];
  selectedSymbol?: string;
  categoryLabel?: string;
};

export function Watchlist({ assets = initial, selectedSymbol = "All", categoryLabel = "All markets" }: WatchlistProps) {
  const [list, setList] = useState(assets);
  const [flash, setFlash] = useState<Record<string, number>>({});

  useEffect(() => {
    setList(assets);
  }, [assets]);

  useEffect(() => {
    const id = setInterval(() => {
      setList((prev) =>
        prev.map((a) => {
          const delta = (Math.random() - 0.5) * a.price * 0.004;
          return {
            ...a,
            price: +(a.price + delta).toFixed(2),
            change: +(a.change + (Math.random() - 0.5) * 0.2).toFixed(2),
          };
        }),
      );
      setFlash((f) => ({ ...f, [assets[Math.floor(Math.random() * assets.length)].symbol]: Date.now() }));
    }, 1800);
    return () => clearInterval(id);
  }, [assets]);

  return (
    <section className="rounded-3xl glass p-5 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" /> Watchlist
          </h3>
          <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {categoryLabel} · {selectedSymbol === "All" ? "All assets" : selectedSymbol}
          </div>
        </div>
        <button className="text-xs text-muted-foreground hover:text-primary">View all</button>
      </div>
      <div className="space-y-1">
        {list.map((a) => {
          const up = a.change >= 0;
          const flashed = flash[a.symbol] && Date.now() - flash[a.symbol] < 700;
          const AssetIcon = ASSET_ICONS[a.symbol];
          const selected = selectedSymbol !== "All" && selectedSymbol === a.symbol;
          return (
            <div
              key={a.symbol}
              className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-border hover:bg-(--surface-2)/50 transition ${
                flashed ? "animate-tick" : ""
              } ${selected ? "border-primary/40 bg-primary/10" : ""}`}
              style={flashed ? { animation: "tick 0.6s ease-out" } : undefined}
            >
              <div
                className="h-9 w-9 rounded-xl grid place-items-center text-[11px] font-bold"
                style={{ background: `${a.color}22`, color: a.color, boxShadow: `inset 0 0 0 1px ${a.color}33` }}
              >
                {AssetIcon ? <AssetIcon className="h-4 w-4" aria-hidden="true" /> : <span>{a.symbol}</span>}
              </div>
              <div>
                <div className="text-sm font-medium">{a.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{a.symbol}/USDT</div>
              </div>
              <Sparkline
                data={a.spark}
                width={70}
                height={28}
                stroke={up ? "#D4FF3F" : "#FF5577"}
                glow
              />
              <div className="text-right">
                <div className="font-mono text-sm font-semibold">
                  ${a.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className={`text-[11px] font-medium inline-flex items-center gap-0.5 ${up ? "text-primary" : "text-rose-400"}`}>
                  {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(a.change).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
 
