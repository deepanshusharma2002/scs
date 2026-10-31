import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { about, careers } from "@/content/company";
import { companyStats } from "@/content/home";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "Careers",
  description: careers.intro,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the future of supply chain with us"
        description={careers.intro}
        breadcrumbs={[{ title: "Careers", href: "/careers" }]}
        primaryCta={{ label: "View open roles", href: "#openings" }}
        secondaryCta={{ label: "About 3SC", href: "/about-us" }}
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Why 3SC" title="A place to do the best work of your career" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careers.perks.map((perk, index) => (
              <Reveal as="li" key={perk.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-ink-900/10 p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
                    <Icon name={perk.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-semibold text-ink-900">{perk.title}</h3>
                  <p className="mt-2 text-sm text-ink-600/80">{perk.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <StatsBand stats={companyStats} />

      <section id="openings" className="section-y scroll-mt-20 bg-ink-50">
        <div className="container-x">
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <ul className="mt-12 divide-y divide-ink-900/10 overflow-hidden rounded-3xl border border-ink-900/10 bg-white">
            {careers.openings.map((job) => (
              <li key={job.title}>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  className="group flex flex-col gap-3 p-6 transition-colors hover:bg-ink-50 md:flex-row md:items-center md:justify-between md:p-8"
                >
                  <div>
                    <p className="text-lg font-semibold text-ink-900 group-hover:text-brand-600">
                      {job.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-ink-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="size-4" aria-hidden /> {job.team}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden /> {job.location}
                      </span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                    Apply now <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="How we work together" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((value) => (
              <li key={value.title} className="rounded-3xl bg-ink-50/70 p-7">
                <Icon name={value.icon} className="size-6 text-brand-500" />
                <h3 className="mt-4 font-semibold text-ink-900">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-600/80">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
