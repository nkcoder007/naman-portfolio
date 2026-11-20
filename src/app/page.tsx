import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Personality } from "@/components/sections/Personality";
import { Projects } from "@/components/sections/Projects";
import { SectionShell } from "@/components/sections/SectionShell";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <About />

      <Experience />

      <Projects />

      <Personality />

      <SectionShell id="contact" index="05" title="Contact" width="content">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          Ways to get in touch will be listed here.
        </p>
      </SectionShell>
    </main>
  );
}
