import { z } from "zod";
import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";

const serviceValues = serviceOptions.map((s) => s.value) as [string, ...string[]];
const referralValues = referralSourceOptions.map((s) => s.value) as [
  string,
  ...string[],
];

export const contactAttachmentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  contentType: z.string().min(1),
});

const contactFieldsSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  services: z
    .array(z.enum(serviceValues))
    .min(1, "Please select at least one service"),
  street: z.string().min(3, "Please enter your street address"),
  city: z.string().min(2, "Please enter your city"),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Please enter a 2-letter state"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  message: z.string().max(2000).optional().or(z.literal("")),
  referralSource: z.union([z.enum(referralValues), z.literal("")]).optional(),
  referralSourceOther: z.string().max(120).optional().or(z.literal("")),
  referringPartnerCompany: z.string().max(120).optional().or(z.literal("")),
  attachments: z.array(contactAttachmentSchema).max(6).optional(),
  website: z.string().max(0).optional(),
});

export const contactFormFieldsSchema = contactFieldsSchema
  .omit({
    services: true,
    attachments: true,
  })
  .superRefine((data, ctx) => {
    if (data.referralSource === "other" && !data.referralSourceOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please tell us how you found us",
        path: ["referralSourceOther"],
      });
    }
  });

export const contactSchema = contactFieldsSchema.superRefine((data, ctx) => {
  if (data.referralSource === "other" && !data.referralSourceOther?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please tell us how you found us",
      path: ["referralSourceOther"],
    });
  }
});

export type ContactFormData = z.infer<typeof contactFieldsSchema>;

export type ContactFormFields = z.infer<typeof contactFormFieldsSchema>;

export type ContactAttachment = z.infer<typeof contactAttachmentSchema>;
