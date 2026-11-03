// All site copy lives here — edit this file to make the portfolio yours.

export const site = {
  firstName: "Mohit",
  lastName: "Kumar Singh",
  role: "Full-stack Developer",
  location: "India",
  timeZone: "Asia/Kolkata",
  year: "2026",
  email: "mks61201625@gmail.com",
  // Put your CV at public/resume.pdf and set this to "/resume.pdf" to show the Resume button.
  resume: "",
  portrait: "/images/portrait.jpg",
  intro:
    "I build software that feels quiet, deliberate and alive — from mobile apps to full-stack platforms, where every detail has a reason to exist.",
  about:
    "I've always wanted to combine technology with creativity and art. I started with Flutter apps, studied Computer Science, and today I build full-stack products end to end — databases, interfaces and the small details in between.",
  education: [
    { title: "B.Tech, Computer Science", place: "AKGEC, Ghaziabad" },
    { title: "Class XII — 93.2% (PCM)", place: "Blooming Dale School, Badaun · 2018" },
  ],
  offScreen: "Art & craft, badminton, and one more episode of a good series.",
  socials: [
    { label: "GitHub", href: "https://github.com/Mohit-Kumar-Singh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohit-kumar-singh-mks" },
    { label: "Instagram", href: "https://instagram.com/mohit_kumar_singh" },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Motion"] },
  { group: "Backend & Data", items: ["Supabase", "PostgreSQL", "Java", "Spring Boot", "REST APIs"] },
  { group: "Mobile", items: ["Flutter", "Dart", "PWAs"] },
  { group: "Tools & More", items: ["Git & GitHub", "Vercel", "Figma", "C++", "WhatsApp Cloud API"] },
];

export const timeline: { year: string; items: { title: string; detail: string }[] }[] = [
  {
    year: "2026",
    items: [
      { title: "Building Milk Garage", detail: "Operations console and WhatsApp ordering bot for a dairy business — herd, sales and finances in one PWA." },
      { title: "Shipped IPO Ledger", detail: "Tracks IPO applications across demat accounts with automatic WhatsApp alerts on allotment." },
    ],
  },
  {
    year: "2023",
    items: [
      { title: "Final-year project", detail: "Malicious URL detection app built with Flutter." },
      { title: "Java & Spring Boot", detail: "Built employee management systems and TypeScript projects." },
    ],
  },
  {
    year: "2020",
    items: [
      { title: "Conatus trainee", detail: "Learned Flutter by shipping apps — chat, meals, expense tracker and my first portfolio." },
    ],
  },
  {
    year: "2019",
    items: [{ title: "Started B.Tech, Computer Science", detail: "AKGEC, Ghaziabad." }],
  },
  {
    year: "2018",
    items: [{ title: "Class XII — 93.2% (PCM)", detail: "Blooming Dale School, Badaun." }],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  year: string;
  href: string;
  // Placeholder artwork until real images are added (two gradient stops).
  colors: [string, string];
};

export const projects: Project[] = [
  {
    title: "Milk Garage",
    category: "Operations PWA · Supabase",
    description: "Runs a dairy business end to end — herd, deliveries, sales and a WhatsApp ordering bot.",
    year: "2026",
    href: "https://milk-garage.vercel.app",
    colors: ["#11161C", "#5FA585"],
  },
  {
    title: "IPO Ledger",
    category: "Full-stack · WhatsApp API",
    description: "Tracks IPO applications across demat accounts with WhatsApp alerts on allotment.",
    year: "2026",
    href: "https://github.com/Mohit-Kumar-Singh/ipo-ledger",
    colors: ["#14161F", "#7B8CFF"],
  },
  {
    title: "Malicious URL",
    category: "Flutter · Final-year project",
    description: "A mobile app that flags malicious links before you open them.",
    year: "2023",
    href: "https://github.com/Mohit-Kumar-Singh/malicious-url-",
    colors: ["#1B1B1B", "#FF4A1C"],
  },
  {
    title: "Employee System",
    category: "Java · Spring Boot",
    description: "Employee management backend with a REST API.",
    year: "2023",
    href: "https://github.com/Mohit-Kumar-Singh/ems-spring-assignment-3",
    colors: ["#3D3428", "#E6C79C"],
  },
  {
    title: "Chat App",
    category: "Flutter · Mobile",
    description: "Real-time messaging app from my Flutter beginnings.",
    year: "2020",
    href: "https://github.com/Mohit-Kumar-Singh/Chat-app",
    colors: ["#2F3B2F", "#B9C9A7"],
  },
  {
    title: "First Portfolio",
    category: "Flutter · Conatus",
    description: "My very first portfolio, built as a Flutter app during Conatus training.",
    year: "2020",
    href: "https://github.com/Mohit-Kumar-Singh/flutter-Portfolio-website/tree/flutter-legacy",
    colors: ["#20182A", "#D69BC6"],
  },
];
