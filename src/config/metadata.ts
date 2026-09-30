import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const imagePath = path === "/" ? "/opengraph-image" : `${path}/opengraph-image`;
  const imageAlt = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: socialTitle, description, url: path },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: socialTitle,
      description,
      images: [{ url: imagePath, alt: imageAlt }],
    },
  };
}
