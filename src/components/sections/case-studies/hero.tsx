"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GrainTexture } from "@/components/ui/grain-texture";
import { caseStudiesHeroContent } from "@/content/case-studies";
import { fluid } from "@/lib/fluid";
import { EASE_SOFT } from "@/lib/motion";

export function Hero() {
  const { headline, subtext, cta } = caseStudiesHeroContent;

  return (
    <section className="relative isolate min-h-[560px] overflow-clip bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mask-[radial-gradient(ellipse_60%_50%_at_50%_35%,black_10%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <GrainTexture opacity={0.1} blend="soft-light" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-[-10px] top-0 h-[35%] bg-[linear-gradient(to_bottom,var(--color-bg),rgba(11,10,11,0))]" />
        <div className="absolute inset-x-[-8px] bottom-0 h-[45%] bg-[linear-gradient(to_bottom,rgba(11,10,11,0),var(--color-bg))]" />
        <div className="absolute inset-0 bg-[rgba(11,10,11,0.35)]" />
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-4"
        style={{ paddingTop: fluid(140, 243), paddingBottom: fluid(100, 60) }}
      >
        <motion.h1
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="text-center font-vastago text-h1 font-bold leading-[1.15] px-4"
        >
          <motion.span
            className="inline-block py-1 bg-gradient-to-r from-white via-primary-light via-[#f0abfc] via-primary to-white bg-[length:200%_auto] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          >
            {headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] py-1">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "100%" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE_SOFT } }
          }}
          className="mt-[36px] w-full max-w-[90vw] lg:max-w-[1004px] text-center font-inter font-normal leading-normal text-white px-2"
          style={{ fontSize: fluid(18, 24) }}
        >
          {subtext}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE_SOFT } }
          }}
          className="mt-[48px]"
        >
          <Button href={cta.href}>
            {cta.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
