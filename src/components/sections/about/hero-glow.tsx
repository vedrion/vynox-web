"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ASSETS } from "@/config/assets";

const REFERENCE_HEIGHT = 900;
const REFERENCE_BAND = 600;

function useCrescentHeight() {
  const [height, setHeight] = useState(REFERENCE_BAND);
  useEffect(() => {
    const update = () =>
      setHeight(Math.max(300, Math.round((window.innerHeight * REFERENCE_BAND) / REFERENCE_HEIGHT)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return height;
}

const CRESCENT =
  "absolute inset-x-0 overflow-hidden bg-center bg-cover bg-no-repeat [mix-blend-mode:lighten] [mask-image:linear-gradient(118deg,transparent_0%,black_60%)]";

const crescentStyle = { backgroundImage: `url(${ASSETS.about.heroGlow.crescent})` };

export function HeroGlow() {
  const reduceMotion = useReducedMotion();
  const bandHeight = useCrescentHeight();
  const shift = reduceMotion ? 0 : bandHeight;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className={`${CRESCENT} top-0 scale-x-[-1] scale-y-[0.88] rotate-180`}
        style={{ ...crescentStyle, height: bandHeight }}
        initial={{ y: shift }}
        animate={{ y: 0 }}
        transition={{ duration: 4.0, ease: [0.05, 0.9, 0.1, 1.0] as const }}
      />
      <motion.div
        className={`${CRESCENT} bottom-0 scale-y-[0.88]`}
        style={{ ...crescentStyle, height: bandHeight }}
        initial={{ y: shift }}
        animate={{ y: 0 }}
        transition={{ duration: 4.0, ease: [0.05, 0.9, 0.1, 1.0] as const }}
      />
    </div>
  );
}
