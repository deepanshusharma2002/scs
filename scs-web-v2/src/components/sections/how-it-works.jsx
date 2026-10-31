import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { IntegrationsRow } from "@/components/sections/logo-marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/defaults";

export function HowItWorks({ index, id = "how-it-works", className = "section-y bg-paper" }) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <div className="container-x">
        <SectionHeading
          index={index}
          kicker="How it works"
          title="Connect. Decide. *Act.*"
          description="Your stack stays. 3SC sits over the systems you already run and turns their data into decisions your teams can act on."
        />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
          <span className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-[repeating-linear-gradient(90deg,var(--color-azure-500)_0_6px,transparent_6px_12px)] md:block" aria-hidden />
          {processSteps.map((step, position) => (
            <Reveal as="li" key={step.title} delay={position * 0.1} className="relative">
              <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-xl border border-navy-900/10 bg-white text-azure-600 shadow-card md:mx-0">
                <Icon name={step.icon} className="size-6" />
              </span>
              <p className="mt-5 font-mono text-xs text-navy-400">STEP 0{position + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-600">{step.description}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-navy-900/8 pt-8">
          <p className="kicker text-navy-500">Connects to</p>
          <IntegrationsRow />
        </div>
      </div>
    </section>
  );
}
