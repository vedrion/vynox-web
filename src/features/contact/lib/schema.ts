import { z } from "zod";

import {
  businessServices,
  contactMethods,
  nicheOptions,
  platformOptions,
  projectTypes,
  timeSlots,
  contactValidationContent,
} from "@/content/contact";

const required = (label: string) =>
  z
    .string()
    .trim()
    .min(1, contactValidationContent.required(label))
    .max(500, contactValidationContent.tooLong(label));

const oneOf = (label: string, options: readonly string[]) =>
  z
    .string()
    .trim()
    .min(1, contactValidationContent.required(label))
    .refine((v) => options.includes(v), contactValidationContent.invalidOption(label));

const email = z
  .string()
  .trim()
  .min(1, contactValidationContent.required("Email"))
  .pipe(z.email(contactValidationContent.invalidEmail));

const message = (label: string) =>
  z
    .string()
    .trim()
    .min(10, contactValidationContent.minimumLength(label, 10))
    .max(4000, contactValidationContent.tooLong(label));

const schedule = {
  scheduleDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, contactValidationContent.invalidDate)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  scheduleTime: z
    .string()
    .trim()
    .refine((v) => timeSlots.includes(v), contactValidationContent.invalidTime)
    .optional()
    .or(z.literal("").transform(() => undefined)),
};

export const businessSchema = z.object({
  type: z.literal("business"),
  fullName: required("Full Name"),
  email,
  brandName: required("Brand Name"),
  service: oneOf("Service", businessServices),
  campaign: message("Campaign details"),
  ...schedule,
});

export const creatorSchema = z.object({
  type: z.literal("creator"),
  name: required("Name"),
  email,
  platform: oneOf("Platform", platformOptions),
  niche: oneOf("Niche", nicheOptions),
  audienceSize: required("Audience Size"),
  projectType: oneOf("Project Type", projectTypes),
  preferredContact: oneOf("Preferred Contact", contactMethods).optional(),
  details: message("Additional Details"),
  ...schedule,
});

export const contactSchema = z.discriminatedUnion("type", [
  businessSchema,
  creatorSchema,
]);

export type BusinessSubmission = z.infer<typeof businessSchema>;
export type CreatorSubmission = z.infer<typeof creatorSchema>;
export type ContactSubmission = z.infer<typeof contactSchema>;

export type FieldErrors = Record<string, string>;

export function parseContactSubmission(formData: FormData):
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: FieldErrors } {
  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(
      ([, value]) => typeof value === "string",
    ),
  );

  const result = contactSchema.safeParse(raw);

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return { ok: false, errors };
}
