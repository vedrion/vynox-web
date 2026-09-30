"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";

import { submitContact } from "@/features/contact/actions/submit-contact";
import { contactFormContent } from "@/content/contact";
import { initialContactState, type ContactState } from "@/features/contact/lib/state";

import { BusinessForm } from "./business-form";
import { CreatorForm } from "./creator-form";
import { ScheduleRow } from "./schedule-row";
import { SuccessPanel } from "./success-panel";

function ContactFormCard() {
  const [tab, setTab] = useState<"business" | "creator">("business");
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  const errors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const banner =
    state.status === "error" && !state.errors ? state.message : undefined;
  const showSuccess = state.status === "success" && state.id !== dismissedId;

  const resetForm = () => {
    if (state.status === "success") setDismissedId(state.id);
    setFormKey((k) => k + 1);
  };

  return (
    <div
      className={`
        relative
        rounded-[15px]
        p-5
        overflow-visible
        backdrop-blur-[7px]
        bg-gradient-to-b
        from-[rgba(142,142,142,0.05)]
        to-[rgba(93,93,93,0.03)]
        border
        border-[rgba(130,130,130,0.5)]
      `}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[rgba(255,255,255,0.07)]">
        <h3 className="text-white text-[20px] font-['Space_Grotesk',sans-serif] font-normal">
          {contactFormContent.title}
        </h3>

        <div
          className="
            relative
            flex
            shrink-0
            items-center
            rounded-[10px]
            p-[3px]
            bg-gradient-to-b
            from-[#212121]
            to-[#141414]
            border
            border-[#5700a7]
            overflow-hidden
          "
        >
          {(["business", "creator"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`
                relative
                px-4
                py-[5px]
                text-[13px]
                font-medium
                font-['Inter',sans-serif]
                rounded-[7px]
                transition-colors
                duration-300
                capitalize
                whitespace-nowrap
                outline-none
                ${tab === t ? "text-white" : "text-[#acabab] hover:text-white/80"}
              `}
            >
              {tab === t && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-[7px] bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">
                {contactFormContent.tabs[t]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {showSuccess ? (
        <SuccessPanel onReset={resetForm} />
      ) : (
        <form key={formKey} action={formAction} noValidate>
          <input type="hidden" name="type" value={tab} readOnly />

          <div
            aria-hidden="true"
            className="absolute -left-[9999px] size-0 overflow-hidden"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              {tab === "business" ? (
                <BusinessForm key="business" errors={errors} values={values} />
              ) : (
                <CreatorForm key="creator" errors={errors} values={values} />
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <ScheduleRow />
          </div>

          <AnimatePresence>
            {banner && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-4 rounded-[10px] border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.08)] px-3 py-[9px] text-[13px] font-light font-['Inter',sans-serif] text-[#f87171]"
              >
                {banner}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={pending ? undefined : { scale: 1.015, y: -2 }}
            whileTap={pending ? undefined : { scale: 0.985 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            type="submit"
            disabled={pending}
            className="
              mt-5
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-[10px]
              rounded-[10px]
              text-white
              text-[14px]
              font-medium
              font-['Inter',sans-serif]
              bg-gradient-to-b
              from-primary
              to-[#5c03ae]
              border
              border-[#5700a7]
              transition-all
              duration-200
              hover:brightness-110
              hover:shadow-[0_0_22px_rgb(var(--color-glow-primary-rgb)/0.45)]
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:brightness-100
              disabled:hover:shadow-none
            "
          >
            {pending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}

            {pending
              ? contactFormContent.submit.pending
              : contactFormContent.submit[tab]}
          </motion.button>
        </form>
      )}
    </div>
  );
}

export default function ContactForm() {
  return <ContactFormCard />;
}
