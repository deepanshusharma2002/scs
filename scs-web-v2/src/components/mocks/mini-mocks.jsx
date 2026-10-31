import { Bot, Check, CircleAlert, Clock, Leaf, Sparkles, Truck } from "lucide-react";
import { ChartLegend, ForecastChart } from "@/components/mocks/forecast-chart";
import { AppWindow } from "@/components/ui/app-window";
import { Chip } from "@/components/ui/chip";
import { stagesFor } from "@/content/journey";
import { cn } from "@/lib/utils";

function Metric({ label, value, tone = "navy" }) {
  return (
    <div className="rounded-lg border border-navy-900/8 bg-navy-50/50 px-3 py-2">
      <p className="font-mono text-[0.625rem] tracking-wide text-navy-500 uppercase">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-display text-base font-bold",
          tone === "green" && "text-emerald-700",
          tone === "azure" && "text-azure-600",
          tone === "signal" && "text-signal-600",
          tone === "navy" && "text-navy-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ForecastMock({ title = "Demand · Consensus plan" }) {
  return (
    <AppWindow title={title} meta="Wk 44" live>
      <ChartLegend className="mb-2" />
      <ForecastChart />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Accuracy" value="87.4%" tone="green" />
        <Metric label="Bias" value="+1.2%" />
        <Metric label="Consensus" value="3 / 3" tone="azure" />
      </div>
    </AppWindow>
  );
}

const suppliers = [
  { name: "Supplier A · Pune", risk: 18, level: "Low", tone: "green" },
  { name: "Supplier B · Chennai", risk: 82, level: "High", tone: "signal", note: "Resin shortage" },
  { name: "Supplier C · Vadodara", risk: 41, level: "Med", tone: "amber" },
  { name: "Supplier D · Jebel Ali", risk: 23, level: "Low", tone: "green" },
];

function SuppliersMock({ title = "Supply Sentinel · Supplier risk" }) {
  return (
    <AppWindow title={title} meta="4 tiers" live>
      <ul className="space-y-2.5">
        {suppliers.map((supplier, index) => (
          <li key={supplier.name} className="animate-rise" style={{ animationDelay: `${index * 120}ms` }}>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-navy-800">{supplier.name}</span>
              <Chip tone={supplier.tone}>{supplier.level}</Chip>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-100">
              <div
                className={cn(
                  "h-full origin-left animate-grow-x rounded-full",
                  supplier.tone === "signal" && "bg-signal-500",
                  supplier.tone === "amber" && "bg-amber-400",
                  supplier.tone === "green" && "bg-emerald-500",
                )}
                style={{ width: `${supplier.risk}%`, animationDelay: `${200 + index * 120}ms` }}
              />
            </div>
            {supplier.note && (
              <p className="mt-1 flex items-center gap-1 text-[0.6875rem] text-signal-600">
                <CircleAlert className="size-3" aria-hidden /> {supplier.note} · Plant 2 impacted Thu
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Inventory cover" value="31 days" />
        <Metric label="Service level" value="98.2%" tone="green" />
      </div>
    </AppWindow>
  );
}

const lines = [
  [
    { start: 0, span: 30, label: "1L · Mango", tone: "azure" },
    { start: 32, span: 8, change: true },
    { start: 40, span: 38, label: "1L · Orange", tone: "azure" },
  ],
  [
    { start: 0, span: 46, label: "500ml · Cola", tone: "navy" },
    { start: 48, span: 40, label: "500ml · Lime", tone: "navy" },
  ],
  [
    { start: 6, span: 22, label: "2L · Cola", tone: "cyan" },
    { start: 28, span: 6, change: true },
    { start: 34, span: 30, label: "2L · Soda", tone: "cyan" },
  ],
  [
    { start: 0, span: 18, label: "Pack", tone: "navy" },
    { start: 20, span: 52, label: "Resequenced by agent", tone: "signal" },
  ],
];

function ScheduleMock({ title = "Plant 2 · Detailed schedule" }) {
  return (
    <AppWindow title={title} meta="Finite capacity">
      <div className="mb-2 flex justify-between pl-14 font-mono text-[0.625rem] text-navy-400">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
      </div>
      <div className="relative space-y-2">
        <span className="absolute top-0 bottom-0 left-[46%] z-10 w-px bg-signal-500" aria-hidden />
        {lines.map((blocks, row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-12 shrink-0 font-mono text-[0.625rem] text-navy-500">LINE {row + 1}</span>
            <div className="relative h-7 flex-1 rounded-md bg-navy-50">
              {blocks.map((block, index) => (
                <span
                  key={index}
                  className={cn(
                    "absolute top-0.5 bottom-0.5 origin-left animate-grow-x truncate rounded px-1.5 text-[0.625rem] leading-6 font-medium",
                    block.change &&
                      "bg-[repeating-linear-gradient(135deg,rgb(11_21_48/0.12)_0_3px,transparent_3px_6px)]",
                    block.tone === "azure" && "bg-azure-500 text-white",
                    block.tone === "navy" && "bg-navy-800 text-white",
                    block.tone === "cyan" && "bg-cyan-400 text-navy-950",
                    block.tone === "signal" && "bg-signal-500 text-white",
                  )}
                  style={{
                    left: `${block.start}%`,
                    width: `${block.span}%`,
                    animationDelay: `${row * 150 + index * 100}ms`,
                  }}
                >
                  {block.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Utilisation" value="91%" tone="green" />
        <Metric label="Changeovers" value="−3" tone="azure" />
        <Metric label="Late orders" value="0" />
      </div>
    </AppWindow>
  );
}

const stops = [
  { x: 40, y: 92, label: "DC" },
  { x: 120, y: 40 },
  { x: 190, y: 70 },
  { x: 250, y: 30 },
  { x: 150, y: 120 },
  { x: 240, y: 118 },
];

function RoutesMock({ title = "Dispatch · Load plan" }) {
  const routeA = "M40 92 C 80 60, 100 40, 120 40 S 170 70, 190 70 S 240 35, 250 30";
  const routeB = "M40 92 C 90 120, 120 125, 150 120 S 215 116, 240 118";
  return (
    <AppWindow title={title} meta="22 orders → 9 loads">
      <svg viewBox="0 0 290 150" className="h-auto w-full rounded-lg bg-navy-50/70" aria-hidden>
        <g className="fill-navy-900/10">
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 20 }).map((__, col) => (
              <circle key={`${row}-${col}`} cx={8 + col * 14.5} cy={8 + row * 12} r={0.8} />
            )),
          )}
        </g>
        <path d={routeA} className="fill-none stroke-azure-500" strokeWidth={2.2} strokeDasharray="5 5" style={{ animation: "flow 1.4s linear infinite" }} />
        <path d={routeB} className="fill-none stroke-cyan-500" strokeWidth={2.2} strokeDasharray="5 5" style={{ animation: "flow 1.4s linear infinite" }} />
        {stops.map((stop, index) => (
          <g key={index}>
            <circle cx={stop.x} cy={stop.y} r={stop.label ? 7 : 4.5} className={stop.label ? "fill-navy-900" : "fill-white stroke-navy-900"} strokeWidth={1.5} />
            {stop.label && (
              <text x={stop.x} y={stop.y + 2.5} textAnchor="middle" className="fill-white font-mono text-[6px] font-bold">
                {stop.label}
              </text>
            )}
          </g>
        ))}
        <circle r={4} className="fill-signal-500" style={{ offsetPath: `path("${routeA}")`, animation: "travel 5s linear infinite" }} />
        <circle r={4} className="fill-signal-500" style={{ offsetPath: `path("${routeB}")`, animation: "travel 4s 1s linear infinite" }} />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Fill rate" value="94%" tone="green" />
        <Metric label="Cost / trip" value="−11%" tone="azure" />
        <Metric label="CO₂e" value="−8.6%" />
      </div>
    </AppWindow>
  );
}

const milestones = [
  { label: "Picked up · Bhiwandi DC", time: "06:40", done: true },
  { label: "In transit · NH48", time: "09:15", done: true },
  { label: "Out for delivery", time: "13:05", live: true },
  { label: "e-POD & invoice", time: "ETA 14:20" },
];

function TrackingMock({ title = "Shipment SH-20418" }) {
  return (
    <AppWindow title={title} meta="Tracking" live>
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="green">
          <Clock className="size-3" aria-hidden /> ETA 14:20 · On time
        </Chip>
        <Chip tone="cyan">
          <Leaf className="size-3" aria-hidden /> 182 kg CO₂e
        </Chip>
      </div>
      <ol className="mt-4 space-y-0">
        {milestones.map((step, index) => (
          <li key={step.label} className="relative flex gap-3 pb-4 last:pb-0 animate-rise" style={{ animationDelay: `${index * 150}ms` }}>
            {index < milestones.length - 1 && (
              <span className={cn("absolute top-5 left-[9px] h-[calc(100%-12px)] w-0.5", step.done ? "bg-emerald-500" : "bg-navy-100")} aria-hidden />
            )}
            <span
              className={cn(
                "relative z-10 grid size-5 shrink-0 place-items-center rounded-full border-2",
                step.done && "border-emerald-500 bg-emerald-500 text-white",
                step.live && "border-signal-500 bg-white",
                !step.done && !step.live && "border-navy-200 bg-white",
              )}
            >
              {step.done && <Check className="size-3" aria-hidden />}
              {step.live && <Truck className="size-2.5 text-signal-600" aria-hidden />}
            </span>
            <div className="flex flex-1 items-center justify-between gap-3 text-xs">
              <span className={cn("font-medium", step.done || step.live ? "text-navy-900" : "text-navy-400")}>{step.label}</span>
              <span className="font-mono text-[0.625rem] text-navy-500">{step.time}</span>
            </div>
          </li>
        ))}
      </ol>
    </AppWindow>
  );
}

const nodes = [
  { x: 30, y: 70, label: "S-B", alert: true },
  { x: 30, y: 25, label: "S-A" },
  { x: 30, y: 115, label: "S-C" },
  { x: 120, y: 45, label: "P1" },
  { x: 120, y: 100, label: "P2", alert: true },
  { x: 210, y: 30, label: "DC-N" },
  { x: 210, y: 75, label: "DC-W" },
  { x: 210, y: 120, label: "DC-S", alert: true },
  { x: 275, y: 75, label: "CUST" },
];
const edges = [
  [0, 4, true], [1, 3], [2, 4], [0, 3], [3, 5], [3, 6], [4, 6], [4, 7, true], [5, 8], [6, 8], [7, 8, true],
];

function RiskMock({ title = "Digital twin · Disruption impact" }) {
  return (
    <AppWindow title={title} meta="Simulated" live>
      <svg viewBox="0 0 300 145" className="h-auto w-full" aria-hidden>
        {edges.map(([from, to, alert], index) => (
          <line
            key={index}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            className={alert ? "stroke-signal-500" : "stroke-navy-900/15"}
            strokeWidth={alert ? 2 : 1.2}
            strokeDasharray={alert ? "4 4" : undefined}
            style={alert ? { animation: "flow 1.2s linear infinite" } : undefined}
          />
        ))}
        {nodes.map((node) => (
          <g key={node.label}>
            {node.alert && <circle cx={node.x} cy={node.y} r={14} className="fill-signal-500/15" />}
            <circle cx={node.x} cy={node.y} r={10} className={node.alert ? "fill-signal-500" : "fill-white stroke-navy-900/30"} strokeWidth={1.2} />
            <text x={node.x} y={node.y + 2.5} textAnchor="middle" className={cn("font-mono text-[6px] font-bold", node.alert ? "fill-white" : "fill-navy-700")}>
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 rounded-lg border border-signal-500/25 bg-signal-50 p-3 text-xs">
        <p className="font-semibold text-signal-700">Port congestion · Supplier B</p>
        <p className="mt-0.5 text-navy-600">38 orders · $260K revenue at risk · recovery 4 days</p>
      </div>
    </AppWindow>
  );
}

const dataChecks = [
  { label: "Locations", score: 99 },
  { label: "Lead times", score: 97 },
  { label: "Units of measure", score: 91 },
  { label: "Supplier master", score: 84, warn: true },
];

function DataHealthMock({ title = "EDM · Data health" }) {
  return (
    <AppWindow title={title} meta="12 sources">
      <div className="flex items-end gap-4">
        <div>
          <p className="font-mono text-[0.625rem] text-navy-500 uppercase">Health score</p>
          <p className="font-display text-3xl font-extrabold text-navy-950">93.4</p>
        </div>
        <Chip tone="green" className="mb-1.5">+4.1 this month</Chip>
      </div>
      <ul className="mt-3 space-y-2.5">
        {dataChecks.map((check, index) => (
          <li key={check.label} className="text-xs">
            <div className="flex justify-between">
              <span className="text-navy-700">{check.label}</span>
              <span className={cn("font-mono", check.warn ? "text-amber-700" : "text-navy-500")}>{check.score}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-navy-100">
              <div
                className={cn("h-full origin-left animate-grow-x rounded-full", check.warn ? "bg-amber-400" : "bg-azure-500")}
                style={{ width: `${check.score}%`, animationDelay: `${index * 120}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["SAP S/4", "Oracle", "WMS", "TMS", "Excel"].map((source) => (
          <Chip key={source}>{source}</Chip>
        ))}
      </div>
    </AppWindow>
  );
}

function AgentMock({ title = "Gauri · Planning workspace" }) {
  return (
    <AppWindow title={title} meta="Governed" live bodyClassName="space-y-3 bg-navy-50/40">
      <div className="ml-auto max-w-[80%] animate-rise rounded-xl rounded-br-sm bg-navy-900 px-3 py-2 text-xs text-white">
        Which SKUs will stock out at West DC next week?
      </div>
      <div className="flex max-w-[92%] animate-rise gap-2 [animation-delay:300ms]">
        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-azure-600 text-white">
          <Bot className="size-3.5" aria-hidden />
        </span>
        <div className="rounded-xl rounded-tl-sm border border-navy-900/8 bg-white px-3 py-2 text-xs text-navy-700">
          <p>
            <strong className="text-navy-900">7 SKUs</strong> fall below safety stock by Thursday. Transferring
            from North DC covers 6 of them.
          </p>
          <div className="mt-2 rounded-lg border border-azure-500/20 bg-azure-50 p-2">
            <p className="flex items-center gap-1 font-semibold text-azure-700">
              <Sparkles className="size-3" aria-hidden /> Recommended transfer
            </p>
            <p className="mt-0.5 text-navy-600">2,350 cases · arrives Wed · service 98.4%</p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md bg-azure-600 px-2 py-1 text-[0.625rem] font-semibold text-white">Approve</span>
              <span className="rounded-md border border-navy-900/10 bg-white px-2 py-1 text-[0.625rem] font-semibold text-navy-700">Explain</span>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

const tickets = [
  { id: "EX-2291", title: "Carrier no-show · Lane PNQ→DEL", sla: "18m", tone: "signal", status: "Escalated" },
  { id: "EX-2288", title: "POD mismatch · Invoice 88412", sla: "1h 05m", tone: "amber", status: "In review" },
  { id: "EX-2284", title: "Temperature excursion · Reefer 12", sla: "Resolved", tone: "green", status: "Closed" },
  { id: "EX-2280", title: "Dock congestion · Bhiwandi DC", sla: "Resolved", tone: "green", status: "Closed" },
];

function TicketsMock({ title = "Control tower · Exception queue" }) {
  return (
    <AppWindow title={title} meta="24/7" live>
      <ul className="divide-y divide-navy-900/6">
        {tickets.map((ticket, index) => (
          <li key={ticket.id} className="flex animate-rise items-center gap-3 py-2.5 text-xs" style={{ animationDelay: `${index * 120}ms` }}>
            <span className="font-mono text-[0.625rem] text-navy-400">{ticket.id}</span>
            <span className="min-w-0 flex-1 truncate font-medium text-navy-800">{ticket.title}</span>
            <Chip tone={ticket.tone}>{ticket.status}</Chip>
            <span className="hidden w-14 text-right font-mono text-[0.625rem] text-navy-500 sm:block">{ticket.sla}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Open" value="12" />
        <Metric label="Within SLA" value="97%" tone="green" />
        <Metric label="MTTR" value="42m" tone="azure" />
      </div>
    </AppWindow>
  );
}

const mocks = {
  forecast: ForecastMock,
  suppliers: SuppliersMock,
  schedule: ScheduleMock,
  routes: RoutesMock,
  tracking: TrackingMock,
  risk: RiskMock,
  datahealth: DataHealthMock,
  agent: AgentMock,
  tickets: TicketsMock,
};

export function Mock({ kind, title, className }) {
  const Component = mocks[kind] ?? ForecastMock;
  return (
    <div className={className}>
      <Component title={title} />
    </div>
  );
}

const stageMock = { plan: "forecast", source: "suppliers", make: "schedule", move: "routes", deliver: "tracking" };
const themeMock = { agentic: "agent", data: "datahealth", risk: "risk" };
const fallbackMock = { services: "tickets", logistics: "routes", planning: "forecast" };

/** Picks the product mockup that best illustrates a sitemap node. */
export function mockFor(node, theme) {
  if (themeMock[theme]) return themeMock[theme];
  if (/control-tower/.test(node.slug)) return "tickets";
  const stage = stagesFor(node.slug).find((id) => stageMock[id]);
  return stage ? stageMock[stage] : (fallbackMock[theme] ?? "forecast");
}
