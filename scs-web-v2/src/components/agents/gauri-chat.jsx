"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Bot, Check, RotateCcw, SendHorizonal, Sparkles } from "lucide-react";
import { AppWindow } from "@/components/ui/app-window";
import { gauriScenarios } from "@/content/gauri";
import { cn } from "@/lib/utils";

export function GauriChat() {
  const [scenarioId, setScenarioId] = useState(gauriScenarios[0].id);
  const [run, setRun] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const scenario = gauriScenarios.find((entry) => entry.id === scenarioId);

  return (
    <div ref={ref}>
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Choose a question for Gauri">
        {gauriScenarios.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={entry.id === scenarioId}
            onClick={() => {
              setScenarioId(entry.id);
              setRun((value) => value + 1);
            }}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              entry.id === scenarioId
                ? "border-azure-600 bg-azure-600 text-white"
                : "border-navy-900/10 bg-white text-navy-700 hover:border-azure-500/40",
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <AppWindow title="Gauri · Planning workspace" meta={scenario.agent} live bodyClassName="bg-paper p-0">
        <Conversation
          key={`${scenario.id}-${run}`}
          scenario={scenario}
          playing={inView}
          instant={reduce}
          onReplay={() => setRun((value) => value + 1)}
        />
      </AppWindow>
    </div>
  );
}

const STEPS = { typing: 0, thinking: 1, reply: 2 };

function Conversation({ scenario, playing, instant, onReplay }) {
  const total = STEPS.reply + scenario.bullets.length + 1;
  const [typed, setTyped] = useState(instant ? scenario.prompt.length : 0);
  const [step, setStep] = useState(instant ? total : STEPS.typing);

  useEffect(() => {
    if (!playing || instant) return;
    const timers = [];
    let at = 300;
    for (let index = 1; index <= scenario.prompt.length; index += 1) {
      at += 18;
      timers.push(setTimeout(() => setTyped(index), at));
    }
    at += 250;
    timers.push(setTimeout(() => setStep(STEPS.thinking), at));
    at += 900;
    for (let next = STEPS.reply; next <= total; next += 1) {
      timers.push(setTimeout(() => setStep(next), at));
      at += next === STEPS.reply ? 500 : 380;
    }
    return () => timers.forEach(clearTimeout);
  }, [playing, instant, scenario, total]);

  const sent = step >= STEPS.thinking;
  const shownBullets = Math.max(0, step - STEPS.reply);
  const showCard = step >= total;

  return (
    <div className="flex min-h-[25rem] flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-5" aria-live="polite">
        {sent && (
          <div className="ml-auto max-w-[85%] animate-rise rounded-2xl rounded-br-sm bg-navy-900 px-4 py-2.5 text-sm text-white">
            {scenario.prompt}
          </div>
        )}

        {step === STEPS.thinking && (
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Avatar />
            <span className="flex gap-1" aria-label="Gauri is thinking">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 animate-bounce rounded-full bg-navy-400"
                  style={{ animationDelay: `${dot * 120}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {step >= STEPS.reply && (
          <div className="flex max-w-[94%] gap-2.5">
            <Avatar />
            <div className="min-w-0 flex-1 animate-rise rounded-2xl rounded-tl-sm border border-navy-900/8 bg-white px-4 py-3 text-sm text-navy-700 shadow-card">
              <p className="font-medium text-navy-900">{scenario.reply}</p>
              <ul className="mt-2 space-y-1.5">
                {scenario.bullets.slice(0, shownBullets).map((bullet) => (
                  <li key={bullet} className="flex animate-rise gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-azure-500" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
              {showCard && (
                <div className="mt-3 animate-rise rounded-xl border border-azure-500/25 bg-azure-50 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-azure-700">
                    <Sparkles className="size-3.5" aria-hidden /> {scenario.card.title}
                  </p>
                  <p className="mt-1 text-sm text-navy-800">{scenario.card.body}</p>
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-[0.6875rem] text-emerald-700">
                    <Check className="size-3" aria-hidden /> {scenario.card.impact}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {scenario.card.actions.map((action, index) => (
                      <span
                        key={action}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-xs font-semibold",
                          index === 0 ? "bg-azure-600 text-white" : "border border-navy-900/10 bg-white text-navy-700",
                        )}
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-navy-900/8 bg-white p-3">
        <div className="flex h-10 flex-1 items-center overflow-hidden rounded-lg border border-navy-900/10 px-3 text-sm text-navy-800">
          {!sent && (
            <span className="truncate">
              {scenario.prompt.slice(0, typed)}
              {playing && <span className="ml-0.5 inline-block h-4 w-px animate-blink bg-navy-800 align-middle" />}
            </span>
          )}
          {sent && <span className="text-navy-400">Ask Gauri about your supply chain…</span>}
        </div>
        {showCard ? (
          <button
            type="button"
            onClick={onReplay}
            className="grid size-10 cursor-pointer place-items-center rounded-lg border border-navy-900/10 text-navy-600 hover:bg-navy-50"
            aria-label="Replay conversation"
          >
            <RotateCcw className="size-4" aria-hidden />
          </button>
        ) : (
          <span className="grid size-10 place-items-center rounded-lg bg-azure-600 text-white" aria-hidden>
            <SendHorizonal className="size-4" />
          </span>
        )}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-azure-600 to-cyan-500 text-white">
      <Bot className="size-4" aria-hidden />
    </span>
  );
}
