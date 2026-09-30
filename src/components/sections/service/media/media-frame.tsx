"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export interface MediaFrameProps {
  width: number;
  height: number;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function MediaFrame({ width, height, className, innerClassName, children }: MediaFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={frameRef}
      className={cn("w-full overflow-hidden", className)}
      style={{ maxWidth: `${width}px`, height: `${height * scale}px` }}
    >
      <div
        className={cn("origin-top-left", innerClassName)}
        style={{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
