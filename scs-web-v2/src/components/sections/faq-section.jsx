import { ArrowRight, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site";

export function FaqSection({ faqs, index, id = "faq", className = "section-y bg-white" }) {
  if (!faqs?.length) return null;
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
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading index={index} kicker="FAQ" title="Questions, *answered*" />
          <div className="mt-8 rounded-xl border border-navy-900/10 bg-paper p-6">
            <MessageSquare className="size-6 text-azure-600" aria-hidden />
            <p className="mt-3 font-display font-bold text-navy-950">Still have questions?</p>
            <p className="mt-1 text-sm text-navy-600">Our experts usually reply within one business day.</p>
            <ButtonLink href={siteConfig.demoHref} variant="link" className="mt-4">
              Talk to an expert <ArrowRight />
            </ButtonLink>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-2.5 lg:col-span-8">
          {faqs.map((faq, position) => (
            <AccordionItem key={faq.question} value={`faq-${position}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
