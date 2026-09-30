"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { scheduleFields } from "@/content/contact";

import { glassBase } from "./form-styles";
import { useDismissOnOutside } from "./use-dismiss-on-outside";

const MONTH_NAMES = scheduleFields.monthNames;

function formatDate(d: Date) {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function toIsoDate(d: Date) {
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function VynoxDatePicker({ name }: { name: string }) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const ref = useDismissOnOutside(() => setOpen(false));

  const firstWeekday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <motion.div
      className="relative flex-1"
      ref={ref}
      animate={{ y: open ? -2 : 0, zIndex: open ? 50 : 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <input type="hidden" name={name} value={date ? toIsoDate(date) : ""} readOnly />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${glassBase} flex h-[38px] w-full items-center justify-between rounded-[10px] px-3 text-left text-[14px] font-light text-white transition-all duration-300 hover:border-primary focus:border-primary focus:shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)] ${open ? "border-primary shadow-[0_0_12px_rgb(var(--color-glow-primary-rgb)/0.25)]" : ""}`}
      >
        <span className={date ? "text-white" : "text-white/45"}>
          {date ? formatDate(date) : scheduleFields.scheduleDate.placeholder}
        </span>

        <CalendarIcon size={16} className="text-[#bcbcbc]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            style={{ backgroundColor: "#101010", opacity: 1 }}
            className="absolute top-full left-0 z-50 mt-1 w-[min(280px,calc(100vw-3rem))] rounded-xl border border-[#2d2d2d] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-1 pb-2">
              <button
                type="button"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                className="grid size-6 place-items-center rounded text-[#bcbcbc] hover:bg-white/10 hover:text-white"
                aria-label={scheduleFields.previousMonthAriaLabel}
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[13px] text-white">
                {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                className="grid size-6 place-items-center rounded text-[#bcbcbc] hover:bg-white/10 hover:text-white"
                aria-label={scheduleFields.nextMonthAriaLabel}
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-[#6b6b6b]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
              {cells.map((day, i) => {
                if (day === null) return <span key={i} />;
                const cellDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                const selected = date && isSameDay(cellDate, date);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDate(cellDate);
                      setOpen(false);
                    }}
                    className={`mx-auto grid size-7 place-items-center rounded-full text-[12px] transition-colors ${
                      selected ? "bg-primary text-white" : "text-[#dcdcdc] hover:bg-white/10"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
