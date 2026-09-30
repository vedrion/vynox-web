import { cn } from "@/lib/cn";

export function Stat({
  value,
  label,
  className,
  style,
}: {
  value: string | React.ReactNode;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("flex w-32.5 md:w-43.75 flex-col gap-1.5 md:gap-2.5 rounded-[10px] p-2.5", className)}
      style={style}
    >
      <span className="font-vastago text-[32px] md:text-[56px] font-normal leading-none text-primary">{value}</span>
      <span
        className="h-0 w-12 md:w-20 border-t border-primary shadow-[0_0_14px_rgb(var(--color-glow-primary-rgb)/0.9)]"
        aria-hidden
      />
      <span className="font-inter text-[13px] md:text-[24px] uppercase leading-none text-stat-label">{label}</span>
    </div>
  );
}
