import { useMemo } from "react";

type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: boolean;
  glow?: boolean;
  className?: string;
};

export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = "currentColor",
  fill = false,
  glow = false,
  className,
}: Props) {
  const { d, area } = useMemo(() => {
    if (data.length < 2) return { d: "", area: "" };
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);
    const pts = data.map((v, i) => [i * step, height - ((v - min) / range) * height] as const);
    const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
    const area = `${d} L${width},${height} L0,${height} Z`;
    return { d, area };
  }, [data, width, height]);

  const id = useMemo(() => `sl-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ color: stroke, overflow: "visible" }}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${id})`} />}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={glow ? { filter: `drop-shadow(0 0 6px ${stroke})` } : undefined}
      />
    </svg>
  );
}
 
