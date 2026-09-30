"use client";

import React from "react";
import { motion } from "motion/react";
import { MediaFrame } from "@/components/sections/service/media/media-frame";
import { EASE, fadeUp, viewportOnce, viewportOnceAmount } from "@/lib/motion";
import { serviceVariantContent } from "@/content/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function WhatCreatorsHoldBack() {
  const reducedMotion = usePrefersReducedMotion();

  const content = serviceVariantContent.talentManagement;
  const NODES = content.nodes.map((node, index) => ({
    ...node,
    ...[
      { pos: { left: 113, top: 50 }, labelOffset: { left: 135, top: 40 } },
      { pos: { left: 170, top: 130 }, labelOffset: { left: 192, top: 120 } },
      { pos: { left: 170, top: 250 }, labelOffset: { left: 192, top: 240 } },
      { pos: { left: 113, top: 330 }, labelOffset: { left: 135, top: 320 } },
    ][index],
  }));

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
    <section className="bg-bg px-4 lg:px-[24px] py-[36px]">

      <style>{`
        @keyframes pulse-halo {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        }
        .node-pulse {
          animation: pulse-halo 2.5s infinite ease-in-out;
        }
      `}</style>

      <div className="relative isolate mx-auto max-w-[1336px] overflow-hidden rounded-[24px] bg-[linear-gradient(90deg,#150028_0%,#080010_30%,var(--color-bg)_100%)] px-6 lg:px-[72px] py-[80px] border border-purple-950/20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">

        <div className="flex-1 flex flex-col justify-center max-w-[520px] relative z-10 text-left lg:pl-16">

          <motion.h2
            variants={headingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceAmount(0.3)}
            className="font-vastago text-white text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-none"
          >
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

            <br />

            <span className="mt-2 block">
              <motion.span
                variants={headingWordVariants}
                className="inline-block mr-[0.25em]"
              >
                {content.heading.secondLine}
              </motion.span>
              <motion.span
                variants={headingWordVariants}
                className="inline-block text-purple-500"
              >
                {content.heading.accent}
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp({ y: 10, duration: 0.8, delay: 0.9, ease: "easeOut" })}
            className="font-vastago text-sm lg:text-base text-stat-label font-light leading-relaxed mt-6 max-w-[460px]"
          >
            {content.body}
          </motion.p>

        </div>

        <MediaFrame width={340} height={380} innerClassName="relative">

          <motion.svg
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute w-[360px] h-[380px] -left-[180px] top-0 pointer-events-none z-0 overflow-visible"
            viewBox="0 0 360 380"
          >
            <defs>
              <linearGradient id="arc-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-primary-light)" stopOpacity="0" />
                <stop offset="75%" stopColor="var(--color-primary-light)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="arc-fill-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#150028" stopOpacity="0.45" />
              </linearGradient>
              <filter id="arc-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="180" cy="190" r="180" stroke="url(#arc-stroke-grad)" strokeWidth="1.5" fill="url(#arc-fill-grad)" filter="url(#arc-glow-filter)" />
          </motion.svg>

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
            }}
            className="absolute inset-0"
          >
            {NODES.map((node, i) => {
              const nodeItemVariants = {
                hidden: {
                  opacity: 0,
                  scale: 0.8,
                  x: reducedMotion ? 0 : -12,
                },
                visible: {
                  opacity: 1,
                  scale: 1.0,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: EASE
                  }
                }
              };

              return (
                <motion.div key={i} variants={nodeItemVariants} className="absolute inset-0">

                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-white border border-purple-400 z-10 shadow-[0_0_8px_var(--color-primary-light)]"
                    style={{
                      left: `${node.pos.left}px`,
                      top: `${node.pos.top}px`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <div className="node-pulse absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-purple-500/30 -z-10" />
                  </div>

                  <div
                    className="absolute flex flex-col text-left select-none"
                    style={{
                      left: `${node.labelOffset.left}px`,
                      top: `${node.labelOffset.top}px`
                    }}
                  >
                    <span className="font-vastago text-sm lg:text-base font-bold text-white leading-tight">
                      {node.title}
                    </span>
                    <span className="font-vastago text-[10px] lg:text-xs text-purple-300/50 font-light mt-0.5">
                      {node.detail}
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>

        </MediaFrame>

      </div>

    </section>
  );
}
