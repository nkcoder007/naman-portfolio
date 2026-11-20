import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SectionShell } from "@/components/sections/SectionShell";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <About />

      <Experience />

      <Projects />

      <SectionShell id="personality" index="04" title="Personality" width="content">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          Interests, side projects and the things that shape how I build will live here.
        </p>
      </SectionShell>

      <SectionShell id="contact" index="05" title="Contact" width="content">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          Ways to get in touch will be listed here.
        </p>
      </SectionShell>
    </main>
  );
}
