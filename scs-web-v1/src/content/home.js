export const hero = {
  eyebrow: "AI-Powered Supply Chain Intelligence",
  title: "Re-define your supply chain *future*",
  lead: "By transforming",
  titleLead: "Transforming supply chain data into",
  rotatingWords: ["Intelligence", "Decisions", "Business Insight"],
  description:
    "3SC connects strategic planning with seamless execution. AI/ML-driven intelligence, agentic AI and a robust orchestration layer help enterprises plan, execute and adapt across the entire value chain.",
  stages: [
    {
      label: "Data",
      caption: "Every signal from ERP, WMS, TMS, carriers and the market, unified into one governed layer.",
      stat: { value: "20K+", label: "Transactions orchestrated" },
    },
    {
      label: "Intelligence",
      caption: "AI/ML models and governed agents turn those signals into decisions, before disruption lands.",
      stat: { value: "15-25%", label: "Better forecast accuracy" },
    },
    {
      label: "Business Insight",
      caption: "Plans that hold up in execution: leaner inventory, lower cost-to-serve, a greener network.",
      stat: { value: "10-15%", label: "Less inventory" },
    },
  ],
};

export const outcomeStats = [
  { value: "15-25%", label: "Improvement in forecast accuracy" },
  { value: "10-15%", label: "Reduction in inventory" },
  { value: "8-10%", label: "Reduction in carbon emissions" },
  { value: "20-35%", label: "Improvement in planner productivity" },
];

export const companyStats = [
  { value: "100+", label: "Data scientists" },
  { value: "100+", label: "Control tower experts" },
  { value: "75+", label: "Enterprise clients" },
  { value: "20K+", label: "Transactions" },
];

export const clients = ["Ansell", "Whirlpool", "PepsiCo", "Crompton", "Philips"];

export const platformTabs = [
  {
    id: "scai",
    label: "SCAI",
    title: "SCAI: intelligent planning, end to end",
    description:
      "A smart all-in-one platform which empowers you to build and track strong ultra-modern solutions that drive profitability, improve efficiency and operate on sustainability.",
    href: "/platforms/scai",
    icon: "brain",
    modules: [
      { title: "Integrated Business Planning", href: "/platforms/scai/ibp" },
      { title: "Risk Management & Digital Twin", href: "/platforms/scai/risk-management" },
      { title: "Enterprise Data Management", href: "/platforms/scai/edm" },
    ],
  },
  {
    id: "agentic",
    label: "Agentic AI",
    title: "Agentic AI: autonomous, governed, explainable",
    description:
      "Autonomous and touchless capabilities run across planning and execution, delivering governed recommendations, self-learning systems and coordinated responses.",
    href: "/platforms/outcome-as-a-service/agentic-ai",
    icon: "bot",
    modules: [
      {
        title: "Analyst Agents",
        href: "/platforms/outcome-as-a-service/agentic-ai/analyst-agents",
      },
      {
        title: "Planning Agents",
        href: "/platforms/outcome-as-a-service/agentic-ai/planning-agents",
      },
      {
        title: "Execution Agents",
        href: "/platforms/outcome-as-a-service/agentic-ai/execution-agents",
      },
    ],
  },
  {
    id: "itms",
    label: "iTMS",
    title: "iTMS: the full shipment lifecycle, orchestrated",
    description:
      "An intelligent logistics platform that enables the management of the E2E shipment lifecycle from transportation to distribution.",
    href: "/platforms/outcome-as-a-service/itms",
    icon: "truck",
    modules: [
      { title: "Order Management", href: "/platforms/outcome-as-a-service/itms/order-management" },
      {
        title: "Dispatch Planning & Operations",
        href: "/platforms/outcome-as-a-service/itms/dispatch-planning-and-operations",
      },
      {
        title: "Real-Time Visibility & Tracking",
        href: "/platforms/outcome-as-a-service/itms/real-time-visibility-and-tracking",
      },
      {
        title: "Analytics & Reporting",
        href: "/platforms/outcome-as-a-service/itms/analytics-dashboard-and-reporting",
      },
    ],
  },
];

export const roleTabs = [
  {
    id: "planners",
    icon: "users",
    metric: { value: "20-35%", label: "Improvement in planner productivity" },
    label: "Demand & Supply Planners",
    headline: "Spend time on decisions, not spreadsheets",
    description:
      "Exception-led workspaces, self-learning forecasts and one-click scenarios give planners back hours every week.",
    points: [
      "Forecasts that explain their own drivers",
      "Exceptions ranked by business impact",
      "Scenario comparison in seconds",
    ],
  },
  {
    id: "leaders",
    icon: "scale",
    metric: { value: "15-25%", label: "Improvement in forecast accuracy" },
    label: "Supply Chain Leaders",
    headline: "One governed plan from boardroom to shop floor",
    description:
      "Integrated Business Planning aligns demand, supply and finance, with clear trade-offs between service, cost and working capital.",
    points: [
      "Single source of truth for S&OP",
      "Financial reconciliation built in",
      "Resilience and risk exposure at a glance",
    ],
  },
  {
    id: "logistics",
    icon: "truck",
    metric: { value: "8-10%", label: "Reduction in carbon emissions" },
    label: "Logistics & Transport",
    headline: "Control cost, service and carriers in one view",
    description:
      "iTMS governs the full shipment lifecycle, from load building and tendering to tracking, proof of delivery and settlement.",
    points: [
      "Optimised loads, routes and carrier mix",
      "Real-time tracking with predictive ETAs",
      "Automated freight audit and billing",
    ],
  },
  {
    id: "it",
    icon: "database",
    metric: { value: "100+", label: "Data scientists behind every model" },
    label: "IT & Data Teams",
    headline: "Enterprise-ready, secure and easy to integrate",
    description:
      "Pre-built connectors, governed master data and certified security controls mean less integration effort and more trust in the data.",
    points: [
      "Connectors for SAP, Oracle and more",
      "ISO 27001 and SOC 2 aligned controls",
      "Data health monitoring out of the box",
    ],
  },
];

export const decisionCard = {
  title: "Disruption impact",
  alert: "Inbound shipment ETA +14 hours",
  chain: [
    { label: "Supplier", status: "Delayed" },
    { label: "Plant", status: "At risk" },
    { label: "Customer", status: "Commit at risk" },
  ],
  recommendation: "Reallocate stock from the alternate DC and replan the affected shipment.",
  checks: [
    "Stock available at alternate DC",
    "Delivery within customer window",
    "Lower total landed cost",
  ],
};

/** Placeholder metrics pending client-approved case studies. */
export const caseStudies = [
  {
    industry: "FMCG",
    metric: "22%",
    label: "Forecast accuracy uplift",
    summary: "A multinational FMCG brand unified demand planning across 12 markets on SCAI.",
  },
  {
    industry: "Consumer durables",
    metric: "14%",
    label: "Inventory reduction",
    summary:
      "A consumer durables leader cut working capital while holding service levels through seasonal peaks.",
  },
  {
    industry: "Manufacturing",
    metric: "11%",
    label: "Freight cost saved",
    summary: "A multi-plant manufacturer consolidated loads and carriers with iTMS.",
  },
];

/** Placeholder testimonials pending client-approved quotes. */
export const testimonials = [
  {
    quote:
      "3SC gave our planners a single view of demand and supply. We moved from firefighting to planning ahead.",
    name: "Head of Supply Chain",
    company: "Global FMCG company",
  },
  {
    quote:
      "The control tower team became an extension of ours. Exceptions are caught and resolved before customers notice.",
    name: "VP Logistics",
    company: "Consumer durables manufacturer",
  },
  {
    quote:
      "Scenario planning in SCAI changed how our S&OP meetings run. Decisions are faster and backed by data.",
    name: "Director, Demand Planning",
    company: "Healthcare products company",
  },
];

export const recognition = {
  title: "Recognized by Gartner across supply chain planning and execution",
  description:
    "3SC's capabilities have been recognized by Gartner, including in the APAC context of the Magic Quadrant for Supply Chain Planning Solutions.",
  badges: ["ISO 9001:2015", "ISO 27001", "SOC 2 Type II", "Great Place to Work®"],
};

export const integrations = [
  "SAP",
  "Oracle",
  "Microsoft Dynamics",
  "ERP",
  "WMS",
  "TMS",
  "Carrier APIs",
  "Data lakes",
  "Excel",
  "Email & chat",
];

export const homeFaqs = [
  {
    question: "What does 3SC do?",
    answer:
      "3SC is a global supply chain intelligence and orchestration partner. Founded in 2012, we provide AI/ML-powered software across Supply Chain Analytics (SCA) and Supply Chain Execution (SCE), plus managed 4PL and control tower services.",
  },
  {
    question: "Can we start with one module?",
    answer:
      "Yes. Enterprises can deploy planning capabilities, execution capabilities, or both, starting wherever their supply chain needs the most control. Each capability delivers value on its own and connects to the broader platform as you scale.",
  },
  {
    question: "Which systems does 3SC integrate with?",
    answer:
      "3SC connects to SAP, Oracle, Microsoft Dynamics and other ERP, WMS and TMS platforms, as well as carrier APIs and external data sources, through pre-built connectors.",
  },
  {
    question: "Where does 3SC operate?",
    answer:
      "3SC supports 75+ enterprise clients across Europe, APAC, the Middle East and North America.",
  },
  {
    question: "What is Gauri?",
    answer:
      "Gauri is 3SC's conversational AI assistant. It brings insights, explanations and recommended actions to planners by chat, as part of the Agentic AI platform.",
  },
];
