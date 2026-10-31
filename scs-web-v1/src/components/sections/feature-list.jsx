import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FeatureList({ features, columns = 3 }) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10",
        columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
      )}
    >
      {features.map((feature, index) => (
        <Reveal as="li" key={feature.title} delay={(index % 3) * 0.06} className="bg-white">
          <div className="group h-full p-8 transition-colors hover:bg-ink-50/60">
            <span className="grid size-12 place-items-center rounded-xl bg-ink-900 text-white transition-colors group-hover:bg-brand-500">
              <Icon name={feature.icon} className="size-6" />
            </span>
            <h3 className="mt-6 text-lg font-semibold text-ink-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{feature.description}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
