import { ImageResponse } from "next/og";
import { isLocale, defaultLocale } from "@/lib/i18n-config";

export const alt = "Almficode — Desarrollo web con Inteligencia Artificial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const tagline =
    locale === "es"
      ? "Desarrollo web · IA · Automatización"
      : "Web Development · AI · Automation";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(255,73,37,0.16) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(0,153,255,0.1) 0%, transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", position: "relative", width: 96, height: 70 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: "6px solid #ff4925",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 30,
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: "6px solid #ff4925",
                background: "#ffffff",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#212121",
              textTransform: "uppercase",
            }}
          >
            Alm<span style={{ color: "#ff4925" }}>fi</span>code
          </span>
        </div>
        <span
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#808081",
            letterSpacing: 1,
          }}
        >
          {tagline}
        </span>
      </div>
    ),
    { ...size }
  );
}
