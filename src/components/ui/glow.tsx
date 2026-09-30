import { cn } from "@/lib/cn";
import { fluid } from "@/lib/fluid";

interface GlowProps {
  className?: string;
  blend?: "lighten" | "plus-lighter" | "soft-light";
  intensity?: number;
}

export function Glow({ className, blend = "lighten", intensity = 0.9 }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-[96px]", className)}
      style={{
        mixBlendMode: blend,
        backgroundImage: `radial-gradient(ellipse at center, rgb(var(--color-glow-primary-rgb) / ${intensity}) 0%, rgb(var(--color-glow-secondary-rgb) / ${intensity * 0.5}) 44%, rgb(var(--color-glow-primary-rgb) / 0) 74%)`,
      }}
    />
  );
}

type Range = [mobile: number, desktop: number];

export interface GlowConfig {
  top?: Range;
  bottom?: Range;
  left?: Range;
  right?: Range;
  width: Range;
  height: Range;
  blur?: Range;
  intensity?: number;
  fade?: number;
  secondary?: boolean;
  shape?: "ellipse" | "circle";
  blend?: "lighten" | "plus-lighter" | "soft-light";
  rotate?: string;
}

const DEFAULT_BLUR: Range = [45, 90];

function edge(range: Range | undefined): string | undefined {
  return range ? fluid(range[0], range[1]) : undefined;
}

export function GlowLayer({ glows }: { glows: GlowConfig[] }) {
  if (glows.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
      {glows.map((glow, index) => {
        const intensity = glow.intensity ?? 0.9;
        const fade = glow.fade ?? (glow.secondary ? 74 : 70);
        const shape = glow.shape ?? "ellipse";
        const [blurMin, blurMax] = glow.blur ?? DEFAULT_BLUR;

        const stops = glow.secondary
          ? `rgb(var(--color-glow-primary-rgb) / ${intensity}) 0%, rgb(var(--color-glow-secondary-rgb) / ${intensity * 0.5}) 44%, rgb(var(--color-glow-primary-rgb) / 0) ${fade}%`
          : `rgb(var(--color-glow-primary-rgb) / ${intensity}) 0%, rgb(var(--color-glow-primary-rgb) / 0) ${fade}%`;

        return (
          <div
            key={index}
            className={cn("absolute rounded-full", glow.rotate)}
            style={{
              top: edge(glow.top),
              bottom: edge(glow.bottom),
              left: edge(glow.left),
              right: edge(glow.right),
              width: fluid(glow.width[0], glow.width[1]),
              height: fluid(glow.height[0], glow.height[1]),
              filter: `blur(${fluid(blurMin, blurMax)})`,
              mixBlendMode: glow.blend ?? "lighten",
              backgroundImage: `radial-gradient(${shape} at center, ${stops})`,
            }}
          />
        );
      })}
    </div>
  );
}
