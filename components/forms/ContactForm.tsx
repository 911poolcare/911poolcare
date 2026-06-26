"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { serviceOptions } from "@/content/services";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: defaultService ?? "",
      city: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please call us instead.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please call us instead.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-slate-900">Request received!</h3>
        <p className="mt-2 text-slate-600">
          We&apos;ll be in touch shortly. For urgent issues, call us directly.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} className="sm:col-span-1">
          <input
            {...register("name")}
            autoComplete="name"
            className={inputClass(errors.name)}
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message} className="sm:col-span-1">
          <input
            {...register("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass(errors.phone)}
            placeholder="(512) 555-1234"
          />
        </Field>

        <Field label="Email (optional)" error={errors.email?.message} className="sm:col-span-2">
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass(errors.email)}
            placeholder="you@email.com"
          />
        </Field>

        <Field label="Service needed" error={errors.service?.message} className="sm:col-span-1">
          <select {...register("service")} className={inputClass(errors.service)}>
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="City or ZIP" error={errors.city?.message} className="sm:col-span-1">
          <input
            {...register("city")}
            autoComplete="address-level2"
            className={inputClass(errors.city)}
            placeholder="Leander or 78641"
          />
        </Field>

        <Field label="Message (optional)" error={errors.message?.message} className="sm:col-span-2">
          <textarea
            {...register("message")}
            rows={4}
            className={inputClass(errors.message)}
            placeholder="Tell us about your pool issue..."
          />
        </Field>
      </div>

      {/* Honeypot — hidden from humans */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {status === "error" ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: unknown) {
  return [
    "w-full min-h-12 rounded-xl border bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400",
    "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
    hasError ? "border-red-400" : "border-slate-300",
  ].join(" ");
}
