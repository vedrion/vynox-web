"use client";

import { motion } from "motion/react";

export interface OptionListItem {
  label: string;
  value: string;
}

export function OptionList({ options, onPick, selectedValue = "" }: { options: readonly (string | OptionListItem)[]; onPick: (v: string) => void; selectedValue?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      style={{ backgroundColor: "#10081d", opacity: 1 }}
      role="listbox"
      className={`
        absolute
        top-full
        left-0
        right-0
        mt-1
        z-50
        rounded-[10px]
        overflow-hidden
        backdrop-blur-[20px]
        border
        border-[rgb(var(--color-glow-primary-rgb)/0.25)]
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      `}
    >
      {options.map((rawOption) => {
        const opt = typeof rawOption === "string" ? { label: rawOption, value: rawOption } : rawOption;
        return (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={opt.value === selectedValue}
          onClick={() => onPick(opt.value)}
          className="
            w-full
            text-left
            px-3
            py-[9px]
            text-[13px]
            text-body-secondary
            font-['Inter',sans-serif]
            hover:bg-[rgb(var(--color-glow-primary-rgb)/0.15)]
            hover:text-white
            transition-colors
            duration-150
          "
        >
          {opt.label}
        </button>
        );
      })}
    </motion.div>
  );
}
