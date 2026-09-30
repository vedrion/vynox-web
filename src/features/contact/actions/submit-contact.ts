"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { buildAutoReplyEmail, buildNotificationEmail } from "@/features/contact/lib/email";
import { checkRateLimit } from "@/features/contact/lib/rate-limit";
import { parseContactSubmission } from "@/features/contact/lib/schema";
import type { ContactState, SubmittedValues } from "@/features/contact/lib/state";
import { contactFormContent } from "@/content/contact";

const HONEYPOT_FIELD = "website";

function submittedValues(formData: FormData): SubmittedValues {
  const values: SubmittedValues = {};
  for (const [key, value] of formData.entries()) {
    if (key !== HONEYPOT_FIELD && typeof value === "string") {
      values[key] = value;
    }
  }
  return values;
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

async function clientKey() {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0].trim();
  if (forwarded) return forwarded;
  return list.get("x-real-ip")?.trim() || "unknown";
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { status: "success", id: crypto.randomUUID() };
  }

  const values = submittedValues(formData);

  const { allowed } = checkRateLimit(await clientKey());
  if (!allowed) {
    return {
      status: "error",
      message: contactFormContent.errors.rateLimited,
      values,
    };
  }

  const parsed = parseContactSubmission(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: contactFormContent.errors.validation,
      errors: parsed.errors,
      values,
    };
  }

  const submission = parsed.data;

  try {
    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const from = requireEnv("CONTACT_FROM_EMAIL");
    const to = requireEnv("CONTACT_TO_EMAIL");

    const notification = buildNotificationEmail(submission);
    const sent = await resend.emails.send({
      from,
      to,
      replyTo: submission.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (sent.error) throw new Error(sent.error.message);

    const autoReply = buildAutoReplyEmail(submission);
    const replied = await resend.emails.send({
      from,
      to: submission.email,
      replyTo: to,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    });

    if (replied.error) {
      throw new Error(replied.error.message);
    }

    return { status: "success", id: crypto.randomUUID() };
  } catch {
    return {
      status: "error",
      message: contactFormContent.errors.generic,
      values,
    };
  }
}
