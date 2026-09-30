import type { Metadata } from "next";

import { createPageMetadata } from "@/config/metadata";
import { CareersPageContent } from "@/features/careers/components/careers-page";
import { siteContent } from "@/content/site";

export const metadata: Metadata = createPageMetadata({ ...siteContent.metadata.careers, path: "/careers" });

export default async function CareersPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role = "" } = await searchParams;
  return <CareersPageContent initialRole={role} />;
}
