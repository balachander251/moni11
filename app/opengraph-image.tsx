import { ImageResponse } from "next/og";
import { content } from "@/data/content";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dots: Array<{ top: number; left: number; size: number; color: string }> = [
  { top: 40, left: 60, size: 46, color: "#ff6f59" },
  { top: 90, left: 1080, size: 34, color: "#2fbfb0" },
  { top: 520, left: 1120, size: 40, color: "#ffe2a0" },
  { top: 540, left: 40, size: 32, color: "#ff4c81" },
  { top: 30, left: 560, size: 22, color: "#2fbfb0" },
  { top: 560, left: 620, size: 22, color: "#ff6f59" },
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#fff7ea",
          fontFamily: "sans-serif",
        }}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              position: "absolute",
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              backgroundColor: dot.color,
              opacity: 0.55,
            }}
          />
        ))}

        <div style={{ display: "flex", fontSize: 120 }}>🎉</div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            color: "#26324a",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {`Happy Birthday, ${content.partnerName}`}
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#d8402b" }}>
          A little digital gift, made just for you 💛
        </div>
      </div>
    ),
    { ...size }
  );
}
