import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 44, height: 32 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "5px solid #ff4925",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "5px solid #ff4925",
              background: "#ffffff",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
