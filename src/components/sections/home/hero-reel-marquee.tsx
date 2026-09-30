"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/cn";

import { HeroReelVideo } from "./hero-reel-video";

interface HeroReelMarqueeProps {
  items: { clientName: string; video?: string; image?: string }[];
  direction: "up" | "down";
  className?: string;
}

const REEL_CARD =
  "h-[421.605px] w-[237.153px] shrink-0 rounded-[19.778px] border-[1.978px] border-primary-grad-end bg-primary overflow-hidden";
const REEL_PILL =
  "flex h-[81.091px] w-[237.338px] shrink-0 items-center justify-center overflow-hidden rounded-[19.778px] border-[1.978px] border-card-border bg-card-fill";

const posterFor = (video: string) => video.replace(/\.(?:gif|mp4)$/i, ".webp");

export function HeroReelMarquee({ items, direction, className }: HeroReelMarqueeProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  const track = [...items, ...items];

  return (
    <div className={cn("pointer-events-auto absolute overflow-clip", className)}>
      <div
        className={cn(
          "marquee-track flex flex-col gap-[12.05px]",
          direction === "up" ? "marquee-track-up" : "marquee-track-down",
        )}
      >
        {track.map((item, i) => (
          <div key={i} className="flex flex-col gap-[12.05px]">
            <div className={REEL_CARD}>
              {item.video ? (
                <HeroReelVideo src={item.video} poster={posterFor(item.video)} />
              ) : item.image ? (
                <Image
                  src={item.image}
                  alt={item.clientName}
                  width={237}
                  height={421}
                  sizes="237px"
                  className="h-full w-full object-cover"
                />
              ) : (
                <MediaPlaceholder label={item.clientName} className="size-full" />
              )}
            </div>
            <div className={REEL_PILL}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.clientName}
                  width={237}
                  height={81}
                  sizes="237px"
                  className="size-full object-cover"
                />
              ) : (
                <span className="px-3 text-center font-inter text-sm text-white">
                  {item.clientName}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
