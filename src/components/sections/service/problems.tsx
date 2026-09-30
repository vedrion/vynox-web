"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  Activity,
  AlertTriangle,
  CalendarX,
  CircleDollarSign,
  Clock,
  HelpCircle,
  type LucideIcon,
  Puzzle,
  Route,
  SearchX,
  ShieldAlert,
  Sprout,
  TrendingDown,
} from "lucide-react";

import { SetsApartGlow } from "@/components/sections/home/sets-apart-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { fluid } from "@/lib/fluid";
import type { ServiceContent } from "@/content/services";
import { EASE } from "@/lib/motion";

const PROBLEM_ICONS: Record<string, LucideIcon> = {
  "The Wrong Creators": ShieldAlert,
  "Content That Fails": TrendingDown,
  "Results You Can't See": SearchX,
  "Inconsistent Posting": CalendarX,
  "Flat Engagement": Activity,
  "Platform Guesswork": HelpCircle,
  "Scattered Execution": Puzzle,
  "Missed Timelines": Clock,
  "Unclear Attribution": Route,
  "Undervalued Rates": CircleDollarSign,
  "Inconsistent Bookings": CalendarX,
  "No Growth Plan": Sprout,
};

function ProblemGlyph({ title }: { title: string }) {
  const Icon = PROBLEM_ICONS[title] ?? AlertTriangle;
  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden className="absolute inset-0">
        <circle cx="36" cy="36" r="35" stroke="var(--color-primary)" strokeOpacity="0.3" />
      </svg>
      <Icon className="relative h-8 w-8 text-primary" strokeWidth={1.6} />
    </div>
  );
}

interface ProblemCardProps {
  index: number;
  title: string;
  description: string;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  reducedMotion: boolean;
  parentInView: boolean;
}

function ProblemCard({
  index,
  title,
  description,
  hoveredIndex,
  setHoveredIndex,
  reducedMotion,
  parentInView,
}: ProblemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredIndex === index;
  const isNeighborHovered = hoveredIndex !== null && hoveredIndex !== index;

  const floatParams = [
    { duration: 9.4, delay: 0.1 },
    { duration: 10.8, delay: 0.35 },
    { duration: 8.9, delay: 0.2 },
  ];
  const { duration, delay } = floatParams[index % floatParams.length];

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
      card.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseEnter = () => setHoveredIndex(index);

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    const card = cardRef.current;
    if (!card || reducedMotion) return;
    card.style.transform = `translateY(0px) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const cardEntranceVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  let borderColor = "rgba(255, 255, 255, 0.08)";
  let bgColor = "rgba(9, 6, 12, 0.55)";
  let shadowStyle = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";

  if (isHovered) {
    borderColor = "rgba(168, 85, 247, 0.4)";
    bgColor = "rgba(20, 10, 28, 0.7)";
    shadowStyle = "0 20px 25px -5px rgb(var(--color-glow-primary-rgb)/0.22)";
  } else if (isNeighborHovered) {
    borderColor = "rgba(255, 255, 255, 0.14)";
    shadowStyle = "0 12px 20px -3px rgb(var(--color-glow-primary-rgb)/0.06)";
  }

  return (
    <motion.div variants={cardEntranceVariants} className="w-full max-w-89.5">
      <motion.div
        animate={parentInView && !reducedMotion ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration, delay: delay + 0.8, ease: "easeInOut", repeat: Infinity }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative flex flex-col items-center gap-4.5 rounded-card px-3.75 py-2.5 text-center transition-[background-color,border-color,box-shadow] duration-300 ease-out select-none overflow-hidden border"
          style={{
            borderColor,
            backgroundColor: bgColor,
            boxShadow: shadowStyle,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0 rounded-card border border-white/5 pointer-events-none overflow-hidden z-0">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_45%,rgba(168,85,247,0.3)_50%,transparent_55%)] opacity-30 mix-blend-screen"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(160px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.14), transparent 80%)`,
            }}
          />

          <motion.div
            animate={
              isHovered && !reducedMotion
                ? { y: -3, scale: 1.05, filter: "brightness(1.25) drop-shadow(0 0 6px rgba(168,85,247,0.5))" }
                : { y: 0, scale: 1, filter: "brightness(1)" }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex h-39.5 w-full shrink-0 items-center justify-center rounded-[14px]"
          >
            <ProblemGlyph title={title} />
          </motion.div>

          <div className="flex flex-col gap-2 z-10" style={{ transform: "translateZ(10px)" }}>
            <h3 className="mx-auto max-w-69 font-space text-[24px] font-medium leading-tight text-white">
              {title}
            </h3>
            <p
              className={`mx-auto max-w-69 font-inter text-base font-light leading-snug transition-colors duration-300 ${isHovered ? "text-white/90" : "text-stat-label"
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

export function Problems({
  problems,
}: {
  problems: ServiceContent["problems"];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const heading = `When Influence Doesn't`;
  const words = heading.split(" ");
  const headingLines =
    isMobile && words.length > 2
      ? [words.slice(0, -1).join(" "), words[words.length - 1]]
      : [heading];

  const gridContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section ref={containerRef} className="bg-bg px-4 md:px-8 lg:px-[52px] py-[36px] max-md:pb-4">
      <div className="relative isolate mx-auto max-w-[1336px] overflow-hidden rounded-card bg-[linear-gradient(160deg,#060007,#1c0025)] px-6 md:px-12 lg:px-[52px] pb-16 max-md:pb-7 lg:pb-[91px] pt-12 lg:pt-[52px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-card">
          <SetsApartGlow />
        </div>

        <div className="flex flex-col items-center">
          <SectionHeading
            lines={headingLines}
            accent="Deliver"
            highlight={{ word: "Influence", line: 0, kind: "bar" }}
            accentWidth={fluid(80, 175)}
            accentGap={fluid(10, 25)}
            align="center"
          />
        </div>

        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 mt-12 lg:mt-[72px] flex flex-wrap justify-center gap-8 lg:gap-[77px]"
        >
          {problems.map((p, i) => (
            <ProblemCard
              key={p.title}
              index={i}
              title={p.title}
              description={p.description}
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
