"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { FieldError } from "./field-error";
import { errorRing, glassBase } from "./form-styles";

export function GlassTextarea({
  label,
  placeholder,
  name,
  error,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  defaultValue?: string;
}) {
  const [focused, setFocused] = useState(false);
  const errorId = `${name}-error`;

  return (
    <motion.div
      className="flex flex-col gap-[6px]"
      animate={{ y: focused ? -2 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <label
        htmlFor={name}
        className="text-white text-[15px] font-normal font-['Inter',sans-serif] transition-colors duration-200"
        style={{ color: focused ? "var(--color-primary-light)" : "#ffffff" }}
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full
          px-3
          py-[9px]
          rounded-[10px]
          text-[14px]
          font-light
          font-['Inter',sans-serif]
          text-white
          placeholder-white/45
          bg-transparent
          outline-none
          resize-none
          ${glassBase}
          transition-all
          duration-300
          focus:border-[rgb(var(--color-glow-primary-rgb)/0.7)]
          focus:shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]
          ${error ? errorRing : ""}
        `}
      />

      <FieldError id={errorId} message={error} />
    </motion.div>
  );
}
