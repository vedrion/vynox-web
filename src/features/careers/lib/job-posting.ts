import { siteConfig } from "@/config/site";
import { ASSETS } from "@/config/assets";
import type { CareerRole } from "@/content/careers";

export function getJobPostingStructuredData(role: CareerRole) {
  const posting = role.jobPosting;

  if (
    role.status !== "open" ||
    !posting?.datePosted ||
    !posting.applicantCountry
  ) {
    return null;
  }

  const description = [
    `<p>${role.summary}</p>`,
    "<p>Responsibilities:</p>",
    `<ul>${role.responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>`,
    "<p>Qualifications:</p>",
    `<ul>${role.qualifications.map((item) => `<li>${item}</li>`).join("")}</ul>`,
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description,
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.name,
      value: role.id,
    },
    datePosted: posting.datePosted,
    employmentType: role.employmentType === "Full-time" ? "FULL_TIME" : role.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: new URL(ASSETS.navbar.logo, siteConfig.url).toString(),
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: posting.applicantCountry,
    },
  };
}
