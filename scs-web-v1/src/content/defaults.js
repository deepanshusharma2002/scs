export const themeFeatures = {
  planning: [
    {
      title: "AI/ML forecasting engine",
      description:
        "Self-selecting ML models that learn from every planning cycle and explain their drivers.",
      icon: "brain",
    },
    {
      title: "Constraint-based optimisation",
      description:
        "Plans that respect capacity, lead times, MOQs, shelf life and cost in a single solve.",
      icon: "target",
    },
    {
      title: "What-if scenarios",
      description:
        "Simulate demand, supply and cost changes and compare outcomes before you commit.",
      icon: "shuffle",
    },
    {
      title: "Collaborative workflows",
      description:
        "Role-based workspaces, approvals and comments that keep every stakeholder aligned.",
      icon: "users",
    },
    {
      title: "Exception-led planning",
      description:
        "Planners focus on the exceptions that matter while the engine handles the rest.",
      icon: "siren",
    },
    {
      title: "Explainable insights",
      description:
        "Clear KPIs and drill-downs so every number in the plan can be traced and trusted.",
      icon: "lightbulb",
    },
  ],
  risk: [
    {
      title: "Early-warning signals",
      description:
        "Monitor supplier, logistics, geopolitical and weather signals across tiers in real time.",
      icon: "radar",
    },
    {
      title: "Impact simulation",
      description:
        "Quantify the service, revenue and cost impact of a disruption on your digital twin.",
      icon: "layers",
    },
    {
      title: "Response playbooks",
      description:
        "Governed, pre-approved mitigation playbooks that align stakeholders in minutes.",
      icon: "listChecks",
    },
    {
      title: "Resilience scorecards",
      description: "Track exposure, recovery time and single points of failure across the network.",
      icon: "gauge",
    },
  ],
  data: [
    {
      title: "Pre-built connectors",
      description:
        "Connect SAP, Oracle, Microsoft Dynamics and hundreds of other systems without rework.",
      icon: "plug",
    },
    {
      title: "Governed master data",
      description:
        "One trusted record for products, locations, customers and suppliers with stewardship workflows.",
      icon: "database",
    },
    {
      title: "Data quality scoring",
      description:
        "Continuous profiling that flags gaps and anomalies before they distort your plans.",
      icon: "scanSearch",
    },
    {
      title: "Enterprise-grade security",
      description: "ISO 27001 and SOC 2 aligned controls, role-based access and full audit trails.",
      icon: "shieldCheck",
    },
  ],
  agentic: [
    {
      title: "Autonomous sensing",
      description:
        "Agents continuously watch demand, supply and logistics signals so nothing slips through.",
      icon: "telescope",
    },
    {
      title: "Governed actions",
      description:
        "Actions run inside guardrails you define, with humans in the loop where it matters.",
      icon: "shieldCheck",
    },
    {
      title: "Natural-language interaction",
      description:
        "Ask questions and approve recommendations by chat, in the tools your teams already use.",
      icon: "message",
    },
    {
      title: "Continuous learning",
      description: "Agents learn from plan-versus-actual outcomes to get sharper every cycle.",
      icon: "brain",
    },
  ],
  logistics: [
    {
      title: "Load & route optimisation",
      description:
        "Consolidate orders and build optimal loads and routes across modes and carriers.",
      icon: "route",
    },
    {
      title: "Carrier & contract management",
      description: "Manage rates, contracts, tendering and carrier performance in one place.",
      icon: "handshake",
    },
    {
      title: "Real-time tracking",
      description: "Live shipment visibility with predictive ETAs and automated exception alerts.",
      icon: "mapPin",
    },
    {
      title: "Freight audit & settlement",
      description: "Automated freight audit, billing and settlement that eliminates leakage.",
      icon: "fileCheck",
    },
  ],
  services: [
    {
      title: "Dedicated control tower team",
      description:
        "Supply chain experts who monitor, escalate and resolve exceptions around the clock.",
      icon: "users",
    },
    {
      title: "Technology-led operations",
      description:
        "Every service is powered by 3SC platforms for full transparency and data-driven control.",
      icon: "cpu",
    },
    {
      title: "Outcome-based SLAs",
      description:
        "Commercials and governance aligned to the cost, service and sustainability outcomes you need.",
      icon: "target",
    },
    {
      title: "Scalable network",
      description: "A partner network that flexes with your volumes across regions and channels.",
      icon: "globe",
    },
  ],
};

export const themeStats = {
  planning: [
    { value: "15-25%", label: "Improvement in forecast accuracy" },
    { value: "10-15%", label: "Reduction in inventory" },
    { value: "20-35%", label: "Improvement in planner productivity" },
  ],
  risk: [
    { value: "2x", label: "Faster response to disruptions" },
    { value: "10-15%", label: "Reduction in inventory buffers" },
    { value: "24/7", label: "Risk monitoring across tiers" },
  ],
  data: [
    { value: "100+", label: "Pre-built connectors" },
    { value: "99.9%", label: "Platform availability" },
    { value: "20-35%", label: "Improvement in planner productivity" },
  ],
  agentic: [
    { value: "70%", label: "Of routine decisions automated" },
    { value: "20-35%", label: "Improvement in planner productivity" },
    { value: "Minutes", label: "From signal to recommended action" },
  ],
  logistics: [
    { value: "8-15%", label: "Reduction in freight cost" },
    { value: "8-10%", label: "Reduction in carbon emissions" },
    { value: "95%+", label: "On-time delivery visibility" },
  ],
  services: [
    { value: "100+", label: "Control tower experts" },
    { value: "20K+", label: "Transactions managed" },
    { value: "24/7", label: "Operations coverage" },
  ],
};

export const processSteps = [
  {
    title: "Connect",
    description:
      "Pre-built connectors to SAP, Oracle and your ERP, WMS and TMS unify data into one governed layer. Your stack stays; nothing is replaced.",
    icon: "plug",
  },
  {
    title: "Decide",
    description:
      "AI/ML models weigh demand, inventory, production and freight together and recommend the best plan before a disruption lands.",
    icon: "brain",
  },
  {
    title: "Act",
    description:
      "Decisions flow to your teams and execution systems, with agents handling routine exceptions and every shipment in one live view.",
    icon: "zap",
  },
];

export function faqsFor(node, parent) {
  if (node.faqs) return node.faqs;
  const faqs = [
    {
      question: `What is ${node.title}?`,
      answer: node.summary,
    },
    {
      question: `Does ${node.title} work with our existing ERP and execution systems?`,
      answer:
        "Yes. 3SC connects to SAP, Oracle, Microsoft Dynamics and other ERP, WMS and TMS platforms through pre-built connectors and APIs, so you keep the systems you already run.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Most customers go live with a first module in 8 to 12 weeks, then expand capability by capability as value is proven.",
    },
  ];
  if (parent) {
    faqs.push({
      question: `How does ${node.title} fit into ${parent.title}?`,
      answer: `${node.title} is part of ${parent.title}. It delivers value on its own and shares data, models and workflows with the rest of the 3SC platform as you scale.`,
    });
  }
  return faqs;
}
