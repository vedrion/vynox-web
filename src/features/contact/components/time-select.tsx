"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock } from "lucide-react";

import { scheduleFields } from "@/content/contact";

import { glassBase } from "./form-styles";
import { OptionList } from "./option-list";
import { useDismissOnOutside } from "./use-dismiss-on-outside";

export function TimeSelect({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const ref = useDismissOnOutside(() => setOpen(false));

  return (
    <motion.div
      className="relative flex-1"
      ref={ref}
      animate={{ y: open ? -2 : 0, zIndex: open ? 50 : 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <input type="hidden" name={name} value={selected} readOnly />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full
          flex
          items-center
          justify-between
          gap-2
          px-3
          py-[9px]
          rounded-[10px]
          text-[14px]
          font-light
          font-['Inter',sans-serif]
          ${glassBase}
          transition-all
          duration-300
          hover:border-[rgb(var(--color-glow-primary-rgb)/0.45)]
          focus:border-[rgb(var(--color-glow-primary-rgb)/0.7)]
          focus:shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]
          ${open ? "border-[rgb(var(--color-glow-primary-rgb)/0.7)] shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]" : ""}
        `}
      >
        <span className={selected ? "text-white" : "text-white/45"}>
          {selected || scheduleFields.scheduleTime.placeholder}
        </span>

        <Clock size={16} className="text-[#6b6b6b] shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <OptionList
            options={scheduleFields.scheduleTime.options}
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
