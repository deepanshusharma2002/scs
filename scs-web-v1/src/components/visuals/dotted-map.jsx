import { cn } from "@/lib/utils";
import { mapBox, project, worldDots } from "./world-dots";

const hub = { label: "India HQ", coords: [77, 22] };

const regions = [
  { label: "Europe", coords: [10, 50] },
  { label: "Middle East", coords: [54, 24] },
  { label: "APAC", coords: [104, 1] },
  { label: "North America", coords: [-80, 40] },
];

function arcPath(from, to) {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const lift = Math.min(28, Math.hypot(x2 - x1, y2 - y1) * 0.35);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - lift;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export function DottedMap({ tone = "dark", className }) {
  const dark = tone === "dark";
  const [hx, hy] = project(hub.coords);

  return (
    <svg
      viewBox={`0 ${mapBox.top} ${mapBox.width} ${mapBox.height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="3SC global presence across Europe, the Middle East, APAC and North America"
    >
      <g className={dark ? "fill-white/18" : "fill-ink-900/15"}>
        {worldDots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={0.42} />
        ))}
      </g>

      {regions.map((region, index) => {
        const d = arcPath(hub.coords, region.coords);
        return (
          <g key={region.label}>
            <path d={d} fill="none" stroke="url(#arc)" strokeWidth={0.35} strokeDasharray="1.2 1.2" className="animate-dash" />
            <circle
              r={0.9}
              className="fill-brand-300"
              style={{
                offsetPath: `path("${d}")`,
                animation: `travel 3.2s ${index * 0.6}s cubic-bezier(0.45,0,0.55,1) infinite`,
              }}
            />
          </g>
        );
      })}

      {regions.map((region) => {
        const [x, y] = project(region.coords);
        return (
          <g key={`node-${region.label}`}>
            <circle cx={x} cy={y} r={2.4} className="fill-brand-500/25 animate-pulse" />
            <circle cx={x} cy={y} r={1} className="fill-brand-400" />
            <text
              x={x}
              y={y - 3}
              textAnchor="middle"
              className={cn("text-[3px] font-semibold", dark ? "fill-white/85" : "fill-ink-800")}
            >
              {region.label}
            </text>
          </g>
        );
      })}

      <circle cx={hx} cy={hy} r={3.2} className="fill-brand-500/30 animate-pulse" />
      <circle cx={hx} cy={hy} r={1.4} className="fill-brand-500" />

      <defs>
        <linearGradient id="arc" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff9f75" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e94f1c" />
        </linearGradient>
      </defs>
    </svg>
  );
}
