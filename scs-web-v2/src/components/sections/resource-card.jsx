import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { formatDate, resourceTypes } from "@/content/resources";
import { cn } from "@/lib/utils";

export const typeOf = (item) => resourceTypes.find((type) => type.slug === item.type);

export function resourceHref(item) {
  return `/resources/${item.type}/${item.slug}`;
}

export function ResourceCard({ item, featured = false, className }) {
  const type = typeOf(item);
  return (
    <Link
      href={resourceHref(item)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-navy-900/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-float",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-navy-100", featured ? "aspect-[16/9]" : "aspect-[16/10]")}>
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 font-mono text-[0.625rem] font-medium tracking-wide text-navy-800 uppercase backdrop-blur">
          <Icon name={type?.icon} className="size-3" /> {type?.singular}
        </span>
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-7" : "p-5")}>
        <p className="font-mono text-[0.6875rem] text-navy-500">
          {formatDate(item.date)}
          {item.readTime ? ` · ${item.readTime}` : ""}
        </p>
        <h3
          className={cn(
            "mt-2 font-display font-bold text-balance text-navy-950 group-hover:text-azure-700",
            featured ? "text-title" : "text-base",
          )}
        >
          {item.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed text-navy-600", !featured && "line-clamp-2")}>{item.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-azure-600">
          {type?.cta ?? "Read more"}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function ResourceRow({ item }) {
  const type = typeOf(item);
  return (
    <Link
      href={resourceHref(item)}
      className="group flex gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-navy-900/10 hover:bg-white"
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-navy-100 sm:w-28">
        {item.image && <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />}
      </div>
      <div className="min-w-0 py-1">
        <p className="font-mono text-[0.625rem] tracking-wide text-azure-700 uppercase">
          {type?.singular} · <span className="text-navy-500">{formatDate(item.date)}</span>
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-display font-bold text-navy-950 group-hover:text-azure-700">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-navy-600">{item.excerpt}</p>
      </div>
    </Link>
  );
}
