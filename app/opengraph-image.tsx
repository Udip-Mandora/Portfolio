import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Udip Mandora — Full-Stack Developer & Project Manager in Toronto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#0a0a0f",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            backgroundImage: "linear-gradient(90deg, #4f46e5, #7c3aed, #4338ca)",
            display: "flex",
          }}
        />

        {/* Domain badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
            padding: "9px 26px",
            borderRadius: 999,
            border: "1px solid rgba(99,102,241,0.4)",
            backgroundColor: "rgba(99,102,241,0.08)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              display: "flex",
            }}
          />
          <span style={{ color: "#818cf8", fontSize: 18, fontWeight: 600 }}>
            udipmandora.com
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 900,
            color: "#ffffff",
            marginBottom: 24,
            letterSpacing: "-3px",
          }}
        >
          Udip Mandora
        </div>

        {/* Role badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "#c4b5fd",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Project Manager
          </div>
        </div>

        {/* Location + tech row */}
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 20,
            color: "#475569",
          }}
        >
          <span style={{ color: "#64748b" }}>React</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span style={{ color: "#64748b" }}>Next.js</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span style={{ color: "#64748b" }}>Node.js</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span style={{ color: "#64748b" }}>Python</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span style={{ color: "#4f46e5", fontWeight: 600 }}>Remote · Available Worldwide</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
