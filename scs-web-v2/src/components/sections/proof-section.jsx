import Image from "next/image";
import { Award, Quote } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/company";
import { caseStudies, companyStats, recognition, testimonials } from "@/content/home";

const certifications = [
  { src: "/images/certifications/iso-27001.svg", alt: "ISO 27001" },
  { src: "/images/certifications/soc-2-type-2.svg", alt: "SOC 2 Type II" },
  { src: "/images/certifications/iso-14001.svg", alt: "ISO 14001" },
  { src: "/images/certifications/iso-45001.svg", alt: "ISO 45001" },
  { src: "/images/certifications/glec.svg", alt: "GLEC Framework" },
];

export function ProofSection({ index = "08" }) {
  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <SectionHeading
          index={index}
          kicker="Proof"
          title="Results leading enterprises *measure*, not just promise"
          description="Outcomes from deployments across FMCG, consumer durables, pharma and manufacturing."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {caseStudies.map((study, position) => (
            <Reveal key={study.industry} delay={position * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-7">
                <p className="kicker text-navy-500">{study.industry}</p>
                <p className="mt-6 font-display text-6xl font-extrabold tracking-tight text-navy-950">
                  <CountUp value={study.metric} />
                </p>
                <p className="mt-1 font-semibold text-azure-700">{study.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy-600">{study.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <dl className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-navy-900/10 bg-white md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-navy-900/8 p-6 not-last:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b">
              <dt className="mt-1 text-sm text-navy-600">{stat.label}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-navy-950">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <p className="kicker text-navy-500">Trusted by</p>
          <LogoMarquee className="mt-5" />
        </div>

        <div className="mt-16 grid gap-3 lg:grid-cols-3">
          {testimonials.map((item, position) => (
            <Reveal key={item.name} delay={position * 0.08}>
              <figure className="flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-7">
                <Quote className="size-7 text-azure-500" aria-hidden />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-navy-800">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-navy-900/8 pt-4">
                  <p className="font-semibold text-navy-900">{item.name}</p>
                  <p className="text-sm text-navy-500">{item.company}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-12">
          <div className="relative isolate overflow-hidden rounded-xl bg-navy-950 p-7 text-white lg:col-span-7">
            <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
            <Award className="size-7 text-cyan-300" aria-hidden />
            <p className="mt-4 font-display text-xl font-bold text-balance">{recognition.title}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {about.awards.slice(0, 4).map((award) => (
                <li key={award.title} className="text-sm">
                  <span className="text-white">{award.title}</span>
                  <span className="block text-xs text-white/50">{award.event}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-navy-900/10 bg-white p-7 lg:col-span-5">
            <p className="kicker text-navy-500">Certified & secure</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <li key={cert.src} className="grid h-16 w-20 place-items-center rounded-lg border border-navy-900/8 p-2">
                  <Image src={cert.src} alt={cert.alt} width={56} height={44} className="h-auto max-h-11 w-auto" />
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-navy-600">
              {recognition.badges.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
