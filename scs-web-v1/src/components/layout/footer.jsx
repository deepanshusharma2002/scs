import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/brand/social-icons";
import { executionServices, industries, solutions } from "@/content/sitemap";
import { policies } from "@/content/policies";
import { resourceTypes } from "@/content/resources";
import { siteConfig } from "@/content/site";

const columns = [
  {
    title: "Solutions",
    links: (solutions.children ?? []).slice(0, 7).map((node) => ({
      title: node.menuTitle ?? node.title,
      href: `${solutions.basePath}/${node.slug}`,
    })),
  },
  {
    title: "Platforms",
    links: [
      { title: "SCAI", href: "/platforms/scai" },
      { title: "Integrated Business Planning", href: "/platforms/scai/ibp" },
      { title: "Risk Management", href: "/platforms/scai/risk-management" },
      { title: "Enterprise Data Management", href: "/platforms/scai/edm" },
      { title: "Agentic AI", href: "/platforms/outcome-as-a-service/agentic-ai" },
      { title: "iTMS", href: "/platforms/outcome-as-a-service/itms" },
    ],
  },
  {
    title: "Services & Industries",
    links: [
      ...(executionServices.children ?? []).map((node) => ({
        title: node.title,
        href: `${executionServices.basePath}/${node.slug}`,
      })),
      ...(industries.children ?? []).slice(0, 5).map((node) => ({
        title: node.menuTitle ?? node.title,
        href: `${industries.basePath}/${node.slug}`,
      })),
    ],
  },
  {
    title: "Resources",
    links: resourceTypes.map((type) => ({
      title: type.title,
      href: `/resources/${type.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { title: "About us", href: "/about-us" },
      { title: "Careers", href: "/careers" },
      { title: "Newsroom", href: "/newsroom" },
      { title: "Contact us", href: "/contact-us" },
    ],
  },
];

const certifications = [
  { src: "/images/certifications/iso-27001.svg", alt: "ISO 14001 Environmental Management System" },
  { src: "/images/certifications/soc-2-type-2.svg", alt: "ISO 27001 Information Security" },
  { src: "/images/certifications/iso-14001.svg", alt: "ISO 45001 Occupational Health and Safety" },
  { src: "/images/certifications/iso-45001.svg", alt: "ET Now Global DEI Alliance" },
  { src: "/images/certifications/glec.svg", alt: "SOC 2 Type II Certified" },
  { src: "/images/certifications/cert-4.svg", alt: "GLEC Framework" },
  { src: "/images/certifications/cert-7.svg", alt: "Great Place to Work Certified" },
];

async function currentYear() {
  "use cache";

  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ember text-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />

      <div className="container-x relative pt-20 pb-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end">
          <p className="max-w-3xl text-display font-bold text-balance">
            Let&apos;s re-define your supply chain{" "}
            <em className="accent text-brand-300">together.</em>
          </p>
          <Link
            href={siteConfig.demoHref}
            className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-white pr-2 pl-7 font-semibold text-ink-950 transition-colors hover:bg-brand-50"
          >
            Request a Demo
            <span className="grid size-10 place-items-center rounded-full bg-brand-500 text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </div>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" className="h-9" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Founded in 2012, 3SC is a global supply chain intelligence and orchestration partner,
              helping enterprises infuse AI into planning and execution to decide faster, cut cost
              and scale sustainably.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 text-white/80 hover:text-brand-300"
                >
                  <Mail className="size-4 text-brand-400" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-3 text-white/80 hover:text-brand-300"
                >
                  <Phone className="size-4 text-brand-400" /> {siteConfig.phone}
                </a>
              </li>
            </ul>
            <SocialLinks className="mt-8" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-white">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
            Certified & compliant
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            {certifications.map((cert) => (
              <li
                key={cert.src}
                className="grid size-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 transition-colors duration-300 hover:border-brand-400/50 hover:bg-white/[0.08]"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={64}
                  height={64}
                  unoptimized
                  className="size-16 opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {policies.map((policy) => (
              <li key={policy.slug}>
                <Link href={`/policies/${policy.slug}`} className="hover:text-white">
                  {policy.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(4.5rem,15vw,14rem)] overflow-hidden select-none"
      >
        <p className="absolute inset-x-0 top-0 bg-linear-to-b from-white/20 via-white/[0.07] to-transparent bg-clip-text text-center text-[clamp(7rem,28vw,26rem)] leading-[0.82] font-extrabold tracking-[-0.06em] text-transparent">
          3SC
        </p>
      </div>
    </footer>
  );
}
