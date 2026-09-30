import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #0a0410 0%, #1a0733 55%, #2d0a55 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c084fc",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 32 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}
