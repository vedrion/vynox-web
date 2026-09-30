"use client";

import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/cn";
import type { Creator } from "@/content/creators";
import {motion} from "motion/react"
import { EASE } from "@/lib/motion";

const SCALE = { lg: 1, md: 0.881, sm: 0.7395 } as const;

export type CreatorCardSize = keyof typeof SCALE;

export interface CreatorCardProps {
  creator: Creator;
  size?: CreatorCardSize;
  className?: string;
}

export function CreatorCard({ creator, size = "md", className }: CreatorCardProps) {
  const { name, followers, tags } = creator;
  const s = SCALE[size];
  const px = (base: number) => `${(base * s).toFixed(2)}px`;

  return (
    <motion.div
  layout
  transition={{
    layout: {
      duration: 1.4,
      ease: EASE,
    },
  }}
  className={cn("creator-card-fill relative shrink-0", className)}
  style={{
    width: px(306.12),
    height: px(361),
    borderRadius: px(30.267),
    boxShadow:
      size === "lg"
        ? "0 4px 29.3px 0 rgb(var(--color-glow-primary-rgb)/0.14)"
        : undefined,
  }}
>
      <div
        className="absolute overflow-hidden"
        style={{
          left: px(4.85),
          top: px(4.85),
          width: px(296.8),
          height: px(237.44),
          borderRadius: px(30.285),
        }}
      >
        {creator.photo ? (
          <Image
            src={creator.photo}
            alt={name}
            width={297}
            height={238}
            sizes="297px"
            className="size-full object-cover"
          />
        ) : (
          <MediaPlaceholder label={name} />
        )}
      </div>

      <div
        className="absolute"
        style={{ left: px(9.69), top: px(245.92), width: px(285.89), height: px(98.56) }}
      >
        <div style={{ paddingLeft: px(12.11), paddingTop: px(12.11) }}>
          <span
            className="block font-vastago font-semibold leading-none text-white"
            style={{ fontSize: px(24.14) }}
          >
            {name}
          </span>
          <span
            className="block font-inter font-semibold leading-[1.02] text-label-dim"
            style={{ fontSize: px(10.77), marginTop: px(3.72) }}
          >
            <span className="text-white">{followers}</span> Followers
          </span>
        </div>
        <div
          className="absolute flex items-center"
          style={{ left: px(12.11), top: px(70.26), gap: px(10) }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="chip-glass inline-flex items-center justify-center font-inter font-semibold leading-[1.02] text-white"
              style={
                {
                  "--chip-border-width": px(0.6814),
                  padding: `${px(5.4513)} ${px(13.6284)}`,
                  borderRadius: px(20.4425),
                  fontSize: px(10.9027),
                } as React.CSSProperties
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
