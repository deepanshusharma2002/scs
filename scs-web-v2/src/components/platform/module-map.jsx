import { Icon } from "@/components/icon";
import { AppWindow } from "@/components/ui/app-window";

/** Hub-and-spoke diagram: the node at the centre, its modules arranged in orbit around it. */
export function ModuleMap({ title, icon, items }) {
  const count = items.length;
  const points = items.map((item, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return { ...item, x: 50 + Math.cos(angle) * 37, y: 50 + Math.sin(angle) * 36 };
  });

  return (
    <AppWindow title={`${title} · module map`} meta={`${count} modules`} bodyClassName="p-0">
      <div className="relative aspect-[5/4] w-full bg-paper sm:aspect-[4/3]">
        <div className="absolute inset-0 bg-dot-grid opacity-60" aria-hidden />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <ellipse cx="50" cy="50" rx="37" ry="36" className="fill-none stroke-navy-900/10" strokeWidth="0.3" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
          {points.map((point) => (
            <line
              key={point.title}
              x1="50"
              y1="50"
              x2={point.x}
              y2={point.y}
              className="stroke-azure-500/50"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              style={{ animation: "flow 1.6s linear infinite" }}
            />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
          <span className="relative grid size-16 place-items-center rounded-2xl bg-navy-900 text-white shadow-float sm:size-20">
            <span className="absolute inset-0 animate-ping-soft rounded-2xl bg-azure-500/30" aria-hidden />
            <Icon name={icon} className="relative size-7 sm:size-8" />
          </span>
          <span className="max-w-[9rem] font-display text-xs font-bold text-navy-950 sm:text-sm">{title}</span>
        </div>
        {points.map((point, index) => (
          <span
            key={point.title}
            className="absolute flex max-w-[30%] -translate-x-1/2 -translate-y-1/2 animate-rise items-center gap-1.5 rounded-lg border border-navy-900/10 bg-white px-2 py-1.5 shadow-card"
            style={{ left: `${point.x}%`, top: `${point.y}%`, animationDelay: `${200 + index * 90}ms` }}
          >
            <Icon name={point.icon} className="size-3.5 shrink-0 text-azure-600" />
            <span className="truncate text-[0.6875rem] font-semibold text-navy-800 sm:text-xs">{point.title}</span>
          </span>
        ))}
      </div>
    </AppWindow>
  );
}
