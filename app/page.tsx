import { About } from "@/components/About";
import { Art } from "@/components/Art";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Learning } from "@/components/Learning";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { StickyReveal } from "@/components/StickyReveal";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <Experience>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <StickyReveal>
          <Hero />
          <Work />
          <About />
          <Art />
          <Skills />
          <Learning />
          <Journey />
        </StickyReveal>
        <Contact />
      </main>
    </Experience>
  );
}
