"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/cn";
import { fluid } from "@/lib/fluid";
import type { CaseStudy } from "@/content/case-studies";
import { FEATURES } from "@/config/features";

export interface CaseStudyCardProps {
  item: CaseStudy;
  className?: string;
}

export function CaseStudyCard({ item, className }: CaseStudyCardProps) {
  const { title, brand, href, image } = item;
  const interactive = FEATURES.caseStudies;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cardContent = (
    <>
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="338px"
          className="rounded-[9px] object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-within:grayscale-0 group-active:grayscale-0"
        />
      ) : (
        <MediaPlaceholder label={title} />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 rounded-[9px] bg-[linear-gradient(180deg,rgba(11,10,11,0)_0%,rgba(3,3,3,0.9)_86%)]"
        style={{ top: fluid(163, 211.25), height: fluid(164, 213.53) }}
      />

      <div
        className="absolute"
        style={{ left: fluid(14, 18), right: fluid(14, 18), bottom: fluid(14, 18) }}
      >
        <span
          className="block font-inter font-medium leading-[1.21] text-primary-light"
          style={{ fontSize: fluid(10, 11.54) }}
        >
          {brand}
        </span>
        <span
          className="mt-[2px] block font-inter font-medium leading-[1.21] text-white"
          style={{ fontSize: fluid(20, 25) }}
        >
          {title}
        </span>
        {interactive && (
          <motion.div
            variants={{
              initial: { x: 0 },
              hover: { x: 4 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 shrink-0"
            style={{ bottom: 0 }}
          >
            <ArrowRight
              size={isMobile ? 10 : 12.32}
              strokeWidth={2}
              className="text-white"
            />
          </motion.div>
        )}
      </div>
    </>
  );

  const cardFrameClass = "group relative block overflow-hidden bg-media-placeholder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light";
  const cardFrameStyle = { width: fluid(260, 338), height: fluid(327, 425) };

  return (
    <motion.div
      className={cn("relative select-none", className)}
      style={{ width: fluid(260, 338) }}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        variants={{
          initial: { y: 0, scale: 1 },
          hover: { y: -8, scale: 1.025 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {interactive ? (
          <Link href={href} className={cardFrameClass} style={cardFrameStyle}>
            {cardContent}
          </Link>
        ) : (
          <div
            className={cardFrameClass}
            style={cardFrameStyle}
            role="group"
            tabIndex={0}
            aria-label={`${brand}: ${title}`}
          >
            {cardContent}
          </div>
        )}
      </motion.div>

      <motion.div
        aria-hidden
        variants={{
          initial: { opacity: 0.6, scaleX: 0.95 },
          hover: { opacity: 1.0, scaleX: 1.02, y: -2 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-0 left-0 h-0.5 w-full bg-[radial-gradient(ellipse_50%_600%_at_center,rgba(184,106,236,1)_0%,rgba(184,106,236,0.62)_41%,rgba(184,106,236,0.37)_55%,rgba(184,106,236,0.15)_69%,rgba(184,106,236,0.05)_80%,rgba(184,106,236,0)_92%)]"
      />
      <motion.div
        aria-hidden
        variants={{
          initial: { opacity: 0.5, scaleX: 0.95, scaleY: 1.0 },
          hover: { opacity: 0.85, scaleX: 1.05, scaleY: 1.2, y: 2 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute -bottom-5 left-0 h-5 w-full bg-[linear-gradient(180deg,rgba(150,60,225,0.34)_0%,rgba(126,44,196,0.24)_34%,rgba(100,30,164,0.12)_64%,transparent_100%)] [mask-image:radial-gradient(ellipse_50%_400%_at_50%_0%,#000_0%,rgba(0,0,0,0.72)_41%,rgba(0,0,0,0.2)_69%,transparent_92%)] blur-[3px]"
      />
    </motion.div>
  );
}
