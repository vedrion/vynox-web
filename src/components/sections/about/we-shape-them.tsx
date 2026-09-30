"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import { weShapeThemContent } from "@/content/about";
import { ASSETS } from "@/config/assets";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Glow } from "@/components/ui/glow";
import { GrainTexture } from "@/components/ui/grain-texture";
import { fluid } from "@/lib/fluid";
import { EASE_SOFT, fadeUp, viewportOnce, viewportOnceAmount } from "@/lib/motion";

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = !!match;
  const target = isNumeric ? parseInt(match[1], 10) : 0;
  const suffix = isNumeric ? match[2] : "";

  useEffect(() => {
    if (!isNumeric || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const duration = 3000;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const easedProgress = progress < 0.5
              ? 16 * Math.pow(progress, 5)
              : 1 - Math.pow(-2 * progress + 2, 5) / 2;

            setCount(Math.floor(easedProgress * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
              setHasAnimated(true);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export function WeShapeThem() {
  const { eyebrow, headingPrefix, headingAccent, headingSuffix, stats } = weShapeThemContent;

  const body = weShapeThemContent.body;
  const words = (text: string, isWhite: boolean) =>
    text.trim().split(/\s+/).filter(Boolean).map((word) => ({ text: word, isWhite }));
  const line1Words = [...words(body.lead, true), ...words(body.first, false)];
  const line2Words = [
    ...words(body.secondPrefix, false),
    ...body.highlights.flatMap((highlight) => words(highlight, true)),
    ...words(body.secondSuffix, false),
  ];
  const descriptionContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      }
    }
  };

  const descriptionWordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(5px)",
      y: 5
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible" aria-hidden="true">
        <Glow className="left-[-90px] top-[-110px] h-[260px] w-[260px] blur-[60px] md:left-[-200px] md:top-[-260px] md:h-[600px] md:w-[600px] md:blur-[110px]" intensity={0.85} blend="plus-lighter" />
      </div>

      <section className="we-shape-section relative isolate flex items-center justify-center overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Glow className="left-[-50px] top-[6%] h-[160px] w-[220px] blur-[45px] md:left-[-100px] md:top-[10%] md:h-[320px] md:w-[450px] md:blur-[90px]" intensity={0.45} blend="plus-lighter" />
        <Glow className="left-[-40px] bottom-[10%] h-[140px] w-[190px] blur-[40px] md:left-[-80px] md:bottom-[12%] md:h-[280px] md:w-[400px] md:blur-[80px]" intensity={0.3} blend="plus-lighter" />
        <Glow className="right-[-90px] top-[18%] h-[220px] w-[280px] blur-[55px] md:right-[-180px] md:top-[22%] md:h-[520px] md:w-[750px] md:blur-[110px]" intensity={0.4} blend="plus-lighter" />
        <Glow className="right-[-50px] top-[26%] h-[150px] w-[220px] blur-[40px] md:right-[-80px] md:top-[30%] md:h-[300px] md:w-[480px] md:blur-[80px]" intensity={0.5} blend="plus-lighter" />

        <GrainTexture
          opacity={0.1}
          blend="soft-light"
          className="mask-[linear-gradient(180deg,transparent_0%,black_20%,black_80%,transparent_100%)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-bg" aria-hidden="true" />
      <div className="we-shape-content relative z-10 grid grid-cols-1 xl:grid-cols-[585px_485px] items-center gap-10 xl:gap-[54px]">
        <div className="pt-[5px]">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>

          <motion.h2
            {...fadeUp({ y: 15, duration: 1.0, ease: EASE_SOFT, amount: 0.3 })}
            className="we-shape-title mt-5 max-w-[585px] font-space font-bold tracking-[-0.03em] text-white"
          >
            <span>{headingPrefix}</span>{" "}
            <span className="relative ml-2 inline-block align-[-0.08em] font-mary font-normal tracking-normal text-primary">
              <span className="we-shape-script">{headingAccent}</span>
              <motion.img
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: -1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                src={ASSETS.about.weShapeThem.scriptUnderline}
                alt=""
                aria-hidden
                width={199}
                height={37}
                className="absolute -bottom-[10px] left-1/2 h-[32px] w-[174px] -translate-x-1/2 object-fill origin-center"
              />
            </span>
            <span className="block">{headingSuffix}</span>
          </motion.h2>

          <motion.p
            variants={descriptionContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceAmount(0.2)}
            className="we-shape-body mt-[20px] max-w-[520px] font-inter leading-[1.28]"
          >
            <span className="block py-[2px]">
              {line1Words.map((word, i) => (
                <motion.span
                  key={`d1-${i}`}
                  variants={descriptionWordVariants}
                  className={`${word.isWhite ? "text-white" : "text-body-muted"} inline-block mr-[0.25em]`}
                >
                  {word.text}
                </motion.span>
              ))}
            </span>
            <span className="block py-[2px] mt-1">
              {line2Words.map((word, i) => (
                <motion.span
                  key={`d2-${i}`}
                  variants={descriptionWordVariants}
                  className={`${word.isWhite ? "text-white" : "text-body-muted"} inline-block mr-[0.25em]`}
                >
                  {word.text}
                </motion.span>
              ))}
            </span>
          </motion.p>

          <motion.div
            {...fadeUp({ duration: 1.0, delay: 1.1, ease: EASE_SOFT })}
            className="mt-[34px] flex"
            style={{ gap: fluid(32, 52) }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="w-[150px]">
                <p className="we-shape-stat-number text-gradient-stat font-vastago leading-none">
                  <AnimatedCounter value={stat.value} />
                </p>
                <div className="we-shape-stat-line mt-[10px] h-0 w-20 border-t-2 border-primary" />
                <p className="mt-[8px] font-inter text-[21px] leading-none text-stat-label uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden rounded-[15px]" style={{ height: fluid(220, 462) }}>
          <Image
            src={ASSETS.about.weShapeThem.media}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>
      </section>
    </div>
  );
}
