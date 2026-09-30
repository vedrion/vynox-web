"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { ServiceContent } from "@/content/services";
import { ServiceMedia } from "./media/service-media";

export function HowVynoxSolves({ solves, heading, slug }: {
  solves: ServiceContent["solves"];
  heading: ServiceContent["solvesHeading"];
  slug?: string;
}) {

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const dotGlowingInnerRef = useRef<SVGGElement>(null);
  const dotGlowingOuterRef = useRef<SVGGElement>(null);
  const pathDashedInnerRef = useRef<SVGPathElement>(null);
  const pathDashedOuterRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      startTimeRef.current = null;
      return;
    }

    let rafId: number;

    const updateOrbits = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const t = (timestamp - startTimeRef.current) / 1000;

      const duration_glow = 1.8;
      let theta_glow = 0;
      let scale_glow = 1.0;
      let ease_glow = 1.0;

      if (t < duration_glow) {
        const norm = t / duration_glow;
        ease_glow = 1 - Math.pow(1 - norm, 5);
        theta_glow = -Math.PI / 2 + ease_glow * (Math.PI / 2);
      } else {
        theta_glow = 0;
        scale_glow = 1.0 + 0.04 * Math.sin((t - duration_glow) * 3.0);
      }

      const offset_dash_inner = 20 * t + 80 * (1 - Math.exp(-t * 2));
      const offset_dash_outer = 25 * t + 117 * (1 - Math.exp(-t / 0.6));

      if (pathDashedInnerRef.current) {
        pathDashedInnerRef.current.setAttribute("stroke-dashoffset", `${offset_dash_inner}`);
      }

      if (pathDashedOuterRef.current) {
        pathDashedOuterRef.current.setAttribute("stroke-dashoffset", `${offset_dash_outer}`);
      }

      if (dotGlowingInnerRef.current) {
        const x = 230 * Math.cos(theta_glow);
        const y = 360 + 230 * Math.sin(theta_glow);
        dotGlowingInnerRef.current.setAttribute(
          "transform",
          `translate(${x}, ${y}) scale(${scale_glow})`
        );
        dotGlowingInnerRef.current.style.opacity = "1";
      }

      if (dotGlowingOuterRef.current) {
        const x = 400 * Math.cos(theta_glow);
        const y = 360 + 400 * Math.sin(theta_glow);
        dotGlowingOuterRef.current.setAttribute(
          "transform",
          `translate(${x}, ${y}) scale(${scale_glow})`
        );
        dotGlowingOuterRef.current.style.opacity = "1";
      }

      if (titleRef.current) {
        if (t < duration_glow) {
          const dx = 400 * Math.cos(theta_glow) - 400;
          const dy = 400 * Math.sin(theta_glow);
          const scale_text = 0.65 + 0.35 * ease_glow;
          titleRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${scale_text})`;
          titleRef.current.style.opacity = `${ease_glow}`;
        } else {
          titleRef.current.style.transform = "translate(0px, 0px) scale(1)";
          titleRef.current.style.opacity = "1";
        }
      }

      rafId = requestAnimationFrame(updateOrbits);
    };

    rafId = requestAnimationFrame(updateOrbits);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  return (
    <section ref={containerRef} id="how-vynox-solves" className="relative isolate overflow-hidden bg-bg min-h-screen max-md:min-h-0 w-full flex flex-col justify-center py-20 max-md:py-8 lg:py-0">
      <Shell className="relative z-20 w-full max-w-[1340px] px-6 lg:px-10 py-12 max-md:py-4">

        <div className="relative mt-[20px] lg:mt-[40px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-h-[500px]">

          <div className="relative lg:col-span-7 h-[460px] flex items-center">
            <div className="absolute -left-[400px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-primary/25 blur-[60px] pointer-events-none z-0" />
            <div className="absolute -left-[330px] top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-white/10 blur-[30px] mix-blend-screen pointer-events-none z-0" />

            <motion.div
              aria-hidden
              className="absolute -left-[480px] sm:-left-[440px] lg:-left-[420px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full sets-apart-horizon pointer-events-none z-10 rotate-90"
              animate={{
                filter: [
                  "brightness(1) saturate(1)",
                  "brightness(1.2) saturate(1.15)",
                  "brightness(1) saturate(1)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute -left-[280px] sm:-left-[240px] lg:-left-[220px] top-1/2 -translate-y-1/2 w-[500px] h-[720px] pointer-events-none z-10 opacity-40 lg:opacity-100 transition-opacity">
              <svg className="w-full h-full" viewBox="0 0 500 720" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="inner-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-glow-bright)" stopOpacity="0" />
                    <stop offset="30%" stopColor="var(--color-glow-bright)" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="var(--color-primary-light)" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="var(--color-glow-bright)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-glow-bright)" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="smooth-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-glow-bright)" stopOpacity="0" />
                    <stop offset="30%" stopColor="var(--color-glow-bright)" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="var(--color-primary-light)" stopOpacity="1" />
                    <stop offset="70%" stopColor="var(--color-glow-bright)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-glow-bright)" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity="1" />
                    <stop offset="35%" stopColor="var(--color-primary-light)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="var(--color-primary-light)" stopOpacity="0" />
                  </radialGradient>

                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  ref={pathDashedInnerRef}
                  d="M 0 160 A 200 200 0 0 1 0 560"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeDasharray="12 10"
                  opacity="0.15"
                  fill="none"
                />

                <path
                  d="M 0 130 A 230 230 0 0 1 0 590"
                  stroke="url(#inner-gradient)"
                  strokeWidth="4"
                  opacity="0.35"
                  filter="url(#glow-filter)"
                  fill="none"
                />
                <path
                  d="M 0 130 A 230 230 0 0 1 0 590"
                  stroke="url(#inner-gradient)"
                  strokeWidth="1.2"
                  fill="none"
                />

                <path
                  ref={pathDashedOuterRef}
                  d="M 0 -5 A 365 365 0 0 1 0 725"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeDasharray="15 12"
                  opacity="0.15"
                  fill="none"
                />

                <path
                  d="M 0 -40 A 400 400 0 0 1 0 760"
                  stroke="url(#smooth-gradient)"
                  strokeWidth="6"
                  opacity="0.45"
                  filter="url(#glow-filter)"
                  fill="none"
                />
                <path
                  d="M 0 -40 A 400 400 0 0 1 0 760"
                  stroke="url(#smooth-gradient)"
                  strokeWidth="2"
                  fill="none"
                />

                <g ref={dotGlowingInnerRef} style={{ opacity: 0 }}>
                  <circle r="16" fill="var(--color-primary-light)" opacity="0.25" filter="url(#glow-filter)" />
                  <circle r="12" fill="url(#dot-glow)" />
                  <circle r="4.5" fill="#FFFFFF" />
                </g>

                <g ref={dotGlowingOuterRef} style={{ opacity: 0 }}>
                  <circle r="26" fill="var(--color-primary-light)" opacity="0.3" filter="url(#glow-filter)" />
                  <circle r="18" fill="url(#dot-glow)" />
                  <circle r="6" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            <div className="absolute left-[130px] sm:left-[170px] lg:left-[220px] max-w-[190px] sm:max-w-[280px] lg:max-w-[300px] z-20">
              <h3
                ref={titleRef}
                style={{ opacity: 0 }}
                className="font-space text-2xl lg:text-3xl italic font-medium text-white tracking-tight leading-tight"
              >
                {solves.title}
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="mt-4 font-inter text-sm lg:text-base font-light leading-relaxed text-stat-label"
              >
                {solves.description}
              </motion.p>
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 justify-center lg:justify-start">
            <div className="w-full pl-4 md:pl-8 lg:pl-0 lg:-ml-20 lg:w-[calc(100%+80px)]">
              <SectionHeading
                lines={heading.lines}
                accent={heading.accent}
                accentWidth={heading.accentWidth}
                accentGap={16}
                align="left"
                headingClassName="xl:whitespace-nowrap"
              />
            </div>
            <div className="w-full overflow-x-auto lg:overflow-x-visible py-4 scrollbar-none flex justify-start lg:justify-center">
              <ServiceMedia slug={slug} />
            </div>
          </div>

        </div>
      </Shell>
    </section>
  );
}
