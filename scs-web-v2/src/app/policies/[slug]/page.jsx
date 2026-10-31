import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { Icon } from "@/components/icon";
import { findPolicy, policies } from "@/content/policies";
import { formatDate } from "@/content/resources";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policy = findPolicy(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/policies/${slug}` },
  };
}

export default function PolicyPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PolicyPageContent params={params} />
    </Suspense>
  );
}

async function PolicyPageContent({ params }) {
  const { slug } = await params;
  const policy = findPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-navy-900/8 bg-paper">
        <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)]" aria-hidden />
        <div className="container-x pt-8 pb-14">
          <Breadcrumbs
            items={[
              { title: "Policies", href: "/policies" },
              { title: policy.title, href: `/policies/${slug}` },
            ]}
          />
          <span className="mt-10 grid size-12 place-items-center rounded-xl bg-navy-900 text-cyan-300">
            <Icon name={policy.icon} className="size-6" />
          </span>
          <h1 className="mt-5 text-display font-extrabold text-navy-950">{policy.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-600">{policy.summary}</p>
          <p className="mt-6 font-mono text-xs text-navy-500 uppercase">Last updated {formatDate(policy.updated)}</p>
        </div>
      </header>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="kicker text-navy-500">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-navy-900/10">
              {policy.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-navy-600 hover:border-azure-600 hover:text-navy-950"
                  >
                    <span className="mr-2 font-mono text-xs text-navy-400">0{index + 1}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <p className="kicker mt-10 text-navy-500">Other policies</p>
            <ul className="mt-4 space-y-2">
              {policies
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/policies/${item.slug}`} className="text-sm text-navy-600 hover:text-azure-700">
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-3xl lg:col-span-9">
          {policy.sections.map((section, index) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className="scroll-mt-28 border-b border-navy-900/8 py-8 first:pt-0 last:border-0"
            >
              <p className="font-mono text-xs text-azure-700">SECTION 0{index + 1}</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy-950">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-navy-700">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <Link
            href="/contact-us#form"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 hover:text-azure-800"
          >
            Questions about this policy? Contact us <ArrowRight className="size-4" aria-hidden />
          </Link>
        </article>
      </div>
    </>
  );
}
