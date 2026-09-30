"use client";

import { useEffect, useState, useRef } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { Stat } from "@/components/ui/stat";
import type { ServiceContent } from "@/content/services";

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const isNumeric = !!match;

  const target = isNumeric ? parseFloat(match[1]) : 0;
  const decimals = isNumeric && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = isNumeric ? match[2] : value;

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

            setCount(easedProgress * target);

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
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Stats({
  stats,
  headingLines,
  mobileHeadingLines,
  headingAccent,
  accentWidth = 255,
}: {
  stats: ServiceContent["stats"];
  headingLines?: string[];
  mobileHeadingLines?: string[];
  headingAccent?: string;
  accentWidth?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const lines = headingLines ?? (isMobile ? mobileHeadingLines : undefined) ?? ["Past Campaigns"];
  const accent = headingAccent ?? "performance";

  return (
    <div className="relative isolate bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
        <div className="absolute -right-[80px] -bottom-[60px] h-[220px] w-[260px] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.35)_0%,transparent_70%)] blur-[50px] mix-blend-plus-lighter lg:-right-[180px] lg:-bottom-[120px] lg:h-[520px] lg:w-[620px] lg:blur-[90px]" />

        <div className="absolute -left-[80px] -bottom-[60px] h-[220px] w-[260px] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.30)_0%,transparent_70%)] blur-[50px] mix-blend-plus-lighter lg:-left-[180px] lg:-bottom-[120px] lg:h-[520px] lg:w-[620px] lg:blur-[90px]" />
      </div>

      <section className="relative isolate overflow-hidden py-[80px] max-md:pt-6">
        <Shell className="flex flex-col items-center">
          <SectionHeading
            lines={lines}
            accent={accent}
            accentWidth={accentWidth}
            accentGap={20}
            align="center"
          />

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-x-16 justify-items-center w-full max-w-[900px] px-4">
            {stats.map((s) => (
              <Stat key={s.label} value={<AnimatedCounter value={s.value} />} label={s.label} />
            ))}
          </div>
        </Shell>
      </section>
    </div>
  );
}
