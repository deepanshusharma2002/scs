import { LinkCards } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { policies } from "@/content/policies";
import { formatDate } from "@/content/resources";

export const metadata = {
  title: "Policies",
  description: "3SC's policies on cookies, conduct, partnerships, security disclosure and raising concerns.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Policies", href: "/policies" }]}
        kicker="Trust & governance"
        title="Policies"
        description="How 3SC protects data, conducts business and works with customers and partners."
        primaryCta={null}
      />
      <section className="section-y bg-white">
        <div className="container-x">
          <LinkCards
            items={policies.map((policy) => ({
              title: policy.title,
              description: policy.summary,
              href: `/policies/${policy.slug}`,
              icon: policy.icon,
              badge: `Updated ${formatDate(policy.updated)}`,
            }))}
          />
        </div>
      </section>
    </>
  );
}
