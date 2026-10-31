import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { PageHero } from "@/components/sections/page-hero";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
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
        breadcrumbs={[{ title: "Newsroom", href: "/newsroom" }]}
        kicker="Newsroom"
        title="News, announcements and *recognition*"
        description="The latest from 3SC: company news, product launches, partnerships and awards."
        primaryCta={{ label: "Media enquiries", href: `mailto:${siteConfig.email}` }}
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <article className="grid overflow-hidden rounded-2xl border border-navy-900/10 lg:grid-cols-2">
              <div className="relative aspect-[16/10] bg-navy-100 lg:aspect-auto">
                <Image src={lead.image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center bg-paper p-8 md:p-12">
                <Chip tone="signal" className="w-fit">{lead.tag}</Chip>
                <h2 className="mt-5 text-headline font-bold text-balance text-navy-950">{lead.title}</h2>
                <p className="mt-4 text-lg text-navy-600">{lead.excerpt}</p>
                <p className="mt-6 font-mono text-sm text-navy-500">{formatDate(lead.date)}</p>
              </div>
            </article>
          </Reveal>

          <ol className="relative mt-16 space-y-6 border-l border-navy-900/10 pl-8 md:ml-32 md:pl-10">
            {rest.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08} className="relative">
                <span className="absolute top-2 -left-[2.4rem] size-3 rounded-full border-2 border-azure-600 bg-white md:-left-[2.9rem]" aria-hidden />
                <p className="font-mono text-xs text-navy-500 md:absolute md:top-1.5 md:-left-44 md:w-28 md:text-right">
                  {formatDate(item.date)}
                </p>
                <article className="mt-2 flex gap-5 rounded-xl border border-navy-900/10 p-5 md:mt-0">
                  <div className="relative hidden size-24 shrink-0 overflow-hidden rounded-lg bg-navy-100 sm:block">
                    <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <Chip>{item.tag}</Chip>
                    <h3 className="mt-2 font-display text-lg font-bold text-navy-950">{item.title}</h3>
                    <p className="mt-1 text-sm text-navy-600">{item.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Awards" title="Recognition over the *years*" />
            <div className="mt-8 rounded-xl border border-navy-900/10 bg-white p-6">
              <p className="font-display font-bold text-navy-950">Press & media</p>
              <p className="mt-1 text-sm text-navy-600">Interviews, quotes, logos and executive bios.</p>
              <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Media enquiry")}`} className="mt-4 flex items-center gap-2 text-sm font-semibold text-azure-600 hover:text-azure-800">
                <Mail className="size-4" aria-hidden /> {siteConfig.email}
              </a>
              <a href="/brand/logo.png" download className="mt-2 flex items-center gap-2 text-sm font-semibold text-azure-600 hover:text-azure-800">
                <Download className="size-4" aria-hidden /> Download the 3SC logo
              </a>
            </div>
          </div>
          <ul className="space-y-2 lg:col-span-7">
            {about.awards.map((award) => (
              <li key={award.title} className="flex items-center justify-between gap-4 rounded-xl border border-navy-900/10 bg-white px-5 py-4">
                <span className="font-medium text-navy-950">{award.title}</span>
                <span className="text-right text-sm text-navy-500">{award.event}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaDiagnostic />
    </>
  );
}
