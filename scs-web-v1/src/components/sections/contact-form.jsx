"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const interests = [
  "Request a demo",
  "Planning (SCAI / IBP)",
  "Agentic AI",
  "Transport (iTMS)",
  "Execution services / 4PL",
  "Partnerships",
  "Other",
];

const schema = z.object({
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
  interest: z.enum(interests),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { error: "Please accept to continue" }),
});

export function ContactForm({ defaultInterest }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { interest: defaultInterest ?? "Request a demo" },
  });
  const onSubmit = async (values) => {
    // Submission is stubbed until a CRM / API endpoint is available.
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info("Contact form submitted", values);
    setSubmitted(true);
    reset();
  };
  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-ink-900/10 bg-white p-12 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
          <CircleCheck className="size-8" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-ink-900">Thank you!</h3>
        <p className="mt-3 max-w-sm text-ink-600/80">
          Our team will get back to you within one business day.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-ink-900/10 bg-white p-8 shadow-[0_30px_60px_-30px_rgb(10_10_10/0.3)] md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message} required>
          <input
            {...register("firstName")}
            autoComplete="given-name"
            className={inputClass(errors.firstName)}
          />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} required>
          <input
            {...register("lastName")}
            autoComplete="family-name"
            className={inputClass(errors.lastName)}
          />
        </Field>
        <Field label="Work email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Company" error={errors.company?.message} required>
          <input
            {...register("company")}
            autoComplete="organization"
            className={inputClass(errors.company)}
          />
        </Field>
        <Field label="Job title" error={errors.jobTitle?.message}>
          <input
            {...register("jobTitle")}
            autoComplete="organization-title"
            className={inputClass(errors.jobTitle)}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass(errors.phone)}
          />
        </Field>
        <Field
          label="I'm interested in"
          error={errors.interest?.message}
          className="sm:col-span-2"
          required
        >
          <select {...register("interest")} className={inputClass(errors.interest)}>
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </Field>
        <Field label="How can we help?" error={errors.message?.message} className="sm:col-span-2">
          <textarea
            {...register("message")}
            rows={4}
            className={cn(inputClass(errors.message), "h-auto py-3")}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-600">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 size-4 shrink-0 accent-brand-500"
        />
        <span>
          I agree to 3SC processing my information to respond to my enquiry, in line with the
          privacy policy.
        </span>
      </label>
      {errors.consent && <p className="mt-2 text-sm text-red-600">{errors.consent.message}</p>}

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}

function inputClass(error) {
  return cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink-900 transition-colors outline-none placeholder:text-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10",
    error ? "border-red-400" : "border-ink-900/15",
  );
}

function Field({ label, error, required, className, children }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
