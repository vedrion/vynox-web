"use client";

import React, { useRef, useState } from "react";
import { PlaySquare, Megaphone, User } from "lucide-react";
import { motion, useInView } from "motion/react";
import { EASE, EASE_SOFT, fadeUp } from "@/lib/motion";
import { serviceVariantContent } from "@/content/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface SolutionCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  reducedMotion: boolean;
  parentInView: boolean;
}

function SolutionCard({
  index,
  icon,
  title,
  description,
  hoveredIndex,
  setHoveredIndex,
  reducedMotion,
  parentInView,
}: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredIndex === index;
  const isNeighborHovered = hoveredIndex !== null && hoveredIndex !== index;

  const floatParams = [
    { duration: 9.8, delay: 0.1 },
    { duration: 11.5, delay: 0.4 },
    { duration: 8.6, delay: 0.2 },
    { duration: 10.2, delay: 0.5 },
  ];
  const { duration, delay } = floatParams[index];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (!reducedMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;
      card.style.transform = `translateY(-7px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
      card.style.transform = `translateY(0px) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  const handleMouseEnter = () => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    const card = cardRef.current;
    if (!card) return;
    if (!reducedMotion) {
      card.style.transform = `translateY(0px) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  const cardEntranceVariants = (reduce: boolean) => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 28,
      scale: reduce ? 1.0 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.0,
      transition: {
        duration: 0.8,
        ease: EASE,
      },
    },
  });

  let borderColor = "rgba(63, 63, 70, 0.5)";
  let bgColor = "rgba(24, 24, 27, 0.35)";
  let shadowStyle = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";

  if (isHovered) {
    borderColor = "rgba(168, 85, 247, 0.35)";
    bgColor = "rgba(24, 24, 27, 0.6)";
    shadowStyle = "0 20px 25px -5px rgb(var(--color-glow-primary-rgb)/0.12)";
  } else if (isNeighborHovered) {
    borderColor = "rgba(82, 82, 91, 0.8)";
    bgColor = "rgba(24, 24, 27, 0.35)";
    shadowStyle = "0 12px 20px -3px rgb(var(--color-glow-primary-rgb)/0.04)";
  }

  return (
    <motion.div
      variants={cardEntranceVariants(reducedMotion)}
      className="w-full h-full"
    >
      <motion.div
        animate={parentInView && !reducedMotion ? { y: [0, -2.5, 0] } : { y: 0 }}
        transition={{
          duration,
          delay: delay + 0.8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-full h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative flex items-start gap-4 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 ease-out select-none overflow-hidden"
          style={{
            borderColor,
            backgroundColor: bgColor,
            boxShadow: shadowStyle,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none overflow-hidden z-0">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_45%,rgba(168,85,247,0.3)_50%,transparent_55%)] opacity-30 mix-blend-screen"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(160px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 80%)`,
            }}
          />

          <motion.div
            animate={
              isHovered && !reducedMotion
                ? {
                  y: -2.5,
                  rotate: 4,
                  filter: "brightness(1.25) drop-shadow(0 0 4px rgba(168, 85, 247, 0.5))",
                }
                : {
                  y: 0,
                  rotate: 0,
                  filter: "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
                }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-950/90 border border-zinc-800/80 flex items-center justify-center text-purple-400"
            style={{ transformStyle: "preserve-3d" }}
          >
            {icon}
          </motion.div>

          <div className="flex flex-col z-10" style={{ transform: "translateZ(10px)" }}>
            <h3
              className={`font-vastago text-base lg:text-lg font-bold tracking-wide leading-tight transition-all duration-300 ${isHovered ? "text-white brightness-110" : "text-zinc-200"
                }`}
            >
              {title}
            </h3>
            <p
              className={`font-vastago text-sm lg:text-base font-light leading-relaxed mt-2 transition-all duration-300 ${isHovered ? "opacity-100 text-zinc-100" : "opacity-75 text-stat-label"
                }`}
            >
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const content = serviceVariantContent.socialMediaManagement;
  const icons = [
    (
      <svg
        key="community"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-purple-400"
      >
        <path d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5c-1.3 0-2.5-.3-3.6-.9l-3.9.9 1-3.7A7.5 7.5 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5z" />
        <path
          d="M12 15.3l-2.8-2.8a2.0 2.0 0 0 1 0-2.8 2.0 2.0 0 0 1 2.8 0l.4.4.4-.4a2.0 2.0 0 0 1 2.8 0 2.0 2.0 0 0 1 0 2.8l-2.8 2.8z"
          fill="currentColor"
          fillOpacity="0.05"
        />
      </svg>
    ),
    <PlaySquare key="video" className="h-5.5 w-5.5 text-purple-400 fill-purple-400/5" />,
    <Megaphone key="campaign" className="h-5.5 w-5.5 text-purple-400 fill-purple-400/5" />,
    <User key="management" className="h-5.5 w-5.5 text-purple-400 fill-purple-400/5" />,
  ];
  const solutionsData = content.cards.map((card, index) => ({ ...card, icon: icons[index] }));

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section ref={containerRef} className="bg-bg px-6 lg:px-[52px] py-[36px]">
      <div className="relative isolate mx-auto max-w-[1336px] overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#060007,#15001f)] px-6 lg:px-[52px] pb-[72px] pt-[64px] border border-purple-950/20">

        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px] z-0">
          <div className="sets-apart-horizon absolute bottom-[-1180px] left-1/2 h-[1272px] w-[1272px] -translate-x-1/2 rounded-full opacity-60" />
        </div>

        <motion.div
          {...fadeUp({ y: 15, duration: 1.0, ease: EASE_SOFT, amount: 0.3 })}
          className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center mb-14"
        >
          <span className="font-vastago text-2xl md:text-3xl lg:text-[40px] font-bold tracking-tight text-white flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="relative inline-block px-1 select-none">
              <span className="relative z-10">{content.heading.highlight}</span>
              <span className="absolute left-0 bottom-[4px] w-full h-[18px] bg-purple-600 -z-10" />
            </span>
            <span>{content.heading.firstLine}</span>
          </span>
          <span className="font-mary text-6xl md:text-7xl lg:text-[88px] text-purple-400 leading-none lowercase select-none relative -mt-1 md:-mt-2.5 lg:-mt-4 -top-1 lg:-top-2 z-20">
            {content.heading.accent}
          </span>
        </motion.div>

        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1020px] mx-auto"
        >
          {solutionsData.map((sol, i) => (
            <SolutionCard
              key={sol.title}
              index={i}
              icon={sol.icon}
              title={sol.title}
              description={sol.description}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              reducedMotion={reducedMotion}
              parentInView={isInView}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
