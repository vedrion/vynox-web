"use client";

import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Shell } from "@/components/ui/shell";
import { testimonialsContent } from "@/content/home";
import { TESTIMONIALS } from "@/content/testimonials";
import { fluid } from "@/lib/fluid";
import { motion } from "motion/react";
import { EASE_SOFT, viewportOnce, viewportOnceAmount } from "@/lib/motion";

const fadeMask =
  "linear-gradient(to bottom, transparent 0%, #000 32.7%, #000 68.9%, transparent 100%)";

const fadeMaskHorizontal =
  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_SOFT,
    },
  },
};

export function Testimonials() {
  const { headingPrefix, headingAccent, headingHighlightWord, headingSuffix, subtext } =
    testimonialsContent;
  const colA = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const colB = TESTIMONIALS.filter((_, i) => i % 2 === 1);
  const trackA = [...colA, ...colA];
  const trackB = [...colB, ...colB];
  const trackMobile = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="relative isolate h-auto min-h-125 overflow-hidden pb-16 md:h-169 md:pb-0"
      style={{ paddingTop: fluid(64, 165) }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 -z-10 w-full bg-[linear-gradient(90deg,transparent_0%,rgb(var(--color-glow-primary-rgb)/0.24)_30%,rgb(var(--color-glow-primary-rgb)/0.24)_70%,transparent_100%)] mix-blend-plus-lighter"
        style={{ height: fluid(130, 260), filter: `blur(${fluid(45, 90)})` }}
      />

      <Shell>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceAmount(0.2)}
          className="w-full max-w-186.75"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="font-vastago font-bold leading-[1.05] md:leading-17.5 tracking-[-0.03em] text-white"
            style={{ fontSize: fluid(32, 56) }}
          >
            <span className="block">
              {headingPrefix}{" "}
              <span
                className="relative ml-5.5 inline-block h-0 align-baseline"
                style={{ width: fluid(51, 89) }}
              >
                <span
                  className="absolute left-0 block font-mary font-normal tracking-normal text-primary"
                  style={{
                    bottom: fluid(-18, -43),
                    fontSize: fluid(56, 122.778),
                    height: fluid(75, 166),
                    lineHeight: fluid(75, 166),
                  }}
                >
                  {headingAccent}
                </span>
              </span>{" "}
            </span>
            <span className="block">
              <span className="relative isolate inline-block">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.6, duration: 0.8, ease: EASE_SOFT }}
                  className="absolute inset-x-0 bottom-2.25 -z-10 h-2.5 bg-primary origin-left"
                  aria-hidden
                />
                <span className="relative">{headingHighlightWord}</span>
              </span>{" "}
              {headingSuffix}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-9.25 w-full font-inter text-md font-light leading-[1.2] text-subtext"
          >
            {subtext}
          </motion.p>

        </motion.div>
      </Shell>

      <div
        className="mt-10 w-full overflow-hidden md:hidden"
        style={{ maskImage: fadeMaskHorizontal, WebkitMaskImage: fadeMaskHorizontal }}
      >
        <div
          className="marquee-track marquee-track-left flex w-max gap-4"
          style={{ animationDuration: "34s" }}
        >
          {trackMobile.map((t, i) => (
            <TestimonialCard key={`mobile-${t.name}-${i}`} item={t} className="w-70 shrink-0" />
          ))}
        </div>
      </div>

      <div
        className="absolute -right-1.25 top-0 hidden h-169 w-172 overflow-hidden md:block"
        style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      >
        <div className="absolute left-0 -top-13.75 w-[321.5px]">
          <div
            className="marquee-track marquee-track-up flex flex-col gap-[25.17px] pb-[25.17px]"
            style={{ animationDuration: "26s" }}
          >
            {trackA.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} item={t} />
            ))}
          </div>
        </div>
        <div className="absolute left-85.75 top-6 w-[321.5px]">
          <div
            className="marquee-track marquee-track-up flex flex-col gap-[25.17px] pb-[25.17px]"
            style={{ animationDuration: "34s" }}
          >
            {trackB.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} item={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
