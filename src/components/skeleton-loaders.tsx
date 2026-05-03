import { cn } from "@/lib/utils";

export function SkeletonChart() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-7 w-12 bg-gradient-to-r from-white/10 to-white/5 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
      <div className="h-64 bg-gradient-to-b from-lime-500/10 to-transparent rounded-lg animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>
      <div className="flex gap-2">
        <div className="h-3 flex-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full animate-pulse" />
        <div className="h-3 flex-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full animate-pulse" />
        <div className="h-3 flex-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
          <div className="h-6 w-32 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
        </div>
        <div className="h-8 w-16 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
      </div>
      <div className="space-y-2 mt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-white/10 to-white/5 animate-pulse">
      <div className="space-y-2 flex-1">
        <div className="h-3 w-24 bg-white/20 rounded animate-pulse" />
        <div className="h-2 w-16 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="h-6 w-20 bg-white/20 rounded animate-pulse" />
    </div>
  );
}

export function SkeletonGrid({ count = 6, cols = 2 }) {
  return (
    <div className={`grid grid-cols-${cols} gap-3`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 space-y-2">
          <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
          <div className="h-6 w-28 bg-white/20 rounded animate-pulse" />
          <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonLines({ lines = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="h-3 rounded-full animate-pulse" style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
          width: `${90 - Math.random() * 20}%`,
        }} />
      ))}
    </div>
  );
}

// Add shimmer animation keyframe
const shimmerStyle = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

export function ShimmerStyles() {
  return <style>{shimmerStyle}</style>;
}
 
