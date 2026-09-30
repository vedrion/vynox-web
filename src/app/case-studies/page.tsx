import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/sections/case-studies/hero";
import { CaseStudies } from "@/components/sections/home/case-studies";
import { AllCampaignsGrid } from "@/components/sections/case-studies/all-campaigns-grid";
import { caseStudiesCtaContent } from "@/content/case-studies";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteContent } from "@/content/site";
import { FEATURES } from "@/config/features";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  ...siteContent.metadata.caseStudies,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  if (!FEATURES.caseStudies) notFound();

  return (
    <>
      <Hero />
      <CaseStudies
        headingLines={["Work we're"]}
        headingAccent="proud of."
        showCta={false}
      />
      <AllCampaignsGrid />
      <SiteFooter cta={caseStudiesCtaContent} />
    </>
  );
}
