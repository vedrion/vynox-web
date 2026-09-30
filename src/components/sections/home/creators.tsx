"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState, useEffect, useRef } from "react";

import { CreatorCard } from "@/components/cards/creator-card";
import { Button } from "@/components/ui/button";
import type { GlowConfig } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CREATORS, creatorsSectionContent } from "@/content/creators";
import { FEATURES } from "@/config/features";
import { fluid } from "@/lib/fluid";
import { EASE } from "@/lib/motion";

const OUTER_CARD_HALF = (306.12 * 0.65) / 2;

const AMBIENT_GLOWS: GlowConfig[] = [
  { width: [340, 620], height: [290, 520], blur: [50, 90], intensity: 0.3, right: [99, 180], top: [66, 120] },
  { width: [308, 560], height: [363, 660], blur: [50, 90], intensity: 0.26, bottom: [110, 200], left: [110, 200] },
];

interface CreatorsProps {
  headingLines?: string[];
  accent?: string;
  accentWidth?: number | string;
  highlightWord?: string;
}

export function Creators({
  headingLines = creatorsSectionContent.headingLines,
  accent = creatorsSectionContent.accent,
  accentWidth = fluid(75, 165),
  highlightWord = creatorsSectionContent.highlightWord,
}: CreatorsProps = {}) {
  const total = CREATORS.length;

  const mod = useCallback((n: number) => (n + total) % total, [total]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [orbitWidth, setOrbitWidth] = useState(1200);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setOrbitWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visibleCards = [
    CREATORS[mod(activeIndex - 2)],
    CREATORS[mod(activeIndex - 1)],
    CREATORS[mod(activeIndex)],
    CREATORS[mod(activeIndex + 1)],
    CREATORS[mod(activeIndex + 2)],
  ];

  const getSlot = (creatorIndex: number, activeIdx: number) => {
    let diff = creatorIndex - activeIdx;
    const half = total / 2;
    while (diff > half) diff -= total;
    while (diff <= -half) diff += total;
    return diff + 2;
  };

  const compact = orbitWidth < 640;
  const outerX = compact ? 0 : Math.max(0, Math.min(540, orbitWidth / 2 - OUTER_CARD_HALF - 8));
  const innerX = outerX * (300 / 540);

  const getSlotStyles = (slotIndex: number, isWrapping: boolean, prevSlotIndex: number) => {
    const xPositions = [-outerX, -innerX, 0, innerX, outerX];
    const zPositions = [-220, -90, 0, -90, -220];
    const rotateYDegrees = compact ? [0, 0, 0, 0, 0] : [48, 26, 0, -26, -48];
    const scales = [0.65, 0.84, 1.0, 0.84, 0.65];
    const opacities = compact ? [0, 0, 1, 0, 0] : [0.35, 0.75, 1.0, 0.75, 0.35];
    const filters = [
      "brightness(50%) blur(4px)",
      "brightness(82%) blur(1px)",
      "brightness(100%) blur(0px)",
      "brightness(82%) blur(1px)",
      "brightness(50%) blur(4px)",
    ];
    const zIndices = [10, 30, 50, 30, 10];

    if (isWrapping) {
      return {
        x: xPositions[slotIndex],
        z: zPositions[slotIndex],
        rotateY: rotateYDegrees[slotIndex],
        scale: [scales[prevSlotIndex], 0.35, scales[slotIndex]],
        opacity: [opacities[prevSlotIndex], 0.05, opacities[slotIndex]],
        filter: filters[slotIndex],
        zIndex: -10,
      };
    }

    return {
      x: xPositions[slotIndex],
      z: zPositions[slotIndex],
      rotateY: rotateYDegrees[slotIndex],
      scale: scales[slotIndex],
      opacity: opacities[slotIndex],
      filter: filters[slotIndex],
      zIndex: zIndices[slotIndex],
    };
  };

  const next = useCallback(() => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((i) => mod(i + 1));
  }, [activeIndex, mod]);

  const prev = useCallback(() => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((i) => mod(i - 1));
  }, [activeIndex, mod]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4500);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <Section spacingTop="md" spacingBottom="md" clip="hidden" glows={AMBIENT_GLOWS}>
      <div className="flex flex-col items-center">
        <SectionHeading
          lines={headingLines}
          accent={accent}
          highlight={{ word: highlightWord, line: 0, kind: "bar" }}
          accentWidth={accentWidth}
          accentGap={fluid(6, 11)}
          headingClassName="leading-[70px] [--hl-bottom:9px]"
          align="center"
        />
      </div>

      <div className="relative mt-10 h-[410px] w-full overflow-hidden md:mt-[80px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[596px] w-[572px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_33%_21%,rgba(141,12,201,0.02)_0%,rgba(81,12,185,0.10)_100%)] opacity-[0.86] blur-[57.7px]"
        />

        <div
          ref={orbitRef}
          className="relative mx-auto h-full w-full max-w-[1200px]"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {visibleCards.map((creator) => {
            const creatorIndex = CREATORS.indexOf(creator);
            const currentSlot = getSlot(creatorIndex, activeIndex);
            const prevSlot = getSlot(creatorIndex, prevActiveIndex);
            const distance = Math.abs(currentSlot - prevSlot);

            return (
              <motion.div
                key={creator.name}
                animate={getSlotStyles(currentSlot, distance > 1, prevSlot)}
                transition={{
                  duration: 1.2,
                  ease: EASE,
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  setPrevActiveIndex(activeIndex);
                  setActiveIndex(creatorIndex);
                }}
                className="absolute left-1/2 top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
              >
                <CreatorCard
                  creator={creator}
                  size="lg"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-24.25 flex flex-col lg:flex-row lg:h-12.5 items-center justify-center gap-6 lg:gap-10.5">
        <div className="flex items-center gap-6.5">
          <button onClick={prev}
            type="button"
            aria-label={creatorsSectionContent.previousLabel}
            className="grid size-[46px] place-items-center rounded-btn border border-primary text-white transition-colors hover:bg-primary/15"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {CREATORS.map((_, i) => (
              <motion.span
                key={i}
                layout
                animate={{
                  width: i === activeIndex ? 32 : 5,
                  opacity: i === activeIndex ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="h-1 rounded-full bg-primary"
              />
            ))}
          </div>
          <button onClick={next}
            type="button"
            aria-label={creatorsSectionContent.nextLabel}
            className="grid size-[46px] place-items-center rounded-btn border border-primary text-white transition-colors hover:bg-primary/15"
          >
            <ArrowRight size={18} />
          </button>
        </div>
        <span className="hidden lg:block h-11 w-px bg-carousel-divider" aria-hidden />
        {FEATURES.caseStudies && (
          <Button variant="pill" href="/case-studies">
            Meet The Creators
          </Button>
        )}
      </div>
    </Section>
  );
}
