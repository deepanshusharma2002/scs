"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CircleCheck, Loader2, X } from "lucide-react";
import { AccentText } from "@/components/visuals/accent-text";
import { IsoStack } from "@/components/visuals/iso-stack";
import { matchesPath, popupCampaign as campaign } from "@/content/promotions";

const storageKey = `3sc:popup:${campaign.id}`;
const schema = z.object({ email: z.email("Please enter a valid work email") });

function recentlyShown() {
  try {
    const last = Number(window.localStorage.getItem(storageKey));
    return last > 0 && Date.now() - last < campaign.frequencyDays * 86_400_000;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    window.localStorage.setItem(storageKey, String(Date.now()));
  } catch {
    // Without storage the popup may reappear next session, which is acceptable.
  }
}

export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!campaign.enabled || !matchesPath(pathname, campaign.excludePaths)) return;
    const preview = new URLSearchParams(window.location.search).get("promo") === "preview";
    if (!preview && recentlyShown()) return;

    let fired = false;
    let armed = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      markShown();
      setOpen(true);
    };

    const timers = [];
    if (preview) {
      timers.push(setTimeout(fire, 800));
    } else {
      timers.push(setTimeout(() => (armed = true), campaign.minDwellMs));
      timers.push(setTimeout(fire, campaign.delayMs));
    }

    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (armed && depth >= campaign.scrollDepth) fire();
    };
    const onLeave = (event) => {
      if (armed && !event.relatedTarget && event.clientY <= 0) fire();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [pathname]);

  const onSubmit = async (values) => {
    // Submission is stubbed until a CRM / API endpoint is available.
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("Whitepaper request", values);
    setSent(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink-950/55 backdrop-blur-sm data-[state=open]:animate-[fade-in_250ms_ease-out]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[61] grid max-h-[92svh] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden overflow-y-auto rounded-[2rem] bg-white shadow-2xl outline-none data-[state=open]:animate-[popup-in_400ms_cubic-bezier(0.22,1,0.36,1)] md:grid-cols-5">
          <div className="relative hidden overflow-hidden bg-ember p-8 md:col-span-2 md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
            <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-300" />
              {campaign.tag}
            </span>
            <IsoStack tone="glass" icon="bot" className="relative mx-auto max-w-60" />
            <p className="relative text-sm text-white/70">Trusted by planning teams at 75+ enterprise brands.</p>
          </div>

          <div className="p-8 md:col-span-3 md:p-10">
            <Dialog.Title className="text-3xl leading-tight font-semibold text-ink-950">
              <AccentText text={campaign.title} accentClassName="text-brand-500" />
            </Dialog.Title>
            <Dialog.Description className="mt-4 text-ink-600">{campaign.description}</Dialog.Description>
            <ul className="mt-6 space-y-2.5">
              {campaign.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-800">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {sent ? (
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                <CircleCheck className="size-5 shrink-0" aria-hidden />
                {campaign.success}
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8">
                <label htmlFor="promo-email" className="sr-only">
                  Work email
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="promo-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    className="h-12 flex-1 rounded-full border border-ink-900/15 px-5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600 disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {campaign.cta}
                  </button>
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                <p className="mt-3 text-xs text-ink-400">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>

          <Dialog.Close
            className="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink-700 shadow-sm hover:bg-white hover:text-ink-950"
            aria-label="Close"
          >
            <X className="size-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
