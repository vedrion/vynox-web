import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SiteFooter } from "@/components/layout/site-footer";
import { Shell } from "@/components/ui/shell";
import { careersContent, type CareerRole } from "@/content/careers";
import { getJobPostingStructuredData } from "@/features/careers/lib/job-posting";

export function CareerRolePage({ role }: { role: CareerRole }) {
  const structuredData = getJobPostingStructuredData(role);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-bg-deep pt-32 text-white md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[700px] w-[1200px] max-w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.22)_0%,rgb(var(--color-glow-primary-rgb)/0.07)_48%,transparent_72%)] blur-[100px]" />
        <div className="absolute right-[-120px] top-[520px] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(144,54,219,0.1),transparent_68%)] blur-[80px]" />
      </div>

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      )}

      <Shell className="relative z-10">
        <article className="mx-auto max-w-4xl pb-24 md:pb-32">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
            { label: role.title },
          ]} />

          <header className="mt-8 border-b border-white/10 pb-10">
            <p className="text-sm font-medium text-[#c5a6ff]">{role.department}</p>
            <h1 className="mt-3 font-vastago text-h1 font-bold leading-[1.05] tracking-[-0.03em]">{role.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{role.employmentType}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{careersContent.remote}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{role.regionLabel}</span>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/75">{role.summary}</p>
            <Link
              href={`/careers?role=${encodeURIComponent(role.id)}#career-application`}
              className="mt-7 inline-flex rounded-full bg-gradient-to-r from-[#7732d4] to-[#a13ae8] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(115,16,206,0.25)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2a1ff]"
            >
              {careersContent.apply}
            </Link>
          </header>

          <div className="grid gap-10 py-10 sm:grid-cols-2">
            <section>
              <h2 className="font-vastago text-2xl font-semibold">{careersContent.responsibilities}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
                {role.responsibilities.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b88aff]" />{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="font-vastago text-2xl font-semibold">{careersContent.qualifications}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
                {role.qualifications.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b88aff]" />{item}</li>)}
              </ul>
            </section>
          </div>

          {role.jobPosting && (
            <p className="border-t border-white/10 pt-6 text-sm text-white/50">
              Posted {new Date(`${role.jobPosting.datePosted}T00:00:00`).toLocaleDateString("en", { dateStyle: "long", timeZone: "UTC" })}
            </p>
          )}
        </article>
      </Shell>
      <SiteFooter variant="compact" />
    </main>
  );
}
