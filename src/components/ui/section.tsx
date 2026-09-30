import { cn } from "@/lib/cn";
import { GlowLayer, type GlowConfig } from "@/components/ui/glow";

type SectionSpacing = "sm" | "md" | "lg" | "hero" | "none";

const TOP_SPACING: Record<SectionSpacing, string> = {
  sm: "pt-[var(--spacing-section-sm)]",
  md: "pt-[var(--spacing-section-md)]",
  lg: "pt-[var(--spacing-section-lg)]",
  hero: "pt-[var(--spacing-section-hero-y)]",
  none: "",
};

const BOTTOM_SPACING: Record<SectionSpacing, string> = {
  sm: "pb-[var(--spacing-section-sm)]",
  md: "pb-[var(--spacing-section-md)]",
  lg: "pb-[var(--spacing-section-lg)]",
  hero: "pb-[var(--spacing-section-hero-y)]",
  none: "",
};

const CLIP_CLASS = {
  hidden: "overflow-hidden",
  clip: "overflow-clip",
  visible: "",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  spacingTop?: SectionSpacing;
  spacingBottom?: SectionSpacing;
  clip?: "hidden" | "clip" | "visible";
  glows?: GlowConfig[];
}

export function Section({
  as: Tag = "section",
  spacingTop = "none",
  spacingBottom = "none",
  clip = "hidden",
  glows = [],
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <GlowLayer glows={glows} />
      <Tag className={cn(TOP_SPACING[spacingTop], BOTTOM_SPACING[spacingBottom], CLIP_CLASS[clip])} {...props}>
        {children}
      </Tag>
    </div>
  );
}
