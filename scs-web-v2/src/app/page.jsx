import { ArrowRight, Check, MessageSquare, ShieldCheck, Workflow } from "lucide-react";
import { GauriChat } from "@/components/agents/gauri-chat";
import { HomeHero } from "@/components/hero/home-hero";
import { ValueChain } from "@/components/journey/value-chain";
import { StackDiagram } from "@/components/platform/stack-diagram";
import { BentoGrid } from "@/components/sections/bento-grid";
import { ChallengePicker } from "@/components/sections/challenge-picker";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { EditorialResources } from "@/components/sections/editorial-resources";
import { FaqSection } from "@/components/sections/faq-section";
import { IndustryPanels } from "@/components/sections/industry-panels";
import { IntegrationsRow } from "@/components/sections/logo-marquee";
import { ProofSection } from "@/components/sections/proof-section";
import { RoiEstimator } from "@/components/sections/roi-estimator";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqs } from "@/content/home";

const agentPoints = [
  {
    icon: ShieldCheck,
    title: "Governed by design",
    body: "Every recommendation is explainable, auditable and bounded by the policies you set.",
  },
  {
    icon: Workflow,
    title: "Agents that act, not just alert",
    body: "Analyst, planning and execution agents coordinate to resolve exceptions in minutes.",
  },
  {
    icon: MessageSquare,
    title: "Inside the tools you use",
    body: "Ask and approve by chat in Teams, Slack, Excel or email, or inside the 3SC workspace.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section id="challenges" className="section-y scroll-mt-16 bg-white">
        <div className="container-x">
          <SectionHeading
            index="01"
            kicker="Start where it hurts"
            title="What is costing you most *right now*?"
            description="Most teams start with one module and add the rest when they're ready. Pick a problem to see how 3SC fixes it and what it's typically worth."
          />
          <div className="mt-12">
            <ChallengePicker />
          </div>
        </div>
      </section>

      <ValueChain index="02" />

      <section className="section-y relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="03"
              kicker="The platform"
              title="Five layers. *One* decision fabric."
              description="Start with any layer. Each one delivers value on its own and gets stronger with the layers around it."
              tone="dark"
            />
            <ButtonLink href="/platforms" variant="outline-light">
              All platforms <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <StackDiagram />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
            <p className="kicker text-white/50">Works with</p>
            <IntegrationsRow tone="dark" />
          </div>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              index="04"
              kicker="Agentic AI · Meet Gauri"
              title="Ask a question. Get a decision. *Approve it.*"
              description="Gauri and the 3SC agent team sense what changed, explain why and recommend the next best action, with a human always in the loop."
            />
            <ul className="mt-8 space-y-5">
              {agentPoints.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-navy-900/10 bg-white text-azure-600">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-950">{point.title}</span>
                    <span className="block text-sm text-navy-600">{point.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/platforms/outcome-as-a-service/agentic-ai" variant="navy" className="mt-8">
              Explore Agentic AI <ArrowRight />
            </ButtonLink>
          </div>
          <div className="lg:col-span-7">
            <GauriChat />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="05"
              kicker="Solutions"
              title="Eleven solutions, *one* connected platform"
              description="From long-range S&OP to the last mile, every solution shares one data foundation and one AI engine."
            />
            <ButtonLink href="/solutions" variant="outline">
              All solutions <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <BentoGrid />
          </div>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              index="06"
              kicker="Business case"
              title="What could 3SC be *worth* to you?"
              description="Move the sliders to your numbers. The ranges come from outcomes our customers already measure."
              className="lg:col-span-7"
            />
            <ul className="space-y-2 text-sm text-navy-600 lg:col-span-5 lg:justify-self-end">
              {["Built on published customer outcomes", "No email required to see results", "Refined with your data in the diagnostic"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-700" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            <RoiEstimator />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="07"
              kicker="Industries"
              title="Pre-configured for where supply chains are *hardest*"
            />
            <ButtonLink href="/industries" variant="outline">
              All industries <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <IndustryPanels />
          </div>
        </div>
      </section>

      <ProofSection index="08" />
      <EditorialResources index="09" />
      <FaqSection faqs={homeFaqs} index="10" className="section-y bg-paper" />
      <CtaDiagnostic />
    </>
  );
}
