import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudies } from "@/components/sections/home/case-studies";
import { Creators } from "@/components/sections/home/creators";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/service/hero";
import { HowVynoxSolves } from "@/components/sections/service/how-vynox-solves";
import { Momentum } from "@/components/sections/service/momentum";
import { Problems } from "@/components/sections/service/problems";
import { Solutions } from "@/components/sections/service/solutions";
import { Stats } from "@/components/sections/service/stats";
import { WhatCreatorsHoldBack } from "@/components/sections/service/what-creators-hold-back";
import { ASSETS } from "@/config/assets";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES, type ServiceContent } from "@/content/services";

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) return {};

  const title = `${service.hero.titleLine} ${service.hero.accentWord}`.trim();

  return createPageMetadata({
    title,
    description: service.hero.paragraph,
    path: `/services/${slug}`,
  });
}

function VariantSection({ service }: { service: ServiceContent }) {
  switch (service.variantSection) {
    case "problems":
      return (
        <Problems
          problems={service.problems}
        />
      );
    case "momentum":
      return <Momentum />;
    case "solutions":
      return <Solutions />;
    case "what-creators-hold-back":
      return <WhatCreatorsHoldBack />;
  }
}

function Showcase({ showcase }: { showcase: ServiceContent["showcase"] }) {
  if (showcase.kind === "creators") {
    const { headingLines, accent, accentWidth, highlightWord } = showcase;
    return (
      <Creators
        headingLines={headingLines}
        accent={accent}
        accentWidth={accentWidth}
        highlightWord={highlightWord}
      />
    );
  }

  const { headingLines, headingAccent, align, showCta } = showcase;
  return (
    <CaseStudies
      headingLines={headingLines}
      headingAccent={headingAccent}
      align={align}
      showCta={showCta}
    />
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) notFound();

  return (
    <>
      <Hero
        hero={service.hero}
        imageSrc={ASSETS.services[service.hero.imageKey].hero}
        imageClassName={service.hero.imageClassName}
        showOrbitalSystem
      />
      <VariantSection service={service} />
      <HowVynoxSolves solves={service.solves} heading={service.solvesHeading} slug={service.slug} />
      <Stats stats={service.stats} {...service.statsHeading} />
      <Showcase showcase={service.showcase} />
      <SiteFooter cta={service.cta} />
    </>
  );
}
