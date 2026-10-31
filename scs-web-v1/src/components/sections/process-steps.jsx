import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/content/defaults";
import { DrawLine } from "./draw-line";
import { SectionHeading } from "./section-heading";

export function ProcessSteps({
  eyebrow = "How it works",
  title = "Signal in. Decision out. *Work done.*",
  description = "3SC is an intelligence layer over the systems you already run, connecting data, decisions and execution in one continuous loop.",
}) {
  return (
    <section className="section-y relative overflow-hidden bg-ink-50">
      <div className="absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="relative mt-16">
          <DrawLine className="absolute top-10 right-[16%] left-[16%] hidden md:block" />
          <ol className="relative grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.15} className="relative">
                <div className="group flex h-full flex-col items-start rounded-3xl border border-ink-900/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_30px_60px_-30px_rgb(233_79_28/0.4)] md:items-center md:text-center">
                  <span className="relative grid size-20 place-items-center rounded-3xl bg-ink-950 text-white transition-colors duration-500 group-hover:bg-brand-500">
                    <span className="absolute inset-0 rounded-3xl ring-8 ring-brand-500/10" aria-hidden />
                    <Icon name={step.icon} className="size-8" />
                  </span>
                  <span className="mt-8 font-serif text-6xl leading-none text-brand-500/25 italic transition-colors group-hover:text-brand-500/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-ink-950">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-600">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
