"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroReelVideoProps {
  src: string;
  poster: string;
}

export function HeroReelVideo({ src, poster }: HeroReelVideoProps) {
  const isGif = /\.gif(?:$|[?#])/i.test(src);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isGif) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isGif]);

  if (isGif) {
    return (
      <Image
        src={src}
        alt=""
        width={237}
        height={422}
        unoptimized
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className="h-full w-full object-cover"
    />
  );
}
