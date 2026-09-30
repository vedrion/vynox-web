import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { fontVars } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vynox Media — creator partnerships, campaigns, and social strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        alt: "Vynox Media — creator partnerships, campaigns, and social strategy",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars} data-scroll-behavior="smooth">
      <GoogleTagManager gtmId="G-K5X2LX6GG5" />
      <body className="bg-bg text-white font-inter antialiased">
        <Navbar />
        <main><NextTopLoader />{children}</main>
      </body>
    </html>
  );
}
