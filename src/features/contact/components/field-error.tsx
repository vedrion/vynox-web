"use client";

import { AnimatePresence, motion } from "motion/react";

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-[12px] font-light font-['Inter',sans-serif] text-[#f87171]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
