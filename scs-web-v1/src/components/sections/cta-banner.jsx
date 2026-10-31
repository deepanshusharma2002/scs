import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { AccentText } from "@/components/visuals/accent-text";
import { IsoStack } from "@/components/visuals/iso-stack";
import { Magnetic } from "@/components/visuals/magnetic";
import { siteConfig } from "@/content/site";

export function CtaBanner({
  title = "See 3SC in action on *your own data*",
  description = "Talk to a supply chain expert and get a personalised walkthrough of the platform, built around your toughest planning and execution challenges.",
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ember px-8 py-14 md:px-16 md:py-20">
            <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-display font-bold text-white text-balance">
                  <AccentText text={title} accentClassName="text-brand-300" />
                </h2>
                <p className="mt-6 max-w-2xl text-lg text-white/70">{description}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Magnetic>
                    <ButtonLink href={siteConfig.demoHref} size="lg" className="bg-white text-ink-950 shadow-none hover:bg-brand-50">
                      Request a Demo <ArrowRight />
                    </ButtonLink>
                  </Magnetic>
                  <Magnetic>
                    <ButtonLink href="/contact-us" variant="outline-light" size="lg">
                      Contact sales
                    </ButtonLink>
                  </Magnetic>
                </div>
              </div>
              <div className="hidden lg:col-span-4 lg:block">
                <IsoStack tone="glass" icon="sparkles" className="mx-auto max-w-80" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
