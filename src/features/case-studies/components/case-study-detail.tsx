"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  Target,
  Compass
} from "lucide-react";

import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Shell } from "@/components/ui/shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { GrainTexture } from "@/components/ui/grain-texture";
import { caseStudyDetailUiContent, type DetailedCaseStudy } from "@/content/case-studies";
import { ASSETS } from "@/config/assets";

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const isNumeric = !!match;

  const target = isNumeric ? parseFloat(match[1]) : 0;
  const decimals = isNumeric && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = isNumeric ? match[2] : value;

  useEffect(() => {
    if (!isNumeric || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const easedProgress = progress < 0.5
              ? 16 * Math.pow(progress, 5)
              : 1 - Math.pow(-2 * progress + 2, 5) / 2;

            setCount(easedProgress * target);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
              setHasAnimated(true);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, isNumeric, hasAnimated]);

  if (!isNumeric) return <span>{value}</span>;

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function CaseStudyDetail({
  detailedCase,
  relatedCases,
}: {
  detailedCase: DetailedCaseStudy;
  relatedCases: DetailedCaseStudy[];
}) {
  const copy = caseStudyDetailUiContent;
  return (
    <>
      <div className="relative min-h-screen bg-bg-deep text-[#c5c2cc] pt-40 pb-24 overflow-hidden">
        <GrainTexture opacity={0.07} blend="soft-light" />

        <div className="absolute top-[80px] right-[-100px] w-[500px] h-[500px] pointer-events-none opacity-[0.22] select-none -z-10">
          <Image src={ASSETS.caseStudies.detailPage.heroCrescent} alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden h-[1200px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.34, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
            className="absolute left-1/2 top-[-350px] h-[900px] w-[1500px] max-w-[200vw] -translate-x-1/2 blur-[160px]"
            style={{
              background: "radial-gradient(ellipse at center, rgb(var(--color-glow-primary-rgb)/0.22) 0%, rgb(var(--color-glow-primary-rgb)/0.08) 45%, transparent 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.38, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
            className="absolute left-1/2 top-[-200px] h-[600px] w-[900px] max-w-[160vw] -translate-x-1/2 blur-[100px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.05) 50%, transparent 78%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
            className="absolute left-1/2 top-[-50px] h-[300px] w-[450px] max-w-[120vw] -translate-x-1/2 blur-[60px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 60%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute left-1/2 top-[-180px] h-[300px] w-[1000px] max-w-[170vw] -translate-x-1/2 blur-[140px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(226,194,255,0.11) 0%, transparent 70%)"
            }}
          />
        </div>

        <Shell className="relative z-10 space-y-20">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies" },
            { label: `${detailedCase.brand} — ${detailedCase.title}` },
          ]} />

          <section className="flex flex-col gap-8 text-left max-w-5xl mx-auto w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col items-start gap-1.5 min-w-0 max-w-full">
                <span className="px-4 py-1.5 text-xs font-semibold text-badge-label uppercase tracking-wider font-['Space_Grotesk',sans-serif] rounded-full border border-[rgb(var(--color-glow-primary-rgb)/0.3)] bg-[rgb(var(--color-glow-primary-rgb)/0.08)] w-fit">
                  {detailedCase.industry}
                </span>

                <span className="font-mary text-3xl sm:text-6xl md:text-7xl lg:text-[76px] text-primary font-normal select-none lowercase leading-none">
                  {copy.campaignLabel}
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-vastago font-bold text-white uppercase tracking-tight leading-none break-words max-w-full">
                  {detailedCase.brand}
                </h1>
              </div>

              <div className="relative p-6 md:p-8 rounded-[16px] border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent backdrop-blur-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary/70 via-[#e180ff]/40 to-transparent" />
                <p className="text-xl md:text-2xl font-['Space_Grotesk'] font-light text-neutral-200 leading-snug tracking-wide">
                  {detailedCase.headline}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {detailedCase.services.map((service) => (
                  <span key={service} className="px-3 py-1 text-xs text-neutral-400 font-['Space_Grotesk',sans-serif] bg-white/5 border border-white/10 rounded-md">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative group w-full mt-4">
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-glow-primary-rgb)/0.2)] to-transparent rounded-[20px] blur-[30px] opacity-40 group-hover:opacity-65 transition-opacity duration-500" />
              <div className="relative rounded-[20px] border border-white/10 overflow-hidden bg-[#0c0812] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="aspect-[21/9] w-full flex items-center justify-center p-8 bg-cover bg-center" style={{ backgroundImage: `url(${detailedCase.heroImage})` }}>
                  <div className="absolute inset-0 bg-bg-deep/50 backdrop-blur-[1px]" />
                  <div className="relative z-10 text-center flex flex-col items-center max-w-full px-4">
                    <span className="text-xl sm:text-3xl md:text-4xl font-vastago font-bold text-white mb-2 tracking-wider sm:tracking-widest uppercase break-words max-w-full">{detailedCase.brand}</span>
                    <span className="text-xs uppercase tracking-widest text-accent-soft font-['Space_Grotesk',sans-serif] font-medium tracking-widest">{detailedCase.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative rounded-[16px] border border-white/5 p-8 backdrop-blur-[8px] bg-white/[0.01] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
              {detailedCase.stats.map((stat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center ${i > 0 ? "pt-6 md:pt-0 md:pl-6" : ""}`}>
                  <span className="text-4xl md:text-5xl font-['Space_Grotesk',sans-serif] font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-badge-label [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-xs text-neutral-400 font-light mt-2 tracking-wide font-['Space_Grotesk',sans-serif] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="relative rounded-[15px] border-t-2 border-t-red-500/40 border border-white/5 p-8 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 rounded bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                  <TrendingUp size={16} />
                </div>
                <h2 className="text-xl font-vastago font-bold text-white uppercase tracking-wider">{copy.challengeHeading}</h2>
              </div>

              <div className="space-y-4 font-light text-[15px] leading-relaxed text-body-secondary">
                <p>
                  <strong className="text-neutral-200 font-medium block mb-1">{copy.contextLabel}</strong>
                  {detailedCase.challenge.context}
                </p>
                <p>
                  <strong className="text-neutral-200 font-medium block mb-1">{copy.problemLabel}</strong>
                  {detailedCase.challenge.problem}
                </p>
                <p className="p-3.5 rounded bg-red-500/5 border border-red-500/10 text-red-300/80">
                  <strong className="text-red-400 font-medium block mb-1">{copy.limitationLabel}</strong>
                  {detailedCase.challenge.whatWasntWorking}
                </p>
              </div>
            </div>

            <div className="relative rounded-[15px] border-t-2 border-t-primary/40 border border-white/5 p-8 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 rounded bg-primary/10 text-accent-soft flex items-center justify-center shrink-0">
                  <Target size={16} />
                </div>
                <h2 className="text-xl font-vastago font-bold text-white uppercase tracking-wider">{copy.goalHeading}</h2>
              </div>

              <div className="space-y-4 font-light text-[15px] leading-relaxed text-body-secondary">
                <p>
                  <strong className="text-neutral-200 font-medium block mb-1">{copy.visionLabel}</strong>
                  {detailedCase.goal.description}
                </p>
                <div className="pt-2">
                  <strong className="text-neutral-200 font-medium block mb-2">{copy.objectivesHeading}</strong>
                  <ul className="space-y-2">
                    {detailedCase.goal.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-accent-soft shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="relative rounded-[15px] border border-white/5 p-8 bg-white/[0.01] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-primary/10 text-accent-soft flex items-center justify-center shrink-0">
                  <Compass size={16} />
                </div>
                <h2 className="text-xl font-vastago font-bold text-white uppercase tracking-wider">{copy.strategyHeading}</h2>
              </div>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {detailedCase.strategy.description}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {detailedCase.strategy.keyDecisions.map((decision, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/2 p-4 rounded border border-white/5">
                  <span className="grid size-6 place-items-center rounded bg-primary/15 text-accent-soft text-xs font-bold shrink-0 mt-0.5 font-['Space_Grotesk']">
                    0{i + 1}
                  </span>
                  <p className="text-neutral-300 text-sm font-light leading-relaxed">{decision}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-vastago font-bold text-white">{copy.processHeading}</h2>
              <p className="text-xs text-neutral-400 font-light uppercase tracking-widest font-['Space_Grotesk'] mt-1">{copy.processSubheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {detailedCase.timeline.map((step, idx) => (
                <div key={idx} className="p-6 rounded-[12px] border border-white/5 bg-white/[0.01] flex flex-col gap-3">
                  <span className="text-[10px] text-accent-soft font-bold tracking-wider uppercase font-['Space_Grotesk']">
                    {step.phase}
                  </span>
                  <h3 className="text-white font-semibold text-sm font-['Space_Grotesk']">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-vastago font-bold text-white">
                {copy.resultsHeading.first} <span className="font-mary text-4xl text-accent-soft normal-case">{copy.resultsHeading.accent}</span>
              </h2>
              <p className="text-xs text-neutral-400 font-light uppercase tracking-widest font-['Space_Grotesk'] mt-1">{copy.resultsSubheading}</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {detailedCase.results.metrics.map((metric, i) => (
                  <div key={i} className="rounded-[15px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                    <span className="text-xs text-badge-label font-semibold font-['Space_Grotesk'] uppercase tracking-wider">{metric.label}</span>
                    <div className="flex items-baseline justify-between mt-6 border-t border-white/5 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-['Space_Grotesk']">{copy.beforeLabel}</span>
                        <span className="text-sm text-neutral-400 line-through font-['Space_Grotesk'] mt-0.5">{metric.before}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-accent-soft uppercase tracking-widest font-['Space_Grotesk']">{copy.afterLabel}</span>
                        <span className="text-2xl font-bold text-white font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-white to-badge-label [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mt-0.5">{metric.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-[12px] border border-white/5 bg-white/[0.01] flex flex-col gap-4">
                <h4 className="text-white font-semibold text-sm font-['Space_Grotesk']">
                  {copy.additionalImpactHeading}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedCase.results.softWins.map((win, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <CheckCircle2 size={14} className="text-accent-soft shrink-0" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative rounded-[20px] border border-white/5 p-8 md:p-12 bg-white/[0.01] text-center overflow-hidden">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-mary text-4xl text-accent-soft mb-4">
                {copy.testimonialHeading}
              </span>
              <blockquote className="text-lg md:text-xl font-['Space_Grotesk',sans-serif] italic text-neutral-200 leading-relaxed font-light mb-6">
                &ldquo;{detailedCase.testimonial.quote}&rdquo;
              </blockquote>
              <div className="h-[2px] w-12 bg-primary mb-4" />
              <span className="text-sm font-bold text-white font-['Space_Grotesk',sans-serif] tracking-wider uppercase">
                {detailedCase.testimonial.author}
              </span>
              <span className="text-xs text-neutral-400 font-light mt-1">
                {detailedCase.testimonial.role}
              </span>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 relative rounded-[20px] border border-white/5 p-8 md:p-10 bg-gradient-to-b from-[#130f1c] to-bg-deep flex flex-col justify-between text-left overflow-hidden">
              <div>
                <h2 className="text-3xl font-vastago font-bold text-white mb-2">
                  {copy.cta.headingPrefix} <span className="font-mary text-4xl md:text-5xl text-accent-soft normal-case">{copy.cta.accent}</span> {copy.cta.headingSuffix}
                </h2>
                <p className="text-neutral-400 font-light text-sm max-w-md leading-relaxed">
                  {copy.cta.body}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Link
                  href={copy.cta.buttonHref}
                  className="gradient-primary inline-flex items-center gap-2 rounded-btn border border-primary-border px-5 py-2.5 font-inter text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
                >
                  <span>{copy.cta.buttonLabel}</span>
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href={copy.cta.backHref}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <span>{copy.cta.backLabel}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-accent-soft font-['Space_Grotesk',sans-serif] font-semibold text-left">
                {copy.relatedHeading}
              </span>

              <div className="flex flex-col gap-3 flex-1 justify-between">
                {relatedCases.map((related) => (
                  <Link
                    key={related.id}
                    href={`/case-studies/${related.id}`}
                    className="group flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[rgb(var(--color-glow-primary-rgb)/0.25)] transition-all duration-300 text-left"
                  >
                    <div>
                      <span className="text-xs text-accent-soft font-semibold font-['Space_Grotesk',sans-serif]">
                        {related.brand}
                      </span>
                      <h4 className="text-white font-semibold text-[15px] font-['Space_Grotesk',sans-serif] mt-0.5 group-hover:text-badge-label transition-colors">
                        {related.title}
                      </h4>
                    </div>
                    <div className="size-8 rounded-full bg-white/5 group-hover:bg-primary/10 flex items-center justify-center text-neutral-400 group-hover:text-badge-label transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </Shell>
      </div>
      <SiteFooter variant="compact" />
    </>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
