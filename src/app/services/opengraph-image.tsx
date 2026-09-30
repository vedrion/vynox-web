import { createSocialImage } from "@/lib/social-image";
import { servicesOverviewContent } from "@/content/services-overview";

export const alt = "Vynox Media marketing and creator services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createSocialImage(
    servicesOverviewContent.metadata.title,
    servicesOverviewContent.metadata.description,
  );
}
