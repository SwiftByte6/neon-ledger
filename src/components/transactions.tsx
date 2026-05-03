import { transactions } from "@/lib/mock-data";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function Transactions() {
  return (
    <section className="rounded-3xl glass p-5 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <button className="text-xs text-muted-foreground hover:text-primary">History</button>
      </div>
      <div className="space-y-2">
        {transactions.map((t, i) => {
          const buy = t.type === "buy";
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]/40 border border-border/60 hover:border-primary/30 transition"
              style={{ animation: `fade-up 0.5s ease-out ${i * 70}ms both` }}
            >
              <div
                className={`h-9 w-9 rounded-xl grid place-items-center ${
                  buy ? "bg-primary/15 text-primary" : "bg-rose-500/15 text-rose-400"
                }`}
              >
                {buy ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">
                  {buy ? "Bought" : "Sold"} {t.asset}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">{t.time}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">
                  {buy ? "+" : "-"}
                  {t.amount} {t.asset}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">@ ${t.price.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
 
