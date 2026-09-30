import { notFound } from "next/navigation";

import { careerRoles } from "@/content/careers";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Open role at Vynox Media";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = careerRoles.find((item) => item.id === slug && item.status === "open");

  if (!role) notFound();

  return createSocialImage(role.title, role.summary);
}
