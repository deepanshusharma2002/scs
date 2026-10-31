import { clients } from "@/content/home";

export function LogoStrip({ title = "Trusted by 75+ enterprise brands worldwide" }) {
  const row = [...clients, ...clients, ...clients];

  return (
    <section className="border-y border-ink-900/5 bg-white py-14">
      <div className="container-x flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        <p className="shrink-0 text-center text-sm font-medium text-ink-500 lg:max-w-44 lg:text-left">
          {title}
        </p>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-20 hover:[animation-play-state:paused]">
            {[...row, ...row].map((client, index) => (
              <li
                key={`${client}-${index}`}
                aria-hidden={index >= clients.length}
                className="text-3xl font-extrabold tracking-tighter whitespace-nowrap text-ink-950/25 transition-colors duration-300 hover:text-brand-500"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
