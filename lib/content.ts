import type { IconName } from "@/components/Icons";
import { employer } from "@/lib/employer";

// All site copy lives here — edit this file to make the portfolio yours.

export const site = {
  firstName: "Mohit",
  lastName: "Kumar Singh",
  role: "DevOps Engineer",
  // Short status shown with the dot in the hero and on the share banner. The company comes from lib/employer.ts.
  status: `DevOps Engineer at ${employer.name}`,
  // What you focus on — shown under the status line, in the share image and the page title.
  focus: "DevOps & Automation",
  location: "Delhi, India",
  timeZone: "Asia/Kolkata",
  year: "2026",
  updated: "Nov 2026",
  url: "https://mohit-portfolio-five-tau.vercel.app",
  email: "mks61201625@gmail.com",
  phone: { display: "+91 85271 72366", e164: "+918527172366" },
  // Put your CV at public/resume.pdf and set this to "/resume.pdf" to show the Resume button.
  resume: "",
  portrait: "/images/portrait.jpg",
  intro:
    `I'm a DevOps engineer at ${employer.name}, automating build and release pipelines and helping teams improve how they work. I'm also an artist. I make Sanjhi art, paint murals, and I once ran a café, Expecto Cafeteria.`,
  about:
    `I studied Computer Science at AKGEC and led the college's fine-art society. After that I co-ran a café. Both sharpened my people and management skills. Since ${employer.startYear} I've been a DevOps engineer at ${employer.name}, and outside work I still make art: Sanjhi, murals and drawings.`,
  education: [
    { title: "B.Tech, Computer Science", place: "AKGEC, Ghaziabad · 2019–2023" },
    { title: "Class XII, 93.2% (PCM)", place: "Bloomingdale School, Badaun · 2018" },
  ],
  offScreen: "Badminton, art, and a good series.",
  socials: [
    { label: "GitHub", href: "https://github.com/Mohit-Kumar-Singh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohit-kumar-singh-mks" },
    { label: "Instagram", href: "https://instagram.com/mohit_kumar_singh" },
    { label: "Kalakari", href: "https://instagram.com/kalakari_by_mks" },
  ],
};

// Words that get a hover/tap definition wherever they appear in running text.
export const terms: Record<string, string> = {
  Sanjhi:
    "A traditional paper-cutting art from the Braj region of Uttar Pradesh (Mathura and Vrindavan). Intricate designs, often from Krishna legends, are cut by hand into paper stencils, traditionally used to make rangoli in temples. It has a GI tag.",
};

// The Art section.
export const art = {
  instagram: { handle: "@kalakari_by_mks", href: "https://instagram.com/kalakari_by_mks" },
  intro:
    "I've made art since school. Most of it is Sanjhi, cut by hand with a surgical blade.",
  // `href` turns a highlight title into a link.
  highlights: [
    { title: "Freelance wall murals", detail: "Painted the walls of Fittverse gym in Indirapuram, Ghaziabad." },
    { title: "Expecto Cafeteria", detail: "Co-ran a rooftop café in Crossings Republik, Ghaziabad, with Avinash Rai." },
    { title: "Team Footprints", href: "https://www.instagram.com/kaleidoscope.fp/", detail: "Artist and head of operations at AKGEC's fine-art society for over three years." },
    { title: "Sanjhi art", detail: "Cut by hand with a surgical blade. One piece takes 5 to 14 hours." },
  ],
};

// Drop artwork photos into public/art/ and list them here — the gallery in the Art section appears automatically.
// Pieces from @kalakari_by_mks.
export const artworks: { src: string; title: string; detail?: string; landscape?: boolean }[] = [
  // Wall murals at Fittverse gym, Indirapuram (from the @kalakari_by_mks post).
  { src: "/art/mural-spin-room.jpg", title: "Spin Room", detail: "Wall mural · Fittverse gym", landscape: true },
  { src: "/art/mural-goggins-wall.jpg", title: "Goggins Wall", detail: "Wall mural · Fittverse gym", landscape: true },
  { src: "/art/mural-rope-climb.jpg", title: "Rope Climb", detail: "Wall mural · Fittverse gym", landscape: true },
  { src: "/art/mural-cyclist.jpg", title: "The Cyclist", detail: "Wall mural · Fittverse gym", landscape: true },
  { src: "/art/mural-dumbbell.jpg", title: "Dumbbell", detail: "Wall mural · Fittverse gym", landscape: true },
  { src: "/art/under-the-wolfs-skin.jpg", title: "Under the Wolf's Skin", detail: "Sanjhi · surgical blade · ~6 hrs" },
  { src: "/art/point-of-view-neon.jpg", title: "Point of View", detail: "Neon tubes & acrylic · ~9 hrs" },
  { src: "/art/voyages-unknown.jpg", title: "Voyages Unknown", detail: "Sanjhi · ~5 hrs" },
  { src: "/art/waqt.jpg", title: "Waqt", detail: "Sanjhi portrait · ~10 hrs" },
  { src: "/art/the-eyes.jpg", title: "The Eyes", detail: "Sanjhi · ~5 hrs" },
  { src: "/art/on-the-wings.jpg", title: "On the Wings", detail: "Sanjhi · ~10 hrs" },
  { src: "/art/perfection-is-a-flaw.jpg", title: "Perfection Is a Flaw", detail: "Sanjhi · ~14 hrs" },
  { src: "/art/and-still.jpg", title: "And Still", detail: "Sanjhi" },
  { src: "/art/laal-bindi.jpg", title: "Laal Bindi", detail: "Graphite on paper" },
  { src: "/art/a-tale-of-eyes.jpg", title: "A Tale of Eyes, Soul and Heart", detail: "Sanjhi" },
  { src: "/art/turn-on-the-light.jpg", title: "Turn On the Light", detail: "Light art" },
  { src: "/art/happy-halloween.jpg", title: "Happy Halloween", detail: "Sanjhi · ~8 hrs" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "DevOps & Automation", items: ["CI/CD", "Docker", "GitHub Actions", "Linux", "Scripting", "Process automation"] },
  { group: "AI", items: ["LLM apps", "Prompt engineering", "AI agents", "Python"] },
  { group: "Build & Manage", items: ["Vibe coding", "UI/UX design (basics)", "Management", "Problem-solving through automation"] },
  { group: "Art", items: ["Wall murals", "Painting", "Sanjhi art", "Art direction"] },
];

// `company: true` appends the animated employer name to the title.
// `href` turns the title into a link.
export const timeline: { year: string; items: { title: string; detail: string; company?: boolean; href?: string }[] }[] = [
  {
    year: employer.startYear,
    items: [
      {
        title: "DevOps Engineer",
        company: true,
        detail: `DevOps engineer at ${employer.legalName}, ${employer.city}, since ${employer.since}. I automate pipelines and help teams with their processes.`,
      },
      { title: "Graduated · B.Tech CSE", detail: "AKGEC, Ghaziabad. Final-year project: a malicious URL detector built with machine learning." },
      { title: "Co-ran Expecto Cafeteria", detail: "Rooftop café in Crossings Republik, Ghaziabad, with Avinash Rai, until 2025." },
    ],
  },
  {
    year: "2020",
    items: [
      {
        title: "Team Head · Team Footprints",
        href: "https://www.instagram.com/kaleidoscope.fp/",
        detail: "Artist and head of operations at AKGEC's fine-art society. We ran blood donation camps, anti-ragging drives and Azadi Ka Amrit Mahotsav events.",
      },
    ],
  },
  {
    year: "2019",
    items: [{ title: "Started B.Tech, Computer Science", detail: "AKGEC, Ghaziabad." }],
  },
  {
    year: "2018",
    items: [{ title: "Class XII, 93.2% (PCM)", detail: "Bloomingdale School, Badaun. Head of co-cultural activities." }],
  },
];

export type Project = {
  title: string;
  category: string;
  // Small line icon shown beside the category.
  icon: IconName;
  description: string;
  year: string;
  stack: string[];
  // Shows the title as the animated employer name (see lib/employer.ts).
  company?: boolean;
  // A linked credit under the description: "With" a partner or "For" a client.
  credit?: { label: "With" | "For"; name: string; href: string };
  // Optional links; `live` is preferred as the primary link. Items with neither are not clickable.
  live?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    title: employer.name,
    company: true,
    category: "DevOps Engineer · Full-time",
    icon: "gear",
    description:
      "I automate build and release pipelines and the repetitive work around them, and help other teams streamline their processes so they ship faster.",
    year: employer.period,
    stack: ["DevOps", "CI/CD", "Automation", "Process improvement"],
  },
  {
    title: "Wall Murals",
    category: "Freelance · Wall murals",
    icon: "brush",
    description: "Murals for a gym in Indirapuram, Ghaziabad: athletes in motion and a David Goggins quote wall, from sketch to finished wall.",
    credit: { label: "For", name: "Fittverse", href: "https://www.instagram.com/fittversebyps/" },
    year: "",
    stack: ["Murals", "Painting", "Gym interiors"],
  },
  {
    title: "Expecto Cafeteria",
    category: "Rooftop café · Crossings Republik, Ghaziabad",
    icon: "cup",
    description: "Co-ran the café. I handled operations, staff, interiors, parties, customers and online delivery.",
    credit: { label: "With", name: "Avinash Rai", href: "https://www.linkedin.com/in/avinash-rai-23415a160/" },
    year: "2023–2025",
    stack: ["Operations", "Staff management", "Interiors", "Events", "Online delivery"],
  },
];

// ── Certifications & side projects ───────────────────────────────────────────────
// The section (and its nav link) stays hidden until one of these lists has an item.

// One object per certificate. `image` is optional: drop the file in public/certificates/.
// Example: { title: "Docker & Kubernetes: The Practical Guide", issuer: "Udemy", date: "Mar 2026",
//            url: "https://www.udemy.com/certificate/UC-xxxx/", image: "/certificates/docker.jpg" }
export type Certification = { title: string; issuer: string; date: string; url?: string; image?: string };
export const certifications: Certification[] = [
  {
    title: "Agentic AI with CrewAI & Agentic Design Patterns",
    issuer: "Udemy",
    date: "Nov 2026",
    url: "https://www.udemy.com/certificate/UC-1156cfcc-9f94-439a-b7cc-cf88e5095a32/",
    image: "/certificates/agentic-ai-crewai.jpg",
  },
];

// One object per project. Links are optional.
// Example: { title: "Release bot", description: "Posts deploy status to Teams.", tags: ["Python", "CI/CD"],
//            code: "https://github.com/Mohit-Kumar-Singh/release-bot" }
export type SideProject = { title: string; description: string; tags: string[]; live?: string; code?: string };
export const sideProjects: SideProject[] = [];

export const hasLearning = certifications.length > 0 || sideProjects.length > 0;
