import { useState } from "react";
import { Link } from "@tanstack/react-router";

// Approx lat/lng for India coworking hubs
const CITIES: { name: string; lat: number; lng: number; spaces: number; reviews: number }[] = [
  { name: "Bangalore", lat: 12.97, lng: 77.59, spaces: 4, reviews: 22 },
  { name: "Mumbai", lat: 19.07, lng: 72.87, spaces: 3, reviews: 21 },
  { name: "Delhi NCR", lat: 28.61, lng: 77.20, spaces: 2, reviews: 17 },
  { name: "Pune", lat: 18.52, lng: 73.85, spaces: 2, reviews: 15 },
  { name: "Chennai", lat: 13.08, lng: 80.27, spaces: 2, reviews: 12 },
  { name: "Hyderabad", lat: 17.38, lng: 78.48, spaces: 2, reviews: 11 },
  { name: "Goa", lat: 15.49, lng: 73.82, spaces: 1, reviews: 10 },
  { name: "Gurugram", lat: 28.45, lng: 77.02, spaces: 1, reviews: 6 },
  { name: "Ahmedabad", lat: 23.02, lng: 72.57, spaces: 0, reviews: 0 },
  { name: "Jaipur", lat: 26.91, lng: 75.79, spaces: 0, reviews: 0 },
  { name: "Kolkata", lat: 22.57, lng: 88.36, spaces: 0, reviews: 0 },
  { name: "Noida", lat: 28.53, lng: 77.39, spaces: 0, reviews: 0 },
];

// India bounding box, roughly
const LAT_MIN = 6, LAT_MAX = 37;
const LNG_MIN = 68, LNG_MAX = 98;
const W = 500, H = 560;

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return { x, y };
}

// Simplified India silhouette path (approximate, for atmospheric backdrop)
const INDIA_PATH =
  "M180,60 C220,55 260,70 285,85 C310,95 330,115 345,140 C370,155 390,180 400,210 C415,235 420,265 415,295 C420,325 410,355 395,380 C380,410 355,435 325,455 C300,480 275,505 250,520 C220,530 195,520 180,495 C165,470 155,440 150,410 C140,380 135,345 130,310 C120,275 115,240 120,205 C125,170 140,135 155,105 C165,80 170,65 180,60 Z";

export function IndiaHeatmap() {
  const [hover, setHover] = useState<number | null>(null);
  const maxReviews = Math.max(...CITIES.map((c) => c.reviews), 1);

  return (
    <div className="glass rounded-3xl p-6 md:p-8 grid gap-6 md:grid-cols-[1fr,320px] items-center">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Map of coworking spaces across India">
          <defs>
            <radialGradient id="landGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="var(--iris-1)" stopOpacity="0.18" />
              <stop offset="60%" stopColor="var(--iris-2)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--iris-3)" stopOpacity="0.04" />
            </radialGradient>
            <radialGradient id="dotGrad">
              <stop offset="0%" stopColor="var(--iris-1)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--iris-2)" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <path d={INDIA_PATH} fill="url(#landGrad)" stroke="var(--iris-2)" strokeOpacity="0.35" strokeWidth="1.5" />
          {CITIES.map((c, i) => {
            const { x, y } = project(c.lat, c.lng);
            const scale = 0.35 + (c.reviews / maxReviews) * 0.65;
            const r = 10 + scale * 34;
            const active = hover === i;
            return (
              <g key={c.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                <circle cx={x} cy={y} r={r} fill="url(#dotGrad)" opacity={active ? 0.9 : 0.55}>
                  <animate attributeName="r" values={`${r};${r + 4};${r}`} dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={4 + scale * 3} fill="var(--iris-2)" />
                <text x={x + r + 4} y={y + 4} fontSize="11" fill="var(--foreground)" opacity={active ? 1 : 0.7} className="font-display" style={{ fontWeight: 600 }}>
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-iris">Live density map</div>
        <h3 className="mt-1 font-display text-2xl md:text-3xl">Where India works</h3>
        <p className="mt-2 text-sm text-muted-foreground">Hover a city to feel the pulse. Bubble size grows with review volume from real coworkers.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
          {CITIES.slice(0, 8).map((c, i) => (
            <button
              key={c.name}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`flex items-center justify-between rounded-lg px-3 py-2 border transition-colors text-left ${hover === i ? "border-primary bg-accent" : "border-border/50 hover:bg-accent/50"}`}
            >
              <span className="font-display">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.spaces} · {c.reviews}★</span>
            </button>
          ))}
        </div>
        <Link to="/spaces" className="mt-5 inline-block text-sm text-primary hover:underline">Browse all spaces →</Link>
      </div>
    </div>
  );
}
