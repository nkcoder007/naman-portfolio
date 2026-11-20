import { Container } from "@/components/ui/Container";
import { hero, profile } from "@/data/profile";
import { site } from "@/data/site";

const detailRows = [
  { label: "school", value: profile.school },
  { label: "graduating", value: `${profile.graduationYear} (expected)` },
  { label: "focus", value: profile.focusAreas.join(" · ") },
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      data-section
      data-scene
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh scroll-mt-16 flex-col justify-center border-b border-border"
    >
      <Container className="py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 xl:gap-16">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              <span className="text-accent">00</span>
              <span className="text-border-strong">/</span>
              <span className="text-fg-muted">intro</span>
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-5xl font-semibold tracking-tight text-balance text-fg sm:text-6xl xl:text-7xl"
            >
              {site.name}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px]">
              <span className="text-fg-secondary">{profile.school}</span>
              <span aria-hidden="true" className="text-border-strong">
                ·
              </span>
              <span className="text-fg-muted">Class of {profile.graduationYear}</span>
            </p>

            <p className="mt-7 max-w-xl text-base leading-8 text-fg-secondary sm:text-lg">
              {hero.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#about"
                className="inline-flex min-h-11 items-center gap-2 border border-accent bg-accent px-4 font-mono text-[12px] text-accent-contrast transition-colors hover:border-accent-strong hover:bg-accent-strong"
              >
                About me
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center gap-2 border border-border px-4 font-mono text-[12px] text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
              >
                Projects
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <aside aria-label="Profile details" className="w-full border border-border bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-bg-subtle px-3 py-2">
              <span className="flex items-center gap-2 font-mono text-[11px] text-fg-secondary">
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                profile.ts
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-fg-muted uppercase">
                utf-8
              </span>
            </div>

            <dl>
              {detailRows.map((row, index) => (
                <div
                  key={row.label}
                  className={
                    index === 0
                      ? "px-3 py-3"
                      : "border-t border-border px-3 py-3"
                  }
                >
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-fg-muted uppercase">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-fg">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
