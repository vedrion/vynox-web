"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

interface OrbitalSystemProps {
  position?: "top-left" | "bottom-right" | "top-right" | "bottom-left";
  className?: string;
}

export function OrbitalSystem({ position = "bottom-right", className }: OrbitalSystemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isClockwiseFirst = position === "top-left" || position === "bottom-right";

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "-top-10 -left-10 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 lg:-top-18 lg:-left-18 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]";
      case "bottom-right":
        return "-bottom-28 -right-24 sm:-bottom-32 sm:-right-28 md:-bottom-36 md:-right-32 lg:-bottom-40 lg:-right-36 w-[270px] h-[270px] sm:w-[370px] sm:h-[370px] md:w-[470px] md:h-[470px] lg:w-[570px] lg:h-[570px]";
      case "top-right":
        return "-top-12 -right-12 sm:-top-16 sm:-right-16 md:-top-20 md:-right-20 lg:-top-24 lg:-right-24 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[490px] lg:h-[490px]";
      case "bottom-left":
      default:
        return "-bottom-24 -left-20 sm:-bottom-28 sm:-left-24 md:-bottom-32 md:-left-28 lg:-bottom-36 lg:-left-32 w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[330px] md:h-[330px] lg:w-[400px] lg:h-[400px]";
    }
  };

  return (
    <motion.div
      aria-hidden="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.035 : 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn(
        "pointer-events-auto cursor-pointer absolute z-0 flex items-center justify-center select-none overflow-visible",
        getPositionClasses(),
        className
      )}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 0.55 : 0.18,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0 -z-10 rounded-full bg-purple-500/20 blur-2xl pointer-events-none"
      />

      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`softOrbitGlow_${position}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--color-primary-light)" floodOpacity="0.3" />
          </filter>

          <filter id={`hoverOrbitGlow_${position}`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#c084fc" floodOpacity="0.75" />
          </filter>

          <linearGradient id={`orbit2Stroke_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-primary-light)" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id={`orbit2StrokeHover_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e9d5ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id={`orbit1Stroke_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id={`orbit1StrokeHover_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e9d5ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <g transform="translate(250, 250)">
          <motion.g
            animate={{ rotate: isClockwiseFirst ? 360 : -360 }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <motion.circle
              cx="0"
              cy="0"
              r="140"
              stroke={isHovered ? `url(#orbit1StrokeHover_${position})` : `url(#orbit1Stroke_${position})`}
              animate={{
                strokeWidth: isHovered ? 1.5 : 1.1,
                opacity: isHovered ? 1 : 0.85,
              }}
              transition={{ duration: 0.8, ease: EASE }}
              strokeDasharray="5 7"
              fill="none"
            />
          </motion.g>

          <motion.g
            animate={{ rotate: isClockwiseFirst ? -360 : 360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <motion.circle
              cx="0"
              cy="0"
              r="185"
              stroke={isHovered ? `url(#orbit2StrokeHover_${position})` : `url(#orbit2Stroke_${position})`}
              filter={isHovered ? `url(#hoverOrbitGlow_${position})` : `url(#softOrbitGlow_${position})`}
              animate={{
                strokeWidth: isHovered ? 1.7 : 1.3,
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.8, ease: EASE }}
              fill="none"
            />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}
