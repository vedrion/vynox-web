"use client";

import { motion } from "motion/react";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { ALL_CAMPAIGNS } from "@/content/case-studies";
import { EASE_SOFT, viewportOnce } from "@/lib/motion";

export function AllCampaignsGrid() {
  return (
    <Section spacingTop="md" spacingBottom="md" clip="visible" className="bg-bg">
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
          >
            <SectionHeading lines={["All"]} accent="campaigns." accentWidth={210} accentGap={16} />
          </motion.div>

          <div className="mt-[47px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 lg:gap-x-[97px] gap-y-12 lg:gap-y-[66px] justify-items-center">
            {ALL_CAMPAIGNS.map((item, i) => (
              <motion.div
                key={`${item.title}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.0, ease: EASE_SOFT }
                  }
                }}
              >
                <CaseStudyCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Shell>
    </Section>
  );
}
