import { Award } from "lucide-react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LogoStrip } from "@/components/sections/logo-strip";
import { PageHero } from "@/components/sections/page-hero";
import { RecognitionBand } from "@/components/sections/recognition-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { about } from "@/content/company";
import { companyStats } from "@/content/home";

export const metadata = {
  title: "About Us",
  description: about.intro,
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About 3SC"
        title="Accelerate your supply chain success with 3SC"
        description={about.intro}
        breadcrumbs={[{ title: "About us", href: "/about-us" }]}
        secondaryCta={{ label: "Join our team", href: "/careers" }}
      />

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our story"
              title="Connecting strategic planning with seamless execution"
            />
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink-600/85 lg:col-span-7">
            <p>{about.story}</p>
            <p>
              Enterprises can deploy planning capabilities, execution capabilities, or both,
              starting wherever their supply chain needs the most control. Each capability delivers
              value on its own, and as customers scale, the broader platform creates stronger
              continuity between planning decisions and execution realities.
            </p>
            <p>
              With a global footprint supporting 75+ enterprise clients across Europe, APAC, the
              Middle East and North America, 3SC brings deep domain expertise and advanced
              technology together at scale.
            </p>
          </Reveal>
        </div>
        <div className="container-x mt-16 grid gap-5 md:grid-cols-3">
          {about.layers.map((layer, index) => (
            <Reveal key={layer.title} delay={index * 0.08}>
              <div className="h-full rounded-3xl border border-ink-900/10 p-8">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon name={layer.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink-900">{layer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600/80">{layer.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y relative isolate overflow-hidden bg-ember text-white">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="container-x relative">
          <SectionHeading eyebrow="Quick facts" title="3SC at a glance" tone="dark" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((fact, index) => (
              <Reveal as="li" key={fact.label} delay={index * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                  <p className="text-5xl font-bold tracking-tight text-brand-400">{fact.value}</p>
                  <p className="mt-3 font-semibold">{fact.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{fact.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { label: "Our mission", body: about.mission },
            { label: "Our vision", body: about.vision },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1}>
              <div className="h-full rounded-3xl bg-linear-to-br from-brand-50 to-white p-10 ring-1 ring-ink-900/10">
                <p className="eyebrow">{item.label}</p>
                <p className="mt-5 text-2xl leading-snug font-semibold text-ink-900">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-ink-50">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="What drives us forward" align="center" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-ink-900 text-white">
                    <Icon name={value.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <StatsBand stats={companyStats} />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Awards & recognition" title="Recognized for excellence" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {about.awards.map((award, index) => (
              <Reveal as="li" key={award.title} delay={(index % 3) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ink-900/10 p-6">
                  <Award className="size-6 shrink-0 text-brand-500" aria-hidden />
                  <div>
                    <p className="font-semibold text-ink-900">{award.title}</p>
                    <p className="mt-1 text-sm text-ink-500">{award.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <RecognitionBand />
      <LogoStrip />
      <CtaBanner />
    </>
  );
}
