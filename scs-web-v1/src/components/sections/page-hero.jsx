import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { IsoStack } from "@/components/visuals/iso-stack";
import { Magnetic } from "@/components/visuals/magnetic";
import { TextReveal } from "@/components/visuals/text-reveal";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/** Accents the final word when the title has no explicit "*accent*" marker. */
function withAccent(title) {
  if (title.includes("*")) return title;
  const index = title.lastIndexOf(" ");
  return index === -1 ? `*${title}*` : `${title.slice(0, index)} *${title.slice(index + 1)}*`;
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  visual,
  icon = "sparkles",
  tone = "brand",
  primaryCta = { label: "Request a Demo", href: siteConfig.demoHref },
  secondaryCta,
  children,
}) {
  const art = visual === false ? null : (visual ?? <IsoStack tone={tone} icon={icon} className="mx-auto max-w-md" />);

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/5 bg-white">
      <div
        className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(60%_70%_at_75%_40%,black,transparent)]"
        aria-hidden
      />
      <div className="absolute top-0 right-[-15%] -z-10 size-[50rem] bg-glow" aria-hidden />

      <div className={cn("container-x grid items-center gap-12 py-14 md:py-20", art && "lg:grid-cols-12")}>
        <div className={cn(art ? "lg:col-span-7" : "max-w-4xl")}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" />}
          {eyebrow && (
            <Reveal y={12}>
              <p className="eyebrow">
                <span className="h-px w-6 bg-current" aria-hidden />
                {eyebrow}
              </p>
            </Reveal>
          )}
          <TextReveal
            as="h1"
            text={withAccent(title)}
            className="mt-4 text-display font-bold text-balance text-ink-950"
            accentClassName="text-gradient"
          />
          <Reveal delay={0.15}>
            {description && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{description}</p>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href={primaryCta.href} size="lg">
                  {primaryCta.label} <ArrowRight />
                </ButtonLink>
              </Magnetic>
              {secondaryCta && (
                <Magnetic>
                  <ButtonLink href={secondaryCta.href} variant="outline" size="lg">
                    {secondaryCta.label}
                  </ButtonLink>
                </Magnetic>
              )}
            </div>
            {children}
          </Reveal>
        </div>
        {art && (
          <Reveal className="lg:col-span-5" delay={0.2}>
            {art}
          </Reveal>
        )}
      </div>
    </section>
  );
}
