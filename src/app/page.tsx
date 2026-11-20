import { SectionShell } from "@/components/sections/SectionShell";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <section
        id="hero"
        data-section
        data-scene
        aria-labelledby="hero-heading"
        className="relative flex min-h-svh scroll-mt-16 flex-col justify-center border-b border-border"
      >
        <Container className="py-24 sm:py-32 lg:py-40">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase">
            <span className="text-accent">00</span>
            <span className="text-border-strong">/</span>
            <span className="text-fg-muted">{site.role}</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-6xl"
          >
            {site.name}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-fg-secondary">
            The design foundation is in place: layout, typography and a two-theme system. Detailed
            sections are built in the next phase.
          </p>
        </Container>
      </section>

      <SectionShell id="about" index="01" title="About Me" width="content">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          A short introduction, background and the way I work will be developed here.
        </p>
      </SectionShell>

      <SectionShell id="experience" index="02" title="Experience" width="wide">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          Roles, timelines and the technical work behind them will be laid out here.
        </p>
      </SectionShell>

      <SectionShell id="projects" index="03" title="Projects" width="wide">
        <p className="max-w-xl text-sm leading-7 text-fg-secondary sm:text-base">
          Selected projects, their stack and outcomes will be documented here.
        </p>
      </SectionShell>

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
