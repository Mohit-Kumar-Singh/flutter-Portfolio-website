import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <Experience>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Marquee text="Design — Develop — Animate —" />
        <About />
        <Contact />
      </main>
    </Experience>
  );
}
