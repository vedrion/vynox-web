import { Shell } from "@/components/ui/shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { LegalAccordion } from "@/components/sections/legal/legal-accordion";
import type { LegalPageContent } from "@/content/legal";

export function LegalPage({ content }: { content: LegalPageContent }) {
  const { icon: Icon, title, accent, lastUpdated, intro, sections } = content;

  return (
    <>
      <div className="relative min-h-screen bg-bg-deep pt-52">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[rgb(var(--color-glow-primary-rgb)/0.15)] to-transparent rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[rgb(var(--color-glow-primary-rgb)/0.05)] rounded-full blur-[100px]" />
          <div className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-[rgba(225,128,255,0.03)] rounded-full blur-[120px]" />
        </div>

        <Shell className="relative z-10 pb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgb(var(--color-glow-primary-rgb)/0.3)] bg-[rgb(var(--color-glow-primary-rgb)/0.05)] mb-6">
              <Icon size={14} className="text-accent-soft" />
              <span className="text-xs font-semibold text-white/300 uppercase tracking-wider font-['Space_Grotesk',sans-serif]">
                Legal Agreement
              </span>
            </div>

            <h1 className="text-3xl md:text-[38px] font-vastago font-bold text-white leading-tight tracking-tight mb-4">
              {title} <span className="text-[#bb8bfe]">{accent}</span>
            </h1>
            <p className="text-neutral-400 font-light text-sm mt-3">
              {lastUpdated}
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative rounded-[15px] p-6 md:p-8 backdrop-blur-[10px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-[#c5c2cc] font-light text-[15px] leading-relaxed">
                {intro}
              </p>
            </div>
          </div>

          <LegalAccordion sections={sections} />
        </Shell>
      </div>
      <SiteFooter variant="compact" />
    </>
  );
}
