import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/ui/accent-text";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function PageHero({
  breadcrumbs,
  kicker,
  title,
  description,
  chips,
  primaryCta = { label: "Book a demo", href: siteConfig.demoHref },
  secondaryCta,
  visual,
  className,
}) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-navy-900/8 bg-paper", className)}>
      <div
        className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-sky" aria-hidden />
      <div
        className={cn(
          "container-x grid gap-12 pt-8 pb-16 md:pb-20 lg:pt-10",
          visual && "lg:grid-cols-12 lg:items-center",
        )}
      >
        <div className={cn(visual ? "lg:col-span-6" : "max-w-4xl")}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <Reveal className={breadcrumbs ? "mt-10" : ""}>
            {kicker && <p className="kicker">{kicker}</p>}
            <h1 className="mt-4 text-display font-extrabold text-balance text-navy-950">
              <AccentText text={title} />
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-navy-600">{description}</p>
            </Reveal>
          )}
          {chips?.length > 0 && (
            <Reveal delay={0.08} className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Chip key={chip} tone="azure" className="normal-case">
                  {chip}
                </Chip>
              ))}
            </Reveal>
          )}
          {(primaryCta || secondaryCta) && (
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <ButtonLink href={primaryCta.href} size="lg">
                  {primaryCta.label} <ArrowRight />
                </ButtonLink>
              )}
              {secondaryCta && (
                <ButtonLink href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </ButtonLink>
              )}
            </Reveal>
          )}
        </div>
        {visual && (
          <Reveal delay={0.12} className="lg:col-span-6">
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
