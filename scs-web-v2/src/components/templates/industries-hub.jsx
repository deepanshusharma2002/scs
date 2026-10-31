import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { OutcomesBand } from "@/components/sections/feature-grid";
import { IndustryPanels } from "@/components/sections/industry-panels";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { themeStats } from "@/content/defaults";
import { industryDetails } from "@/content/industries";
import { industries, solutions } from "@/content/sitemap";

export function IndustriesHub() {
  const items = industries.children ?? [];
  const matrixSlugs = [...new Set(items.flatMap((item) => industryDetails[item.slug]?.solutions ?? []))];
  const columns = matrixSlugs
    .map((slug) => solutions.children.find((node) => node.slug === slug))
    .filter(Boolean);

  return (
    <>
      <PageHero
        breadcrumbs={[{ title: industries.title, href: industries.basePath }]}
        kicker="3SC Industries"
        title="Pre-configured for where supply chains are *hardest*"
        description={industries.summary}
        chips={[`${items.length} industries`, "Domain models", "Proven playbooks"]}
        secondaryCta={{ label: "Compare industries", href: "#matrix" }}
        visual={
          <div className="grid grid-cols-3 gap-2">
            {items.slice(0, 6).map((item, index) => (
              <div
                key={item.slug}
                className={`relative overflow-hidden rounded-xl bg-navy-900 ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-80" priority={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden />
                <span className="absolute bottom-2 left-2 text-xs font-semibold text-white">{item.menuTitle ?? item.title}</span>
              </div>
            ))}
          </div>
        }
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading index="01" kicker="Industries" title="Choose your *industry*" />
          <div className="mt-12">
            <IndustryPanels />
          </div>
        </div>
      </section>

      <section id="matrix" className="section-y scroll-mt-20 bg-paper">
        <div className="container-x">
          <SectionHeading
            index="02"
            kicker="Coverage matrix"
            title="Which solutions each industry *starts with*"
            description="Our most common first deployments by sector. Every solution is available to every industry."
          />
          <div className="mt-12 overflow-x-auto rounded-xl border border-navy-900/10 bg-white" data-lenis-prevent-horizontal>
            <table className="w-full min-w-[56rem] text-left text-sm">
              <caption className="sr-only">Recommended starting solutions by industry</caption>
              <thead>
                <tr className="border-b border-navy-900/8 bg-navy-50/60">
                  <th scope="col" className="sticky left-0 bg-navy-50 px-5 py-4 font-mono text-[0.6875rem] font-medium tracking-wide text-navy-500 uppercase">
                    Industry
                  </th>
                  {columns.map((node) => (
                    <th key={node.slug} scope="col" className="px-3 py-4 align-bottom">
                      <Link href={`${solutions.basePath}/${node.slug}`} className="block text-xs leading-snug font-semibold text-navy-700 hover:text-azure-700">
                        {node.menuTitle ?? node.title}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const picks = industryDetails[item.slug]?.solutions ?? [];
                  return (
                    <tr key={item.slug} className="border-b border-navy-900/6 last:border-0 hover:bg-azure-50/40">
                      <th scope="row" className="sticky left-0 bg-white px-5 py-4 font-semibold text-navy-900">
                        <Link href={`${industries.basePath}/${item.slug}`} className="inline-flex items-center gap-2 hover:text-azure-700">
                          <Icon name={item.icon} className="size-4 text-navy-400" />
                          {item.menuTitle ?? item.title}
                        </Link>
                      </th>
                      {columns.map((node) => {
                        const rank = picks.indexOf(node.slug);
                        return (
                          <td key={node.slug} className="px-3 py-4 text-center">
                            {rank >= 0 ? (
                              <span
                                className={`inline-grid size-7 place-items-center rounded-md ${rank === 0 ? "bg-azure-600 text-white" : "bg-azure-50 text-azure-700"}`}
                                title={rank === 0 ? "Most common first deployment" : "Common deployment"}
                              >
                                <Check className="size-4" aria-hidden />
                                <span className="sr-only">{rank === 0 ? "Primary" : "Recommended"}</span>
                              </span>
                            ) : (
                              <span className="text-navy-200" aria-hidden>·</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-4 font-mono text-[0.6875rem] text-navy-500 uppercase">
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded bg-azure-600" /> Most common first</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded bg-azure-50 ring-1 ring-azure-500/30" /> Common</span>
          </p>
        </div>
      </section>

      <OutcomesBand stats={themeStats.planning} index="03" />
      <CtaDiagnostic />
    </>
  );
}
