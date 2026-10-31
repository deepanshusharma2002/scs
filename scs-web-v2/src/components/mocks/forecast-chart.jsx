import { cn } from "@/lib/utils";

const actual = [52, 58, 55, 63, 61, 70, 66, 74];
const forecast = [50, 57, 57, 62, 63, 68, 68, 73, 77, 75, 81, 86];
const W = 320;
const H = 130;
const PAD = 8;

const x = (index) => PAD + (index * (W - PAD * 2)) / (forecast.length - 1);
const y = (value) => H - PAD - ((value - 40) / 55) * (H - PAD * 2);
const line = (values) => values.map((value, index) => `${index ? "L" : "M"}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");

const split = actual.length - 1;
const upper = forecast.map((value, index) => (index < split ? value : value + (index - split) * 2.2));
const lower = forecast.map((value, index) => (index < split ? value : value - (index - split) * 2.2));

function bandPath() {
  const top = upper.slice(split).map((value, offset) => `${x(split + offset).toFixed(1)} ${y(value).toFixed(1)}`);
  const bottom = lower
    .slice(split)
    .map((value, offset) => `${x(split + offset).toFixed(1)} ${y(value).toFixed(1)}`)
    .reverse();
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}

/** Actual vs AI forecast with a widening confidence band; lines draw in on mount. */
export function ForecastChart({ className, animate = true }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} aria-hidden>
      {[0, 1, 2, 3].map((row) => (
        <line
          key={row}
          x1={PAD}
          x2={W - PAD}
          y1={PAD + (row * (H - PAD * 2)) / 3}
          y2={PAD + (row * (H - PAD * 2)) / 3}
          className="stroke-navy-900/6"
          strokeDasharray="2 3"
        />
      ))}
      <line x1={x(split)} x2={x(split)} y1={PAD} y2={H - PAD} className="stroke-navy-900/15" strokeDasharray="3 3" />
      <text x={x(split) + 4} y={PAD + 8} className="fill-navy-400 font-mono text-[7px]">
        TODAY
      </text>
      <path d={bandPath()} className={cn("fill-azure-500/12", animate && "animate-fade-in [animation-delay:1.2s]")} />
      <path
        d={line(forecast)}
        pathLength={1}
        strokeDasharray="1"
        className={cn("fill-none stroke-azure-500", animate && "animate-draw")}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={line(actual)}
        pathLength={1}
        strokeDasharray="1"
        className={cn("fill-none stroke-navy-900", animate && "animate-draw [animation-delay:0.3s]")}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={x(split)} cy={y(actual[split])} r={3.5} className="fill-white stroke-navy-900" strokeWidth={2} />
      <circle cx={x(forecast.length - 1)} cy={y(forecast.at(-1))} r={3} className="fill-azure-500" />
    </svg>
  );
}

export function ChartLegend({ className }) {
  return (
    <div className={cn("flex items-center gap-4 font-mono text-[0.625rem] text-navy-500 uppercase", className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-3 rounded bg-navy-900" /> Actual
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-3 rounded bg-azure-500" /> AI forecast
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-3 rounded-sm bg-azure-500/15" /> Confidence
      </span>
    </div>
  );
}
