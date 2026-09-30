"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { FieldError } from "./field-error";
import { errorRing, glassBase } from "./form-styles";
import { OptionList, type OptionListItem } from "./option-list";
import { useDismissOnOutside } from "./use-dismiss-on-outside";

type SelectOption = string | OptionListItem;

export function GlassSelect({
  label,
  placeholder,
  name,
  options,
  error,
  defaultValue,
  className = "",
}: {
  label: string;
  placeholder: string;
  name: string;
  options: readonly SelectOption[];
  error?: string;
  defaultValue?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? "");
  const errorId = `${name}-error`;
  const labelId = `${name}-label`;
  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );
  const selectedLabel = normalizedOptions.find((option) => option.value === selected)?.label;

  const ref = useDismissOnOutside(() => setOpen(false));

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-[6px] relative ${className}`}
      animate={{ y: open ? -2 : 0, zIndex: open ? 50 : 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <input type="hidden" name={name} value={selected} readOnly />

      <label
        id={labelId}
        className="text-white text-[15px] font-normal font-['Inter',sans-serif] transition-colors duration-200"
        style={{ color: open ? "var(--color-primary-light)" : "#ffffff" }}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        className={`
          w-full
          px-3
          py-[9px]
          rounded-[10px]
          text-[14px]
          font-light
          font-['Inter',sans-serif]
          flex
          items-center
          justify-between
          gap-2
          ${glassBase}
          transition-all
          duration-300
          hover:border-[rgb(var(--color-glow-primary-rgb)/0.45)]
          focus:border-[rgb(var(--color-glow-primary-rgb)/0.7)]
          focus:shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]
          ${open ? "border-[rgb(var(--color-glow-primary-rgb)/0.7)] shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]" : ""}
          ${error ? errorRing : ""}
        `}
      >
        <span className={selected ? "text-white" : "text-white/45"}>
          {selectedLabel || selected || placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`text-[#6b6b6b] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <FieldError id={errorId} message={error} />

      <AnimatePresence>
        {open && (
          <OptionList
            options={normalizedOptions}
            selectedValue={selected}
            onPick={(v) => {
              setSelected(v);
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
