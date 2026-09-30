import { siteContent } from "@/content/site";
import { FEATURES } from "@/config/features";

export const siteConfig = {
  name: siteContent.brand.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vynoxmedia.com",
  description: siteContent.brand.description,
  twitter: siteContent.brand.socialProfiles.x.handle,
} as const;

export const staticRoutes = [
  "/",
  "/about",
  "/services",
  ...(FEATURES.caseStudies ? ["/case-studies" as const] : []),
  "/contact",
  "/careers",
  "/privacy-policy",
  "/terms-of-service",
] as const;
