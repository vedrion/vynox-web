import type { GlowConfig } from "@/components/ui/glow";

export const cornerGlowSoft: Omit<GlowConfig, "top" | "bottom" | "left" | "right"> = {
  width: [340, 620],
  height: [290, 520],
  blur: [55, 90],
  intensity: 0.3,
  blend: "plus-lighter",
};
