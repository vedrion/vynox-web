"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { LegalSection } from "@/content/legal";

export function LegalAccordion({ sections }: { sections: LegalSection[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {sections.map((sec, idx) => {
        const isOpen = expanded === idx;
        return (
          <div
            key={idx}
            className="rounded-[12px] overflow-hidden border transition-all duration-300 bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.02)]"
            style={{
              borderColor: isOpen ? "rgb(var(--color-glow-primary-rgb)/0.4)" : "rgba(255, 255, 255, 0.05)",
              boxShadow: isOpen ? "0 4px 20px rgb(var(--color-glow-primary-rgb)/0.1)" : "none",
            }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : idx)}
              className="w-full flex justify-between items-center px-6 py-4.5 text-left transition-colors"
            >
              <span className="font-['Space_Grotesk',sans-serif] text-base font-medium text-white tracking-wide">
                {sec.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-accent-soft shrink-0"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-3 text-[#c5c2cc] font-light text-[14.5px] leading-relaxed border-t border-[rgba(255,255,255,0.03)]">
                {sec.content}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
