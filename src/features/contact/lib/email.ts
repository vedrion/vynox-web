import {
  businessFields,
  contactEmailContent,
  creatorFields,
} from "@/content/contact";

import type { ContactSubmission } from "./schema";
import { siteContent } from "@/content/site";

export interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

interface Row {
  label: string;
  value: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const name = MONTHS[month - 1];
  return name ? `${name} ${day}, ${year}` : iso;
}

export function submissionRows(data: ContactSubmission): Row[] {
  const fields =
    data.type === "business"
      ? (businessFields as Record<string, { label: string }>)
      : (creatorFields as Record<string, { label: string }>);

  const record = data as unknown as Record<string, string | undefined>;

  return Object.entries(fields).flatMap(([key, field]) => {
    const value = record[key];
    return value ? [{ label: field.label, value }] : [];
  });
}

function scheduleRow(data: ContactSubmission): Row | null {
  if (!data.scheduleDate && !data.scheduleTime) return null;

  const parts = [
    data.scheduleDate ? formatDate(data.scheduleDate) : null,
    data.scheduleTime ?? null,
  ].filter(Boolean);

  return {
    label: contactEmailContent.notification.scheduleHeading,
    value: parts.join(" · "),
  };
}

export function submissionName(data: ContactSubmission) {
  return data.type === "business" ? data.fullName : data.name;
}

function rowsToText(rows: Row[]) {
  return rows.map((row) => `${row.label}: ${row.value}`).join("\n");
}

function rowsToHtml(rows: Row[], accent: string) {
  return rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid ${accent};font:600 13px/1.4 Helvetica,Arial,sans-serif;color:#b8a5d6;vertical-align:top;white-space:nowrap;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid ${accent};font:400 14px/1.5 Helvetica,Arial,sans-serif;color:#ffffff;">${escapeHtml(row.value).replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");
}

function shell(heading: string, inner: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#08040d;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#100a1a;border:1px solid rgba(138,43,225,0.35);border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:20px 24px;background:linear-gradient(180deg,#8a2be1,#5c03ae);">
          <p style="margin:0;font:700 18px/1.3 Helvetica,Arial,sans-serif;color:#ffffff;">${escapeHtml(siteContent.brand.name)}</p>
          <p style="margin:4px 0 0;font:400 13px/1.4 Helvetica,Arial,sans-serif;color:rgba(255,255,255,0.8);">${escapeHtml(heading)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 8px 20px;">
          ${inner}
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildNotificationEmail(data: ContactSubmission): EmailPayload {
  const { notification } = contactEmailContent;
  const rows = submissionRows(data);
  const meeting = scheduleRow(data);
  const allRows = meeting ? [...rows, meeting] : rows;

  const subject = `${notification.subjectPrefix[data.type]} — ${submissionName(data)}`;

  const html = shell(
    notification.heading[data.type],
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsToHtml(allRows, "rgba(138,43,225,0.18)")}</table>`,
  );

  return {
    subject,
    html,
    text: `${notification.heading[data.type]}\n\n${rowsToText(allRows)}`,
  };
}

export function buildAutoReplyEmail(data: ContactSubmission): EmailPayload {
  const { autoReply } = contactEmailContent;
  const rows = submissionRows(data);
  const meeting = scheduleRow(data);
  const allRows = meeting ? [...rows, meeting] : rows;

  const intro = `
    <div style="padding:16px 16px 4px;">
      <p style="margin:0 0 8px;font:700 20px/1.3 Helvetica,Arial,sans-serif;color:#ffffff;">${escapeHtml(autoReply.heading)}, ${escapeHtml(submissionName(data))}</p>
      <p style="margin:0 0 16px;font:400 14px/1.6 Helvetica,Arial,sans-serif;color:#c9bcdd;">${escapeHtml(autoReply.body)}</p>
      <p style="margin:0 0 8px;font:600 13px/1.4 Helvetica,Arial,sans-serif;color:#b063ff;text-transform:uppercase;letter-spacing:0.06em;">${escapeHtml(autoReply.summaryHeading)}</p>
    </div>`;

  const html = shell(
    autoReply.heading,
    `${intro}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsToHtml(allRows, "rgba(138,43,225,0.18)")}</table>
     <p style="margin:16px;font:400 13px/1.5 Helvetica,Arial,sans-serif;color:#8b7ba3;">${escapeHtml(autoReply.signOff)}</p>`,
  );

  return {
    subject: autoReply.subject,
    html,
    text: `${autoReply.heading}, ${submissionName(data)}\n\n${autoReply.body}\n\n${autoReply.summaryHeading}\n${rowsToText(allRows)}\n\n${autoReply.signOff}`,
  };
}
