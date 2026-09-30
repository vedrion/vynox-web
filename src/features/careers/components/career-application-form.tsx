"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { Loader2, Send } from "lucide-react";

import { careersContent, careerRoles } from "@/content/careers";
import { submitCareerApplication } from "@/features/careers/actions/submit-career-application";
import { initialCareerApplicationState } from "@/features/careers/lib/state";
import { GlassInput } from "@/features/contact/components/glass-input";
import { GlassSelect } from "@/features/contact/components/glass-select";
import { GlassTextarea } from "@/features/contact/components/glass-textarea";
import { FieldError } from "@/features/contact/components/field-error";

const buttonVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.35 } },
};

export function CareerApplicationForm({ selectedRole }: { selectedRole: string }) {
  const [state, action, pending] = useActionState(submitCareerApplication, initialCareerApplicationState);
  const errors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const field = careersContent.form.fields;
  const roleOptions = careerRoles
    .filter((role) => role.status === "open")
    .map((role) => ({ label: role.title, value: role.id }));

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[12px] border border-emerald-300/25 bg-emerald-300/[0.06] p-6">
        <h3 className="font-['Space_Grotesk',sans-serif] text-xl text-white">{careersContent.form.success.title}</h3>
        <p className="mt-2 text-sm font-light leading-6 text-body-secondary">{careersContent.form.success.body}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <GlassSelect
          name="role"
          label={field.role.label}
          placeholder={field.role.placeholder}
          options={roleOptions}
          error={errors?.role}
          defaultValue={values?.role ?? selectedRole}
        />
        <GlassInput name="fullName" label={field.fullName.label} placeholder={field.fullName.placeholder} error={errors?.fullName} defaultValue={values?.fullName} />
        <GlassInput name="email" type="email" label={field.email.label} placeholder={field.email.placeholder} error={errors?.email} defaultValue={values?.email} />
        <GlassInput name="phone" type="tel" label={field.phone.label} placeholder={field.phone.placeholder} error={errors?.phone} defaultValue={values?.phone} />
        <GlassSelect
          name="experience"
          label={field.experience.label}
          placeholder={field.experience.placeholder}
          options={field.experience.options}
          error={errors?.experience}
          defaultValue={values?.experience}
        />
        <GlassInput name="resumeUrl" type="url" label={field.resumeUrl.label} placeholder={field.resumeUrl.placeholder} error={errors?.resumeUrl} defaultValue={values?.resumeUrl} />
        <GlassInput name="linkedinUrl" type="url" label={field.linkedinUrl.label} placeholder={field.linkedinUrl.placeholder} error={errors?.linkedinUrl} defaultValue={values?.linkedinUrl} />
        <GlassSelect
          name="source"
          label={field.source.label}
          placeholder={field.source.placeholder}
          options={field.source.options}
          error={errors?.source}
          defaultValue={values?.source}
        />
      </div>

      <div className="mt-4">
        <GlassTextarea name="coverLetter" label={field.coverLetter.label} placeholder={field.coverLetter.placeholder} error={errors?.coverLetter} defaultValue={values?.coverLetter} />
      </div>

      <div className="mt-4">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] font-light leading-5 text-body-secondary">
          <input className="mt-0.5 size-4 shrink-0 accent-primary" type="checkbox" name="consent" value="yes" defaultChecked={values?.consent === "yes"} aria-invalid={errors?.consent ? true : undefined} aria-describedby={errors?.consent ? "consent-error" : undefined} />
          <span>{field.consent}<FieldError id="consent-error" message={errors?.consent} /></span>
        </label>
      </div>

      {state.status === "error" && !errors && (
        <p role="alert" className="mt-4 rounded-[10px] border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.08)] px-3 py-[9px] text-[13px] font-light text-[#f87171]">
          {state.message}
        </p>
      )}

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover={pending ? undefined : { scale: 1.015, y: -2 }}
        whileTap={pending ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        type="submit"
        disabled={pending}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#5700a7] bg-gradient-to-b from-primary to-[#5c03ae] px-5 py-[11px] font-['Inter',sans-serif] text-[14px] font-medium text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_22px_rgb(var(--color-glow-primary-rgb)/0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 disabled:hover:shadow-none sm:w-auto"
      >
        {pending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
        {pending ? careersContent.form.submit.pending : careersContent.form.submit.idle}
      </motion.button>
    </form>
  );
}
