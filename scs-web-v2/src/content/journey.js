const S = "/solutions";
const IBP = "/platforms/scai/ibp";
const RISK = "/platforms/scai/risk-management";
const AGENTS = "/platforms/outcome-as-a-service/agentic-ai";
const ITMS = "/platforms/outcome-as-a-service/itms";
const SERVICES = "/supply-chain-execution-services";

/** The five value-chain stages V2 uses as its primary storytelling and filtering axis. */
export const stages = [
  {
    id: "plan",
    label: "Plan",
    icon: "lineChart",
    title: "Sense demand before it shows up in orders",
    description:
      "Self-learning forecasts blend orders, promotions, market and weather signals, then flow into one governed S&OP plan that sales, supply and finance all sign.",
    metric: { value: "15-25%", label: "Better forecast accuracy" },
    agent: "Demand Scout",
    mock: "forecast",
    links: [
      { title: "Demand Planning", href: `${S}/demand-planning` },
      { title: "S&OP", href: `${S}/s-and-op` },
      { title: "Integrated Business Planning", href: IBP },
      { title: "Scenario Simulation", href: `${S}/scenario-simulation` },
    ],
  },
  {
    id: "source",
    label: "Source",
    icon: "boxes",
    title: "Hold less stock and run out less often",
    description:
      "Constraint-aware supply, replenishment and material plans balance service against working capital, while agents watch every supplier for early signs of risk.",
    metric: { value: "10-15%", label: "Less inventory" },
    agent: "Supply Sentinel",
    mock: "suppliers",
    links: [
      { title: "Supply Planning", href: `${S}/supply-planning` },
      { title: "Material Requirement Planning", href: `${S}/material-requirement-planning` },
      { title: "Replenishment Planning", href: `${IBP}/supply-planning/replenishment-planning` },
      { title: "Supply Sentinel", href: `${AGENTS}/planning-agents/supply-sentinel` },
    ],
  },
  {
    id: "make",
    label: "Make",
    icon: "factory",
    title: "Schedules that respect the real plant",
    description:
      "Finite-capacity production plans and sequence-optimised schedules, stress-tested on a digital twin and kept honest week to week through S&OE.",
    metric: { value: "20-35%", label: "More planner productivity" },
    agent: "Mitigation Planner",
    mock: "schedule",
    links: [
      {
        title: "Production Planning & Scheduling",
        href: `${S}/production-planning-and-detailed-scheduling`,
      },
      { title: "Digital Twin", href: `${S}/digital-twin` },
      { title: "S&OE", href: `${S}/s-and-oe` },
      { title: "Mitigation Planner", href: `${AGENTS}/planning-agents/mitigation-planner` },
    ],
  },
  {
    id: "move",
    label: "Move",
    icon: "truck",
    title: "Fuller trucks, better carriers, lower freight",
    description:
      "iTMS builds optimal loads and routes, tenders to the right carriers and orchestrates every pickup, backed by 4PL teams when you want it run for you.",
    metric: { value: "8-15%", label: "Lower freight cost" },
    agent: "Execution Agents",
    mock: "routes",
    links: [
      { title: "Logistics Planning & Orchestration", href: `${S}/logistics-planning-and-orchestration` },
      { title: "Dispatch Planning & Operations", href: `${ITMS}/dispatch-planning-and-operations` },
      { title: "Transportation Planning (4PL)", href: `${SERVICES}/4pl/transportation-planning` },
      { title: "Execution Agents", href: `${AGENTS}/execution-agents` },
    ],
  },
  {
    id: "deliver",
    label: "Deliver",
    icon: "packageCheck",
    title: "Every promise kept, and proven",
    description:
      "Real-time tracking with predictive ETAs, a 24/7 control tower that resolves exceptions, and paperwork from e-POD to invoice handled automatically.",
    metric: { value: "8-10%", label: "Lower carbon emissions" },
    agent: "Control Tower team",
    mock: "tracking",
    links: [
      { title: "Real-Time Visibility & Tracking", href: `${ITMS}/real-time-visibility-and-tracking` },
      { title: "Control Tower & Orchestration", href: `${S}/control-tower-and-digital-orchestration` },
      {
        title: "Documentation & Compliance",
        href: `${ITMS}/documentation-and-compliance-automation`,
      },
      {
        title: "Reverse Logistics",
        href: `${SERVICES}/4pl/reverse-logistics-orchestration`,
      },
    ],
  },
];

export const foundation = {
  id: "foundation",
  label: "Data & AI",
  icon: "database",
};

/** Which journey stage(s) each sitemap slug belongs to; drives the hub page filters. */
const stageSlugs = {
  plan: [
    "demand-planning",
    "s-and-op",
    "scenario-simulation",
    "ibp",
    "scai",
    "demand-scout",
    "analyst-agents",
  ],
  source: [
    "supply-planning",
    "material-requirement-planning",
    "raw-material-planning",
    "replenishment-planning",
    "supply-sentinel",
    "inventory-agent",
    "resilience-monitoring",
    "disruption-management",
    "risk-management",
  ],
  make: [
    "production-planning-and-detailed-scheduling",
    "digital-twin",
    "s-and-oe",
    "mitigation-planner",
    "multi-agentic-digital-orchestration",
    "planning-agents",
  ],
  move: [
    "logistics-planning-and-orchestration",
    "itms",
    "outcome-as-a-service",
    "dispatch-planning-and-operations",
    "execution-management",
    "order-management",
    "transportation-planning",
    "transport-management-system",
    "lsp-governance-and-freight-control",
    "distribution-management",
    "warehouse-management",
    "execution-agents",
    "integrated-logistics-services",
    "4pl",
  ],
  deliver: [
    "real-time-visibility-and-tracking",
    "documentation-and-compliance-automation",
    "documentation-and-compliance",
    "control-tower-and-visibility",
    "control-tower-and-digital-orchestration",
    "reverse-logistics-orchestration",
    "analytics-dashboard-and-reporting",
    "analytics-and-automation",
    "value-added-services",
  ],
  foundation: [
    "enterprise-data-management",
    "edm",
    "integration",
    "master-data-management",
    "data-health-and-analytics",
    "agentic-ai",
    "gauri",
  ],
};

export function stagesFor(slug) {
  return Object.entries(stageSlugs)
    .filter(([, slugs]) => slugs.includes(slug))
    .map(([id]) => id);
}

export const stageFilters = [...stages.map(({ id, label, icon }) => ({ id, label, icon })), foundation];
