import { z } from "zod";
import { serviceOptions } from "@/content/services";

const serviceValues = serviceOptions.map((s) => s.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select a service")
    .refine((value) => serviceValues.includes(value as (typeof serviceValues)[number]), {
      message: "Please select a service",
    }),
  city: z.string().min(2, "Please enter your city or zip"),
  message: z.string().max(1000).optional(),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;
