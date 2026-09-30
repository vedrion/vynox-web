import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/content/testimonials";

export function TestimonialCard({ item, className }: { item: Testimonial; className?: string }) {
  const { quote, name, role, avatar } = item;

  return (
    <div
      className={cn(
        "group relative flex w-[320px] flex-col justify-between rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_40px_rgb(var(--color-glow-primary-rgb)/0.15)]",
        className,
      )}
    >
      <div className="flex flex-col gap-2.5">
        <span
          aria-hidden
          className="font-montaga text-3xl font-semibold leading-none text-primary/80 select-none"
        >
          &ldquo;
        </span>

        <p className="font-inter text-sm font-normal leading-relaxed text-white/90 text-left">
          {quote}
        </p>
      </div>

      <div>
        <div
          aria-hidden
          className="my-4 h-px w-full bg-gradient-to-r from-primary/50 via-primary/20 to-transparent"
        />

        <div className="flex items-center gap-3">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/15 shadow-sm">
            {avatar ? (
              <Image src={avatar} alt={name} fill sizes="36px" className="object-cover" />
            ) : (
              <MediaPlaceholder />
            )}
          </div>
          <div className="flex flex-col justify-center text-left min-w-0">
            <span className="truncate font-inter text-sm font-semibold tracking-tight text-white">
              {name}
            </span>
            <span className="truncate font-inter text-xs font-normal text-white/60">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
