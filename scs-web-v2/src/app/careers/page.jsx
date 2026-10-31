import { Mail } from "lucide-react";
import { OpeningsList } from "@/components/company/openings-list";
import { Icon } from "@/components/icon";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, careers } from "@/content/company";
import { companyStats } from "@/content/home";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "Careers",
  description: careers.intro,
  alternates: { canonical: "/careers" },
};

const hiringSteps = [
  { title: "Apply", body: "Send your CV for a role, or a note about what you'd love to build." },
  { title: "Meet the team", body: "A conversation with the hiring manager about your experience and goals." },
  { title: "Show your craft", body: "A practical exercise or case discussion, close to real work." },
  { title: "Offer", body: "We move quickly and keep you informed at every step." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Careers", href: "/careers" }]}
        kicker="Careers at 3SC"
        title="Build the AI that keeps the world's supply chains *moving*"
        description={careers.intro}
        primaryCta={{ label: "View open roles", href: "#openings" }}
        secondaryCta={{ label: "About 3SC", href: "/about-us" }}
        visual={
          <div className="grid grid-cols-2 gap-3">
            {companyStats.map((stat, index) => (
              <div key={stat.label} className={`rounded-xl border border-navy-900/10 p-6 ${index === 0 ? "bg-navy-950 text-white" : "bg-white"}`}>
                <p className={`font-display text-4xl font-extrabold tracking-tight ${index === 0 ? "text-accent-light" : "text-navy-950"}`}>
                  <CountUp value={stat.value} />
                </p>
                <p className={`mt-1 text-sm ${index === 0 ? "text-white/65" : "text-navy-600"}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        }
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading index="01" kicker="Why 3SC" title="A place to do the *best work* of your career" />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {careers.perks.map((perk, index) => (
              <Reveal as="li" key={perk.title} delay={index * 0.06} className="rounded-xl border border-navy-900/10 bg-paper p-7">
                <span className="grid size-11 place-items-center rounded-lg bg-azure-600 text-white">
                  <Icon name={perk.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{perk.title}</h3>
                <p className="mt-2 text-sm text-navy-600">{perk.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="openings" className="section-y scroll-mt-20 bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index="02" kicker="Open roles" title="Current *openings*" />
            <p className="mt-5 text-navy-600">Don&apos;t see your role? We&apos;re always glad to meet great people.</p>
            <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Open application")}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-azure-600 hover:text-azure-800">
              <Mail className="size-4" aria-hidden /> Send an open application
            </a>
          </div>
          <div className="lg:col-span-8">
            <OpeningsList openings={careers.openings} />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading index="03" kicker="Hiring process" title="Four steps, *no surprises*" />
          <ol className="mt-12 grid gap-3 md:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.08} className="rounded-xl border border-navy-900/10 p-6">
                <p className="font-mono text-sm text-azure-700">STEP 0{index + 1}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm text-navy-600">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading index="04" kicker="Our values" title="How we *work together*" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((value) => (
              <li key={value.title} className="bg-white p-7">
                <Icon name={value.icon} className="size-6 text-azure-600" />
                <h3 className="mt-4 font-display font-bold text-navy-950">{value.title}</h3>
                <p className="mt-2 text-sm text-navy-600">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
