import type { MetadataRoute } from "next";

import { siteConfig, staticRoutes } from "@/config/site";
import { FEATURES } from "@/config/features";
import { CASE_STUDY_DETAILS } from "@/content/case-studies";
import { careerRoles } from "@/content/careers";
import { SERVICES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));

  const services = Object.keys(SERVICES).map((slug) => ({
    url: new URL(`/services/${slug}`, siteConfig.url).toString(),
  }));

  const openCareerRoles = careerRoles
    .filter((role) => role.status === "open")
    .map((role) => ({ url: new URL(`/careers/${role.id}`, siteConfig.url).toString() }));

  const caseStudies = FEATURES.caseStudies
    ? Object.keys(CASE_STUDY_DETAILS).map((id) => ({
      url: new URL(`/case-studies/${id}`, siteConfig.url).toString(),
    }))
    : [];

  const uniqueEntries = new Map(
    [...pages, ...services, ...caseStudies, ...openCareerRoles].map((entry) => [entry.url, entry]),
  );

  return [...uniqueEntries.values()];
}
