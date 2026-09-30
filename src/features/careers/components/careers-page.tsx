"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, CheckCircle2, MapPin, Radio } from "lucide-react";

import { Shell } from "@/components/ui/shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { WebThreads } from "@/components/ui/web-threads";
import { careerDisplayOptions, careerRoles, careersContent, type CareerStatus } from "@/content/careers";
import { fluid } from "@/lib/fluid";
import { CareerApplicationForm } from "./career-application-form";

type Filter = "all" | CareerStatus;

export function CareersPageContent({ initialRole = "" }: { initialRole?: string }) {
  const [filter, setFilter] = useState<Filter>("open");
  const [selectedRole, setSelectedRole] = useState(() =>
    careerRoles.some((role) => role.id === initialRole && role.status === "open") ? initialRole : "",
  );
  const visibleRoles = careerRoles.filter((role) => filter === "all" || role.status === filter);

  function applyFor(roleId: string) {
    setSelectedRole(roleId);
    document.getElementById("career-application")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="relative isolate overflow-hidden bg-bg-deep pt-32 text-white md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1450px] overflow-hidden">
        <div className="absolute left-1/2 top-[-330px] h-[800px] w-[1400px] max-w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.24)_0%,rgb(var(--color-glow-primary-rgb)/0.08)_46%,transparent_72%)] blur-[100px]" />
        <div className="absolute left-[8%] top-[580px] size-[420px] rounded-full bg-[radial-gradient(circle,rgb(var(--color-glow-primary-rgb)/0.09),transparent_70%)] blur-[70px]" />
        <div className="absolute right-[-90px] top-[920px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(144,54,219,0.1),transparent_68%)] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.35)_0.7px,transparent_0.7px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <Shell className="relative z-10">
        <section className="relative isolate mx-auto max-w-5xl pb-20 md:pb-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-4 -z-10 select-none overflow-hidden text-center font-vastago text-[clamp(48px,12vw,150px)] font-bold uppercase leading-none tracking-[-0.06em] text-white/[0.025]">
            {careersContent.heroBackdrop}
          </div>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-glow-primary-rgb)/0.3)] bg-[rgb(var(--color-glow-primary-rgb)/0.06)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d9c7ff]">
              <BriefcaseBusiness size={14} aria-hidden="true" />{careersContent.eyebrow}
            </div>
            <h1 className="font-vastago text-h1 font-bold leading-[1.05] tracking-[-0.03em]">
              {careersContent.title} <span className="text-[#bb8bfe]">{careersContent.brand}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[512px] font-inter text-base font-light leading-relaxed text-stat-label">{careersContent.intro}</p>
            <a href="#career-roles" className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/[0.025] px-6 py-3 text-sm font-medium text-white transition hover:border-[#9b70ff]/70 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2a1ff]">
              {careersContent.rolesHeading}
            </a>
          </div>
        </section>

        <section id="career-roles" className="relative isolate scroll-mt-28 pb-24 md:pb-32">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#bd9cff]">{careersContent.sectionEyebrow}</p>
              <h2 className="mt-3 font-vastago text-h1 font-bold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: fluid(32, 56) }}>{careersContent.rolesHeading}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-body-secondary">{careersContent.rolesIntro}</p>
            </div>
            <div role="group" aria-label={careersContent.filterLabel} className="flex flex-wrap gap-2">
              {(Object.keys(careersContent.filters) as Filter[]).map((key) => (
                <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)} className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2a1ff] ${filter === key ? "border-[#a878ff]/60 bg-[#8a2be1]/20 text-white" : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"}`}>
                  {careersContent.filters[key]}
                </button>
              ))}
            </div>
          </div>

          {visibleRoles.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center text-white/60">{careersContent.empty}</p>
          ) : (
            <div className="grid items-start gap-4 lg:grid-cols-2">
              {visibleRoles.map((role) => {
                const filled = role.status === "filled";
                return (
                  <article key={role.id} className={`rounded-2xl border p-5 transition-colors duration-200 md:p-6 ${filled ? "border-white/[0.055] bg-white/[0.012] text-white/55 grayscale-[0.75]" : "border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.018] text-white shadow-[0_12px_40px_rgba(0,0,0,0.16)]"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className={`text-sm ${filled ? "text-white/40" : "text-[#c5a6ff]"}`}>{role.department}</p>
                        <h3 className="mt-2 text-xl font-semibold md:text-2xl">{role.title}</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${role.status === "open" ? "border-emerald-300/20 bg-emerald-300/5 text-emerald-200" : "border-white/10 bg-white/[0.03] text-white/45"}`}>
                        {role.status === "open" ? <Radio size={12} aria-hidden="true" /> : <CheckCircle2 size={12} aria-hidden="true" />}{careersContent.status[role.status]}
                      </span>
                    </div>

                    <div className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs ${filled ? "text-white/40" : "text-white/60"}`}>
                      <span>{role.employmentType}</span>
                      <span className="inline-flex items-center gap-1"><Radio size={12} aria-hidden="true" />{careersContent.remote}</span>
                      {careerDisplayOptions.showCountryFlags && <span className="inline-flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{role.regionFlag} {role.regionLabel}</span>}
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${filled ? "text-white/45" : "text-white/70"}`}>{role.summary}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {role.status === "open" && <button onClick={() => applyFor(role.id)} type="button" className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#160c20] transition hover:bg-[#e9dbff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2a1ff]">{careersContent.apply}</button>}
                      {role.status === "open" && <Link href={`/careers/${role.id}`} className="text-xs font-medium text-[#d2b8ff] underline decoration-white/25 underline-offset-4 hover:text-white">{careersContent.fullDetails}</Link>}
                      {filled && <span className="text-xs text-white/35">{careersContent.filledNote}</span>}
                    </div>

                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="career-application" className="relative isolate scroll-mt-28 pb-24 md:pb-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#bd9cff]">{careersContent.applicationEyebrow}</p>
              <h2 className="mt-3 font-vastago font-bold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: fluid(32, 56) }}>{careersContent.applicationHeading}</h2>
              <p className="mt-4 text-sm text-body-secondary">{careersContent.contactPrompt} <a className="text-[#d2b8ff] underline underline-offset-4 hover:text-white" href={`mailto:${careersContent.email}`}>{careersContent.email}</a></p>
            </div>
            <div className="relative isolate">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[560px] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-95 blur-[6px] md:h-[700px]">
                <WebThreads
                  color1="#5227FF"
                  color2="#FF9FFC"
                  color3="#FFFFFF"
                  speed={0.2}
                  threadCount={2}
                  frequency={7.5}
                  spread={0.21}
                  taper={1}
                  position={0.5}
                  fanMode="center"
                  glow={0.045}
                  falloff={0.9}
                  thickness={1.1}
                  brightness={0.65}
                  opacity={0.35}
                  mirror
                  shimmer={false}
                  grain
                  grainIntensity={0.01}
                  mouseInteraction
                  mouseStrength={0.25}
                />
              </div>
              <div className="relative z-10 rounded-[15px] border border-[rgba(130,130,130,0.5)] bg-[#0d0a10] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] md:p-8">
              <div className="relative z-10">
                <h3 className="mb-5 border-b border-white/[0.07] pb-4 font-['Space_Grotesk',sans-serif] text-[20px] font-normal text-white">{careersContent.form.title}</h3>
                <CareerApplicationForm key={selectedRole} selectedRole={selectedRole} />
              </div>
              </div>
            </div>
          </div>
        </section>
      </Shell>
      <SiteFooter variant="compact" />
    </main>
  );
}
