"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { caseStudiesSectionContent } from "@/content/home";
import { FEATURED_CASES } from "@/content/case-studies";
import { fluid } from "@/lib/fluid";
import { EASE_SOFT, viewportOnce } from "@/lib/motion";
import { FEATURES } from "@/config/features";

const stagger = ["mt-0", "mt-0 lg:mt-23.75", "mt-0 lg:mt-7.5"];

interface CaseStudiesProps {
  headingLines?: string[];
  headingAccent?: string;
  ctaLabel?: string;
  showCta?: boolean;
  align?: "left" | "center";
}

export function CaseStudies({ headingLines, headingAccent, ctaLabel, showCta = true, align = "left" }: CaseStudiesProps = {}) {
  const defaults = caseStudiesSectionContent;
  const lines = headingLines ?? defaults.headingLines;
  const accent = headingAccent ?? defaults.headingAccent;
  const label = ctaLabel ?? defaults.cta.label;

  return (
    <div className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
        <div className="absolute -right-[70px] -top-[50px] h-[220px] w-[260px] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.35)_0%,transparent_70%)] blur-[35px] mix-blend-plus-lighter md:-right-[180px] md:-top-[120px] md:h-[520px] md:w-[620px] md:blur-[90px]" />

        <div className="absolute right-0 top-1/2 h-[40%] w-[260px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.35)_0%,transparent_70%)] blur-[45px] mix-blend-plus-lighter md:h-[70%] md:w-[600px] md:blur-[100px]" />

        <div className="absolute -left-[70px] bottom-[40px] h-[220px] w-[260px] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.30)_0%,transparent_70%)] blur-[35px] mix-blend-plus-lighter md:-left-[180px] md:bottom-[100px] md:h-[520px] md:w-[620px] md:blur-[90px]" />
      </div>

      <section className="relative isolate overflow-hidden pb-[58px] pt-[69px]">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ ...viewportOnce, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE_SOFT } },
              }}
              className={cn(
                "flex flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-0 w-full",
                align === "center" && "flex-col items-center justify-center text-center gap-4"
              )}
            >
              <SectionHeading
                lines={lines}
                accent={accent}
                accentWidth={fluid(102, 178)}
                accentGap={fluid(14, 24)}
                align={align}
                headingClassName="md:leading-[70px]"
              />
              {showCta && FEATURES.caseStudies && (
                <Button variant="pillOutline" href={defaults.cta.href} className={cn("mt-0 shrink-0 md:mt-22", align === "center" && "mt-4")}>
                  {label}
                </Button>
              )}
            </motion.div>

            <div
              className="mt-11.75 flex flex-col items-center gap-8 xl:flex-row xl:items-start xl:justify-center w-full"
              style={{ columnGap: fluid(24, 96) }}
            >
              {FEATURED_CASES.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 1.0, ease: EASE_SOFT }
                    }
                  }}
                  className={stagger[i]}
                >
                  <CaseStudyCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Shell>
      </section>
    </div>
  );
}
