import { Icon } from "@/components/icon";
import { IsoStack } from "@/components/visuals/iso-stack";

export function NodeVisual({ title, icon, items, caption = "AI engine active", tone = "brand" }) {
  const shown = items.slice(0, 6);

  return (
    <div className="relative pt-16 pr-6 lg:pt-24">
      <IsoStack tone={tone} icon={icon} className="absolute -top-6 -right-6 w-56 lg:-top-10 lg:w-72" />
      <div className="relative rounded-3xl border border-ink-900/10 bg-white/75 p-6 shadow-[0_40px_80px_-40px_rgb(10_10_10/0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-ink-950 text-white">
            <Icon name={icon} className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-950">{title}</p>
            <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              {caption}
            </p>
          </div>
        </div>
        <ul className="mt-6 space-y-2">
          {shown.map((item, index) => (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-ink-50/80 px-4 py-3"
            >
              <Icon name={item.icon ?? icon} className="size-4 shrink-0 text-brand-500" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-800">{item.title}</span>
              <span className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-900/10" aria-hidden>
                <span
                  className="block h-full rounded-full bg-linear-to-r from-brand-600 to-brand-400"
                  style={{ width: `${55 + ((index * 17) % 40)}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
