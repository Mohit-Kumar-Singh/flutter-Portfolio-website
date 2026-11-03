import type { IconName } from "@/components/Icons";

// All site copy lives here — edit this file to make the portfolio yours.

export const site = {
  firstName: "Mohit",
  lastName: "Kumar Singh",
  role: "Software Developer",
  company: "Volkswagen Group Technology Solutions India",
  // Short status shown with the pulsing dot in the hero.
  status: "Software Developer at Volkswagen Group",
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
    "DevOps at Volkswagen Group — I automate pipelines and help teams smooth out the processes around them. Off-screen I'm an artist: wall murals, paper carving, and once, my own café.",
  about:
    "I've always lived between technology and art. I led my college's fine-art society for three years, painted walls as a freelance muralist and ran a café — and today I work in DevOps at Volkswagen Group, automating the work nobody should do by hand.",
  education: [
    { title: "B.Tech, Computer Science", place: "AKGEC, Ghaziabad · 2019–2023" },
    { title: "Class XII — 93.2% (PCM)", place: "Bloomingdale School, Badaun · 2018" },
  ],
  offScreen: "Badminton, a sketchbook, and one more episode of a good series.",
  // "At a glance" numbers in the About section.
  stats: [
    { value: 3, suffix: "+", label: "Years at Volkswagen Group" },
    { value: 3, suffix: "+", label: "Years leading Team Footprints" },
    { value: 1, label: "Café I ran" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Mohit-Kumar-Singh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohit-kumar-singh-mks" },
    { label: "Instagram", href: "https://instagram.com/mohit_kumar_singh" },
    { label: "Kalakari", href: "https://instagram.com/kalakari_by_mks" },
  ],
};

// The Art section.
export const art = {
  instagram: { handle: "@kalakari_by_mks", href: "https://instagram.com/kalakari_by_mks" },
  intro:
    "Long before pipelines, I painted. Walls, paper, a whole café — art is where I learned patience, craft and finishing what I start.",
  highlights: [
    { title: "Freelance wall murals", detail: "Large hand-painted murals for homes and businesses, from sketch to final coat." },
    { title: "Ran a café", detail: "Owned and ran a café end to end — and painted its walls myself." },
    { title: "Team Footprints", detail: "Artist and head of operations of AKGEC's fine-art society for 3+ years." },
    { title: "Paper carving", detail: "Cut by hand with a surgical blade — single pieces take 5 to 14 hours." },
  ],
};

// Drop artwork photos into public/art/ and list them here — the gallery in the Art section appears automatically.
// Pieces from @kalakari_by_mks.
export const artworks: { src: string; title: string; detail?: string }[] = [
  { src: "/art/under-the-wolfs-skin.jpg", title: "Under the Wolf's Skin", detail: "Paper cut · surgical blade · ~6 hrs" },
  { src: "/art/point-of-view-neon.jpg", title: "Point of View", detail: "Neon tubes & acrylic · ~9 hrs" },
  { src: "/art/voyages-unknown.jpg", title: "Voyages Unknown", detail: "Paper cut · ~5 hrs" },
  { src: "/art/waqt.jpg", title: "Waqt", detail: "Paper cut portrait · ~10 hrs" },
  { src: "/art/the-eyes.jpg", title: "The Eyes", detail: "Paper cut · ~5 hrs" },
  { src: "/art/on-the-wings.jpg", title: "On the Wings", detail: "Paper cut · ~10 hrs" },
  { src: "/art/perfection-is-a-flaw.jpg", title: "Perfection Is a Flaw", detail: "Paper cut · ~14 hrs" },
  { src: "/art/and-still.jpg", title: "And Still", detail: "Paper cut" },
  { src: "/art/laal-bindi.jpg", title: "Laal Bindi", detail: "Graphite on paper" },
  { src: "/art/a-tale-of-eyes.jpg", title: "A Tale of Eyes, Soul and Heart", detail: "Paper cut" },
  { src: "/art/turn-on-the-light.jpg", title: "Turn On the Light", detail: "Light art" },
  { src: "/art/happy-halloween.jpg", title: "Happy Halloween", detail: "Paper cut · ~8 hrs" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "DevOps & Automation", items: ["CI/CD", "Docker", "GitHub Actions", "Linux", "Scripting", "Process automation"] },
  { group: "AI", items: ["LLM apps", "Prompt engineering", "AI agents", "Python"] },
  { group: "Code & Data", items: ["Java", "Spring Boot", "SQL", "TypeScript", "C++ & DSA", "Git & GitHub"] },
  { group: "Art", items: ["Wall murals", "Painting", "Paper carving", "Art direction"] },
];

export const timeline: { year: string; items: { title: string; detail: string }[] }[] = [
  {
    year: "2023",
    items: [
      {
        title: "DevOps · Volkswagen Group",
        detail: "Joined Volkswagen Group Technology Solutions India in Gurugram (Aug 2023 – present) — automating pipelines and helping teams improve their processes.",
      },
      { title: "Graduated · B.Tech CSE", detail: "AKGEC, Ghaziabad. Final-year project: an app that detects malicious URLs." },
    ],
  },
  {
    year: "2020",
    items: [
      {
        title: "Team Head · Team Footprints",
        detail: "Artist and head of operations of AKGEC's fine-art society for 3+ years — ran blood donation camps, anti-ragging drives and Azadi Ka Amrit Mahotsav events.",
      },
    ],
  },
  {
    year: "2019",
    items: [{ title: "Started B.Tech, Computer Science", detail: "AKGEC, Ghaziabad." }],
  },
  {
    year: "2018",
    items: [{ title: "Class XII — 93.2% (PCM)", detail: "Bloomingdale School, Badaun. Head of co-cultural activities." }],
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
  // Optional links; `live` is preferred as the primary link. Items with neither are not clickable.
  live?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    title: "Volkswagen Group",
    category: "DevOps & Automation · Full-time",
    icon: "gear",
    description:
      "I automate build and release pipelines and the repetitive work around them, and help other teams streamline their processes so they ship faster.",
    year: "2023–now",
    stack: ["DevOps", "CI/CD", "Automation", "Process improvement"],
  },
  {
    title: "Wall Murals",
    category: "Freelance artist",
    icon: "brush",
    description: "Hand-painted murals for homes, cafés and businesses — from first sketch to the final wall.",
    year: "",
    stack: ["Murals", "Painting", "Client work"],
  },
  {
    title: "The Café",
    category: "Owner · Operations",
    icon: "cup",
    description: "Ran my own café — menu, people, suppliers and the space itself, which I painted.",
    year: "",
    stack: ["Business", "Operations", "Interior art"],
  },
];
