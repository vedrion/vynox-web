import type { Metadata } from "next";

import { Hero } from "@/components/sections/about/hero";
import TeamSection from "@/components/sections/about/team";
import { WeShapeThem } from "@/components/sections/about/we-shape-them";
import { SiteFooter } from "@/components/layout/site-footer";
import { createPageMetadata } from "@/config/metadata";
import { siteContent } from "@/content/site";

export const metadata: Metadata = createPageMetadata({ ...siteContent.metadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <Hero />
      <TeamSection />
      <WeShapeThem />
      <SiteFooter />
    </>
  );
}
