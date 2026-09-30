"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Megaphone, MessageCircleHeart } from "lucide-react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import type { GlowConfig } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { servicesContent } from "@/content/home";
import { fluid } from "@/lib/fluid";
import { cornerGlowSoft } from "@/lib/glow-presets";
import { EASE, viewportOnceAmount } from "@/lib/motion";

const CORNER_GLOWS: GlowConfig[] = [
  { ...cornerGlowSoft, right: [99, 180], bottom: [83, 150] },
];

const STEP_RATIO = 0.6;

const SETTLE_MS = 650;
const GESTURE_MS = 1200;
const IDLE_MS = 140;
const SWIPE_THRESHOLD_PX = 18;

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.55,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.4,
      ease: EASE,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.4,
      ease: "easeIn" as const,
    },
  },
};

const tabHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const tabParagraphVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const tabStatsVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const tabMediaVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    rotate: -3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    rotate: 3,
    transition: {
      duration: 0.4,
      ease: "easeIn" as const,
    },
  },
};

const tabMediaIconLeftVariants: Variants = {
  hidden: { opacity: 0, scale: 0, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.5, ease: "easeOut" as const },
  },
};

const tabMediaIconRightVariants: Variants = {
  hidden: { opacity: 0, scale: 0, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: 0.45, duration: 0.5, ease: "easeOut" as const },
  },
};

export function Services() {
  const { headingLines, headingHighlight, headingAccent, tabs, exploreCta, viewAll } =
    servicesContent;

  const tabCount = tabs.length;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [track, setTrack] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const steppedAtRef = useRef(0);
  const flowRef = useRef(0);
  const stickyTopRef = useRef(0);
  const stepRef = useRef(0);
  const unlockRef = useRef<number | undefined>(undefined);
  const idleRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const measure = useCallback(() => {
    const el = wrapperRef.current;
    const sticky = isMobile ? contentRef.current : stickyRef.current;
    if (!el || !sticky) return;

    const prev = sticky.style.position;
    sticky.style.position = "static";
    const flow = sticky.offsetTop;
    const height = sticky.offsetHeight;
    sticky.style.position = prev;

    const step = Math.max(Math.round(window.innerHeight * STEP_RATIO), 1);
    flowRef.current = flow;
    stickyTopRef.current = parseFloat(window.getComputedStyle(sticky).top) || 0;
    stepRef.current = step;
    setTrack(flow + height + (tabCount - 1) * step);
  }, [isMobile, tabCount]);

  useEffect(() => {
    const sticky = isMobile ? contentRef.current : stickyRef.current;
    measure();
    window.addEventListener("resize", measure);
    const ro = sticky ? new ResizeObserver(measure) : null;
    if (sticky && ro) ro.observe(sticky);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [isMobile, measure]);

  const lock = useCallback(() => {
    lockedRef.current = true;
    window.clearTimeout(unlockRef.current);
    unlockRef.current = window.setTimeout(() => {
      lockedRef.current = false;
    }, SETTLE_MS);
  }, []);

  const pinStart = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return 0;
    return (
      window.scrollY + el.getBoundingClientRect().top + flowRef.current - stickyTopRef.current
    );
  }, []);

  const scrollToZone = useCallback(
    (index: number) => {
      if (!wrapperRef.current || !stepRef.current) return;
      const clamped = Math.min(Math.max(index, 0), tabCount - 1);
      activeRef.current = clamped;
      setActive(clamped);
      steppedAtRef.current = performance.now();
      lock();
      window.scrollTo({
        top: Math.max(pinStart() + clamped * stepRef.current, 0),
        behavior: scrollBehavior(),
      });
    },
    [lock, pinStart, tabCount],
  );

  useEffect(() => {
    const engaged = () => {
      const step = stepRef.current;
      if (!step || !wrapperRef.current) return false;
      const start = pinStart();
      return (
        window.scrollY >= start - 2 && window.scrollY <= start + (tabCount - 1) * step + 2
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 2 || !engaged()) return;

      if (lockedRef.current) {
        e.preventDefault();
        if (performance.now() - steppedAtRef.current < GESTURE_MS) lock();
        return;
      }

      const next = activeRef.current + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next > tabCount - 1) return;
      e.preventDefault();
      scrollToZone(next);
    };

    let touchY = 0;
    let touchMode = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchMode = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchMode === 2 || !engaged()) return;
      if (touchMode === 1 || lockedRef.current) {
        e.preventDefault();
        return;
      }
      const delta = touchY - e.touches[0].clientY;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) {
        e.preventDefault();
        return;
      }
      const next = activeRef.current + (delta > 0 ? 1 : -1);
      if (next < 0 || next > tabCount - 1) {
        touchMode = 2;
        return;
      }
      touchMode = 1;
      e.preventDefault();
      scrollToZone(next);
    };

    const onScroll = () => {
      if (lockedRef.current) return;
      const step = stepRef.current;
      if (!step) return;

      const start = pinStart();
      const index = Math.min(
        Math.max(Math.round((window.scrollY - start) / step), 0),
        tabCount - 1,
      );
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }

      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => {
        if (lockedRef.current || !engaged()) return;
        const top = pinStart() + activeRef.current * step;
        if (Math.abs(top - window.scrollY) < 2) return;
        lock();
        window.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior() });
      }, IDLE_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(unlockRef.current);
      window.clearTimeout(idleRef.current);
    };
  }, [lock, pinStart, scrollToZone, tabCount]);

  const activeTab = tabs[active];

  const scrollToTab = (index: number) => scrollToZone(index);

  return (
    <Section
      spacingTop="md"
      spacingBottom="md"
      clip="clip"
      className="bg-bg"
      glows={CORNER_GLOWS}
    >
      <Shell>
        <motion.div
          ref={wrapperRef}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceAmount(0.1)}
          variants={containerVariants}
          className="relative"
          style={track ? { height: `${track}px` } : undefined}
        >
          <div ref={stickyRef} className="max-md:contents md:sticky md:top-25">
            <motion.div variants={headingVariants}>
              <SectionHeading
                lines={headingLines}
                accent={headingAccent}
                highlight={headingHighlight}
                accentWidth={fluid(39, 69)}
                accentGap={fluid(7, 12)}
                headingClassName="md:leading-[70px] md:[--hl-bottom:9px]"
              />
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="mt-8.25 hidden h-[0.5px] w-full bg-primary shadow-[0_0_5.7px_0_rgb(var(--color-glow-primary-rgb)/1)] md:block origin-left"
            />

            <motion.div
              ref={contentRef}
              variants={contentVariants}
              className="max-md:sticky max-md:top-26 max-md:mt-5 mt-13 flex flex-col max-md:gap-4 gap-8 md:flex-row md:gap-11.5"
            >
              <div
                aria-hidden
                className="relative mt-4 h-2.5 w-full shrink-0 md:-ml-1.75 md:mt-26.5 md:h-57.25 md:w-2.5"
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[rgba(67, 43, 225, 0.28)] md:left-1/2 md:top-0 md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0" />

                <motion.span
                  className="absolute bg-primary shadow-[0_0_10px_rgb(var(--color-glow-primary-rgb)/0.9)] rounded-full"
                  animate={{
                    left: isMobile ? 0 : "50%",
                    top: isMobile ? "50%" : 0,
                    x: isMobile ? 0 : "-50%",
                    y: isMobile ? "-50%" : 0,
                    width: isMobile ? `${(active / (tabs.length - 1)) * 100}%` : "2.5px",
                    height: isMobile ? "2.5px" : `${(active / (tabs.length - 1)) * 100}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                  }}
                />

                {tabs.map((t, i) => {
                  const pos =
                    i === tabs.length - 1 ? "calc(100% - 7px)" : `${(i / (tabs.length - 1)) * 100}%`;
                  const isActive = i === active;
                  if (!isActive) return null;
                  return (
                    <motion.div
                      key={`glow-${t.key}`}
                      layoutId="liquidActiveDotGlow"
                      className="pointer-events-none absolute left-[var(--dot-pos)] top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 rounded-full bg-primary/60 blur-[4.5px] md:left-1/2 md:top-[var(--dot-pos)] md:-translate-x-1/2 md:-translate-y-1/2"
                      style={{ "--dot-pos": pos } as React.CSSProperties}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                    />
                  );
                })}

                <div className="absolute inset-0 size-full" style={{ filter: "url(#liquid-goo)" }}>
                  {tabs.map((t, i) => {
                    const pos =
                      i === tabs.length - 1 ? "calc(100% - 7px)" : `${(i / (tabs.length - 1)) * 100}%`;
                    const isActive = i === active;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        aria-label={servicesContent.showTabAriaLabel(t.title)}
                        onClick={() => scrollToTab(i)}
                        className="absolute left-[var(--dot-pos)] top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 md:left-1/2 md:top-[var(--dot-pos)] md:-translate-x-1/2 md:-translate-y-1/2 focus:outline-none"
                        style={{ "--dot-pos": pos } as React.CSSProperties}
                      >
                        <div className="absolute inset-0 m-auto size-1.75 rounded-full bg-primary/45" />

                        {isActive && (
                          <motion.div
                            layoutId="liquidActiveDot"
                            className="absolute inset-0 m-auto size-2.5 rounded-full bg-primary"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 22,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="max-md:mt-4 mt-10.75 w-full min-w-0 md:min-w-0 md:max-w-174.75 md:flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.key}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabContentVariants}
                  >
                    <motion.h3
                      variants={tabHeadingVariants}
                      className="font-vastago font-medium leading-tight md:leading-[70px] text-white"
                      style={{ fontSize: fluid(32, 56) }}
                    >
                      {activeTab.title}
                    </motion.h3>
                    <motion.p
                      variants={tabParagraphVariants}
                      className="max-md:mt-2 mt-5 w-full font-inter text-base font-light leading-[1.19] text-subtext"
                    >
                      {activeTab.paragraph}
                    </motion.p>

                    <motion.div
                      variants={tabStatsVariants}
                      className="max-md:mt-4 mt-10.75 flex gap-6"
                    >
                      {activeTab.stats.map((s) => (
                        <div
                          key={s.label}
                          className="flex w-33 flex-col items-start gap-[5.6px] p-[5.6px]"
                        >
                          <p
                            className="text-gradient-stat font-vastago font-normal leading-[1.26]"
                            style={{ fontSize: fluid(22, 31.36) }}
                          >
                            {s.value}
                          </p>
                          <span aria-hidden className="block h-[1.12px] w-[44.8px] bg-stat-rule" />
                          <p className="font-inter text-[13.44px] uppercase leading-[1.21] text-stat-label">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className="max-md:mt-4 mt-7.25 flex items-center gap-7">
                  <Button
                    variant="pill"
                    href={`/services/${activeTab.serviceSlug}`}
                    className="max-md:whitespace-nowrap max-md:px-4 max-md:text-sm"
                  >
                    {exploreCta.label}
                  </Button>
                  <Button
                    variant="ghost"
                    href={viewAll.href}
                    className="px-5 py-2 text-quiet max-md:whitespace-nowrap max-md:px-0 max-md:text-sm"
                  >
                    {viewAll.label}
                  </Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.key}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabMediaVariants}
                  className="relative mx-auto max-md:mt-2 md:mx-0 md:ml-13"
                  style={{ width: fluid(130, 279), maxWidth: "100%" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[19.78px] bg-[radial-gradient(circle_at_center,rgba(91, 43, 225, 0.65)_0%,transparent_70%)] blur-[80px] opacity-90 scale-[2.0] mix-blend-plus-lighter"
                    aria-hidden="true"
                  />
                  <div
                    className="relative overflow-hidden rounded-[19.78px] shadow-[0_0_60px_rgba(115,16,206,0.35)]"
                    style={{ width: fluid(130, 279), height: fluid(205, 442) }}
                  >
                    <Image
                      src={activeTab.image}
                      alt={activeTab.imageAlt}
                      fill
                      sizes="(max-width: 768px) 130px, 279px"
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    variants={tabMediaIconLeftVariants}
                    className="absolute -left-4 top-8 flex size-11 items-center justify-center rounded-[14px] bg-[#f1eef6] shadow-[0_10px_28px_rgba(0,0,0,0.45)] md:-left-8.25 md:top-16.75 md:size-16.5 md:rounded-[18px]"
                  >
                    <Megaphone size={isMobile ? 26 : 41} className="text-[#5c03ae]" aria-hidden />
                  </motion.div>
                  <motion.div
                    variants={tabMediaIconRightVariants}
                    className="absolute -right-4 bottom-16 flex size-11 items-center justify-center rounded-[14px] bg-[#f1eef6] shadow-[0_10px_28px_rgba(0,0,0,0.45)] md:-right-9.75 md:bottom-35 md:size-16.5 md:rounded-[18px]"
                  >
                    <MessageCircleHeart size={isMobile ? 26 : 41} className="text-primary" aria-hidden />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </Shell>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-55 -z-10 ml-13 h-166 w-134.75 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.5)_0%,transparent_70%)] opacity-[0.41] blur-[50px]"
      />

      <svg className="absolute size-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Section>
  );
}
