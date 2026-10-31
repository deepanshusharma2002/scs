import { mapBox, project, worldDots } from "@/components/visuals/world-dots";

const hub = { label: "India HQ", coords: [77, 22] };
const regions = [
  { label: "Europe", coords: [10, 50] },
  { label: "Middle East", coords: [54, 24] },
  { label: "APAC", coords: [104, 1] },
  { label: "North America", coords: [-80, 40] },
];

// One path of zero-length round-capped segments is far lighter than thousands of <circle> nodes.
const dotPath = worldDots.map(([x, y]) => `M${x} ${y}h0`).join("");

function arc(from, to) {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const lift = Math.min(26, Math.hypot(x2 - x1, y2 - y1) * 0.32);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${(Math.min(y1, y2) - lift).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/** Light, blueprint-style world map with routes from the India hub to each region. */
export function PresenceMap() {
  const [hx, hy] = project(hub.coords);
  return (
    <svg
      viewBox={`0 ${mapBox.top} ${mapBox.width} ${mapBox.height}`}
      className="h-auto w-full"
      role="img"
      aria-label="3SC global presence: India headquarters serving Europe, the Middle East, APAC and North America"
    >
      <path d={dotPath} className="stroke-navy-900/15" strokeWidth={0.8} strokeLinecap="round" fill="none" />
      {regions.map((region, index) => {
        const d = arc(hub.coords, region.coords);
        return (
          <g key={region.label}>
            <path d={d} fill="none" className="stroke-azure-500" strokeWidth={0.35} strokeDasharray="1.2 1.2" style={{ animation: "flow 2s linear infinite" }} />
            <circle r={0.9} className="fill-signal-500" style={{ offsetPath: `path("${d}")`, animation: `travel 3.4s ${index * 0.7}s ease-in-out infinite` }} />
          </g>
        );
      })}
      {regions.map((region) => {
        const [x, y] = project(region.coords);
        return (
          <g key={`node-${region.label}`}>
            <circle cx={x} cy={y} r={2.2} className="fill-azure-500/20" />
            <circle cx={x} cy={y} r={0.95} className="fill-azure-600" />
            <text x={x} y={y - 3} textAnchor="middle" className="fill-navy-800 text-[2.8px] font-semibold">
              {region.label}
            </text>
          </g>
        );
      })}
      <circle cx={hx} cy={hy} r={3.2} className="fill-signal-500/25" />
      <circle cx={hx} cy={hy} r={1.4} className="fill-signal-500" />
      <text x={hx} y={hy + 5.5} textAnchor="middle" className="fill-navy-950 text-[2.8px] font-bold">
        {hub.label}
      </text>
    </svg>
  );
}
