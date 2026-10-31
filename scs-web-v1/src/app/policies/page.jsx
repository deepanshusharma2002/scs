import { CardGrid } from "@/components/sections/card-grid";
import { PageHero } from "@/components/sections/page-hero";
import { policies } from "@/content/policies";

export const metadata = {
  title: "Policies",
  description:
    "3SC policies covering cookies, conduct, partners, security disclosure and reporting concerns.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        title="Policies & governance"
        description="How 3SC operates responsibly, protects information and upholds ethical standards."
        breadcrumbs={[{ title: "Policies", href: "/policies" }]}
        primaryCta={{ label: "Contact us", href: "/contact-us" }}
      />
      <section className="section-y bg-white">
        <div className="container-x">
          <CardGrid
            items={policies.map((policy) => ({
              title: policy.title,
              description: policy.summary,
              href: `/policies/${policy.slug}`,
              icon: policy.icon,
            }))}
          />
        </div>
      </section>
    </>
  );
}
