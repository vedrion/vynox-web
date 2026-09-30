"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "pill" | "pillOutline" | "ghost";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  icon?: LucideIcon | null;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-1.5 font-inter text-base font-medium leading-none transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer select-none";

const defaultIconPosition: Record<Variant, "left" | "right"> = {
  primary: "left",
  secondary: "left",
  pill: "right",
  pillOutline: "right",
  ghost: "right",
};

export function Button({
  variant = "primary",
  href,
  icon = ArrowRight,
  iconPosition,
  className,
  children,
}: ButtonProps) {
  const Icon = icon;
  const side = iconPosition ?? defaultIconPosition[variant];
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const innerContent = (
    <>
      {Icon && side === "left" && <Icon aria-hidden size={17} strokeWidth={2} className="relative z-10 shrink-0" />}
      <span className="relative z-10">{children}</span>
      {Icon && side === "right" && <Icon aria-hidden size={17} strokeWidth={2} className="relative z-10 shrink-0" />}
    </>
  );

  if (variant === "ghost") {
    const ghostClasses = cn("px-0 py-0 text-white hover:text-primary hover:translate-y-0", base, className);
    return href ? (
      <Link href={href} className={ghostClasses}>
        {innerContent}
      </Link>
    ) : (
      <button type="button" className={ghostClasses}>
        {innerContent}
      </button>
    );
  }

  if (variant === "primary" || variant === "pill") {
    const purpleClasses = cn(
      "gradient-primary border-[0.5px] border-primary-border text-white relative overflow-hidden group px-8 py-4 rounded-btn",
      base,
      className
    );

    const buttonContent = (
      <>
        <span
          className="absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-grad-end))] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-85 pointer-events-none"
          aria-hidden
        />
        <span
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(100px_circle_at_var(--x)_var(--y),rgba(255,255,255,0.22)_0%,rgb(var(--color-glow-primary-rgb)/0.35)_50%,transparent_100%)]"
          style={{
            "--x": `${coords.x}px`,
            "--y": `${coords.y}px`,
          } as React.CSSProperties}
          aria-hidden
        />
        {innerContent}
      </>
    );

    return href ? (
      <Link
        href={href}
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={purpleClasses}
      >
        {buttonContent}
      </Link>
    ) : (
      <button
        type="button"
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={purpleClasses}
      >
        {buttonContent}
      </button>
    );
  }

  const isPillOutline = variant === "pillOutline";
  const blackClasses = cn(
    "relative overflow-hidden p-[1px] transition-transform duration-300 group rounded-btn",
    base,
    className
  );

  const borderConicGlow = (
    <AnimatePresence>
      {hovered && (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, rotate: 360 }}
            exit={{ opacity: 0 }}
            className="absolute inset-[-120%] -z-10 bg-[conic-gradient(from_0deg,transparent_30%,var(--color-primary)_50%,transparent_70%)] blur-md pointer-events-none"
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
            aria-hidden
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            className="absolute inset-[-200%] z-0 bg-[conic-gradient(from_0deg,transparent_30%,var(--color-primary)_50%,transparent_70%)] pointer-events-none"
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
            aria-hidden
          />
        </>
      )}
    </AnimatePresence>
  );

  const staticBorder = !hovered && (
    <span
      className={cn(
        "absolute inset-0 z-0 rounded-[inherit] border pointer-events-none",
        isPillOutline ? "border-hairline/40" : "border-primary/50"
      )}
      aria-hidden
    />
  );

  const buttonContent = (
    <>
      {borderConicGlow}
      {staticBorder}
      <span
        className={cn(
          "relative z-10 w-full h-full rounded-[inherit] bg-bg flex items-center justify-center gap-1.5 px-[31px] py-[15px] transition-colors duration-300 overflow-hidden",
          isPillOutline ? "text-btn-quiet-label group-hover:text-white" : "text-white"
        )}
      >
        <span
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120px_circle_at_var(--x)_var(--y),rgb(var(--color-glow-primary-rgb)/0.18)_0%,rgb(var(--color-glow-primary-rgb)/0.06)_50%,transparent_100%)] z-0"
          style={{
            "--x": `${coords.x}px`,
            "--y": `${coords.y}px`,
          } as React.CSSProperties}
          aria-hidden
        />
        {innerContent}
      </span>
    </>
  );

  return href ? (
    <Link
      href={href}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={blackClasses}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      type="button"
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={blackClasses}
    >
      {buttonContent}
    </button>
  );
}
