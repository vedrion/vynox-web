"use client";

import { motion } from "motion/react";

import { creatorFields } from "@/content/contact";

import { formContainerVariants, formFieldVariants, type FormProps } from "./form-styles";
import { GlassInput } from "./glass-input";
import { GlassSelect } from "./glass-select";
import { GlassTextarea } from "./glass-textarea";

export function CreatorForm({ errors, values }: FormProps) {
  return (
    <motion.div
      variants={formContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-4"
    >
      <motion.div variants={formFieldVariants} style={{ zIndex: 60 }} className="relative">
        <GlassInput
          name="name"
          label={creatorFields.name.label}
          placeholder={creatorFields.name.placeholder}
          error={errors?.name}
          defaultValue={values?.name}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 50 }} className="relative">
        <GlassInput
          name="email"
          type="email"
          label={creatorFields.email.label}
          placeholder={creatorFields.email.placeholder}
          error={errors?.email}
          defaultValue={values?.email}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 40 }} className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        <GlassSelect
          name="platform"
          label={creatorFields.platform.label}
          placeholder={creatorFields.platform.placeholder}
          options={creatorFields.platform.options}
          error={errors?.platform}
          defaultValue={values?.platform}
        />
        <GlassSelect
          name="niche"
          label={creatorFields.niche.label}
          placeholder={creatorFields.niche.placeholder}
          options={creatorFields.niche.options}
          error={errors?.niche}
          defaultValue={values?.niche}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 30 }} className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        <GlassInput
          name="audienceSize"
          label={creatorFields.audienceSize.label}
          placeholder={creatorFields.audienceSize.placeholder}
          error={errors?.audienceSize}
          defaultValue={values?.audienceSize}
        />
        <GlassSelect
          name="projectType"
          label={creatorFields.projectType.label}
          placeholder={creatorFields.projectType.placeholder}
          options={creatorFields.projectType.options}
          error={errors?.projectType}
          defaultValue={values?.projectType}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 10 }} className="relative">
        <GlassTextarea
          name="details"
          label={creatorFields.details.label}
          placeholder={creatorFields.details.placeholder}
          error={errors?.details}
          defaultValue={values?.details}
        />
      </motion.div>
    </motion.div>
  );
}
