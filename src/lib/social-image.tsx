import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 } as const;

export function createSocialImage(title: string, description: string) {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden",
        flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", color: "#ffffff",
        background: "radial-gradient(circle at 82% 32%, rgba(135, 38, 224, 0.42), transparent 35%), linear-gradient(135deg, #09070f 0%, #170d24 56%, #0a0711 100%)",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{ position: "absolute", width: 410, height: 410, right: -78, top: 110, borderRadius: "50%", border: "1px solid rgba(206, 151, 255, 0.28)" }} />
        <div style={{ position: "absolute", width: 300, height: 300, right: -24, top: 165, borderRadius: "50%", border: "1px solid rgba(206, 151, 255, 0.2)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#b65cff", boxShadow: "0 0 22px rgba(182, 92, 255, 0.85)" }} />
          VYNOX MEDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930, gap: 22 }}>
          <div style={{ fontSize: title.length > 48 ? 48 : title.length > 32 ? 58 : 68, lineHeight: 1.08, fontWeight: 700, letterSpacing: -1.5 }}>
            {title}
          </div>
          <div style={{ maxWidth: 850, color: "#d2c8dd", fontSize: 25, lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
        <div style={{ display: "flex", color: "#c58cff", fontSize: 20, letterSpacing: 1 }}>vynoxmedia.com</div>
      </div>
    ),
    socialImageSize,
  );
}
