"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { contactPageContent } from "@/content/contact";

const glassBase = `
  backdrop-blur-[7px]
  bg-gradient-to-b from-[rgba(234,234,234,0.10)] to-[rgba(255,255,255,0.05)]
  border border-[rgba(255,255,255,0.05)]
`;

export default function ContactInfo() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-[10px] max-w-[420px]
        ${glassBase}
        hover:border-[rgb(var(--color-glow-primary-rgb)/0.45)]
        hover:shadow-[0_0_20px_rgb(var(--color-glow-primary-rgb)/0.15)]
        transition-all duration-200
        cursor-pointer
        group
      `}
    >
      <div
        className={`
          flex items-center justify-center
          size-10
          rounded-[6px]
          shrink-0
          ${glassBase}
        `}
      >
        <Mail size={20} className="text-white" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-white text-[14px] font-light font-['Inter',sans-serif]">
          {contactPageContent.info.label}
        </span>

        <span className="text-[#acabab] text-[13px] font-light font-['Inter',sans-serif]">
          {contactPageContent.info.email}
        </span>
      </div>

      <ArrowUpRight
        size={22}
        className="ml-auto text-[#6b6b6b] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </motion.div>
  );
}
