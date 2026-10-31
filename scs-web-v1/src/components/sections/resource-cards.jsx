import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { formatDate, resourceTypes } from "@/content/resources";

export function ResourceCards({ items }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const type = resourceTypes.find((entry) => entry.slug === item.type);

        return (
          <Reveal as="li" key={`${item.type}-${item.slug}`} delay={(index % 3) * 0.06}>
            <Link
              href={`/resources/${item.type}/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(10_10_10/0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-ink-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-900">
                  {type?.singular}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink-500">
                  {formatDate(item.date)}
                  {item.readTime && ` · ${item.readTime}`}
                </p>
                <h3 className="mt-2 text-lg leading-snug font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-600/80">{item.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-500">
                  {type?.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
