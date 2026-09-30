"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { fluid } from "@/lib/fluid";
import { motion } from "motion/react";
import { EASE_SOFT, viewportOnce } from "@/lib/motion";

interface Highlight {
  word: string;
  line: number;
  kind: "bar" | "underline" | "colored";
}

interface SectionHeadingProps {
  lines: React.ReactNode[];
  accent?: string;
  highlight?: Highlight | Highlight[];
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  accentClassName?: string;
  headingClassName?: string;
  accentWidth?: number | string;
  accentGap?: number | string;
}

function markup(highlight: Highlight, key: number) {
  return (
    <span key={key} className="relative isolate inline-block">
      {highlight.kind === "bar" && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE_SOFT }}
          className="absolute inset-x-0 -z-10 bg-primary origin-left"
          style={{ bottom: "var(--hl-bottom, 3px)", height: "var(--hl-height, 10px)" }}
          aria-hidden
        />
      )}
      <span className={cn("relative", highlight.kind === "colored" && "text-primary")}>
        {highlight.word}
      </span>
      {highlight.kind === "underline" && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE_SOFT }}
          className="absolute inset-x-0 -bottom-1 h-1 rounded bg-primary origin-left"
          aria-hidden
        />
      )}
    </span>
  );
}

function renderLine(node: React.ReactNode, index: number, highlights: Highlight[]) {
  const forLine = highlights.filter((h) => h.line === index);
  if (forLine.length === 0 || typeof node !== "string") return node;

  const out: React.ReactNode[] = [];
  let rest = node;
  let key = 0;
  while (rest.length > 0) {
    const next = forLine
      .map((h) => ({ h, at: rest.indexOf(h.word) }))
      .filter((m) => m.at !== -1)
      .sort((a, b) => a.at - b.at)[0];
    if (!next) break;
    if (next.at > 0) out.push(rest.slice(0, next.at));
    out.push(markup(next.h, key++));
    rest = rest.slice(next.at + next.h.word.length);
  }
  if (out.length === 0) return node;
  if (rest.length > 0) out.push(rest);
  return <>{out}</>;
}

export function SectionHeading({
  lines,
  accent,
  highlight,
  eyebrow,
  align = "left",
  className,
  accentClassName,
  headingClassName,
  accentWidth,
  accentGap = 11,
}: SectionHeadingProps) {
  const highlights = highlight ? (Array.isArray(highlight) ? highlight : [highlight]) : [];

  const rootRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width > 0 && width < 640;

  useEffect(() => {
    const el = accentRef.current;
    if (!compact || !el || width === 0) {
      setFit(1);
      return;
    }
    setFit(Math.min(1, width / el.offsetWidth));
  }, [compact, width, accent]);

  return (
    <div ref={rootRef} className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <EyebrowBadge className="mb-4.25">{eyebrow}</EyebrowBadge>
      )}
      <h2
        className={cn(
          "font-vastago font-bold leading-[1.05] tracking-[-0.03em] text-white",
          headingClassName,
        )}
        style={{ fontSize: fluid(32, 56) }}
      >
        {lines.map((line, i) => {
          const isLastLine = i === lines.length - 1;
          const accentSpan = compact ? (
            <span
              ref={accentRef}
              className={cn(
                "relative inline-block align-baseline font-mary font-normal leading-[0.95] tracking-normal text-primary",
                accentClassName,
              )}
              style={{
                marginLeft: typeof accentGap === "number" ? `${accentGap}px` : accentGap,
                fontSize: fit < 1 ? `calc(${fluid(56, 122.778)} * ${fit})` : fluid(56, 122.778),
              }}
            >
              {accent}
            </span>
          ) : null;

          if (compact && accent && isLastLine && typeof line === "string" && line.includes(" ")) {
            const words = line.split(" ");
            const lastWord = words.pop()!;
            const rest = words.join(" ");
            return (
              <span key={i} className="block">
                {renderLine(`${rest} `, i, highlights)}
                <span className="inline-block whitespace-nowrap">
                  {renderLine(lastWord, i, highlights)}
                  {accentSpan}
                </span>
              </span>
            );
          }

          return (
            <span key={i} className="block">
              {renderLine(line, i, highlights)}
              {accent && isLastLine && (
                compact ? accentSpan : (
                  <span
                    className="relative inline-block h-0 align-baseline"
                    style={{
                      width: accentWidth
                        ? typeof accentWidth === "number"
                          ? `${accentWidth}px`
                          : accentWidth
                        : undefined,
                      marginLeft: typeof accentGap === "number" ? `${accentGap}px` : accentGap,
                    }}
                  >
                    <span
                      ref={accentRef}
                      className={cn(
                        "absolute left-0 block font-mary font-normal tracking-normal text-primary",
                        accentClassName,
                      )}
                      style={{
                        bottom: `var(--accent-drop, ${fluid(-18, -43)})`,
                        fontSize: fluid(56, 122.778),
                        height: fluid(75, 166),
                        lineHeight: fluid(75, 166),
                      }}
                    >
                      {accent}
                    </span>
                  </span>
                )
              )}
            </span>
          );
        })}
      </h2>
    </div>
  );
}
