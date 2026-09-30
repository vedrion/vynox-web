"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

import { GrainTexture } from "@/components/ui/grain-texture";
import { HeroGlow } from "@/components/sections/about/hero-glow";
import { heroContent } from "@/content/about";
import { fluid } from "@/lib/fluid";
import { EASE } from "@/lib/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    const nextSec = sectionRef.current?.nextElementSibling as HTMLElement | null;
    const targetY = nextSec ? nextSec.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime: number | null = null;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * easeProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const combinedText = `${heroContent.line1} ${heroContent.line2}`;
  const words = combinedText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative isolate h-screen w-full overflow-clip bg-bg">
      <div aria-hidden className="absolute inset-0 about-hero-ambient" />

      <HeroGlow />

      <GrainTexture opacity={0.35} blend="overlay" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-8">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-full text-balance sm:whitespace-nowrap text-center font-vastago font-bold leading-none text-gradient-hero-heading"
          style={{ fontSize: fluid(19, 42) }}
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {wordIdx < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h1>
      </div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        aria-label={heroContent.scrollNextAriaLabel}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-1/2 bottom-8 -translate-x-1/2 text-primary z-20 cursor-pointer p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
      >
        <ArrowDown
          aria-hidden
          className="size-[38px] text-primary transition-colors hover:text-white"
        />
      </motion.button>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg z-10"
      />
    </section>
  );
}
