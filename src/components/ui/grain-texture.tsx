import { cn } from "@/lib/cn";

type TextureVariant = "grain" | "mesh";

interface GrainTextureProps {
  variant?: TextureVariant;
  opacity?: number;
  blend?: "soft-light" | "overlay" | "lighten" | "normal";
  className?: string;
}

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );

const MESH =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><circle cx="1" cy="1" r="0.6" fill="#ffffff"/></svg>`,
  );

export function GrainTexture({
  variant = "grain",
  opacity = 0.1,
  blend = "soft-light",
  className,
}: GrainTextureProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `url("${variant === "grain" ? GRAIN : MESH}")`,
        backgroundRepeat: "repeat",
        backgroundSize: variant === "grain" ? "220px 220px" : "4px 4px",
        mixBlendMode: blend,
        opacity,
      }}
    />
  );
}
