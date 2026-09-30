"use client";

import { motion } from "motion/react";

import { businessFields } from "@/content/contact";

import { formContainerVariants, formFieldVariants, type FormProps } from "./form-styles";
import { GlassInput } from "./glass-input";
import { GlassSelect } from "./glass-select";
import { GlassTextarea } from "./glass-textarea";

export function BusinessForm({ errors, values }: FormProps) {
  return (
    <motion.div
      variants={formContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-4"
    >
      <motion.div variants={formFieldVariants} style={{ zIndex: 40 }} className="relative">
        <GlassInput
          name="fullName"
          label={businessFields.fullName.label}
          placeholder={businessFields.fullName.placeholder}
          error={errors?.fullName}
          defaultValue={values?.fullName}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 30 }} className="relative">
        <GlassInput
          name="email"
          type="email"
          label={businessFields.email.label}
          placeholder={businessFields.email.placeholder}
          error={errors?.email}
          defaultValue={values?.email}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 20 }} className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        <GlassInput
          name="brandName"
          label={businessFields.brandName.label}
          placeholder={businessFields.brandName.placeholder}
          error={errors?.brandName}
          defaultValue={values?.brandName}
        />
        <GlassSelect
          name="service"
          label={businessFields.service.label}
          placeholder={businessFields.service.placeholder}
          options={businessFields.service.options}
          error={errors?.service}
          defaultValue={values?.service}
        />
      </motion.div>

      <motion.div variants={formFieldVariants} style={{ zIndex: 10 }} className="relative">
        <GlassTextarea
          name="campaign"
          label={businessFields.campaign.label}
          placeholder={businessFields.campaign.placeholder}
          error={errors?.campaign}
          defaultValue={values?.campaign}
        />
      </motion.div>

      {/*
      <motion.div variants={formFieldVariants} style={{ zIndex: 10 }} className="relative">
        <GlassInput
          name="budget"
          label={businessFields.budget.label}
          placeholder={businessFields.budget.placeholder}
          error={errors?.budget}
          defaultValue={values?.budget}
        />
      </motion.div>
      */}
    </motion.div>
  );
}
