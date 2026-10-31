import { Award, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { recognition } from "@/content/home";

export function RecognitionBand() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-ink-900/10 bg-linear-to-br from-brand-50 via-white to-ink-50 p-8 md:p-12 lg:grid-cols-12">
            <div className="flex items-start gap-5 lg:col-span-7">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <Award className="size-7" aria-hidden />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-ink-900 text-balance">
                  {recognition.title}
                </h2>
                <p className="mt-3 text-ink-600/80">{recognition.description}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              {recognition.badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-semibold text-ink-800"
                >
                  <ShieldCheck className="size-4 text-brand-500" aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
