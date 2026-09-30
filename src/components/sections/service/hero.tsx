"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Shell } from "@/components/ui/shell";
import type { ServiceContent } from "@/content/services";
import { cn } from "@/lib/cn";
import { fluid } from "@/lib/fluid";
import Image from "next/image";

import { OrbitalSystem } from "@/components/sections/service/top-right-orbit";
import { EASE } from "@/lib/motion";
import { FEATURES } from "@/config/features";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Hero({
  hero,
  imageSrc,
  imageClassName,
  showOrbitalSystem = true,
}: {
  hero: ServiceContent["hero"];
  imageSrc?: string;
  imageClassName?: string;
  showOrbitalSystem?: boolean;
}) {
  const { titleLine, accentWord, paragraph, primaryCta, secondaryCta } = hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const reducedMotion = usePrefersReducedMotion();

  const titleWords = titleLine.split(" ").map(w => ({ text: w, isAccent: false }));
  const accentWords = accentWord.split(" ").map(w => ({ text: w, isAccent: true }));
  const allWords = [...titleWords, ...accentWords];

  const descWords = paragraph.split(" ");

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };

  const headingWordVariants = (reduce: boolean) => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 8,
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
  });

  const descContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.8,
      }
    }
  };

  const descWordVariants = (reduce: boolean) => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 4,
      filter: "blur(3px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  });

  const ctaContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1.4,
      }
    }
  };

  const ctaItemVariants = (reduce: boolean) => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  });

  const imageVariants = (reduce: boolean) => ({
    hidden: {
      opacity: 0,
      scale: reduce ? 1.0 : 0.96,
      y: reduce ? 0 : 12
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 1.2,
        ease: EASE
      }
    }
  });

  return (
    <section ref={containerRef} className="relative isolate bg-bg pb-[60px] lg:pb-[120px] pt-[140px] lg:pt-[245px]">
      <div className="absolute inset-x-0 top-[92px] z-20 lg:top-[160px]">
        <Shell>
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: `${titleLine} ${accentWord}`.trim() },
          ]} />
        </Shell>
      </div>
      {showOrbitalSystem && (
        <>
          <OrbitalSystem position="top-left" />
          <OrbitalSystem position="bottom-right" />
        </>
      )}
      <Shell className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-[644px] w-full">
          <motion.h1
            variants={headingContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-vastago text-h1 font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {allWords.map((word, i) => (
              <motion.span
                key={i}
                variants={headingWordVariants(reducedMotion)}
                className={`${word.isAccent ? "text-primary" : "text-white"} inline-block mr-[0.22em]`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={descContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-6 max-w-[512px] font-inter text-base font-light leading-relaxed text-stat-label"
          >
            {descWords.map((word, i) => (
              <motion.span
                key={i}
                variants={descWordVariants(reducedMotion)}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            variants={ctaContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.div variants={ctaItemVariants(reducedMotion)}>
              <Button variant="primary" href={primaryCta.href}>
                {primaryCta.label}
              </Button>
            </motion.div>
            <motion.div variants={ctaItemVariants(reducedMotion)}>
              {FEATURES.caseStudies && (
                <Button variant="secondary" href={secondaryCta.href} icon={null}>
                  {secondaryCta.label}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={imageVariants(reducedMotion)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-full max-w-[680px] lg:shrink-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
            style={{ height: fluid(260, 520), width: fluid(260, 520) }}
            aria-hidden="true"
          >
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.38, 0.46, 0.38]
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="w-full h-full bg-[radial-gradient(circle_at_center,rgb(var(--color-glow-primary-rgb)/1)_0%,transparent_70%)] mix-blend-plus-lighter"
              style={{ filter: `blur(${fluid(35, 70)})` }}
            />
          </motion.div>

          <motion.div
            aria-hidden
            animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className={cn(
              "relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[430px] w-full overflow-hidden rounded-card flex items-center justify-center",
              imageClassName
            )}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${titleLine} ${accentWord}`}
                width={680}
                height={430}
                className="h-full w-full object-contain rounded-card"
                priority
              />
            ) : (
              <MediaPlaceholder label={`${titleLine} ${accentWord}`} className="rounded-card" />
            )}
          </motion.div>
        </motion.div>
      </Shell>
    </section>
  );
}
