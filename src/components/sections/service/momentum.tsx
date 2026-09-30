"use client";

import React from "react";
import { motion } from "motion/react";
import { EASE, fadeUp, viewportOnce, viewportOnceAmount } from "@/lib/motion";
import { serviceVariantContent } from "@/content/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Momentum() {
  const reducedMotion = usePrefersReducedMotion();

  const content = serviceVariantContent.campaignManagement;
  const CARDS = content.cards;

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const headingWordVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 10,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="bg-bg px-1 lg:px-[8px] py-[36px]">

      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[linear-gradient(0deg,rgba(168,85,247,0.32)_0%,rgba(168,85,247,0.06)_70%,var(--color-bg)_100%)] px-6 lg:px-[72px] py-[80px] border-x border-b border-purple-950/20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">

        <div className="flex-1 flex flex-col justify-center max-w-[580px] relative z-10 text-left lg:pl-10 -translate-y-2 lg:-translate-y-5">

          <motion.h2
            variants={headingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceAmount(0.3)}
            className="font-vastago text-white text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.15]"
          >
            <span className="block sm:whitespace-nowrap">
              <motion.span
                variants={headingWordVariants}
                className="relative inline-block px-1 mr-3 select-none"
              >
                <span className="relative z-10">{content.heading.highlight}</span>
                <span className="absolute left-0 bottom-[4px] w-full h-[18px] bg-purple-600 -z-10" />
              </motion.span>
              <motion.span
                variants={headingWordVariants}
                className="inline-block"
              >
                {content.heading.firstLine}
              </motion.span>
            </span>
            <span className="block mt-2">
              <motion.span
                variants={headingWordVariants}
                className="inline-block mr-[0.25em]"
              >
                {content.heading.secondLine}
              </motion.span>
              <motion.span
                variants={headingWordVariants}
                className="inline-block text-purple-500 mr-[0.1em]"
              >
                {content.heading.accent}
              </motion.span>
              <motion.span
                variants={headingWordVariants}
                className="inline-block"
              >
                {content.heading.question}
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp({ y: 10, duration: 0.8, delay: 0.9, ease: "easeOut" })}
            className="font-vastago text-base lg:text-[18px] text-stat-label font-light leading-relaxed mt-6 max-w-[460px]"
          >
            {content.body}
          </motion.p>

        </div>

        <div className="relative w-full lg:max-w-[560px] flex items-center justify-center">

          <div className="relative w-full z-10">

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 1.5, duration: 1.0, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center pointer-events-none hidden sm:flex"
            >
              <div className="absolute w-8 h-8 rounded-full bg-purple-500/35 blur-md animate-pulse" />
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-purple-300 relative z-10">
                <path d="M12 0c.3 5.3 4.7 9.7 10 10-5.3.3-9.7 4.7-10 10-.3-5.3-4.7-9.7-10-10 5.3-.3 9.7-4.7 10-10z" />
              </svg>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceAmount(0.3)}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.25,
                    delayChildren: 1.2,
                  }
                }
              }
              }
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
            >
              {CARDS.map((card, i) => {
                const cardItemVariants = {
                  hidden: {
                    opacity: 0,
                    scale: 0.92,
                    y: reducedMotion ? 0 : 20,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1.0,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: EASE
                    }
                  }
                };

                return (
                  <motion.div
                    key={i}
                    variants={cardItemVariants}
                    className="flex flex-col items-center justify-start text-center rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 pt-6 min-h-[120px] backdrop-blur-sm transition-all hover:border-purple-500/20 hover:bg-zinc-900/60 shadow-lg"
                  >
                    <h3 className="font-vastago text-base lg:text-lg font-bold text-white tracking-wide leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-vastago text-[12.5px] lg:text-[13.5px] text-stat-label font-light leading-relaxed mt-1">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
