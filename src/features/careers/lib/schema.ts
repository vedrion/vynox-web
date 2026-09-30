import { z } from "zod";
import { careerRoles, careersContent } from "@/content/careers";

const fields = careersContent.form.fields;
const requiredText = (label: string, max = 300) => z.string().trim().min(1, careersContent.form.errors.required(label)).max(max, careersContent.form.errors.required(label));
const optionalText = (max = 300) => z.string().trim().max(max).optional().or(z.literal(""));
const safeUrl = z.string().trim().url(careersContent.form.errors.invalidUrl).refine((value) => /^https?:\/\//i.test(value), careersContent.form.errors.invalidUrl);

export const careerApplicationSchema = z.object({
  role: requiredText(fields.role.label).refine((value) => careerRoles.some((role) => role.id === value && role.status === "open"), careersContent.form.errors.invalidOption),
  fullName: requiredText(fields.fullName.label, 120),
  email: z.string().trim().min(1, careersContent.form.errors.required(fields.email.label)).pipe(z.email(careersContent.form.errors.invalidEmail)),
  phone: optionalText(40),
  experience: z.string().refine((value) => (fields.experience.options as readonly string[]).includes(value), careersContent.form.errors.invalidOption),
  resumeUrl: safeUrl,
  linkedinUrl: z.union([safeUrl, z.literal("")]).optional(),
  source: z.union([z.enum(fields.source.options), z.literal("")]).optional(),
  coverLetter: requiredText(fields.coverLetter.label, 4000),
  consent: z.literal("yes", { error: careersContent.form.errors.consent }),
});

export type CareerApplication = z.infer<typeof careerApplicationSchema>;

export function parseCareerApplication(formData: FormData) {
  const raw = Object.fromEntries(Array.from(formData.entries()).filter(([, value]) => typeof value === "string"));
  const result = careerApplicationSchema.safeParse(raw);
  if (result.success) return { ok: true as const, data: result.data };

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false as const, errors };
}
