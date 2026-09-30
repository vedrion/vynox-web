import { siteContent } from "@/content/site";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Vynox Media privacy policy";
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return createSocialImage(siteContent.metadata.privacy.title, siteContent.metadata.privacy.description);
}
