import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Shell } from "@/components/ui/shell";
import { ASSETS } from "@/config/assets";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";
import { servicesOverviewContent } from "@/content/services-overview";

export const metadata: Metadata = createPageMetadata({
  ...servicesOverviewContent.metadata,
  path: "/services",
});

const services = Object.values(SERVICES);

export default function ServicesOverviewPage() {
  const { hero, catalog, footerCta } = servicesOverviewContent;

  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden bg-bg pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-48">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-[420px] max-w-5xl bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.2)_0%,transparent_68%)] blur-3xl"
          />
          <Shell>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
            <div className="mx-auto mt-14 max-w-4xl text-center lg:mt-20">
              <EyebrowBadge>{hero.eyebrow}</EyebrowBadge>
              <h1 className="mt-6 font-vastago text-h1 font-bold leading-[1.05] tracking-[-0.03em] text-white">
                {hero.headingPrefix}{" "}
                <span className="text-[#bb8bfe]">{hero.headingAccent}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-subtext sm:text-sm">
                {hero.description}
              </p>
            </div>
          </Shell>
        </section>

        <section className="relative isolate overflow-hidden bg-bg pb-24 lg:pb-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-48 top-20 -z-10 size-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--color-glow-primary-rgb)/0.13)_0%,transparent_68%)] blur-3xl"
          />
          <Shell>
            <div className="mb-10 max-w-2xl lg:mb-14">
              <p className="font-caveat text-xl text-primary-light">{catalog.eyebrow}</p>
              <h2 className="mt-2 font-vastago text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                {catalog.heading}
              </h2>
              <p className="mt-4 font-inter leading-relaxed text-subtext">
                {catalog.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
              {services.map((service) => {
                const title = `${service.hero.titleLine} ${service.hero.accentWord}`.trim();
                const image = ASSETS.services[service.hero.imageKey].hero;

                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <div className="relative aspect-[16/8.5] overflow-hidden bg-black/20">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0a0b]/75 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <p className="font-inter text-xs font-medium uppercase tracking-[0.14em] text-primary-light">
                        {service.solves.title}
                      </p>
                      <h3 className="mt-3 font-vastago text-2xl font-semibold text-white sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-xl font-inter leading-relaxed text-subtext">
                        {service.hero.paragraph}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 font-inter text-sm font-semibold text-white transition-colors group-hover:text-primary-light">
                        {catalog.cardCta}
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Shell>
        </section>
      </main>
      <SiteFooter cta={footerCta} />
    </>
  );
}
