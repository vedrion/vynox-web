"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, siteConfig.url).toString() } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="text-xs text-white/55">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-white/30">/</span>}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2a1ff]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/80">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
