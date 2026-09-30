import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal/legal-page";
import { createPageMetadata } from "@/config/metadata";
import { termsOfServiceContent } from "@/content/legal";
import { siteContent } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  ...siteContent.metadata.terms,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return <LegalPage content={termsOfServiceContent} />;
}
