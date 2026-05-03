// Mock data generators for crypto dashboard
export type Asset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  spark: number[];
  color: string;
};

export type Tx = {
  id: string;
  type: "buy" | "sell";
  asset: string;
  amount: number;
  price: number;
  time: string;
};

export type News = {
  id: string;
  title: string;
  source: string;
  time: string;
  image: string;
  tag: string;
};

const seedRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const buildSeries = (len: number, base = 100, vol = 4, seed = 7) => {
  const r = seedRandom(seed);
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (r() - 0.48) * vol;
    out.push(+v.toFixed(2));
  }
  return out;
};

export const buildCandles = (len: number, base = 64000, seed = 13) => {
  const r = seedRandom(seed);
  const out: { o: number; h: number; l: number; c: number }[] = [];
  let prev = base;
  for (let i = 0; i < len; i++) {
    const o = prev;
    const dir = r() > 0.5 ? 1 : -1;
    const c = o + dir * r() * 600;
    const h = Math.max(o, c) + r() * 300;
    const l = Math.min(o, c) - r() * 300;
    out.push({ o, h, l, c });
    prev = c;
  }
  return out;
};

export const assets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 64231.42, change: 2.34, spark: buildSeries(40, 100, 3, 1), color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", price: 3128.7, change: 4.12, spark: buildSeries(40, 100, 4, 2), color: "#8A92B2" },
  { symbol: "SOL", name: "Solana", price: 152.31, change: -1.23, spark: buildSeries(40, 100, 5, 3), color: "#14F195" },
  { symbol: "AVAX", name: "Avalanche", price: 41.05, change: 0.84, spark: buildSeries(40, 100, 4, 4), color: "#E84142" },
  { symbol: "LINK", name: "Chainlink", price: 18.92, change: -0.42, spark: buildSeries(40, 100, 3, 5), color: "#2A5ADA" },
  { symbol: "ARB", name: "Arbitrum", price: 1.27, change: 6.78, spark: buildSeries(40, 100, 6, 6), color: "#28A0F0" },
];

export const transactions: Tx[] = [
  { id: "t1", type: "buy", asset: "BTC", amount: 0.214, price: 64120.1, time: "2m ago" },
  { id: "t2", type: "sell", asset: "ETH", amount: 1.5, price: 3142.0, time: "18m ago" },
  { id: "t3", type: "buy", asset: "SOL", amount: 22.4, price: 151.4, time: "1h ago" },
  { id: "t4", type: "buy", asset: "ARB", amount: 540, price: 1.21, time: "3h ago" },
  { id: "t5", type: "sell", asset: "AVAX", amount: 12.8, price: 41.6, time: "Yesterday" },
];

export const news: News[] = [
  {
    id: "n1",
    title: "Bitcoin reclaims $64K as ETF inflows hit weekly record",
    source: "CoinDesk",
    time: "12m",
    tag: "Markets",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "n2",
    title: "Ethereum Dencun upgrade slashes L2 fees by 95%",
    source: "The Block",
    time: "1h",
    tag: "Tech",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "n3",
    title: "Solana DEX volume crosses $4B in 24 hours",
    source: "Decrypt",
    time: "3h",
    tag: "DeFi",
    image:
      "https://images.unsplash.com/photo-1639389016895-3611781efc46?auto=format&fit=crop&w=900&q=70",
  },
];

export const allocation = [
  { label: "BTC", value: 42, color: "#D4FF3F" },
  { label: "ETH", value: 26, color: "#9BE13B" },
  { label: "SOL", value: 14, color: "#5BD66B" },
  { label: "Stable", value: 12, color: "#2C9A8F" },
  { label: "Other", value: 6, color: "#3A4150" },
];
