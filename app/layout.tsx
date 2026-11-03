import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/content";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// next/font self-hosts these at build time — no requests to Google at runtime.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const name = `${site.firstName} ${site.lastName}`;
const title = `${name} — ${site.role}`;
const description = `Portfolio of ${name}: full-stack products, Flutter apps and quiet, deliberate interfaces.`;

// opengraph-image.tsx and icon.tsx are picked up automatically; metadataBase makes their URLs absolute.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

// Lets Google show a "Person" result with the right links.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}${site.portrait}`,
  worksFor: { "@type": "Organization", name: site.company },
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "AKGEC" },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrument.variable} antialiased`}
      // The theme script sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
