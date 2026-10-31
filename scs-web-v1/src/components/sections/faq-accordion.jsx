import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";
import { FaqChat } from "./faq-chat";
import { FaqList } from "./faq-list";
import { SectionHeading } from "./section-heading";

export function FaqAccordion({ faqs, title = "Questions, *answered*" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="section-y relative bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title={title}
              description="Everything leaders usually ask before their first conversation with us."
            />
            <Reveal delay={0.15}>
              <div className="relative isolate mt-10 overflow-hidden rounded-[2rem] bg-ember p-7 text-white">
                <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
                <FaqChat />
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href="/contact-us"
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-50"
                  >
                    Talk to an expert
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Mail className="size-4" /> Email us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <FaqList faqs={faqs} />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
