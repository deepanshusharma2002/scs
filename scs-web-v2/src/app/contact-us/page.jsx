import { Clock, Globe, Mail, Phone } from "lucide-react";
import { SocialLinks } from "@/components/brand/social-icons";
import { ContactWizard } from "@/components/contact/contact-wizard";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FaqSection } from "@/components/sections/faq-section";
import { PresenceMap } from "@/components/visuals/presence-map";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "Contact Us",
  description: "Talk to a 3SC supply chain expert, book a 30-minute diagnostic or request a personalised demo.",
  alternates: { canonical: "/contact-us" },
};

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: Globe, label: "Global presence", value: siteConfig.regions.join(" · ") },
  { icon: Clock, label: "Response time", value: "Within one business day" },
];

const faqs = [
  {
    question: "What happens after I submit the form?",
    answer: "A 3SC expert reviews your request, matches it to the right specialist and replies within one business day with a calendar link.",
  },
  {
    question: "Is the diagnostic really free?",
    answer: "Yes. The 30-minute diagnostic is a working session with no commitment, and you keep the roadmap whether or not you choose 3SC.",
  },
  {
    question: "Can you work with our existing systems?",
    answer: "Yes. 3SC connects to SAP, Oracle, Microsoft Dynamics and other ERP, WMS and TMS platforms through pre-built connectors and APIs.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-paper">
        <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-sky" aria-hidden />
        <div className="container-x grid gap-12 pt-8 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Breadcrumbs items={[{ title: "Contact us", href: "/contact-us" }]} />
            <p className="kicker mt-10">Contact us</p>
            <h1 className="mt-4 text-display font-extrabold text-balance text-navy-950">
              Let&apos;s talk about your <span className="text-accent">supply chain</span>
            </h1>
            <p className="mt-5 text-lg text-navy-600">
              Book a diagnostic, request a demo, ask about a solution or explore a partnership. Our
              experts reply within one business day.
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {details.map((detail) => {
                const content = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-navy-900/10 bg-white text-azure-600">
                      <detail.icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-mono text-[0.6875rem] tracking-wide text-navy-500 uppercase">{detail.label}</span>
                      <span className="block font-medium text-navy-900">{detail.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a href={detail.href} className="flex items-center gap-4 hover:text-azure-700">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 rounded-xl border border-navy-900/10 bg-white p-4">
              <PresenceMap />
            </div>
            <div className="mt-6 inline-flex rounded-xl bg-navy-950 p-2">
              <SocialLinks />
            </div>
          </div>
          <div id="form" className="scroll-mt-24 lg:col-span-7 lg:pt-16">
            <ContactWizard />
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} />
    </>
  );
}
