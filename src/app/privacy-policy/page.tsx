import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal/legal-page";
import { createPageMetadata } from "@/config/metadata";
import { privacyPolicyContent } from "@/content/legal";
import { siteContent } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  ...siteContent.metadata.privacy,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicyContent} />;
}
