import type { Transition } from "motion/react";

export type Ease = NonNullable<Transition["ease"]>;

export const EASE: Ease = [0.16, 1, 0.3, 1];

export const EASE_SOFT: Ease = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true } as const;

export function viewportOnceAmount(amount: number) {
  return { once: true, amount };
}

export interface FadeUpOptions {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: Ease;
  amount?: number;
}

export function fadeUp({ y = 20, duration = 0.6, delay, ease = EASE, amount }: FadeUpOptions = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: amount === undefined ? viewportOnce : viewportOnceAmount(amount),
    transition: { duration, ease, ...(delay === undefined ? {} : { delay }) },
  };
}
