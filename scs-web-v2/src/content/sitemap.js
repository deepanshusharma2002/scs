export const solutions = {
  title: "Solutions",
  slug: "solutions",
  basePath: "/solutions",
  theme: "planning",
  icon: "target",
  summary:
    "Purpose-built AI solutions for every supply chain decision, from long-range planning to day-to-day orchestration.",
  children: [
    {
      title: "Demand Planning",
      slug: "demand-planning",
      icon: "lineChart",
      summary:
        "AI/ML-driven demand sensing and forecasting that turns market signals into consensus demand plans.",
      stats: [
        { value: "15-25%", label: "Improvement in forecast accuracy" },
        { value: "20-35%", label: "Improvement in planner productivity" },
      ],
      features: [
        {
          title: "Demand sensing",
          description:
            "Blend POS, orders, promotions, weather and macro signals to sense short-term demand shifts.",
          icon: "radar",
        },
        {
          title: "Self-learning forecasts",
          description:
            "An ensemble of ML models picks the best-fit algorithm for every SKU-location automatically.",
          icon: "brain",
        },
        {
          title: "Consensus planning",
          description:
            "Bring sales, marketing and finance onto one governed demand number with full audit trail.",
          icon: "users",
        },
        {
          title: "New product & promo planning",
          description:
            "Forecast launches and promotions using attribute-based look-alike modelling.",
          icon: "sparkles",
        },
      ],
    },
    {
      title: "Supply Planning",
      slug: "supply-planning",
      icon: "boxes",
      summary:
        "Constraint-aware supply plans that balance capacity, inventory and service across your network.",
      stats: [
        { value: "10-15%", label: "Reduction in inventory" },
        { value: "98%", label: "Target service levels sustained" },
      ],
    },
    {
      title: "Production Planning & Detailed Scheduling",
      menuTitle: "Production Planning & Scheduling",
      slug: "production-planning-and-detailed-scheduling",
      icon: "factory",
      summary:
        "Finite-capacity production plans and shop-floor schedules that respect real plant constraints.",
    },
    {
      title: "Material Requirement Planning",
      slug: "material-requirement-planning",
      icon: "package",
      summary:
        "Time-phased raw material and component requirements aligned to your production plan.",
    },
    {
      title: "S&OE",
      slug: "s-and-oe",
      icon: "activity",
      summary:
        "Sales & Operations Execution that closes the gap between the monthly plan and weekly reality.",
    },
    {
      title: "S&OP",
      slug: "s-and-op",
      icon: "scale",
      summary:
        "A governed Sales & Operations Planning cycle that aligns demand, supply and finance on one plan.",
    },
    {
      title: "Control Tower & Digital Orchestration",
      menuTitle: "Control Tower & Orchestration",
      slug: "control-tower-and-digital-orchestration",
      icon: "radar",
      theme: "risk",
      summary:
        "End-to-end visibility with AI-guided responses that align every stakeholder when disruption hits.",
    },
    {
      title: "Enterprise Data Management",
      slug: "enterprise-data-management",
      icon: "database",
      theme: "data",
      summary:
        "A clean, connected and governed data foundation for every planning and execution decision.",
    },
    {
      title: "Digital Twin",
      slug: "digital-twin",
      icon: "layers",
      theme: "risk",
      summary:
        "A living model of your supply chain to stress-test decisions before they hit the real world.",
    },
    {
      title: "Scenario Simulation",
      slug: "scenario-simulation",
      icon: "shuffle",
      summary:
        "Run what-if scenarios across demand, supply, cost and risk and compare trade-offs side by side.",
    },
    {
      title: "Logistics Planning & Orchestration",
      menuTitle: "Logistics Planning",
      slug: "logistics-planning-and-orchestration",
      icon: "route",
      theme: "logistics",
      summary:
        "Plan loads, routes and carriers and orchestrate execution across the full shipment lifecycle.",
    },
  ],
};

export const platforms = {
  title: "Platforms",
  slug: "platforms",
  basePath: "/platforms",
  icon: "layers",
  theme: "planning",
  summary:
    "Two platform families: SCAI for intelligent planning, and Outcome-as-a-Service for agentic AI and intelligent transport execution.",
  children: [
    {
      title: "SCAI",
      slug: "scai",
      icon: "brain",
      theme: "planning",
      summary:
        "A smart all-in-one platform which empowers you to build and track strong ultra-modern solutions that drive profitability, improve efficiency and operate on sustainability.",
      stats: [
        { value: "15-25%", label: "Improvement in forecast accuracy" },
        { value: "10-15%", label: "Reduction in inventory" },
        { value: "8-10%", label: "Reduction in carbon emissions" },
      ],
      children: [
        {
          title: "Integrated Business Planning",
          menuTitle: "IBP",
          slug: "ibp",
          icon: "workflow",
          summary:
            "Align demand, supply, inventory, production and finance into one governed operating plan.",
          features: [
            {
              title: "One operating plan",
              description:
                "Connect S&OP, demand, supply and financial reconciliation in a single planning cadence.",
              icon: "workflow",
            },
            {
              title: "Constraint-tested plans",
              description:
                "Test plans against capacity, service goals, inventory, cost and risk before you commit.",
              icon: "shieldCheck",
            },
            {
              title: "Scenario trade-offs",
              description:
                "Compare scenarios side by side with clear views of service, cost and working capital impact.",
              icon: "shuffle",
            },
          ],
          children: [
            {
              title: "Demand Planning",
              slug: "demand-planning",
              icon: "lineChart",
              summary:
                "Sense demand early and build accurate, consensus-based forecasts at every level of the hierarchy.",
            },
            {
              title: "Supply Planning",
              slug: "supply-planning",
              icon: "boxes",
              summary:
                "Translate demand into feasible replenishment, production and raw material plans.",
              children: [
                {
                  title: "Replenishment Planning",
                  slug: "replenishment-planning",
                  icon: "packageCheck",
                  summary:
                    "Optimise stock across warehouses and channels with dynamic safety stock and smart replenishment.",
                },
                {
                  title: "Production Planning & Detailed Scheduling",
                  menuTitle: "Production Planning & Scheduling",
                  slug: "production-planning-and-detailed-scheduling",
                  icon: "factory",
                  summary:
                    "Build finite-capacity production plans and sequence-optimised schedules for every line.",
                },
                {
                  title: "Raw Material Planning",
                  slug: "raw-material-planning",
                  icon: "package",
                  summary:
                    "Plan raw material requirements and supplier commitments in sync with production.",
                },
              ],
            },
          ],
        },
        {
          title: "Risk Management",
          slug: "risk-management",
          icon: "shieldAlert",
          theme: "risk",
          summary:
            "Anticipate disruption, model its impact on a digital twin, and respond before it reaches customers.",
          children: [
            {
              title: "Disruption Management",
              slug: "disruption-management",
              icon: "siren",
              summary:
                "Detect supplier, logistics and demand disruptions early and trigger governed response playbooks.",
            },
            {
              title: "Digital Twin",
              slug: "digital-twin",
              icon: "layers",
              summary:
                "Model your end-to-end network to simulate disruptions and evaluate mitigation options.",
            },
            {
              title: "Resilience Monitoring",
              slug: "resilience-monitoring",
              icon: "gauge",
              summary:
                "Track resilience KPIs, single points of failure and risk exposure across tiers.",
            },
            {
              title: "S&OE",
              slug: "s-and-oe",
              icon: "activity",
              summary:
                "Short-horizon execution planning that keeps weekly decisions aligned to the S&OP plan.",
            },
          ],
        },
        {
          title: "Enterprise Data Management",
          menuTitle: "EDM",
          slug: "edm",
          icon: "database",
          theme: "data",
          summary:
            "Integrate, master and monitor the data that powers every planning and execution decision.",
          children: [
            {
              title: "Integration",
              slug: "integration",
              icon: "plug",
              summary:
                "Pre-built connectors to ERP, WMS, TMS and external data sources with real-time sync.",
            },
            {
              title: "Master Data Management",
              slug: "master-data-management",
              icon: "database",
              summary:
                "A single, governed source of truth for products, locations, customers and suppliers.",
            },
            {
              title: "Data Health & Analytics",
              slug: "data-health-and-analytics",
              icon: "barChart",
              summary:
                "Continuously score data quality and surface the issues that matter most to plan accuracy.",
            },
          ],
        },
      ],
    },
    {
      title: "Outcome-as-a-Service",
      slug: "outcome-as-a-service",
      icon: "rocket",
      theme: "agentic",
      summary:
        "Autonomous AI agents and intelligent transport execution delivered against the business outcomes you care about.",
      children: [
        {
          title: "Agentic AI",
          slug: "agentic-ai",
          icon: "bot",
          summary:
            "Governed AI agents that sense, decide and act across planning and execution, with humans in the loop.",
          features: [
            {
              title: "Governed recommendations",
              description:
                "Every agent action is explainable, auditable and bounded by the policies you set.",
              icon: "shieldCheck",
            },
            {
              title: "Self-learning systems",
              description: "Agents learn from plan-versus-actual variance to improve every cycle.",
              icon: "brain",
            },
            {
              title: "Coordinated responses",
              description:
                "Multiple agents collaborate to resolve exceptions across functions in minutes.",
              icon: "network",
            },
          ],
          children: [
            {
              title: "Analyst Agents",
              slug: "analyst-agents",
              icon: "scanSearch",
              summary:
                "Agents that analyse performance, explain variances and answer questions in natural language.",
            },
            {
              title: "Planning Agents",
              slug: "planning-agents",
              icon: "brain",
              summary:
                "A team of specialised agents that sense, plan and mitigate across demand, inventory and supply.",
              children: [
                {
                  title: "Multi-Agentic Digital Orchestration",
                  menuTitle: "Multi-Agentic Orchestration",
                  slug: "multi-agentic-digital-orchestration",
                  icon: "network",
                  summary:
                    "Coordinates every planning agent so decisions stay consistent across the network.",
                },
                {
                  title: "Inventory Agent",
                  slug: "inventory-agent",
                  icon: "boxes",
                  summary:
                    "Monitors stock positions and proposes rebalancing and replenishment actions.",
                },
                {
                  title: "Demand Scout",
                  slug: "demand-scout",
                  icon: "telescope",
                  summary:
                    "Scans internal and external signals to flag demand shifts before they show up in orders.",
                },
                {
                  title: "Supply Sentinel",
                  slug: "supply-sentinel",
                  icon: "shieldAlert",
                  summary: "Watches supplier performance and capacity to catch supply risks early.",
                },
                {
                  title: "Mitigation Planner",
                  slug: "mitigation-planner",
                  icon: "compass",
                  summary: "Generates and ranks mitigation options when a disruption is detected.",
                },
                {
                  title: "Gauri",
                  slug: "gauri",
                  icon: "sparkles",
                  summary:
                    "3SC's conversational AI assistant that brings insights and actions to planners by chat.",
                },
              ],
            },
            {
              title: "Execution Agents",
              slug: "execution-agents",
              icon: "zap",
              summary:
                "Agents that detect shipment risks, manage exceptions and trigger corrective actions automatically.",
            },
          ],
        },
        {
          title: "Intelligent Transport Management System",
          menuTitle: "iTMS",
          slug: "itms",
          icon: "truck",
          theme: "logistics",
          summary:
            "An intelligent logistics platform that enables the management of the E2E shipment lifecycle from transportation to distribution.",
          children: [
            {
              title: "Order Management",
              slug: "order-management",
              icon: "clipboard",
              summary:
                "Ingest, validate and consolidate orders from every channel into executable loads.",
            },
            {
              title: "Dispatch Planning & Operations",
              slug: "dispatch-planning-and-operations",
              icon: "route",
              summary: "Optimise load building, routes, carrier selection and dock schedules.",
            },
            {
              title: "Execution Management",
              slug: "execution-management",
              icon: "workflow",
              summary:
                "Orchestrate tendering, pickups and handovers with automated exception handling.",
            },
            {
              title: "Real-Time Visibility & Tracking",
              menuTitle: "Visibility & Tracking",
              slug: "real-time-visibility-and-tracking",
              icon: "mapPin",
              summary:
                "Track every shipment in real time with predictive ETAs and proactive alerts.",
            },
            {
              title: "Documentation & Compliance Automation",
              menuTitle: "Documentation & Compliance",
              slug: "documentation-and-compliance-automation",
              icon: "fileCheck",
              summary: "Automate e-PODs, invoices, e-way bills and compliance checks end to end.",
            },
            {
              title: "Comprehensive Analytics Dashboard & Reporting",
              menuTitle: "Analytics & Reporting",
              slug: "analytics-dashboard-and-reporting",
              icon: "dashboard",
              summary: "Freight cost, carrier performance and service KPIs in one live dashboard.",
            },
          ],
        },
      ],
    },
  ],
};

export const executionServices = {
  title: "Supply Chain Execution Services",
  menuTitle: "Execution Services",
  slug: "supply-chain-execution-services",
  basePath: "/supply-chain-execution-services",
  icon: "truck",
  theme: "services",
  summary:
    "Managed logistics and 4PL services that give you complete end-to-end visibility, no matter the scale of your business.",
  children: [
    {
      title: "Integrated Logistics Services",
      slug: "integrated-logistics-services",
      icon: "warehouse",
      summary:
        "Warehousing, distribution, value-added services and transport management run as one integrated service.",
      children: [
        {
          title: "Warehouse Management",
          slug: "warehouse-management",
          icon: "warehouse",
          summary:
            "Tech-enabled warehousing with optimised slotting, picking and inventory accuracy.",
        },
        {
          title: "Distribution Management",
          slug: "distribution-management",
          icon: "network",
          summary:
            "Primary and secondary distribution networks designed and run for cost and service.",
        },
        {
          title: "Value Added Services",
          slug: "value-added-services",
          icon: "sparkles",
          summary: "Kitting, labelling, packaging and returns handling tailored to your channels.",
        },
        {
          title: "Transport Management System",
          slug: "transport-management-system",
          icon: "truck",
          summary:
            "Managed transportation powered by 3SC iTMS for planning, execution and settlement.",
        },
      ],
    },
    {
      title: "4PL",
      slug: "4pl",
      icon: "handshake",
      summary:
        "3SC's 4PL services provide you with complete end-to-end visibility for your supply chain operations, no matter the scale of your business.",
      children: [
        {
          title: "Order Management",
          slug: "order-management",
          icon: "clipboard",
          summary:
            "Centralised order orchestration across channels, partners and fulfilment nodes.",
        },
        {
          title: "Transportation Planning",
          slug: "transportation-planning",
          icon: "route",
          summary:
            "Network, lane and load planning that minimises freight cost while protecting service.",
        },
        {
          title: "Documentation & Compliance",
          slug: "documentation-and-compliance",
          icon: "fileCheck",
          summary:
            "End-to-end handling of shipping documentation, customs and regulatory compliance.",
        },
        {
          title: "LSP Governance & Freight Control",
          slug: "lsp-governance-and-freight-control",
          icon: "scale",
          summary: "Govern logistics service providers with SLAs, scorecards and freight audit.",
        },
        {
          title: "Control Tower & Visibility",
          slug: "control-tower-and-visibility",
          icon: "radar",
          summary:
            "A 24/7 control tower team that monitors, alerts and resolves exceptions for you.",
        },
        {
          title: "Analytics & Automation",
          slug: "analytics-and-automation",
          icon: "barChart",
          summary:
            "Turn logistics data into actionable insights and automate repetitive workflows.",
        },
        {
          title: "Reverse Logistics Orchestration",
          slug: "reverse-logistics-orchestration",
          icon: "rotateCcw",
          summary:
            "Returns, refurbishment and recovery flows orchestrated for cost and sustainability.",
        },
      ],
    },
  ],
};

export const industries = {
  title: "Industries",
  slug: "industries",
  basePath: "/industries",
  icon: "building",
  theme: "planning",
  summary:
    "Deep domain expertise and pre-configured models for the industries where supply chain complexity is highest.",
  children: [
    {
      title: "FMCG & CPG",
      slug: "fmcg-and-cpg",
      image: "/images/industries/fmcg.png",
      icon: "cart",
      summary:
        "Handle fragmented demand, promotions and short shelf lives across thousands of SKUs and channels.",
    },
    {
      title: "Pharma & Health and Wellness",
      menuTitle: "Pharma & Health",
      slug: "pharma-and-health-and-wellness",
      image: "/images/industries/pharma.png",
      icon: "pill",
      summary:
        "Protect patient supply with resilient planning, batch traceability and cold-chain visibility.",
    },
    {
      title: "Chemical, Oil & Gas",
      slug: "chemical-oil-and-gas",
      image: "/images/industries/chemical.png",
      icon: "flask",
      summary:
        "Plan capital-intensive, constraint-heavy production and bulk logistics with confidence.",
    },
    {
      title: "Manufacturing",
      slug: "manufacturing",
      image: "/images/industries/industrial.png",
      icon: "factory",
      summary:
        "Synchronise multi-site production, materials and distribution for discrete and process manufacturers.",
    },
    {
      title: "Retail & E-commerce",
      slug: "retail-and-e-commerce",
      image: "/images/industries/fashion.png",
      icon: "cart",
      summary:
        "Get the right inventory to the right store or fulfilment centre as demand shifts by the hour.",
    },
    {
      title: "QSR",
      slug: "qsr",
      image: "/images/industries/agro.png",
      icon: "utensils",
      summary: "Forecast restaurant-level demand and replenish perishables with minimal waste.",
    },
    {
      title: "Construction & Infrastructure",
      slug: "construction-and-infrastructure",
      image: "/images/industries/construction.png",
      icon: "hardHat",
      summary:
        "Coordinate materials, equipment and project logistics across complex, multi-site programmes.",
    },
  ],
};

export const company = {
  title: "Company",
  links: [
    { title: "About us", href: "/about-us", summary: "Our story, mission and values" },
    { title: "Careers", href: "/careers", summary: "Build the future of supply chain" },
    { title: "Newsroom", href: "/newsroom", summary: "Announcements and press coverage" },
    { title: "Contact us", href: "/contact-us", summary: "Talk to a supply chain expert" },
  ],
};

export const catalogSections = [solutions, platforms, executionServices, industries];
