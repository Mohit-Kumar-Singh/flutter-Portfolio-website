import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Monogram favicon: italic serif "m" on ink with the accent dot.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 16,
          background: "#111111",
          color: "#efede8",
          fontFamily: "Instrument Serif",
          fontSize: 56,
          lineHeight: 1,
          paddingBottom: 10,
        }}
      >
        m
        <div style={{ width: 8, height: 8, borderRadius: 8, background: "#ff4a1c", marginTop: 26, marginLeft: 2 }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, style: "italic", weight: 400 }] },
  );
}
