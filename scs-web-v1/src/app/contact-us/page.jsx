import { Clock, Globe, Mail, Phone } from "lucide-react";
import { SocialLinks } from "@/components/brand/social-icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "Contact Us",
  description: "Talk to a 3SC supply chain expert or request a personalised demo.",
  alternates: { canonical: "/contact-us" },
};

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: Globe, label: "Global presence", value: siteConfig.regions.join(" · ") },
  { icon: Clock, label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(60%_70%_at_70%_40%,black,transparent)]" aria-hidden />
      <div className="absolute top-0 right-[-10%] -z-10 size-[44rem] bg-glow" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ember p-8 text-white md:p-10 lg:col-span-5">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
          <Breadcrumbs tone="dark" items={[{ title: "Contact us", href: "/contact-us" }]} />
          <p className="eyebrow mt-10 text-brand-300">
            <span className="h-px w-6 bg-current" aria-hidden />
            Contact us
          </p>
          <h1 className="mt-4 text-display font-bold">
            Let&apos;s talk <em className="accent text-brand-300">supply chain</em>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Request a personalised demo, ask about a solution or explore a partnership. Our experts
            will get back to you within one business day.
          </p>
          <ul className="mt-10 space-y-5">
            {details.map((detail) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-brand-400">
                    <detail.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs tracking-[0.12em] text-white/50 uppercase">
                      {detail.label}
                    </span>
                    <span className="block font-medium text-white">{detail.value}</span>
                  </span>
                </>
              );

              return (
                <li key={detail.label}>
                  {detail.href ? (
                    <a href={detail.href} className="flex items-center gap-4 hover:text-brand-300">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <SocialLinks className="mt-10" />
        </div>
        <div id="form" className="scroll-mt-24 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
