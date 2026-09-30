"use client";

import { contactFormContent } from "@/content/contact";

import { VynoxDatePicker } from "./date-picker";
import { TimeSelect } from "./time-select";

export function ScheduleRow() {
  return (
    <div className="flex flex-col gap-2 relative z-20">
      <p className="text-white text-[15px] font-['Space_Grotesk',sans-serif] font-normal">
        {contactFormContent.scheduleTitle}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <VynoxDatePicker name="scheduleDate" />
        <TimeSelect name="scheduleTime" />
      </div>
    </div>
  );
}
