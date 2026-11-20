import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Personality } from "@/components/sections/Personality";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <About />

      <Experience />

      <Projects />

      <Personality />

      <Contact />
    </main>
  );
}
