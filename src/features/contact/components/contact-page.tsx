"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ContactForm from "./contact-form";
import { ContactHeroHeader, ContactHeroMap } from "@/components/sections/contact/contact-hero";
import ContactInfo from "@/components/sections/contact/contact-info";
import { Shell } from "@/components/ui/shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { contactPageContent } from "@/content/contact";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 16,
      delay: 0.1,
    },
  },
};

export function ContactPageContent() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative overflow-x-hidden bg-bg-deep z-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden h-[1200px]">
        <motion.div
          initial={isDesktop ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 0.34, scale: 1 }}
          transition={isDesktop ? { type: "spring", stiffness: 60, damping: 20, delay: 0.1 } : { duration: 0 }}
          className="
            absolute
            left-1/2
            top-[-350px]
            h-[900px]
            w-[1500px]
            max-w-[200vw]
            -translate-x-1/2
            blur-[160px]
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgb(var(--color-glow-primary-rgb)/0.22) 0%, rgb(var(--color-glow-primary-rgb)/0.08) 45%, transparent 72%)",
          }}
        />

        <motion.div
          initial={isDesktop ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 0.38, scale: 1 }}
          transition={isDesktop ? { type: "spring", stiffness: 60, damping: 20, delay: 0.2 } : { duration: 0 }}
          className="
            absolute
            left-1/2
            top-[-200px]
            h-[600px]
            w-[900px]
            max-w-[160vw]
            -translate-x-1/2
            blur-[100px]
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.05) 50%, transparent 78%)",
          }}
        />

        <motion.div
          initial={isDesktop ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={isDesktop ? { type: "spring", stiffness: 60, damping: 20, delay: 0.3 } : { duration: 0 }}
          className="
            absolute
            left-1/2
            top-[-50px]
            h-[300px]
            w-[450px]
            max-w-[120vw]
            -translate-x-1/2
            blur-[60px]
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none overflow-hidden">
        <motion.div
          initial={isDesktop ? { opacity: 0 } : false}
          animate={{ opacity: 0.6 }}
          transition={isDesktop ? { duration: 1, delay: 0.4 } : { duration: 0 }}
          className="absolute left-1/2 top-[-180px] h-[300px] w-[1000px] max-w-[170vw] -translate-x-1/2 blur-[140px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(226,194,255,0.11) 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[100px] -translate-x-1/2 select-none z-0 w-full flex justify-center overflow-hidden">
        <motion.h2
          variants={textVariants}
          className="
            font-vastago
            font-bold
            uppercase
            text-[rgb(var(--color-glow-primary-rgb)/0.07)]
            tracking-[-0.04em]
            whitespace-nowrap
            text-center
          "
          style={{
            fontSize: "clamp(32px, 6.5vw, 96px)",
            lineHeight: 1,
          }}
        >
          {contactPageContent.backgroundText}
        </motion.h2>
      </div>

      <Shell className="relative z-10 min-h-screen pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-7 lg:pt-[88px]">
            <motion.div variants={childVariants}>
              <ContactHeroHeader />
            </motion.div>

            <motion.div variants={childVariants} className="hidden lg:flex flex-col gap-7">
              <ContactHeroMap />
              <ContactInfo />
            </motion.div>
          </div>

          <motion.div variants={childVariants} className="lg:pt-[88px]">
            <ContactForm />
          </motion.div>

          <motion.div variants={childVariants} className="flex flex-col items-center gap-7 lg:hidden w-full">
            <ContactHeroMap />
            <ContactInfo />
          </motion.div>
        </div>

        <div className="h-28" />
      </Shell>
      <SiteFooter variant="compact" />
    </motion.div>
  );
}
