import { notFound } from "next/navigation";

import { FEATURES } from "@/config/features";
import { CASE_STUDY_DETAILS } from "@/content/case-studies";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Vynox Media campaign case study";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  if (!FEATURES.caseStudies) notFound();

  const { id } = await params;
  const detailedCase = CASE_STUDY_DETAILS[id];

  if (!detailedCase) notFound();

  return createSocialImage(`${detailedCase.brand} — ${detailedCase.title}`, detailedCase.headline);
}
