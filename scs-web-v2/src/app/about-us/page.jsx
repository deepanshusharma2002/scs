import { Award } from "lucide-react";
import { Icon } from "@/components/icon";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PresenceMap } from "@/components/visuals/presence-map";
import { about } from "@/content/company";
import { companyStats } from "@/content/home";
import { siteConfig } from "@/content/site";
import { milestones } from "@/content/timeline";

export const metadata = {
  title: "About Us",
  description: about.intro,
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "About us", href: "/about-us" }]}
        kicker="About 3SC"
        title="Decision-centric supply chains, *since 2012*"
        description={about.intro}
        secondaryCta={{ label: "Join our team", href: "/careers" }}
        visual={
          <div className="rounded-2xl border border-navy-900/10 bg-white p-4 shadow-float">
            <PresenceMap />
            <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-navy-900/8 sm:grid-cols-4">
              {companyStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse bg-white p-3">
                  <dt className="text-xs text-navy-500">{stat.label}</dt>
                  <dd className="font-display text-xl font-extrabold text-navy-950">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index="01" kicker="Our story" title="Connecting strategic planning with *seamless execution*" />
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-navy-600 lg:col-span-7">
            <p>{about.story}</p>
            <p>
              Enterprises can deploy planning capabilities, execution capabilities, or both, starting
              wherever their supply chain needs the most control. Each capability delivers value on its
              own, and as customers scale, the platform creates stronger continuity between planning
              decisions and execution realities.
            </p>
            <p>
              With a global footprint supporting 75+ enterprise clients across {siteConfig.regions.join(", ")},
              3SC brings deep domain expertise and advanced technology together at scale.
            </p>
          </Reveal>
        </div>
        <div className="container-x mt-16 grid gap-3 md:grid-cols-3">
          {about.layers.map((layer, index) => (
            <Reveal key={layer.title} delay={index * 0.08} className="rounded-xl border border-navy-900/10 bg-paper p-7">
              <span className="grid size-11 place-items-center rounded-lg bg-navy-900 text-cyan-300">
                <Icon name={layer.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{layer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{layer.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading index="02" kicker="Milestones" title="The journey *so far*" />
          <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
            <span className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-navy-900/15 md:block" aria-hidden />
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={`${milestone.year}-${milestone.title}`} delay={index * 0.08} className="relative pl-8 md:pl-0">
                <span className="absolute top-1 left-0 grid size-5 place-items-center rounded-full border-2 border-azure-600 bg-white md:relative md:top-0" aria-hidden>
                  <span className="size-2 rounded-full bg-azure-600" />
                </span>
                <p className="font-mono text-sm text-azure-700 md:mt-5">{milestone.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy-950">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{milestone.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white md:py-28">
        <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />
        <div className="container-x grid gap-4 md:grid-cols-2">
          {[
            { label: "Our mission", body: about.mission },
            { label: "Our vision", body: about.vision },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1} className="rounded-xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
              <p className="kicker text-cyan-300">{item.label}</p>
              <p className="mt-5 font-display text-2xl leading-snug font-bold text-balance">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading index="03" kicker="Our values" title="What *drives* us" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 0.05} className="bg-white p-7">
                <Icon name={value.icon} className="size-6 text-azure-600" />
                <h3 className="mt-5 font-display font-bold text-navy-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading index="04" kicker="Recognition" title="Recognised for *excellence*" />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {about.awards.map((award, index) => (
              <Reveal as="li" key={award.title} delay={(index % 3) * 0.06} className="flex items-start gap-4 rounded-xl border border-navy-900/10 bg-white p-6">
                <Award className="size-6 shrink-0 text-signal-600" aria-hidden />
                <div>
                  <p className="font-semibold text-navy-950">{award.title}</p>
                  <p className="mt-1 text-sm text-navy-500">{award.event}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16">
            <p className="kicker text-navy-500">Trusted by</p>
            <LogoMarquee className="mt-5" />
          </div>
        </div>
      </section>

      <CtaDiagnostic />
    </>
  );
}
