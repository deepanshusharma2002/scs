const S = "/solutions";
const SCAI = "/platforms/scai";
const AGENTS = "/platforms/outcome-as-a-service/agentic-ai";
const ITMS = "/platforms/outcome-as-a-service/itms";

/** Problem-first entry points: each maps a pain the buyer recognises to the modules that fix it. */
export const challenges = [
  {
    id: "forecast",
    icon: "lineChart",
    problem: "Our forecasts keep missing",
    symptom:
      "Planners override the numbers every cycle and still get caught out by promotions, launches and channel shifts.",
    fix: "Self-learning demand sensing picks the best model for every SKU-location and explains its drivers.",
    outcome: { value: "15-25%", label: "Improvement in forecast accuracy" },
    stage: "plan",
    links: [
      { title: "Demand Planning", href: `${S}/demand-planning` },
      { title: "Demand Scout agent", href: `${AGENTS}/planning-agents/demand-scout` },
      { title: "S&OP", href: `${S}/s-and-op` },
    ],
  },
  {
    id: "inventory",
    icon: "boxes",
    problem: "Too much stock, and we still stock out",
    symptom:
      "Working capital is tied up in the wrong SKUs at the wrong locations while fast movers run dry.",
    fix: "Dynamic safety stock and multi-echelon replenishment put inventory where demand will be.",
    outcome: { value: "10-15%", label: "Reduction in inventory" },
    stage: "source",
    links: [
      { title: "Supply Planning", href: `${S}/supply-planning` },
      { title: "Replenishment Planning", href: `${SCAI}/ibp/supply-planning/replenishment-planning` },
      { title: "Inventory Agent", href: `${AGENTS}/planning-agents/inventory-agent` },
    ],
  },
  {
    id: "disruption",
    icon: "siren",
    problem: "Disruptions reach customers before we react",
    symptom:
      "Supplier delays and port congestion surface in emails days late, and the response is improvised.",
    fix: "Early-warning signals, digital-twin impact analysis and governed playbooks align teams in minutes.",
    outcome: { value: "2x", label: "Faster response to disruptions" },
    stage: "make",
    links: [
      {
        title: "Control Tower & Orchestration",
        href: `${S}/control-tower-and-digital-orchestration`,
      },
      { title: "Disruption Management", href: `${SCAI}/risk-management/disruption-management` },
      { title: "Mitigation Planner", href: `${AGENTS}/planning-agents/mitigation-planner` },
    ],
  },
  {
    id: "freight",
    icon: "truck",
    problem: "Freight costs keep climbing",
    symptom: "Part loads, spot rates and unaudited invoices quietly leak margin on every lane.",
    fix: "Load building, carrier selection and automated freight audit run on one execution platform.",
    outcome: { value: "8-15%", label: "Reduction in freight cost" },
    stage: "move",
    links: [
      { title: "Dispatch Planning & Operations", href: `${ITMS}/dispatch-planning-and-operations` },
      { title: "Logistics Planning", href: `${S}/logistics-planning-and-orchestration` },
      {
        title: "LSP Governance & Freight Control",
        href: "/supply-chain-execution-services/4pl/lsp-governance-and-freight-control",
      },
    ],
  },
  {
    id: "execution",
    icon: "workflow",
    problem: "Plans fall apart in execution",
    symptom: "The monthly plan is out of date by week two, and nobody owns the gap.",
    fix: "S&OE and execution agents close the loop between the plan and what is happening on the ground.",
    outcome: { value: "20-35%", label: "Improvement in planner productivity" },
    stage: "deliver",
    links: [
      { title: "S&OE", href: `${S}/s-and-oe` },
      { title: "Integrated Business Planning", href: `${SCAI}/ibp` },
      { title: "Execution Agents", href: `${AGENTS}/execution-agents` },
    ],
  },
  {
    id: "data",
    icon: "database",
    problem: "Our data isn't planning-ready",
    symptom: "Master data lives in five systems, and every planning model inherits its gaps.",
    fix: "Pre-built connectors, governed master data and continuous data-health scoring.",
    outcome: { value: "100+", label: "Pre-built connectors" },
    stage: "foundation",
    links: [
      { title: "Enterprise Data Management", href: `${S}/enterprise-data-management` },
      { title: "Master Data Management", href: `${SCAI}/edm/master-data-management` },
      { title: "Data Health & Analytics", href: `${SCAI}/edm/data-health-and-analytics` },
    ],
  },
];

/** Generic "why this matters" problems per theme for capability pages without bespoke copy. */
export const problemsByTheme = {
  planning: [
    {
      title: "Spreadsheet planning drifts",
      body: "Plans built offline are out of date the moment they are shared, and nobody trusts the version they are looking at.",
      icon: "fileText",
    },
    {
      title: "Functions plan to different numbers",
      body: "Sales, supply and finance each keep their own plan, so trade-offs are argued in meetings instead of modelled.",
      icon: "users",
    },
    {
      title: "Constraints are discovered too late",
      body: "Capacity, lead-time and shelf-life limits surface in execution, when the only options left are expensive.",
      icon: "siren",
    },
  ],
  risk: [
    {
      title: "Signals arrive late",
      body: "Supplier, port and weather risks are buried in emails and portals until they are already causing shortages.",
      icon: "radar",
    },
    {
      title: "Impact is unclear",
      body: "Without a network model, nobody can say which customers, orders or revenue a disruption puts at risk.",
      icon: "layers",
    },
    {
      title: "Responses are improvised",
      body: "Each disruption triggers a new firefight instead of a governed, pre-approved playbook.",
      icon: "listChecks",
    },
  ],
  data: [
    {
      title: "Data is scattered",
      body: "Products, locations and partners are defined differently across ERP, WMS, TMS and spreadsheets.",
      icon: "database",
    },
    {
      title: "Quality issues hide in plans",
      body: "Missing lead times and wrong units of measure silently distort every forecast and supply plan.",
      icon: "scanSearch",
    },
    {
      title: "Integrations are brittle",
      body: "Point-to-point interfaces break on every upgrade and take months to rebuild.",
      icon: "plug",
    },
  ],
  agentic: [
    {
      title: "Planners drown in exceptions",
      body: "Hundreds of alerts a day, most of them routine, crowd out the decisions that actually need judgement.",
      icon: "siren",
    },
    {
      title: "Automation without guardrails",
      body: "Rules-based automation breaks on edge cases, and black-box AI is hard to trust or audit.",
      icon: "shieldAlert",
    },
    {
      title: "Insight never becomes action",
      body: "Dashboards tell you what went wrong; nobody closes the loop and acts on it.",
      icon: "zap",
    },
  ],
  logistics: [
    {
      title: "Freight leaks margin",
      body: "Part loads, spot-rate bookings and unaudited invoices add cost on every lane.",
      icon: "trendingUp",
    },
    {
      title: "No single view of shipments",
      body: "Status lives in carrier portals, calls and spreadsheets, so customers hear about delays first.",
      icon: "mapPin",
    },
    {
      title: "Paperwork slows everything",
      body: "PODs, e-way bills and invoices are chased manually, delaying billing and settlement.",
      icon: "fileCheck",
    },
  ],
  services: [
    {
      title: "Too many partners to govern",
      body: "Carriers, warehouses and 3PLs each report differently, with no consistent SLAs or scorecards.",
      icon: "handshake",
    },
    {
      title: "Exceptions after hours",
      body: "Disruptions don't keep office hours, and in-house teams can't watch the network 24/7.",
      icon: "siren",
    },
    {
      title: "Scaling needs headcount",
      body: "Every new market or channel means hiring and training another logistics team.",
      icon: "users",
    },
  ],
};
