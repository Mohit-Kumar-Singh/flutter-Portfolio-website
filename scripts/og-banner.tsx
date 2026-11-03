import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

// Source for the share banner (app/opengraph-image.jpg + app/twitter-image.jpg).
// The banner ships as a static ~150 KB JPEG because ImageResponse only outputs PNG, and a PNG with a
// photo is ~750 KB — too big for WhatsApp previews. To regenerate after changing copy:
//   1. copy this file to app/opengraph-image.tsx (and move the .jpg files aside), run `npm run dev`
//   2. curl localhost:3000/opengraph-image -o banner.png
//   3. sips -s format jpeg -s formatOptions 82 banner.png --out app/opengraph-image.jpg (and twitter-image.jpg)
//   4. delete app/opengraph-image.tsx again
// The banner shown when the site link is shared on WhatsApp, LinkedIn, Slack, X…
export const alt = `${site.firstName} ${site.lastName} — ${site.status}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the renderer behind ImageResponse) needs every multi-child <div> to be display:flex,
// so text is always passed as a single template string.
export default async function Image() {
  const [serif, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "assets/portrait-og.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#111111", color: "#efede8" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a8a59d" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff4a1c" }} />
            <div style={{ display: "flex" }}>{`${site.status} · ${site.location}`}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -8, lineHeight: 0.9 }}>
              {site.firstName}
            </div>
            <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 128, letterSpacing: -3, lineHeight: 1.05 }}>
              {site.lastName}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["DevOps", "Automation", "Artist"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(239,237,232,0.25)",
                  color: tag === "Artist" ? "#ff4a1c" : "#efede8",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */}
        <img src={`data:image/jpeg;base64,${portrait}`} width={420} height={630} style={{ objectFit: "cover" }} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, style: "italic", weight: 400 }],
    },
  );
}
