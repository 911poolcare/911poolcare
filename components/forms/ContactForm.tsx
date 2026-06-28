"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@vercel/blob/client";
import { Loader2, CheckCircle2, X } from "lucide-react";
import {
  contactAttachmentLimits,
  referralSourceOptions,
} from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import { validateAttachmentFiles } from "@/lib/contact/attachments";
import { formatPhoneInput } from "@/lib/contact/phone";
import { isGooglePlacesConfigured } from "@/lib/google/load-maps";
import type { ParsedAddress } from "@/lib/google/parse-address";
import {
  contactFormFieldsSchema,
  contactSchema,
  type ContactAttachment,
  type ContactFormFields,
  type ContactFormData,
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";

const AddressAutocompleteInput = dynamic(
  () =>
    import("@/components/forms/AddressAutocompleteInput").then(
      (mod) => mod.AddressAutocompleteInput,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="address-autocomplete-host min-h-12 animate-pulse rounded-xl border border-slate-300 bg-slate-50" />
    ),
  },
);

type FormFields = ContactFormFields;

export function ContactForm({
  defaultService,
  variant = "default",
}: {
  defaultService?: string;
  variant?: "default" | "partner";
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(
    defaultService ? [defaultService] : [],
  );
  const [serviceError, setServiceError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(contactFormFieldsSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "TX",
      zip: "",
      message: "",
      referralSource: "",
      referralSourceOther: "",
      referringPartnerCompany: "",
      website: "",
    },
  });

  const referralSource = watch("referralSource");
  const showReferralOther = referralSource === "other";
  const addressAutocompleteEnabled = isGooglePlacesConfigured();
  const [autocompleteUnavailable, setAutocompleteUnavailable] = useState(false);
  const showAddressAutocomplete = addressAutocompleteEnabled && !autocompleteUnavailable;

  const handleAddressSelect = useCallback(
    (address: ParsedAddress) => {
      setValue("street", address.street, { shouldValidate: true, shouldDirty: true });
      setValue("city", address.city, { shouldValidate: true, shouldDirty: true });
      setValue("state", address.state, { shouldValidate: true, shouldDirty: true });
      setValue("zip", address.zip, { shouldValidate: true, shouldDirty: true });
    },
    [setValue],
  );

  const totalFileSizeMb = useMemo(() => {
    const bytes = files.reduce((sum, file) => sum + file.size, 0);
    return (bytes / (1024 * 1024)).toFixed(1);
  }, [files]);

  function toggleService(value: string) {
    setServiceError("");
    setSelectedServices((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    const combined = [...files, ...selected];
    const validationError = validateAttachmentFiles(combined);
    if (validationError) {
      setFileError(validationError);
      return;
    }
    setFileError("");
    setFiles(combined);
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setFileError("");
  }

  async function uploadAttachments(): Promise<ContactAttachment[]> {
    if (!files.length) return [];

    const uploads = await Promise.all(
      files.map(async (file) => {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/contact/upload",
        });

        return {
          name: file.name,
          url: blob.url,
          contentType: file.type || "application/octet-stream",
        };
      }),
    );

    return uploads;
  }

  async function onSubmit(fields: FormFields) {
    if (!selectedServices.length) {
      setServiceError("Please select at least one service.");
      return;
    }

    const attachmentValidation = validateAttachmentFiles(files);
    if (attachmentValidation) {
      setFileError(attachmentValidation);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    setServiceError("");
    setFileError("");

    try {
      const attachments = await uploadAttachments().catch((error) => {
        console.error("[contact] attachment upload failed", error);
        throw new Error(
          "We couldn't upload your photos or videos. Please try again or call us directly.",
        );
      });

      const payload: ContactFormData = {
        ...fields,
        services: selectedServices as ContactFormData["services"],
        attachments: attachments.length ? attachments : undefined,
      };

      const parsed = contactSchema.safeParse(payload);
      if (!parsed.success) {
        throw new Error("Please check the form and try again.");
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ?? "Something went wrong. Please call us instead.",
        );
      }

      setStatus("success");
      reset();
      setSelectedServices(defaultService ? [defaultService] : []);
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us instead.",
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
      <p className="mb-5 text-sm text-slate-500">
        Fields marked with <span className="text-red-600">*</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name?.message} className="sm:col-span-1">
          <input
            {...register("name")}
            autoComplete="name"
            className={inputClass(errors.name)}
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone" required error={errors.phone?.message} className="sm:col-span-1">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputClass(errors.phone)}
                placeholder="(512) 555-1234"
                onChange={(event) => field.onChange(formatPhoneInput(event.target.value))}
              />
            )}
          />
        </Field>

        <Field label="Email" required error={errors.email?.message} className="sm:col-span-2">
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass(errors.email)}
            placeholder="you@email.com"
          />
        </Field>

        {variant === "partner" ? (
          <Field
            label="Your company name (referring partner)"
            error={errors.referringPartnerCompany?.message}
            className="sm:col-span-2"
          >
            <input
              {...register("referringPartnerCompany")}
              autoComplete="organization"
              className={inputClass(errors.referringPartnerCompany)}
              placeholder="ABC Pool Company"
            />
            <p className="mt-2 text-xs text-slate-500">
              Optional — helps us credit the referral to your business.
            </p>
          </Field>
        ) : null}

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-slate-700">
            Services needed <RequiredMark />
          </p>
          <p className="mb-3 text-sm text-slate-500">Select all that apply.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((option) => {
              const checked = selectedServices.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                    checked
                      ? "border-brand-500 bg-brand-50"
                      : "border-slate-300 hover:border-slate-400",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    checked={checked}
                    onChange={() => toggleService(option.value)}
                  />
                  <span className="text-slate-800">{option.label}</span>
                </label>
              );
            })}
          </div>
          {serviceError ? (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {serviceError}
            </p>
          ) : null}
        </div>

        <Field
          label="Street address"
          required
          error={errors.street?.message}
          className="sm:col-span-2"
        >
          {showAddressAutocomplete ? (
            <>
              <input type="hidden" {...register("street")} />
              <AddressAutocompleteInput
                onAddressSelect={handleAddressSelect}
                onInitFailure={() => setAutocompleteUnavailable(true)}
                hasError={!!errors.street}
                placeholder="Start typing your address..."
              />
            </>
          ) : (
            <input
              {...register("street")}
              autoComplete="street-address"
              className={inputClass(errors.street)}
              placeholder="123 Main St"
            />
          )}
          <p className="mt-2 text-xs text-slate-500">
            {showAddressAutocomplete
              ? "Select your address from the suggestions — city, state, and ZIP fill in automatically."
              : "Enter your full street address."}
          </p>
        </Field>

        <Field label="City" required error={errors.city?.message} className="sm:col-span-1">
          <input
            {...register("city")}
            autoComplete="address-level2"
            className={inputClass(errors.city)}
            placeholder="Leander"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4 sm:col-span-1">
          <Field label="State" required error={errors.state?.message}>
            <input
              {...register("state")}
              autoComplete="address-level1"
              className={inputClass(errors.state)}
              placeholder="TX"
            />
          </Field>
          <Field label="ZIP" required error={errors.zip?.message}>
            <input
              {...register("zip")}
              inputMode="numeric"
              autoComplete="postal-code"
              className={inputClass(errors.zip)}
              placeholder="78641"
            />
          </Field>
        </div>

        <Field
          label="Describe your issue"
          required
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            rows={4}
            className={inputClass(errors.message)}
            placeholder="Tell us what's going on with your pool..."
          />
        </Field>

        <Field
          label="Photos or videos (optional)"
          error={fileError}
          className="sm:col-span-2"
        >
          <input
            type="file"
            accept={contactAttachmentLimits.accept}
            multiple
            onChange={handleFilesSelected}
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
          <p className="mt-2 text-xs text-slate-500">
            Up to {contactAttachmentLimits.maxFiles} files,{" "}
            {contactAttachmentLimits.maxFileSizeMb}MB each. Photos and videos help us
            prepare for your visit.
            {files.length ? ` Selected: ${totalFileSizeMb}MB total.` : null}
          </p>
          {files.length ? (
            <ul className="mt-3 space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <span className="truncate pr-3">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 text-slate-500 hover:text-slate-800"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </Field>

        {variant === "default" ? (
          <Field
            label="How did you find us? (optional)"
            error={errors.referralSource?.message}
            className="sm:col-span-2"
          >
            <select {...register("referralSource")} className={inputClass(errors.referralSource)}>
              <option value="">Select one</option>
              {referralSourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {variant === "default" && showReferralOther ? (
          <Field
            label="Please specify"
            required
            error={errors.referralSourceOther?.message}
            className="sm:col-span-2"
          >
            <input
              {...register("referralSourceOther")}
              className={inputClass(errors.referralSourceOther)}
              placeholder="How did you hear about us?"
            />
          </Field>
        ) : null}
      </div>

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

      <p className="mt-6 text-sm text-slate-600">
        We typically respond during business hours within one business day.
      </p>

      <Button
        type="submit"
        size="lg"
        className="mt-3 w-full sm:w-auto"
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

function RequiredMark() {
  return <span className="text-red-600">*</span>;
}

function Field({
  label,
  required = false,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required ? (
          <>
            {" "}
            <RequiredMark />
          </>
        ) : null}
      </label>
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
