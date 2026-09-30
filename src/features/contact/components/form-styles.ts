import type { SubmittedValues } from "@/features/contact/lib/state";

export type FieldErrors = Record<string, string> | undefined;

export interface FormProps {
  errors: FieldErrors;
  values: SubmittedValues | undefined;
}

export const glassBase = `
  backdrop-blur-[7px]
  bg-gradient-to-b from-[rgba(234,234,234,0.10)] to-[rgba(255,255,255,0.05)]
  border border-[rgba(255,255,255,0.05)]
`;

export const errorRing = "border-[rgba(248,113,113,0.7)] shadow-[0_0_12px_rgba(248,113,113,0.2)]";

export const formContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1 as const,
    },
  },
};

export const formFieldVariants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 16,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 18,
    },
  },
};
