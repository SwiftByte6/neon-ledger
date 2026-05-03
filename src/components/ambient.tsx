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

export function HeroSpotlight() {
  const ref = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1070, height: 893 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Scale the SVG based on screen size
      const scale = Math.min(screenWidth / 1200, 1.2);
      setDimensions({
        width: 1070 * scale,
        height: 893 * scale,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <svg
      ref={ref}
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 1070 893"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none fixed top-0 right-0 z-10 opacity-60 md:opacity-80"
      style={{
        filter: "drop-shadow(0 0 80px rgba(212, 255, 63, 0.1))",
      }}
      aria-hidden
    >
      <g opacity="0.12">
        <defs>
          <filter id="filter0_f_24_53" x="65.7" y="-99.2" width="1108.45" height="914.701" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="56.85" result="effect1_foregroundBlur_24_53" />
          </filter>
          <filter id="filter1_f_24_53" x="3.05176e-05" y="-319.9" width="1405.85" height="1212.1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="131.2" result="effect1_foregroundBlur_24_53" />
          </filter>
        </defs>
        <g filter="url(#filter0_f_24_53)">
          <path
            d="M1059.95 15H939.949C847.949 99.6667 659.949 269.8 643.949 273C627.949 276.2 365.283 306.333 235.949 321L179.949 527L279.949 651V491L663.949 421L451.949 553L553.949 701L1059.95 149V15Z"
            fill="#D4FF3F"
          />
          <path
            d="M1059.95 15H939.949C847.949 99.6667 659.949 269.8 643.949 273C627.949 276.2 365.283 306.333 235.949 321L179.949 527L279.949 651V491L663.949 421L451.949 553L553.949 701L1059.95 149V15Z"
            stroke="#D4FF3F"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter1_f_24_53)">
          <path
            d="M1142.95 -57H1022.95C930.949 27.6667 742.949 197.8 726.949 201C710.949 204.2 448.283 234.333 318.949 249L262.949 455L362.949 579V419L746.949 349L534.949 481L636.949 629L1142.95 77V-57Z"
            fill="white"
            opacity="0.08"
          />
          <path
            d="M1142.95 -57H1022.95C930.949 27.6667 742.949 197.8 726.949 201C710.949 204.2 448.283 234.333 318.949 249L262.949 455L362.949 579V419L746.949 349L534.949 481L636.949 629L1142.95 77V-57Z"
            stroke="#D4FF3F"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      </g>
    </svg>
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
 
