"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { FeatureCard } from "@/components/cards/feature-card";
import { ASSETS } from "@/config/assets";
import { fluid } from "@/lib/fluid";
import { EASE_SOFT, viewportOnceAmount } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_SOFT,
      staggerChildren: 0.18,
    },
  },
};

interface SetsApartCardsProps {
  cards: {
    title: string;
    description: string;
    graphic: "dataDriven" | "authenticCreator" | "endToEnd";
  }[];
}

function getGraphic(graphic: SetsApartCardsProps["cards"][number]["graphic"]) {
  const graphics = {
    dataDriven: ASSETS.home.setsApartCards.dataDriven,
    authenticCreator: ASSETS.home.setsApartCards.authenticCreator,
    endToEnd: ASSETS.home.setsApartCards.endToEnd,
  };

  return (
    <Image
      src={graphics[graphic]}
      alt=""
      width={358}
      height={158}
      className="max-h-full max-w-full object-contain"
    />
  );
}

export function SetsApartCards({ cards }: SetsApartCardsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="mt-18 flex flex-wrap justify-center gap-y-8 pb-8 md:pb-0"
        style={{ columnGap: fluid(24, 77) }}
      >
        {cards.map((c) => (
          <FeatureCard
            key={c.title}
            title={c.title}
            description={c.description}
            graphic={getGraphic(c.graphic)}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="mt-18 flex flex-wrap justify-center gap-y-8 pb-8 md:pb-0"
      style={{ columnGap: fluid(24, 77) }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceAmount(0.25)}
      variants={container}
    >
      {cards.map((c) => (
        <FeatureCard
          key={c.title}
          title={c.title}
          description={c.description}
          graphic={getGraphic(c.graphic)}
          variants={item}
        />
      ))}
    </motion.div>
  );
}
