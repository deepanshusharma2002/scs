import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { findPolicy, policies } from "@/content/policies";
import { formatDate } from "@/content/resources";
import { PageSkeleton } from "@/components/layout/page-skeleton";
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
      <header className="relative isolate overflow-hidden border-b border-ink-900/5 bg-white">
        <div className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(60%_90%_at_85%_20%,black,transparent)]" aria-hidden />
        <div className="container-x py-14 md:py-20">
          <Breadcrumbs
            items={[
              { title: "Policies", href: "/policies" },
              { title: policy.title, href: `/policies/${slug}` },
            ]}
          />
          <h1 className="mt-8 text-display font-bold text-ink-950">{policy.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{policy.summary}</p>
          <p className="mt-6 text-sm text-ink-400">Last updated {formatDate(policy.updated)}</p>
        </div>
      </header>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-2 border-l border-ink-900/10">
              {policy.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-ink-600 hover:border-brand-500 hover:text-brand-600"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
              Other policies
            </p>
            <ul className="mt-4 space-y-2">
              {policies
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/policies/${item.slug}`}
                      className="text-sm text-ink-600 hover:text-brand-600"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-3xl lg:col-span-9">
          {policy.sections.map((section) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className="scroll-mt-28 border-b border-ink-900/10 py-8 first:pt-0 last:border-0"
            >
              <h2 className="text-2xl font-semibold text-ink-900">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
