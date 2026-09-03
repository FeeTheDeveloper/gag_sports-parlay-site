import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0A0A0B",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,175,55,0.18), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            border: "2px solid #8A6A1E",
            background: "linear-gradient(135deg, #F5D678, #8A6A1E)",
            color: "#14110A",
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          GAG
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: 2,
            backgroundImage: "linear-gradient(180deg, #FCEFC7 35%, #D4AF37)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          GOOD AZ GOLD
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 28,
            color: "#B9B2A0",
          }}
        >
          Sportsbook &middot; Casino &middot; Poker
        </div>
      </div>
    ),
    { ...size }
  );
}
