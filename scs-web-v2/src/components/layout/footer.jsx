import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/brand/social-icons";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { policies } from "@/content/policies";
import { resourceTypes } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { company, executionServices, industries, platforms, solutions } from "@/content/sitemap";

const [scai, oaas] = platforms.children;

const columns = [
  {
    title: "Solutions",
    links: (solutions.children ?? []).slice(0, 7).map((node) => ({
      title: node.menuTitle ?? node.title,
      href: `${solutions.basePath}/${node.slug}`,
    })),
    more: { title: "All solutions", href: solutions.basePath },
  },
  {
    title: "Platforms",
    links: [
      { title: "SCAI", href: "/platforms/scai" },
      ...scai.children.map((node) => ({
        title: node.menuTitle ?? node.title,
        href: `/platforms/scai/${node.slug}`,
      })),
      { title: "Outcome-as-a-Service", href: "/platforms/outcome-as-a-service" },
      ...oaas.children.map((node) => ({
        title: node.menuTitle ?? node.title,
        href: `/platforms/outcome-as-a-service/${node.slug}`,
      })),
    ],
  },
  {
    title: "Services & industries",
    links: [
      ...(executionServices.children ?? []).map((node) => ({
        title: node.menuTitle ?? node.title,
        href: `${executionServices.basePath}/${node.slug}`,
      })),
      ...(industries.children ?? []).slice(0, 5).map((node) => ({
        title: node.menuTitle ?? node.title,
        href: `${industries.basePath}/${node.slug}`,
      })),
    ],
    more: { title: "All industries", href: industries.basePath },
  },
  {
    title: "Resources & company",
    links: [
      ...resourceTypes.slice(0, 4).map((type) => ({ title: type.title, href: `/resources/${type.slug}` })),
      ...company.links.map((item) => ({ title: item.title, href: item.href })),
    ],
  },
];

const certifications = [
  { src: "/images/certifications/iso-27001.svg", alt: "ISO 27001" },
  { src: "/images/certifications/soc-2-type-2.svg", alt: "SOC 2 Type II" },
  { src: "/images/certifications/iso-14001.svg", alt: "ISO 14001" },
  { src: "/images/certifications/iso-45001.svg", alt: "ISO 45001" },
  { src: "/images/certifications/glec.svg", alt: "GLEC Framework" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10 bg-deep opacity-70" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />

      <div className="container-x pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-white/65">
              From forecast to final delivery: AI-powered planning, agentic AI and intelligent
              execution that keep every supply chain decision connected.
            </p>
            <NewsletterForm />
            <ul className="mt-8 space-y-2 text-sm text-white/70">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="size-4 text-cyan-300" aria-hidden /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="size-4 text-cyan-300" aria-hidden /> {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="kicker text-white/55">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-white">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  {column.more && (
                    <li>
                      <Link
                        href={column.more.href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                      >
                        {column.more.title} <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-3" aria-label="Certifications">
            {certifications.map((cert) => (
              <li key={cert.src} className="grid h-14 w-16 place-items-center rounded-lg bg-white p-2">
                <Image src={cert.src} alt={cert.alt} width={48} height={40} className="h-auto max-h-10 w-auto" />
              </li>
            ))}
          </ul>
          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {siteConfig.legalName}. {siteConfig.name} is a registered trademark.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {policies.map((policy) => (
              <li key={policy.slug}>
                <Link href={`/policies/${policy.slug}`} className="hover:text-white">
                  {policy.title}
                </Link>
              </li>
            ))}
            <li>
              <a href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
