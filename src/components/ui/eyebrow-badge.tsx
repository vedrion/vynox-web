import { cn } from "@/lib/cn";

export function EyebrowBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "we-shape-badge inline-flex items-center justify-center rounded-badge border border-white/30 bg-white/[0.06] backdrop-blur-sm px-3.5 py-1 sm:px-5 sm:py-2",
        "font-caveat text-[17px] sm:text-[21px] leading-none text-white tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

