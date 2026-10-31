export const resourceTypes = [
  {
    slug: "blogs",
    title: "Blogs",
    singular: "Blog",
    summary: "Perspectives on AI, planning and logistics from 3SC's supply chain experts.",
    icon: "bookOpen",
    cta: "Read article",
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    singular: "Case Study",
    summary: "How global enterprises transformed their supply chains with 3SC.",
    icon: "briefcase",
    cta: "Read case study",
  },
  {
    slug: "videos",
    title: "Videos",
    singular: "Video",
    summary: "Product walkthroughs, customer stories and expert conversations.",
    icon: "video",
    cta: "Watch video",
  },
  {
    slug: "whitepapers",
    title: "Whitepapers",
    singular: "Whitepaper",
    summary: "In-depth research and frameworks for supply chain leaders.",
    icon: "fileText",
    cta: "Download whitepaper",
  },
  {
    slug: "use-cases",
    title: "Use Cases",
    singular: "Use Case",
    summary: "Practical, problem-first examples of 3SC solutions in action.",
    icon: "lightbulb",
    cta: "Explore use case",
  },
  {
    slug: "webinars",
    title: "Webinars",
    singular: "Webinar",
    summary: "Live and on-demand sessions with practitioners and analysts.",
    icon: "calendarClock",
    cta: "Watch webinar",
  },
];

const blogs = [
  {
    slug: "gulf-consumer-durables-seasonal-demand-peaks",
    title: "Planning for seasonal demand peaks in Gulf consumer durables",
    excerpt:
      "How brands in the GCC can prepare inventory, capacity and logistics for Ramadan, summer and festive peaks.",
    date: "2026-10-22",
    image: "/images/resources/gulf-consumer-durables.png",
    tags: ["Demand Planning", "Middle East"],
  },
  {
    slug: "evolution-of-supply-chain-ai",
    title: "The evolution of supply chain AI: from forecasting to agents",
    excerpt:
      "From statistical forecasting to governed AI agents, a look at how AI is reshaping supply chain decision-making.",
    date: "2026-10-15",
    image: "/images/resources/evolution-of-supply-chain-ai.png",
    tags: ["Agentic AI"],
  },
  {
    slug: "southeast-asia-electronics-manufacturing-supply-chain",
    title: "Building resilient electronics supply chains in Southeast Asia",
    excerpt:
      "Supplier diversification, capacity planning and risk visibility for a fast-growing manufacturing hub.",
    date: "2026-10-08",
    image: "/images/resources/sea-electronics.png",
    tags: ["Manufacturing", "Risk"],
  },
  {
    slug: "route-planning-in-logistics",
    title: "Route planning in logistics: a practical guide",
    excerpt:
      "The constraints, trade-offs and technologies behind efficient route planning at scale.",
    date: "2026-10-01",
    image: "/images/resources/route-planning.png",
    tags: ["iTMS", "Logistics"],
  },
  {
    slug: "european-fmcg-supply-chain-service-cost-sustainability",
    title: "European FMCG: balancing service, cost and sustainability",
    excerpt:
      "Why European FMCG leaders are rethinking network design and planning to hit all three targets.",
    date: "2026-09-24",
    image: "/images/resources/european-fmcg.png",
    tags: ["FMCG", "Sustainability"],
  },
  {
    slug: "gulf-fmcg-supply-chain-food-security",
    title: "Gulf FMCG supply chains and food security",
    excerpt:
      "Planning strategies for import-dependent markets facing volatile lead times and demand.",
    date: "2026-09-17",
    image: "/images/resources/gulf-fmcg.png",
    tags: ["FMCG", "Middle East"],
  },
  {
    slug: "pharmaceutical-supply-chain-challenges-and-solutions",
    title: "Pharmaceutical supply chain challenges and solutions",
    excerpt: "Shortages, compliance and cold chain: what pharma supply chains need to solve next.",
    date: "2026-09-10",
    image: "/images/resources/pharma-challenges.png",
    tags: ["Pharma"],
  },
  {
    slug: "fmcg-supply-chain-faster-fragmented-demand",
    title: "FMCG supply chains in an era of faster, fragmented demand",
    excerpt: "Quick commerce, new channels and shorter cycles demand a new planning playbook.",
    date: "2026-09-03",
    image: "/images/resources/fmcg-fragmented-demand.png",
    tags: ["FMCG", "Demand Planning"],
  },
  {
    slug: "supply-chain-challenges-in-chemical-industry",
    title: "Supply chain challenges in the chemical industry",
    excerpt:
      "Capacity constraints, hazardous logistics and price volatility, and how to plan around them.",
    date: "2026-08-27",
    image: "/images/resources/chemical-industry.png",
    tags: ["Chemical"],
  },
].map((item) => ({ ...item, type: "blogs", readTime: "6 min read" }));

const placeholder = (type, items) => items.map((item) => ({ ...item, type }));

const caseStudies = placeholder("case-studies", [
  {
    slug: "global-fmcg-demand-planning",
    title: "Global FMCG brand lifts forecast accuracy by 22%",
    excerpt: "Unifying demand planning across 12 markets on SCAI.",
    date: "2026-08-12",
    image: "/images/resources/european-fmcg.png",
    tags: ["FMCG", "Demand Planning"],
  },
  {
    slug: "consumer-durables-inventory",
    title: "Consumer durables leader cuts inventory by 14%",
    excerpt: "Holding service levels through seasonal peaks with smarter replenishment.",
    date: "2026-07-02",
    image: "/images/resources/gulf-consumer-durables.png",
    tags: ["Consumer Durables", "Replenishment"],
  },
  {
    slug: "manufacturer-freight-savings",
    title: "Multi-plant manufacturer saves 11% on freight",
    excerpt: "Load consolidation and carrier optimisation with iTMS.",
    date: "2026-05-20",
    image: "/images/resources/route-planning.png",
    tags: ["Manufacturing", "iTMS"],
  },
]);

const videos = placeholder("videos", [
  {
    slug: "scai-platform-overview",
    title: "SCAI platform overview",
    excerpt: "A five-minute tour of planning on SCAI.",
    date: "2026-09-01",
    image: "/images/resources/evolution-of-supply-chain-ai.png",
    tags: ["SCAI"],
  },
  {
    slug: "meet-gauri",
    title: "Meet Gauri, 3SC's AI assistant",
    excerpt: "See how planners get answers and actions by chat.",
    date: "2026-08-01",
    image: "/images/resources/sea-electronics.png",
    tags: ["Agentic AI"],
  },
]);

const whitepapers = placeholder("whitepapers", [
  {
    slug: "agentic-ai-in-supply-chain",
    title: "Agentic AI in the supply chain: a practical framework",
    excerpt: "Where autonomous agents add value, and how to govern them.",
    date: "2026-07-15",
    image: "/images/resources/evolution-of-supply-chain-ai.png",
    tags: ["Agentic AI"],
  },
  {
    slug: "ibp-maturity-model",
    title: "The IBP maturity model",
    excerpt: "Benchmark your planning process and plan the next step.",
    date: "2026-06-10",
    image: "/images/resources/fmcg-fragmented-demand.png",
    tags: ["IBP"],
  },
]);

const useCases = placeholder("use-cases", [
  {
    slug: "promo-forecasting",
    title: "Forecasting promotions with look-alike modelling",
    excerpt: "Predict uplift for new promotions using attributes of past events.",
    date: "2026-08-20",
    image: "/images/resources/gulf-fmcg.png",
    tags: ["Demand Planning"],
  },
  {
    slug: "disruption-response",
    title: "Responding to an inbound supplier delay",
    excerpt: "From alert to mitigated plan in minutes with Planning Agents.",
    date: "2026-07-28",
    image: "/images/resources/middle-east-pharma.jpg",
    tags: ["Risk", "Agentic AI"],
  },
]);

const webinars = placeholder("webinars", [
  {
    slug: "future-of-sop",
    title: "The future of S&OP in an agentic world",
    excerpt: "Practitioners discuss how AI agents change the planning cycle.",
    date: "2026-09-18",
    image: "/images/resources/europe-medicine.png",
    tags: ["S&OP", "Agentic AI"],
  },
  {
    slug: "pharma-resilience",
    title: "Building resilience into pharma supply chains",
    excerpt: "Lessons from recent shortages across Europe and the Middle East.",
    date: "2026-08-05",
    image: "/images/resources/pharma-challenges.png",
    tags: ["Pharma", "Risk"],
  },
]);

export const resources = [
  ...blogs,
  ...caseStudies,
  ...videos,
  ...whitepapers,
  ...useCases,
  ...webinars,
];

export const newsItems = [
  {
    title: "3SC appoints Ashish Sikka as CEO",
    excerpt:
      "3SC announces leadership transition as it scales its AI-powered supply chain platforms globally.",
    date: "2026-10-20",
    image: "/images/resources/ceo-announcement.png",
    tag: "Announcement",
  },
  {
    title: "3SC recognized by Gartner across supply chain planning and execution",
    excerpt:
      "3SC's capabilities feature in Gartner research covering supply chain planning solutions.",
    date: "2026-06-12",
    image: "/images/resources/evolution-of-supply-chain-ai.png",
    tag: "Recognition",
  },
  {
    title: "3SC wins Best S&OP Planning Practice at ELSC Leadership Awards",
    excerpt: "Recognized for excellence in Sales & Operations Planning practice.",
    date: "2023-11-15",
    image: "/images/resources/european-fmcg.png",
    tag: "Awards",
  },
];

export function resourcesOf(type) {
  return resources.filter((item) => item.type === type);
}

export function findResource(type, slug) {
  return resources.find((item) => item.type === type && item.slug === slug);
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
