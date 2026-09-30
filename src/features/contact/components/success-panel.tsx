"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

import { contactFormContent } from "@/content/contact";

interface SuccessPanelProps {
  onReset?: () => void;
  title?: string;
  body?: string;
}

export function SuccessPanel({
  onReset,
  title = contactFormContent.success.title,
  body = contactFormContent.success.body,
}: SuccessPanelProps) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="flex flex-col items-center gap-3 py-10 text-center"
    >
      <div className="grid size-12 place-items-center rounded-full bg-[rgb(var(--color-glow-primary-rgb)/0.15)] border border-[rgb(var(--color-glow-primary-rgb)/0.5)]">
        <Check size={22} className="text-primary-light" />
      </div>

      <h4 className="text-white text-[20px] font-['Space_Grotesk',sans-serif] font-normal">
        {title}
      </h4>

      <p className="max-w-[380px] text-[14px] font-light font-['Inter',sans-serif] text-body-secondary">
        {body}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-[13px] font-medium font-['Inter',sans-serif] text-primary-light underline underline-offset-4 hover:text-white transition-colors duration-200"
        >
          {contactFormContent.success.reset}
        </button>
      )}
    </motion.div>
  );
}
