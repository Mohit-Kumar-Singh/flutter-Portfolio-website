// All site copy lives here — edit this file to make the portfolio yours.

export const site = {
  firstName: "Mohit",
  lastName: "Kumar Singh",
  role: "Full-stack Developer",
  location: "India",
  timeZone: "Asia/Kolkata",
  year: "2026",
  email: "mks61201625@gmail.com",
  portrait: "/images/portrait.jpg",
  intro:
    "I build software that feels quiet, deliberate and alive — from mobile apps to full-stack platforms, where every detail has a reason to exist.",
  about:
    "I've always wanted to combine technology with creativity and art. I started with Flutter apps, studied Computer Science, and today I build full-stack products end to end — databases, interfaces and the small details in between.",
  services: ["Full-stack Web Apps", "React & TypeScript", "Supabase & Postgres", "Flutter Apps", "Java & Spring Boot"],
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

export type Project = {
  title: string;
  category: string;
  year: string;
  href: string;
  // Placeholder artwork until real images are added (two gradient stops).
  colors: [string, string];
};

export const projects: Project[] = [
  {
    title: "Milk Garage",
    category: "Operations PWA · Supabase",
    year: "2026",
    href: "https://milk-garage.vercel.app",
    colors: ["#11161C", "#5FA585"],
  },
  {
    title: "IPO Ledger",
    category: "Full-stack · WhatsApp API",
    year: "2026",
    href: "https://github.com/Mohit-Kumar-Singh/ipo-ledger",
    colors: ["#14161F", "#7B8CFF"],
  },
  {
    title: "Malicious URL",
    category: "Flutter · Final-year project",
    year: "2023",
    href: "https://github.com/Mohit-Kumar-Singh/malicious-url-",
    colors: ["#1B1B1B", "#FF4A1C"],
  },
  {
    title: "Employee System",
    category: "Java · Spring Boot",
    year: "2023",
    href: "https://github.com/Mohit-Kumar-Singh/ems-spring-assignment-3",
    colors: ["#3D3428", "#E6C79C"],
  },
  {
    title: "Chat App",
    category: "Flutter · Mobile",
    year: "2020",
    href: "https://github.com/Mohit-Kumar-Singh/Chat-app",
    colors: ["#2F3B2F", "#B9C9A7"],
  },
];
