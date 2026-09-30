"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { careerRoles, careersContent } from "@/content/careers";
import { checkRateLimit } from "@/features/contact/lib/rate-limit";
import { parseCareerApplication, type CareerApplication } from "@/features/careers/lib/schema";
import type { CareerApplicationState, CareerValues } from "@/features/careers/lib/state";

const HONEYPOT_FIELD = "website";

function valuesFrom(formData: FormData): CareerValues {
  return Object.fromEntries(Array.from(formData.entries()).filter(([key, value]) => key !== HONEYPOT_FIELD && typeof value === "string")) as CareerValues;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

async function requestKey() {
  const requestHeaders = await headers();
  return requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() || requestHeaders.get("x-real-ip")?.trim() || "unknown";
}

function notificationEmail(data: CareerApplication) {
  const role = careerRoles.find((item) => item.id === data.role)!;
  const rows: [string, string][] = [
    ["Position", role.title], ["Name", data.fullName], ["Email", data.email],
    ["Phone", data.phone || "—"], ["Experience", data.experience], ["Resume / portfolio", data.resumeUrl],
    ["LinkedIn", data.linkedinUrl || "—"], ["Source", data.source || "—"], ["Cover letter", data.coverLetter],
  ];
  const html = rows.map(([label, value]) => `<tr><th align="left" style="padding:10px;border-bottom:1px solid #352344;color:#cdb8e4">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #352344;color:#fff;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  return {
    subject: `Career application: ${role.title} — ${data.fullName}`,
    html: `<!doctype html><html><body style="margin:0;padding:24px;background:#08040d;color:#fff;font:14px Arial,sans-serif"><main style="max-width:640px;margin:auto;padding:24px;background:#100a1a;border:1px solid #352344;border-radius:14px"><h1 style="font-size:20px">New career application</h1><table style="width:100%;border-collapse:collapse">${html}</table></main></body></html>`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
  };
}

export async function submitCareerApplication(_previous: CareerApplicationState, formData: FormData): Promise<CareerApplicationState> {
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim()) return { status: "success", id: crypto.randomUUID() };

  const values = valuesFrom(formData);
  const { allowed } = checkRateLimit(await requestKey());
  if (!allowed) return { status: "error", message: careersContent.form.errors.rateLimited, values };

  const parsed = parseCareerApplication(formData);
  if (!parsed.ok) return { status: "error", message: careersContent.form.errors.validation, errors: parsed.errors, values };

  try {
    const resend = new Resend(env("RESEND_API_KEY"));
    const from = env("CAREERS_FROM_EMAIL");
    const to = process.env.CAREERS_TO_EMAIL || careersContent.email;
    const message = notificationEmail(parsed.data);
    const sent = await resend.emails.send({ from, to, replyTo: parsed.data.email, ...message });
    if (sent.error) throw new Error(sent.error.message);
    const confirmation = await resend.emails.send({
      from, to: parsed.data.email, replyTo: to,
      subject: "We received your application - Vynox Media",
      text: `Hi ${parsed.data.fullName},\n\nThank you for applying to ${careerRoles.find((role) => role.id === parsed.data.role)?.title}. We have received your application and will contact you if there is a fit.\n\n- Vynox Media`,
      html: `<p>Hi ${escapeHtml(parsed.data.fullName)},</p><p>Thank you for applying to ${escapeHtml(careerRoles.find((role) => role.id === parsed.data.role)?.title ?? "a role")} at Vynox Media. We have received your application and will contact you if there is a fit.</p><p>- Vynox Media</p>`,
    });
    if (confirmation.error) throw new Error(confirmation.error.message);
    return { status: "success", id: crypto.randomUUID() };
  } catch {
    return { status: "error", message: careersContent.form.errors.generic, values };
  }
}
