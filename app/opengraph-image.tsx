import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

// The card shown when the site link is shared on LinkedIn, WhatsApp, Slack, X…
export const alt = `${site.firstName} ${site.lastName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [serif, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "public/images/portrait.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#efede8", color: "#111111" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#8a877f" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff4a1c" }} />
            {site.status} · {site.location}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 150, fontWeight: 700, letterSpacing: -8, lineHeight: 0.9 }}>{site.firstName}</div>
            <div style={{ fontFamily: "Instrument Serif", fontSize: 130, letterSpacing: -3, lineHeight: 1 }}>
              {site.lastName}
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#555" }}>Full-stack products · Flutter apps · Motion</div>
        </div>
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          width={420}
          height={630}
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, style: "italic", weight: 400 }],
    },
  );
}
