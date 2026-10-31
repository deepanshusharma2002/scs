import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/content/sitemap";
import { cn } from "@/lib/utils";

export function IndustryGrid({ exclude }) {
  const items = (industries.children ?? []).filter((item) => item.slug !== exclude);

  return (
    <ul
      className={cn(
        "grid auto-rows-[18rem] gap-4 sm:grid-cols-2",
        exclude ? "lg:grid-cols-3" : "lg:grid-cols-4",
      )}
    >
      {items.map((industry, index) => (
        <Reveal
          as="li"
          key={industry.slug}
          delay={(index % 4) * 0.07}
          className={cn(
            !exclude && index === 0 && "sm:col-span-2 lg:row-span-2",
            !exclude && index >= 5 && "lg:col-span-2",
          )}
        >
          <Link
            href={`${industries.basePath}/${industry.slug}`}
            className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 p-6 text-white"
          >
            {industry.image && (
              <Image
                src={industry.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/55 to-ink-950/5" aria-hidden />
            <div
              className="absolute inset-0 bg-linear-to-t from-brand-700/90 via-brand-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <span className="absolute top-5 left-5 grid size-11 place-items-center rounded-2xl bg-white/15 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-brand-600">
              <Icon name={industry.icon} className="size-5" />
            </span>
            <span className="absolute top-5 right-5 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-ink-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="size-4" />
            </span>
            <div className="relative">
              <h3 className={cn("font-semibold", !exclude && index === 0 ? "text-3xl" : "text-xl")}>
                {industry.title}
              </h3>
              <p className="mt-2 line-clamp-2 max-h-0 text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                {industry.summary}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
