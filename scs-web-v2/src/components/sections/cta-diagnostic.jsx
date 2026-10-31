import { CalendarCheck, Map, Target } from "lucide-react";
import { QuickDiagnosticForm } from "@/components/sections/quick-diagnostic-form";

const agenda = [
  { icon: Target, title: "Your top three decision bottlenecks", body: "Where forecast error, stock or freight costs you most." },
  { icon: Map, title: "A benchmark against your peers", body: "How your planning and execution maturity compares." },
  { icon: CalendarCheck, title: "A 90-day value roadmap", body: "Which module to start with, and what it should return." },
];

export function CtaDiagnostic({ title = "Book a 30-minute supply chain diagnostic" }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-50 [mask-image:radial-gradient(70%_80%_at_20%_50%,black,transparent)]" aria-hidden />
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="kicker text-cyan-300">No slides. Your data.</p>
          <h2 className="mt-4 text-display font-extrabold text-balance">{title}</h2>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            A working session with a 3SC supply chain expert. You leave with clear next steps, whether
            or not you choose 3SC.
          </p>
          <ul className="mt-10 space-y-5">
            {agenda.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-cyan-300">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="block text-sm text-white/60">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:pl-8">
          <QuickDiagnosticForm />
        </div>
      </div>
    </section>
  );
}
