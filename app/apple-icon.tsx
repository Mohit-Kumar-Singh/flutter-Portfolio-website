import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Larger monogram for iOS home screens and apps that show a site icon next to shared links.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const serif = await readFile(join(process.cwd(), "assets/InstrumentSerif-Italic.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#111111",
          color: "#efede8",
          fontFamily: "Instrument Serif",
          fontSize: 150,
          lineHeight: 1,
          paddingBottom: 26,
        }}
      >
        <div style={{ display: "flex" }}>m</div>
        <div style={{ display: "flex", width: 22, height: 22, borderRadius: 22, background: "#c1653f", marginTop: 72, marginLeft: 4 }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, style: "italic", weight: 400 }] },
  );
}
