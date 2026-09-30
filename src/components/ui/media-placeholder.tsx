import { cn } from "@/lib/cn";

interface MediaPlaceholderProps {
  label?: string;
  className?: string;
}

export function MediaPlaceholder({ label, className }: MediaPlaceholderProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-full items-center justify-center overflow-hidden bg-media-placeholder",
        "bg-[radial-gradient(ellipse_at_50%_20%,rgb(var(--color-glow-primary-rgb)/0.22)_0%,rgb(var(--color-glow-primary-rgb)/0.06)_45%,transparent_75%)]",
        className,
      )}
    >
      {label && (
        <span className="px-3 text-center font-inter text-xs leading-tight tracking-wide text-white/25">
          {label}
        </span>
      )}
    </div>
  );
}
