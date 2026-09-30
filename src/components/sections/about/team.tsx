"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { GlowConfig } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { teamContent, teamSectionContent } from "@/content/about";
import { fluid } from "@/lib/fluid";

const AMBIENT_GLOWS: GlowConfig[] = [
  {
    width: [275, 500],
    height: [193, 350],
    blur: [55, 100],
    intensity: 0.55,
    blend: "plus-lighter",
    left: [83, 150],
    bottom: [55, 100],
  },
];

const GlowLayers = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute rounded-full mix-blend-plus-lighter opacity-30"
      style={{
        width: "130%",
        height: "90%",
        left: "-15%",
        top: "25%",
        background:
          "radial-gradient(ellipse at center, rgb(var(--color-glow-primary-rgb)/0.55) 0%, rgb(var(--color-glow-primary-rgb)/0.15) 45%, transparent 70%)",
        transform: "rotate(179.32deg)",
      }}
    />
    <div
      className="absolute rounded-full mix-blend-plus-lighter opacity-40"
      style={{
        width: "95%",
        height: "75%",
        left: "2%",
        top: "28%",
        background:
          "radial-gradient(ellipse at center, rgb(var(--color-glow-primary-rgb)/0.6) 0%, rgba(90,20,180,0.25) 50%, transparent 72%)",
        transform: "rotate(179.32deg)",
      }}
    />
    <div
      className="absolute rounded-full mix-blend-plus-lighter opacity-50"
      style={{
        width: "82%",
        height: "68%",
        left: "9%",
        top: "30%",
        background:
          "radial-gradient(ellipse at center, rgba(160,60,240,0.7) 0%, rgba(120,30,200,0.3) 45%, transparent 68%)",
        transform: "rotate(179.32deg)",
      }}
    />
    <div
      className="absolute rounded-full mix-blend-plus-lighter opacity-55"
      style={{
        width: "68%",
        height: "58%",
        left: "16%",
        top: "33%",
        background:
          "radial-gradient(ellipse at center, rgba(180,80,255,0.65) 0%, rgba(140,40,220,0.2) 50%, transparent 70%)",
        transform: "rotate(179.32deg)",
      }}
    />
  </div>
);

interface TeamCardProps {
  member: (typeof teamContent)[0];
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}

const CARD_HEIGHT_DESKTOP = 400;

const TeamCard = ({ member, isExpanded, onHover, onLeave, onTap }: TeamCardProps) => {
  const isCareersCard = member.name === "You";
  const reduceMotion = useReducedMotion();

  const card = (
    <div
      role={isCareersCard ? undefined : "button"}
      tabIndex={isCareersCard ? undefined : 0}
      onKeyDown={isCareersCard ? undefined : (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onTap();
        }
      }}
      className="group relative overflow-hidden rounded-[18px] shrink-0 snap-center cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      style={{
        height: fluid(330, CARD_HEIGHT_DESKTOP),
        width: isExpanded ? fluid(250, 380) : fluid(135, 230),
        border: "0.785px solid #565656",
        transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease",
        boxShadow: "inset 0px 3.923px 14.514px 0px rgb(var(--color-glow-primary-rgb)/0.31)",
      }}
      onMouseEnter={isCareersCard ? undefined : onHover}
      onMouseLeave={isCareersCard ? undefined : onLeave}
      onFocus={isCareersCard ? undefined : onHover}
      onBlur={isCareersCard ? undefined : onLeave}
      onClick={isCareersCard ? undefined : onTap}
    >
      <div
        className="absolute inset-0 rounded-[18px]"
        style={{
          background: "linear-gradient(180deg, #0e0e11 0%, #150029 100%)",
        }}
      />

      <GlowLayers />

      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: fluid(24, 60),
          top: "40%",
          transform: "translateY(-50%)",
          transition: "opacity 0.45s ease, transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
          opacity: isExpanded ? 1 : 0,
          translate: isExpanded ? "0px 0px" : "-10px 0px",
          zIndex: 2,
        }}
      >
        <span
          className="font-vastago text-primary whitespace-normal md:whitespace-nowrap block"
          style={{
            fontSize: fluid(28, 46),
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          We&apos;re Vynox
        </span>
      </div>

      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 3 }}
      >
        <Image
          src={member.avatar}
          alt={member.name}
          width={220}
          height={320}
          className={`object-contain object-bottom transition-[filter] duration-500 ${isExpanded || member.preserveColor ? "grayscale-0" : "grayscale"}`}
          style={{
            width: "auto",
            height: "92%",
            pointerEvents: "none",
            transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            transform: "translateY(0)",
          }}
        />
      </div>

      {isCareersCard && (
        <motion.div
          aria-hidden
          animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[7] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-bg/75 text-primary-light shadow-[0_0_28px_rgba(168,85,247,0.42)] backdrop-blur-sm"
        >
          <Plus className="h-7 w-7" strokeWidth={1.8} />
        </motion.div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(to bottom, rgba(9,0,18,0) 0%, rgba(9,0,18,0) 40%, #090012 100%)",
          zIndex: 4,
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 px-3 md:px-4 pb-3 md:pb-4 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="flex items-end justify-between gap-1.5 md:gap-2">
          <p
            className="font-space text-white whitespace-normal md:whitespace-nowrap"
            style={{
              fontSize: fluid(20, 30),
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            {member.name}
          </p>

          {/* <div
            className="shrink-0"
            style={{
              transition: "opacity 0.3s ease 0.1s, transform 0.4s ease 0.1s",
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? "translateX(0)" : "translateX(10px)",
            }}
          >
            <p
              className="font-inter text-white/90 text-right"
              style={{
                fontSize: fluid(10.5, 12.5),
                fontWeight: 500,
                lineHeight: 1.3,
                whiteSpace: "pre-line",
              }}
            >
              {member.designation}
            </p>
          </div> */}
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-[18px] pointer-events-none"
        style={{
          boxShadow: "inset 0px 3.923px 14.514px 0px rgb(var(--color-glow-primary-rgb)/0.31)",
          zIndex: 6,
        }}
      />
    </div>
  );

  if (isCareersCard) {
    return (
      <Link
        href="/careers"
        aria-label="View careers at Vynox"
        className="block shrink-0 snap-center rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
      >
        {card}
      </Link>
    );
  }

  return card;
};

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  return (
    <Section
      id="team"
      spacingTop="lg"
      spacingBottom="lg"
      clip="hidden"
      className="w-full py-12 md:py-24 flex flex-col justify-center"
      glows={AMBIENT_GLOWS}
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 md:px-8 relative z-10 flex flex-col justify-center flex-1">
        <div className="flex items-baseline justify-center mb-6 md:mb-12 gap-2 sm:gap-4 flex-wrap text-center">
          <h2
            className="font-vastago text-white leading-none"
            style={{
              fontSize: fluid(32, 56),
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {teamSectionContent.heading}{" "}
          </h2>
          <span
            className="font-mary text-primary leading-none"
            style={{
              fontSize: fluid(54, 102),
              fontWeight: 400,
              lineHeight: 0.8,
              display: "inline-block",
              transform: "translateY(0px)",
            }}
          >
            {teamSectionContent.accent}
          </span>
        </div>

        <div
          className="flex gap-4 md:gap-[24px] items-center justify-start lg:justify-center mt-6 md:mt-16 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {teamContent.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              isExpanded={activeIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onTap={() => setHoveredIndex(index === activeIndex ? 0 : index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
