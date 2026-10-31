const SCAI = "/platforms/scai";
const OAAS = "/platforms/outcome-as-a-service";
const SERVICES = "/supply-chain-execution-services";

/** The 3SC platform drawn as one layered architecture, top (outcomes) to bottom (data). */
export const stackLayers = [
  {
    id: "services",
    label: "Services",
    title: "Supply Chain Execution Services",
    summary:
      "Managed logistics and 4PL teams that run the platform for you, with a 24/7 control tower watching every exception.",
    icon: "handshake",
    href: SERVICES,
    stat: { value: "100+", label: "Control tower experts" },
    modules: [
      { title: "Integrated Logistics", href: `${SERVICES}/integrated-logistics-services` },
      { title: "4PL", href: `${SERVICES}/4pl` },
      { title: "Control Tower & Visibility", href: `${SERVICES}/4pl/control-tower-and-visibility` },
    ],
  },
  {
    id: "execution",
    label: "Execution",
    title: "iTMS",
    summary:
      "Intelligent transport management for the full shipment lifecycle, from order to e-POD, freight audit and settlement.",
    icon: "truck",
    href: `${OAAS}/itms`,
    stat: { value: "8-15%", label: "Lower freight cost" },
    modules: [
      { title: "Order Management", href: `${OAAS}/itms/order-management` },
      { title: "Dispatch Planning", href: `${OAAS}/itms/dispatch-planning-and-operations` },
      { title: "Visibility & Tracking", href: `${OAAS}/itms/real-time-visibility-and-tracking` },
      { title: "Analytics & Reporting", href: `${OAAS}/itms/analytics-dashboard-and-reporting` },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    title: "Agentic AI",
    summary:
      "Governed AI agents that sense, decide and act across planning and execution, with humans in the loop.",
    icon: "bot",
    href: `${OAAS}/agentic-ai`,
    stat: { value: "Minutes", label: "From signal to action" },
    modules: [
      { title: "Analyst Agents", href: `${OAAS}/agentic-ai/analyst-agents` },
      { title: "Planning Agents", href: `${OAAS}/agentic-ai/planning-agents` },
      { title: "Execution Agents", href: `${OAAS}/agentic-ai/execution-agents` },
      { title: "Gauri assistant", href: `${OAAS}/agentic-ai/planning-agents/gauri` },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    title: "SCAI",
    summary:
      "AI/ML planning that aligns demand, supply, production and finance, with risk modelled on a living digital twin.",
    icon: "brain",
    href: SCAI,
    stat: { value: "15-25%", label: "Better forecast accuracy" },
    modules: [
      { title: "Integrated Business Planning", href: `${SCAI}/ibp` },
      { title: "Risk Management", href: `${SCAI}/risk-management` },
      { title: "Digital Twin", href: `${SCAI}/risk-management/digital-twin` },
    ],
  },
  {
    id: "data",
    label: "Data",
    title: "Enterprise Data Management",
    summary:
      "Connect ERP, WMS, TMS and external feeds into one governed, continuously scored data foundation.",
    icon: "database",
    href: `${SCAI}/edm`,
    stat: { value: "100+", label: "Pre-built connectors" },
    modules: [
      { title: "Integration", href: `${SCAI}/edm/integration` },
      { title: "Master Data Management", href: `${SCAI}/edm/master-data-management` },
      { title: "Data Health & Analytics", href: `${SCAI}/edm/data-health-and-analytics` },
    ],
  },
];
