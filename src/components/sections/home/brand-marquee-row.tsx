"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

import { cn } from "@/lib/cn";

interface BrandItem {
  name: string;
  logo?: string;
}

interface BrandMarqueeRowProps {
  items: BrandItem[];
  direction: "left" | "right";
  className?: string;
}

const ORBIT_DURATION = 28;
const ARC_RADIUS = 3077.5;

function buildArcPath(containerWidth: number) {
  let logoWidth = 96;
  let targetGap = 10;

  if (containerWidth >= 1280) {
    logoWidth = 208;
    targetGap = 18;
  } else if (containerWidth >= 1024) {
    logoWidth = 176;
    targetGap = 16;
  } else if (containerWidth >= 768) {
    logoWidth = 160;
    targetGap = 14;
  } else if (containerWidth >= 640) {
    logoWidth = 128;
    targetGap = 12;
  }

  const targetPathLength = 11 * (logoWidth + targetGap);
  const bleed = Math.max(60, (targetPathLength - containerWidth) / 2);
  const cx = containerWidth / 2;
  const halfSpan = cx + bleed;
  const edgeY = ARC_RADIUS - Math.sqrt(ARC_RADIUS * ARC_RADIUS - halfSpan * halfSpan);
  return `path("M ${-bleed} ${edgeY} Q ${cx} ${-edgeY} ${containerWidth + bleed} ${edgeY}")`;
}

export function BrandMarqueeRow({ items, direction, className }: BrandMarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setPath(buildArcPath(el.clientWidth));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const track = items;

  return (
    <div ref={containerRef} className={cn("absolute", className)}>
      {path &&
        track.map((item, i) => (
          <div
            key={i}
            className={cn(
              "brand-pill flex items-center justify-center whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity",
              direction === "left" ? "brand-pill-left" : "brand-pill-right",
            )}
            style={{
              offsetPath: path,
              offsetRotate: "auto",
              offsetAnchor: "50% calc(100% + 16px)",
              animationDuration: `${ORBIT_DURATION}s`,
              animationDelay: `${(-(i / track.length) * ORBIT_DURATION).toFixed(3)}s`,
            }}
          >
            {item.logo ? (
              <div className="relative h-8 w-24 sm:h-10 sm:w-32 md:h-12 md:w-40 lg:h-14 lg:w-44 xl:h-16 xl:w-52 flex items-end justify-center">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 208px"
                  className="object-contain object-bottom hover:scale-105 transition-transform duration-200"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 md:gap-2.5">
                <Building2 className="size-3.25 text-white/70 md:size-5" />
                <span className="font-inter text-xs text-white/70 md:text-base">{item.name}</span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
