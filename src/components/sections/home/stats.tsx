"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { GlowLayer } from "@/components/ui/glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { Stat } from "@/components/ui/stat";
import { statsContent } from "@/content/home";
import { FEATURES } from "@/config/features";
import { fluid } from "@/lib/fluid";
import { cornerGlowSoft } from "@/lib/glow-presets";

const TRIGGER_HEIGHT_VH = 26;
const FADE_IN_FRACTION = 0.15;

interface ParsedStat {
  target: number;
  decimals: number;
  suffix: string;
}

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, decimals: 0, suffix: value };
  const [, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { target: Number(num), decimals, suffix };
}

function formatStat(parsed: ParsedStat, progress: number) {
  return `${(parsed.target * progress).toFixed(parsed.decimals)}${parsed.suffix}`;
}

export function Stats() {
  const { headingLines, headingHighlight, headingAccent, subtext, cta, stats } = statsContent;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProgress, setActiveProgress] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
        const overall = total > 0 ? scrolled / total : 0;
        const scaled = overall * stats.length;
        const idx = Math.min(Math.floor(scaled), stats.length - 1);
        const frac = idx === stats.length - 1 ? Math.min(scaled - idx, 1) : scaled - idx;
        setActiveIndex(idx);
        setActiveProgress(frac);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [stats.length]);

  const headingBlock = (
    <div className="max-w-130">
      <SectionHeading
        lines={headingLines}
        accent={headingAccent}
        highlight={headingHighlight}
        accentWidth={fluid(66, 116)}
        accentGap={fluid(15, 27)}
        headingClassName="md:leading-[70px]"
      />
      <p className="mt-6 w-full max-w-128 font-inter text-[18px] md:text-[24px] leading-snug text-white">
        {subtext}
      </p>
      {FEATURES.caseStudies && (
        <Button variant="secondary" href={cta.href} className="mt-8">
          {cta.label}
        </Button>
      )}
    </div>
  );

  return (
    <section className="relative isolate">
      <GlowLayer glows={[{ ...cornerGlowSoft, left: [60, 180], top: [40, 120] }]} />

      <div className="hidden md:block">
        <div ref={wrapperRef} style={{ height: `calc(100vh + ${stats.length * TRIGGER_HEIGHT_VH}vh)` }}>
          <div className="sticky top-0 flex h-screen items-center">
            <Shell className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              {headingBlock}

              <div className="grid grid-cols-2" style={{ columnGap: fluid(24, 64), rowGap: fluid(24, 40) }}>
                {stats.map((s, i) => {
                  const parsed = parseStatValue(s.value);
                  const done = i < activeIndex;
                  const active = i === activeIndex;
                  const progress = done ? 1 : active ? activeProgress : 0;
                  const opacity = done ? 1 : active ? Math.min(activeProgress / FADE_IN_FRACTION, 1) : 0;

                  return (
                    <Stat
                      key={s.label}
                      value={formatStat(parsed, progress)}
                      label={s.label}
                      className="stat-fade"
                      style={{ opacity }}
                    />
                  );
                })}
              </div>
            </Shell>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Shell className="flex flex-col gap-12 pb-16 pt-24">
          {headingBlock}

          <div className="grid grid-cols-2" style={{ columnGap: fluid(24, 64), rowGap: fluid(24, 40) }}>
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Shell>
      </div>
    </section>
  );
}
