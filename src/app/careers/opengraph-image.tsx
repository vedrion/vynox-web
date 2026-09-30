import { siteContent } from "@/content/site";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Careers at Vynox Media";
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return createSocialImage(siteContent.metadata.careers.title, siteContent.metadata.careers.description);
}
