"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Play, X } from "lucide-react";

import { GrainTexture } from "@/components/ui/grain-texture";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import WebThreads from "@/components/ui/web-threads";
import { videoContent } from "@/content/home";
import { fluid } from "@/lib/fluid";
import { EASE } from "@/lib/motion";
import { ASSETS } from "@/config/assets";

const CARD_WIDTH = 866;
const CARD_HEIGHT = 492;

export function HowItWorks() {
  const { headingLines, headingHighlight, headingAccent } = videoContent;

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setScale(Math.min(1, (window.innerWidth - 48) / CARD_WIDTH));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && !isModalOpen) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isInView, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;

    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscrollBehavior = root.style.overscrollBehavior;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscrollBehavior;
    };
  }, [isModalOpen]);

  return (
    <Section spacingTop="md" spacingBottom="md" clip="hidden" className="bg-bg">
      <div ref={sectionRef} className="flex flex-col items-center">
        <SectionHeading
          lines={headingLines}
          accent={headingAccent}
          highlight={headingHighlight}
          accentWidth={fluid(85, 148)}
          accentGap={fluid(13, 23)}
          headingClassName="md:leading-[70px] md:[--hl-bottom:9px] md:[--hl-height:11px] md:[--accent-drop:-51px]"
          align="center"
        />
      </div>

      <div
        className="relative mx-auto mt-20.25"
        style={{ width: CARD_WIDTH * scale, height: CARD_HEIGHT * scale }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-screen h-[700px] overflow-hidden blur-[6px] opacity-95"
        >
          <WebThreads
            color1="#5227FF"
            color2="#FF9FFC"
            color3="#FFFFFF"
            speed={0.2}
            threadCount={2}
            frequency={7.5}
            spread={0.21}
            taper={1}
            position={0.5}
            fanMode="center"
            glow={0.045}
            falloff={0.9}
            thickness={1.1}
            brightness={0.65}
            opacity={0.35}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.01}
            mouseInteraction
            mouseStrength={0.25}
          />
        </div>

        <div
          className="absolute left-0 top-0"
          style={{ width: CARD_WIDTH, height: CARD_HEIGHT, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-20 -bottom-9.25 top-9.75 -z-10 rounded-[43px] bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.35)_0%,transparent_70%)] blur-[60px]"
          />

          <div className="rotating-border relative h-full overflow-hidden rounded-[43px] p-px shadow-[0_0_70px_rgba(180,60,255,0.45)]">
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative h-full overflow-hidden rounded-[40px] bg-[#0d0a10] shadow-[inset_0_0_6.8px_0_rgba(0,0,0,0.68)] cursor-pointer"
            >
              <GrainTexture variant="mesh" opacity={0.08} blend="normal" />

              <video
                ref={videoRef}
                src={ASSETS.home.howItWorksVideo}
                loop
                muted
                playsInline
                preload="none"
                className="h-full w-full object-cover rounded-[40px]"
              />

              <div
                className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity duration-300 rounded-[40px]"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative flex items-center justify-center size-20 md:size-24 rounded-full border border-white/30 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgb(var(--color-glow-primary-rgb)/0.5)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] group-hover:border-primary/70"
                  aria-label={videoContent.playAriaLabel}
                >
                  <Play className="size-8 md:size-10 text-white fill-white translate-x-0.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-10"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 24 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative w-full max-w-5xl rounded-[24px] overflow-hidden border border-white/15 bg-black shadow-[0_25px_70px_-15px_rgb(var(--color-glow-primary-rgb)/0.6)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 transition-all hover:bg-black/90 hover:scale-110 hover:text-white"
                    aria-label={videoContent.closeAriaLabel}
                  >
                    <X size={20} />
                  </button>

                  <div className="relative aspect-video w-full bg-black">
                    <video
                      src={ASSETS.home.howItWorksVideo}
                      autoPlay
                      controls
                      playsInline
                      className="size-full object-contain rounded-[24px]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </Section>
  );
}
