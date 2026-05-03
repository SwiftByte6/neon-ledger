import { useEffect, useRef, useState } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--x", `${e.clientX}px`);
      ref.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          "radial-gradient(420px circle at var(--x,50%) var(--y,50%), rgba(212,255,63,0.08), transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

export function Particles({ count = 28 }: { count?: number }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1,
      d: Math.random() * 14 + 10,
      delay: Math.random() * -20,
      green: Math.random() > 0.5,
    })),
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            backgroundColor: p.green ? "rgba(212,255,63,0.6)" : "rgba(255,255,255,0.4)",
            boxShadow: p.green ? "0 0 8px rgba(212,255,63,0.7)" : "0 0 6px rgba(255,255,255,0.3)",
            animation: `float-slow ${p.d}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
