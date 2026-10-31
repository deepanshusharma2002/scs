"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { challenges } from "@/content/challenges";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.email("Please enter a valid work email"),
  company: z.string().trim().min(1, "Please enter your company"),
  challenge: z.string().min(1, "Pick the closest challenge"),
});

export function QuickDiagnosticForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { challenge: challenges[0].problem } });

  const onSubmit = async (values) => {
    // Submission is stubbed until a CRM / API endpoint is available.
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("Diagnostic requested", values);
    setDone(true);
    reset();
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-navy-900" role="status">
        <CircleCheck className="mx-auto size-12 text-emerald-500" aria-hidden />
        <p className="mt-4 font-display text-2xl font-bold">You&apos;re booked in</p>
        <p className="mt-2 text-navy-600">A 3SC expert will contact you within one business day to pick a time.</p>
        <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>
          Book another session
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl bg-white p-6 text-navy-900 shadow-float md:p-8"
    >
      <p className="font-display text-xl font-bold">Request your diagnostic</p>
      <p className="mt-1 text-sm text-navy-500">Takes 30 seconds. We reply within one business day.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} autoComplete="name" className={inputClass(errors.name)} />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input {...register("email")} type="email" autoComplete="email" className={inputClass(errors.email)} />
        </Field>
        <Field label="Company" error={errors.company?.message} className="sm:col-span-2">
          <input {...register("company")} autoComplete="organization" className={inputClass(errors.company)} />
        </Field>
        <Field label="Biggest challenge right now" error={errors.challenge?.message} className="sm:col-span-2">
          <select {...register("challenge")} className={inputClass(errors.challenge)}>
            {challenges.map((challenge) => (
              <option key={challenge.id}>{challenge.problem}</option>
            ))}
            <option>Something else</option>
          </select>
        </Field>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : null}
        {isSubmitting ? "Sending…" : "Book my diagnostic"}
        {!isSubmitting && <ArrowRight />}
      </Button>
      <p className="mt-3 text-center text-xs text-navy-500">
        By submitting you agree to be contacted about your request.
      </p>
    </form>
  );
}

export function inputClass(error) {
  return cn(
    "h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-navy-900 transition-colors outline-none placeholder:text-navy-300 focus:border-azure-500 focus:ring-4 focus:ring-azure-500/10",
    error ? "border-red-400" : "border-navy-900/15",
  );
}

export function Field({ label, error, required, className, children }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-navy-800">
        {label}
        {required && <span className="text-signal-600"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
