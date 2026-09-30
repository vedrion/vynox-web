"use client";

import { SetsApartCards } from "@/components/sections/home/sets-apart-cards";
import { SetsApartGlow } from "@/components/sections/home/sets-apart-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { setsApartContent } from "@/content/home";
import { fluid } from "@/lib/fluid";
import { motion } from "motion/react";
import { EASE_SOFT, fadeUp } from "@/lib/motion";

export function SetsApart() {
  const { headingLines, headingHighlight, headingAccent, cards } = setsApartContent;

  return (
    <section className="bg-bg px-4 py-9 md:px-13">
      <div
        className="relative isolate mx-auto max-w-334 overflow-hidden rounded-none bg-[linear-gradient(160deg,#060007,#1c0025)] md:rounded-card"
        style={{
          paddingInline: fluid(24, 52),
          paddingTop: fluid(32, 135),
          paddingBottom: fluid(48, 91),
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] md:rounded-card">
          <SetsApartGlow />
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            {...fadeUp({ y: 15, duration: 1.0, ease: EASE_SOFT, amount: 0.3 })}
          >
            <SectionHeading
              lines={headingLines}
              accent={headingAccent}
              highlight={headingHighlight}
              accentWidth={fluid(59, 103)}
              accentGap={fluid(14, 25)}
              headingClassName="md:leading-[70px]"
              align="center"
            />
          </motion.div>
        </div>

        <SetsApartCards cards={cards} />
      </div>
    </section>
  );
}
