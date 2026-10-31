import Image from "next/image";
import { Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { about } from "@/content/company";
import { formatDate, newsItems } from "@/content/resources";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "Newsroom",
  description: "The latest announcements, press coverage and recognition for 3SC.",
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  const [lead, ...rest] = newsItems;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News and announcements"
        description="The latest from 3SC: company news, product launches, partnerships and recognition."
        breadcrumbs={[{ title: "Newsroom", href: "/newsroom" }]}
        primaryCta={{ label: "Media enquiries", href: `mailto:${siteConfig.email}` }}
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <article className="grid overflow-hidden rounded-3xl border border-ink-900/10 lg:grid-cols-2">
              <div className="relative aspect-[16/10] bg-ink-100 lg:aspect-auto">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow">{lead.tag}</p>
                <h2 className="mt-4 text-title font-semibold text-ink-900">{lead.title}</h2>
                <p className="mt-4 text-ink-600/80">{lead.excerpt}</p>
                <p className="mt-6 text-sm text-ink-500">{formatDate(lead.date)}</p>
              </div>
            </article>
          </Reveal>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08}>
                <article className="flex h-full gap-5 rounded-3xl border border-ink-900/10 p-6">
                  <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-ink-100">
                    <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-brand-500 uppercase">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-600/80">{item.excerpt}</p>
                    <p className="mt-3 text-xs text-ink-500">{formatDate(item.date)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-ink-50">
        <div className="container-x">
          <SectionHeading eyebrow="Awards" title="Recognition over the years" />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {about.awards.map((award) => (
              <li
                key={award.title}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4"
              >
                <span className="font-medium text-ink-900">{award.title}</span>
                <span className="text-right text-sm text-ink-500">{award.event}</span>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-500 hover:text-brand-600"
          >
            <Mail className="size-4" aria-hidden /> Press contact: {siteConfig.email}
          </a>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
