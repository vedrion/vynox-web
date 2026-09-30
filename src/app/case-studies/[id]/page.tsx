import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/features/case-studies/components/case-study-detail";
import { CASE_STUDY_DETAILS } from "@/content/case-studies";
import { FEATURES } from "@/config/features";
import { createPageMetadata } from "@/config/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.caseStudies ? Object.keys(CASE_STUDY_DETAILS).map((id) => ({ id })) : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  if (!FEATURES.caseStudies) return {};

  const { id } = await params;
  const detailedCase = CASE_STUDY_DETAILS[id];

  if (!detailedCase) return {};

  return createPageMetadata({
    title: `${detailedCase.brand} — ${detailedCase.title}`,
    description: detailedCase.headline,
    path: `/case-studies/${id}`,
    type: "article",
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!FEATURES.caseStudies) notFound();

  const { id } = await params;
  const detailedCase = CASE_STUDY_DETAILS[id];

  if (!detailedCase) notFound();

  const relatedCases = Object.values(CASE_STUDY_DETAILS)
    .filter((caseStudy) => caseStudy.id !== id)
    .slice(0, 2);

  return <CaseStudyDetail detailedCase={detailedCase} relatedCases={relatedCases} />;
}
