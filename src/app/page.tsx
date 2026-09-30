import type { Metadata } from "next";

import { Hero } from "@/components/sections/home/hero";
import { Brands } from "@/components/sections/home/brands";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { Services } from "@/components/sections/home/services";
import { Creators } from "@/components/sections/home/creators";
import { Stats } from "@/components/sections/home/stats";
import { SetsApart } from "@/components/sections/home/sets-apart";
import { CaseStudies } from "@/components/sections/home/case-studies";
import { Testimonials } from "@/components/sections/home/testimonials";
import { SiteFooter } from "@/components/layout/site-footer";
import { ASSETS } from "@/config/assets";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": new URL("/#organization", siteConfig.url).toString(),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL(ASSETS.navbar.logo, siteConfig.url).toString(),
  sameAs: Object.values(siteContent.brand.socialProfiles).map(({ href }) => href),
  description: siteConfig.description,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "business inquiries",
    email: siteContent.footer.email.label,
  },
};

export const metadata: Metadata = createPageMetadata({
  ...siteContent.metadata.home,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Brands />
      <HowItWorks />
      <Services />
      <Creators />
      <Stats />
      <SetsApart />
      <CaseStudies />
      <Testimonials />
      <SiteFooter />
    </>
  );
}
