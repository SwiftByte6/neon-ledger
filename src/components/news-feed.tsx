import { news } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export function NewsFeed() {
  return (
    <section className="rounded-3xl glass p-5 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Market News</h3>
        <button className="text-xs text-muted-foreground hover:text-primary">More</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {news.map((n) => (
          <article
            key={n.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-[var(--surface-2)]/50 hover:border-primary/40 transition"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={n.image}
                alt={n.title}
                loading="lazy"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0" style={{ background: "var(--gradient-news)" }} />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-primary/90 text-primary-foreground font-semibold">
                {n.tag}
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition">
                {n.title}
              </h4>
              <div className="flex items-center justify-between mt-3 text-[11px] text-muted-foreground">
                <span>{n.source} · {n.time}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:text-primary transition" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
