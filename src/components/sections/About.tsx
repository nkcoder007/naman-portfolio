import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { SectionShell } from "@/components/sections/SectionShell";
import { about, portrait, profile } from "@/data/profile";

const portraitFile = path.join(process.cwd(), "public", portrait.src);

export function About() {
  const hasPortrait = existsSync(portraitFile);

  return (
    <SectionShell id="about" index="01" title="About Me" width="wide">
      <div className="grid max-w-5xl gap-10 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14">
        <div className="w-full max-w-[16rem] border border-border bg-surface md:max-w-none">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-bg-subtle px-3 py-2">
            <span className="flex items-center gap-2 font-mono text-[11px] text-fg-secondary">
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-syntax-teal" />
              portrait.jpg
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-fg-muted uppercase">
              4:5
            </span>
          </div>

          <div className="relative aspect-[4/5] w-full bg-bg-subtle">
            {hasPortrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1024px) 19rem, (min-width: 768px) 15rem, 16rem"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center border border-border-strong text-fg-muted"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="size-4"
                  >
                    <circle cx="12" cy="9" r="3.2" />
                    <path d="M5.8 18.5a6.4 6.4 0 0 1 12.4 0" />
                  </svg>
                </span>
                <p className="font-mono text-[10px] tracking-[0.18em] text-fg-muted uppercase">
                  Portrait
                </p>
                <p className="font-mono text-[10px] leading-5 break-all text-fg-muted">
                  public/images/profile/portrait.jpg
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-4 text-sm leading-7 text-fg-secondary sm:text-base sm:leading-8">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
              Tools &amp; technologies
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {profile.tools.map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-2 font-mono text-[12px] text-fg-secondary"
                >
                  <span aria-hidden="true" className="size-1 bg-border-strong" />
                  {tool}
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-md text-xs leading-6 text-fg-muted">{about.toolsNote}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
