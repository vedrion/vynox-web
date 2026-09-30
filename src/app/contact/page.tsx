import type { Metadata } from "next";

import { createPageMetadata } from "@/config/metadata";
import { ContactPageContent } from "@/features/contact/components/contact-page";
import { siteContent } from "@/content/site";

export const metadata: Metadata = createPageMetadata({ ...siteContent.metadata.contact, path: "/contact" });

export default function ContactPage() {
  return <ContactPageContent />;
}
