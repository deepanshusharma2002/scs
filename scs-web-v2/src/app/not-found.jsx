import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { challenges } from "@/content/challenges";

const popular = [
  { title: "Solutions", href: "/solutions", icon: "target" },
  { title: "SCAI platform", href: "/platforms/scai", icon: "brain" },
  { title: "Agentic AI", href: "/platforms/outcome-as-a-service/agentic-ai", icon: "bot" },
  { title: "iTMS", href: "/platforms/outcome-as-a-service/itms", icon: "truck" },
  { title: "Industries", href: "/industries", icon: "building" },
  { title: "Resources", href: "/resources", icon: "bookOpen" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" aria-hidden />
      <div className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="kicker">Error 404 · Shipment not found</p>
          <h1 className="mt-4 text-display font-extrabold text-balance text-navy-950">
            This page took a <span className="text-accent">wrong turn</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-navy-600">
            The page may have moved or never existed. Press <kbd className="rounded border border-navy-900/15 bg-white px-1.5 font-mono text-sm">Ctrl K</kbd> to
            search everything, or pick a route below.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="navy">
              Back to home <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/contact-us#form" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-6 lg:col-span-6">
          <div>
            <p className="kicker text-navy-500">Popular routes</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {popular.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg border border-navy-900/10 bg-white px-4 py-3 text-sm font-semibold text-navy-800 hover:border-azure-500/40 hover:text-azure-700"
                  >
                    <Icon name={item.icon} className="size-4 text-azure-600" />
                    {item.title}
                    <ArrowUpRight className="ml-auto size-4 opacity-40 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-navy-500">Or start with a problem</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {challenges.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link href={item.links[0].href} className="inline-flex rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-xs font-medium text-navy-700 hover:border-azure-500/40">
                    {item.problem}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
