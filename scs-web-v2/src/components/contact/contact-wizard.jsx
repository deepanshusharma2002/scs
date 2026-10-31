"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, CircleCheck, Loader2 } from "lucide-react";
import { Icon } from "@/components/icon";
import { Field, inputClass } from "@/components/sections/quick-diagnostic-form";
import { Button } from "@/components/ui/button";
import { challenges } from "@/content/challenges";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const interests = [
  { value: "Request a demo", icon: "rocket" },
  { value: "Planning (SCAI / IBP)", icon: "brain" },
  { value: "Agentic AI", icon: "bot" },
  { value: "Transport (iTMS)", icon: "truck" },
  { value: "Execution services / 4PL", icon: "handshake" },
  { value: "Partnerships", icon: "users" },
  { value: "Other", icon: "message" },
];

const schema = z.object({
  interest: z.enum(interests.map((item) => item.value), { error: "Choose what you need" }),
  challenge: z.string().optional(),
  firstName: z.string().trim().min(1, "Please enter your first name"),
  lastName: z.string().trim().min(1, "Please enter your last name"),
  email: z.email("Please enter a valid work email"),
  company: z.string().trim().min(1, "Please enter your company"),
  jobTitle: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{0,20}$/, "Please enter a valid phone number")
    .optional(),
  region: z.string().min(1, "Choose a region"),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { error: "Please accept to continue" }),
});

const steps = [
  { title: "What you need", fields: ["interest", "challenge"] },
  { title: "About you", fields: ["firstName", "lastName", "email", "company", "jobTitle", "phone"] },
  { title: "Details", fields: ["region", "message", "consent"] },
];

/** Three short steps instead of one long form; each step validates before moving on. */
export function ContactWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(null);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { interest: "Request a demo", challenge: "", region: "" },
    mode: "onTouched",
  });
  const interest = useWatch({ control, name: "interest" });
  const challenge = useWatch({ control, name: "challenge" });

  const next = async () => {
    if (await trigger(steps[step].fields)) setStep((value) => value + 1);
  };

  const onSubmit = async (values) => {
    // Submission is stubbed until a CRM / API endpoint is available.
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info("Contact form submitted", values);
    setSubmitted(values);
    reset();
    setStep(0);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-navy-900/10 bg-white p-10 text-center shadow-float md:p-14" role="status">
        <CircleCheck className="mx-auto size-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">Thanks, {submitted.firstName}!</h2>
        <p className="mx-auto mt-3 max-w-sm text-navy-600">
          Your request about <strong className="text-navy-900">{submitted.interest}</strong> is with our team.
          We&apos;ll reply to {submitted.email} within one business day.
        </p>
        <ol className="mx-auto mt-8 max-w-sm space-y-2 text-left text-sm text-navy-700">
          {["We review your request and match an expert", "You get a calendar link for a 30-minute call", "We prepare using your industry and challenge"].map((item, index) => (
            <li key={item} className="flex gap-3 rounded-lg bg-paper px-4 py-3">
              <span className="font-mono text-azure-700">0{index + 1}</span> {item}
            </li>
          ))}
        </ol>
        <Button variant="outline" className="mt-8" onClick={() => setSubmitted(null)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-navy-900/10 bg-white shadow-float">
      <ol className="flex border-b border-navy-900/8" aria-label="Form progress">
        {steps.map((entry, index) => (
          <li
            key={entry.title}
            aria-current={index === step ? "step" : undefined}
            className={cn(
              "relative flex flex-1 items-center gap-2 px-4 py-4 text-xs font-semibold md:px-6 md:text-sm",
              index === step ? "text-navy-950" : index < step ? "text-emerald-700" : "text-navy-400",
            )}
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full font-mono text-[0.6875rem]",
                index === step && "bg-navy-900 text-white",
                index < step && "bg-emerald-500 text-white",
                index > step && "bg-navy-100 text-navy-500",
              )}
            >
              {index < step ? <Check className="size-3.5" aria-hidden /> : index + 1}
            </span>
            <span className="hidden sm:inline">{entry.title}</span>
            {index === step && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-azure-600" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="p-6 md:p-8">
        {step === 0 && (
          <fieldset key="step-0" className="animate-rise">
            <legend className="font-display text-xl font-bold text-navy-950">What can we help you with?</legend>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {interests.map((item) => {
                const selected = interest === item.value;
                return (
                  <label
                    key={item.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-azure-500",
                      selected ? "border-azure-600 bg-azure-50 text-azure-800" : "border-navy-900/10 text-navy-700 hover:border-navy-900/25",
                    )}
                  >
                    <input type="radio" value={item.value} {...register("interest")} className="sr-only" />
                    <span className={cn("grid size-8 place-items-center rounded-lg", selected ? "bg-azure-600 text-white" : "bg-navy-50 text-navy-500")}>
                      <Icon name={item.icon} className="size-4" />
                    </span>
                    {item.value}
                    {selected && <Check className="ml-auto size-4" aria-hidden />}
                  </label>
                );
              })}
            </div>
            {errors.interest && <p className="mt-2 text-sm text-red-600">{errors.interest.message}</p>}

            <p className="mt-8 text-sm font-medium text-navy-800">
              Biggest challenge right now <span className="font-normal text-navy-400">(optional)</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {challenges.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={challenge === item.problem}
                  onClick={() => setValue("challenge", challenge === item.problem ? "" : item.problem)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    challenge === item.problem ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/10 text-navy-600 hover:border-navy-900/25",
                  )}
                >
                  {item.problem}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset key="step-1" className="animate-rise">
            <legend className="font-display text-xl font-bold text-navy-950">Tell us about you</legend>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" error={errors.firstName?.message} required>
                <input {...register("firstName")} autoComplete="given-name" className={inputClass(errors.firstName)} />
              </Field>
              <Field label="Last name" error={errors.lastName?.message} required>
                <input {...register("lastName")} autoComplete="family-name" className={inputClass(errors.lastName)} />
              </Field>
              <Field label="Work email" error={errors.email?.message} required>
                <input {...register("email")} type="email" autoComplete="email" className={inputClass(errors.email)} />
              </Field>
              <Field label="Company" error={errors.company?.message} required>
                <input {...register("company")} autoComplete="organization" className={inputClass(errors.company)} />
              </Field>
              <Field label="Job title" error={errors.jobTitle?.message}>
                <input {...register("jobTitle")} autoComplete="organization-title" className={inputClass(errors.jobTitle)} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} type="tel" autoComplete="tel" className={inputClass(errors.phone)} />
              </Field>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset key="step-2" className="animate-rise">
            <legend className="font-display text-xl font-bold text-navy-950">A few details</legend>
            <div className="mt-5 grid gap-4">
              <Field label="Region" error={errors.region?.message} required>
                <select {...register("region")} className={inputClass(errors.region)}>
                  <option value="">Select a region</option>
                  {[...siteConfig.regions, "Other"].map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              </Field>
              <Field label="How can we help?" error={errors.message?.message}>
                <textarea {...register("message")} rows={5} className={cn(inputClass(errors.message), "h-auto py-3")} placeholder="A sentence or two about your goals helps us bring the right expert." />
              </Field>
              <label className="flex items-start gap-3 text-sm text-navy-600">
                <input type="checkbox" {...register("consent")} className="mt-0.5 size-4 shrink-0 accent-azure-600" />
                <span>I agree to 3SC processing my information to respond to my enquiry, in line with the privacy policy.</span>
              </label>
              {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-navy-900/8 pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((value) => value - 1)}>
              <ArrowLeft /> Back
            </Button>
          ) : (
            <span className="font-mono text-xs text-navy-400">Takes about a minute</span>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" variant="navy" onClick={next}>
              Continue <ArrowRight />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSubmitting ? "Sending…" : "Send request"}
              {!isSubmitting && <ArrowRight />}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
