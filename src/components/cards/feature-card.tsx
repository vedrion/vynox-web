"use client";

import { motion, Variants } from "motion/react";
import { cn } from "@/lib/cn";

export interface FeatureCardProps {
  title: string;
  description: string;
  graphic?: React.ReactNode;
  className?: string;
  variants?: Variants;
}

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FeatureCard({ title, description, graphic, className, variants }: FeatureCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -10,
        scale: 1.03,
        borderColor: "rgb(var(--color-glow-primary-rgb)/0.4)",
        boxShadow: "0 12px 36px rgb(var(--color-glow-primary-rgb)/0.22)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={cn(
        "flex w-full max-w-89.5 flex-col items-center gap-4.5 rounded-card border border-card-border-soft bg-card-solid px-3.75 py-2.5 text-center transition-colors duration-300",
        className,
      )}
    >
      <motion.div
        variants={childVariants}
        className="flex h-39.5 w-full items-center justify-center overflow-hidden rounded-[14px]"
      >
        {graphic}
      </motion.div>
      <div className="flex flex-col gap-2">
        <motion.h3
          variants={childVariants}
          className="mx-auto max-w-69 font-space text-[23px] font-medium leading-tight text-white"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={childVariants}
          className="mx-auto max-w-69 font-inter text-base font-light leading-snug text-stat-label"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
