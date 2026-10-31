import { company, executionServices, industries, platforms, solutions } from "./sitemap";
import { resources, resourceTypes } from "./resources";

const link = (node, href, withDescription = false) => ({
  title: node.menuTitle ?? node.title,
  href,
  icon: node.icon,
  description: withDescription ? node.summary : undefined,
});

/** Leaf children become one "Modules" group; children with children become their own group. */
function groupsFor(node, href) {
  const leaves = [];
  const groups = [];
  for (const child of node.children ?? []) {
    const childHref = `${href}/${child.slug}`;
    if (child.children?.length) {
      groups.push({
        heading: child.menuTitle ?? child.title,
        href: childHref,
        links: child.children.map((grandchild) =>
          link(grandchild, `${childHref}/${grandchild.slug}`),
        ),
      });
    } else {
      leaves.push(link(child, childHref));
    }
  }
  return leaves.length ? [{ heading: "Modules", links: leaves }, ...groups] : groups;
}

function tabFor(node, href, family) {
  return {
    id: node.slug,
    label: node.menuTitle ?? node.title,
    family,
    summary: node.summary,
    href,
    icon: node.icon,
    groups: groupsFor(node, href),
  };
}

const solutionGroups = [
  { heading: "Plan", slugs: ["demand-planning", "s-and-op", "scenario-simulation"] },
  {
    heading: "Source & make",
    slugs: ["supply-planning", "material-requirement-planning", "production-planning-and-detailed-scheduling"],
  },
  {
    heading: "Orchestrate",
    slugs: ["s-and-oe", "control-tower-and-digital-orchestration", "digital-twin"],
  },
  {
    heading: "Move & foundation",
    slugs: ["logistics-planning-and-orchestration", "enterprise-data-management"],
  },
];

const solutionBySlug = Object.fromEntries((solutions.children ?? []).map((node) => [node.slug, node]));

const [scai, oaas] = platforms.children;

const latestBlog = resources.find((item) => item.type === "blogs");

export const mainNav = [
  {
    title: "Solutions",
    href: solutions.basePath,
    tabs: [
      {
        id: "solutions",
        label: "Solutions",
        summary: solutions.summary,
        href: solutions.basePath,
        groups: solutionGroups.map((group) => ({
          heading: group.heading,
          links: group.slugs.map((slug) =>
            link(solutionBySlug[slug], `${solutions.basePath}/${slug}`),
          ),
        })),
      },
    ],
    featured: {
      kicker: "Start where it hurts",
      title: "Not sure where to begin?",
      description: "Pick the problem that costs you most today and we'll show you the modules that fix it.",
      href: "/#challenges",
      cta: "Find my starting point",
    },
  },
  {
    title: "Platforms",
    href: platforms.basePath,
    tabs: [
      ...scai.children.map((child) =>
        tabFor(child, `/platforms/scai/${child.slug}`, "SCAI"),
      ),
      ...oaas.children.map((child) =>
        tabFor(child, `/platforms/outcome-as-a-service/${child.slug}`, "Outcome-as-a-Service"),
      ),
    ],
    footerLinks: [
      { title: "SCAI overview", href: "/platforms/scai" },
      { title: "Outcome-as-a-Service overview", href: "/platforms/outcome-as-a-service" },
    ],
    featured: {
      kicker: "Meet Gauri",
      title: "Ask your supply chain anything",
      description: "3SC's conversational AI brings answers and governed actions to planners by chat.",
      href: "/platforms/outcome-as-a-service/agentic-ai/planning-agents/gauri",
      cta: "See Gauri in action",
    },
  },
  {
    title: "Services",
    href: executionServices.basePath,
    tabs: (executionServices.children ?? []).map((child) =>
      tabFor(child, `${executionServices.basePath}/${child.slug}`, "Execution services"),
    ),
    featured: {
      kicker: "24/7 control tower",
      title: "100+ experts watching your network",
      description: "Monitor, escalate and resolve exceptions around the clock, run on 3SC platforms.",
      href: `${executionServices.basePath}/4pl/control-tower-and-visibility`,
      cta: "Meet the control tower",
    },
  },
  {
    title: "Industries",
    href: industries.basePath,
    tabs: [
      {
        id: "industries",
        label: "Industries",
        summary: industries.summary,
        href: industries.basePath,
        groups: [
          {
            links: (industries.children ?? []).map((child) =>
              link(child, `${industries.basePath}/${child.slug}`),
            ),
          },
        ],
      },
    ],
    featured: {
      kicker: "Pre-configured",
      title: "Built for the hardest supply chains",
      description: "Domain models and playbooks for FMCG, pharma, chemicals, manufacturing and more.",
      href: industries.basePath,
      cta: "View all industries",
      image: "/images/industries/pharma.png",
    },
  },
  {
    title: "Resources",
    href: "/resources",
    tabs: [
      {
        id: "resources",
        label: "Resources",
        href: "/resources",
        groups: [
          {
            links: resourceTypes.map((type) => ({
              title: type.title,
              href: `/resources/${type.slug}`,
              icon: type.icon,
              description: type.summary,
            })),
          },
        ],
      },
    ],
    featured: {
      kicker: "Latest insight",
      title: latestBlog.title,
      description: latestBlog.excerpt,
      href: `/resources/blogs/${latestBlog.slug}`,
      cta: "Read article",
      image: latestBlog.image,
    },
  },
  {
    title: "Company",
    href: "/about-us",
    tabs: [
      {
        id: "company",
        label: "Company",
        href: "/about-us",
        groups: [
          {
            links: company.links.map((item, index) => ({
              title: item.title,
              href: item.href,
              description: item.summary,
              icon: ["building", "briefcase", "newspaper", "message"][index],
            })),
          },
        ],
      },
    ],
    featured: {
      kicker: "Since 2012",
      title: "Trusted by 75+ enterprise brands",
      description: "A global footprint across Europe, APAC, the Middle East and North America.",
      href: "/about-us",
      cta: "Our story",
    },
  },
];
