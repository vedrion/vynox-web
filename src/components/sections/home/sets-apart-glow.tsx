"use client";

import { motion, useReducedMotion } from "motion/react";

import { fluid } from "@/lib/fluid";

const HORIZON_CLASS = "sets-apart-horizon absolute left-1/2 -translate-x-1/2 rounded-full";

const HORIZON_STYLE: React.CSSProperties = {
  bottom: fluid(-608, -1205),
  width: fluid(640, 1272),
  height: fluid(640, 1272),
};

const AMBIENT_LIGHT_CLASS = "pointer-events-none absolute inset-x-0 bottom-0";

const AMBIENT_LIGHT_STYLE: React.CSSProperties = {
  height: fluid(210, 420),
  background: `radial-gradient(ellipse ${fluid(340, 680)} ${fluid(190, 380)} at 50% 100%, rgba(196,168,255,0.35), rgba(168,132,245,0.14) 45%, transparent 75%)`,
};

export function SetsApartGlow() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <>
        <div aria-hidden className={AMBIENT_LIGHT_CLASS} style={AMBIENT_LIGHT_STYLE} />
        <div aria-hidden className={HORIZON_CLASS} style={HORIZON_STYLE} />
      </>
    );
  }

  return (
    <>
      <div aria-hidden className={AMBIENT_LIGHT_CLASS} style={AMBIENT_LIGHT_STYLE} />
      <motion.div
        aria-hidden
        className={HORIZON_CLASS}
        style={HORIZON_STYLE}
        animate={{
          filter: ["brightness(1) saturate(1)", "brightness(1.2) saturate(1.15)", "brightness(1) saturate(1)"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
