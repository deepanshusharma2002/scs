import { company, executionServices, industries, platforms, solutions } from "./sitemap";
import { resources, resourceTypes } from "./resources";

const link = (node, href, withDescription = false) => ({
  title: node.menuTitle ?? node.title,
  href,
  icon: node.icon,
  description: withDescription ? node.summary : undefined,
});

const sectionLinks = (section, withDescription = false) =>
  (section.children ?? []).map((child) =>
    link(child, `${section.basePath}/${child.slug}`, withDescription),
  );

const groupFor = (node, href, eyebrow) => {
  const links = [];
  for (const child of node.children ?? []) {
    const childHref = `${href}/${child.slug}`;
    links.push(link(child, childHref));
    for (const grandchild of child.children ?? []) {
      links.push({
        ...link(grandchild, `${childHref}/${grandchild.slug}`),
        icon: undefined,
      });
    }
  }
  return { eyebrow, title: node.menuTitle ?? node.title, href, links };
};

const scai = platforms.children[0];

const oaas = platforms.children[1];

const latestBlog = resources.find((item) => item.type === "blogs");

export const mainNav = [
  {
    title: "Solutions",
    href: solutions.basePath,
    columns: 3,
    withDescriptions: false,
    groups: [{ links: sectionLinks(solutions) }],
    featured: {
      eyebrow: "Featured",
      title: "From forecast to final delivery",
      description: "See how 3SC solutions connect planning and execution on one AI platform.",
      href: solutions.basePath,
      cta: "Explore all solutions",
    },
  },
  {
    title: "Platforms",
    href: platforms.basePath,
    columns: 5,
    groups: [
      ...scai.children.map((child, index) =>
        groupFor(child, `/platforms/scai/${child.slug}`, index === 0 ? "SCAI" : undefined),
      ),
      ...oaas.children.map((child, index) =>
        groupFor(
          child,
          `/platforms/outcome-as-a-service/${child.slug}`,
          index === 0 ? "Outcome-as-a-Service" : undefined,
        ),
      ),
    ],
  },
  {
    title: "Execution Services",
    href: executionServices.basePath,
    columns: 2,
    groups: (executionServices.children ?? []).map((child) =>
      groupFor(child, `${executionServices.basePath}/${child.slug}`),
    ),
    featured: {
      eyebrow: "Managed services",
      title: "Control tower experts, 24/7",
      description:
        "100+ control tower experts monitor, escalate and resolve exceptions across your network.",
      href: `${executionServices.basePath}/4pl/control-tower-and-visibility`,
      cta: "Meet the control tower",
    },
  },
  {
    title: "Industries",
    href: industries.basePath,
    columns: 2,
    groups: [{ links: sectionLinks(industries) }],
    featured: {
      eyebrow: "Industries",
      title: "Pre-configured for your industry",
      description:
        "Domain models and best practices for FMCG, pharma, chemicals, manufacturing and more.",
      href: industries.basePath,
      cta: "View all industries",
    },
  },
  {
    title: "Resources",
    href: "/resources",
    columns: 2,
    withDescriptions: true,
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
    featured: {
      eyebrow: "Latest insight",
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
    columns: 1,
    withDescriptions: true,
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
    featured: {
      eyebrow: "Since 2012",
      title: "Trusted by 75+ enterprise brands",
      description: "A global footprint across Europe, APAC, the Middle East and North America.",
      href: "/about-us",
      cta: "Our story",
    },
  },
];
