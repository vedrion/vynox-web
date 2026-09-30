"use client";

import { motion } from "motion/react";

import { ASSETS } from "@/config/assets";
import { contactPageContent } from "@/content/contact";

const heroContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const heroItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

export function ContactHeroHeader() {
  return (
    <motion.div
      variants={heroContainer}
      initial="initial"
      animate="animate"
      className="relative pt-2 flex flex-col gap-7"
    >
      <motion.h1
        variants={heroItem}
        className="text-white font-bold font-['Space_Grotesk',sans-serif] leading-[1.25]"
        style={{ fontSize: "clamp(38px,4.5vw,54px)" }}
      >
        {contactPageContent.hero.firstLine}{" "}
        <span className="relative inline-block px-1.5">
          {contactPageContent.hero.emphasizedWord}
          <svg
            className="absolute left-[-4px] right-[-4px] bottom-[-2px] h-[16px] w-[calc(100%+8px)] pointer-events-none select-none"
            viewBox="0 0 100 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 3 11 C 12 21, 88 21, 97 12 C 99 9, 82 4, 62 6 C 42 8, 12 14, 25 17 C 38 20, 78 11, 92 8"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
            />
          </svg>
        </span>
        <br />
        {contactPageContent.hero.secondLine}{" "}
        <span
          className="text-primary font-mary ml-2 inline-block align-middle -translate-y-4 sm:-translate-y-5 lg:-translate-y-6 translate-x-0.5"
          style={{
            fontSize: "clamp(70px, 9vw, 110px)",
            fontWeight: 400,
            lineHeight: 0.85,
          }}
        >
          {contactPageContent.hero.scriptWord}
        </span>
      </motion.h1>

      <motion.p
        variants={heroItem}
        className="text-[#acabab] font-['Inter',sans-serif] leading-relaxed max-w-[420px]"
        style={{ fontSize: "clamp(15px,1.8vw,20px)" }}
      >
        {contactPageContent.hero.body}
      </motion.p>
    </motion.div>
  );
}

import { cn } from "@/lib/cn";

export function ContactMapGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[420px] aspect-[460/252] overflow-hidden rounded-[14px] sm:rounded-[18px] mx-auto lg:ml-0 lg:mr-auto",
        className
      )}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center lg:object-left rounded-[14px] sm:rounded-[18px] mix-blend-screen"
      >
        <source src={ASSETS.contact.contactHero.mapVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export function ContactHeroMap() {
  return (
    <motion.div
      variants={heroContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center lg:items-start gap-5 sm:gap-7 w-full"
    >
      <motion.div variants={heroItem} className="w-full flex justify-center lg:justify-start">
        <ContactMapGraphic />
      </motion.div>

    </motion.div>
  );
}

export default function ContactHero() {
  return (
    <div className="flex flex-col gap-7">
      <ContactHeroHeader />
      <ContactHeroMap />
    </div>
  );
}
