import { notFound } from "next/navigation";

import { SERVICES } from "@/content/services";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Vynox Media service page";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) notFound();

  return createSocialImage(`${service.hero.titleLine} ${service.hero.accentWord}`.trim(), service.hero.paragraph);
}
