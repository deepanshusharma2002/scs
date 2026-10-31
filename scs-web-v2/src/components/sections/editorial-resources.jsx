import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ResourceCard, ResourceRow } from "@/components/sections/resource-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { resources } from "@/content/resources";

/** One lead story plus a reading list: an editorial layout rather than a uniform card grid. */
export function EditorialResources({
  index,
  items,
  kicker = "Insights",
  title = "Thinking from the *front line* of supply chain AI",
  className = "section-y bg-white",
}) {
  const list = items ?? [...resources].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const [lead, ...rest] = list;
  if (!lead) return null;

  return (
    <section className={className}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index={index} kicker={kicker} title={title} />
          <ButtonLink href="/resources" variant="outline">
            All resources <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ResourceCard item={lead} featured />
          </Reveal>
          {rest.length > 0 && (
            <Reveal delay={0.1} className="lg:col-span-5">
              <ul className="divide-y divide-navy-900/8">
                {rest.map((item) => (
                  <li key={`${item.type}-${item.slug}`} className="py-1.5 first:pt-0">
                    <ResourceRow item={item} />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
