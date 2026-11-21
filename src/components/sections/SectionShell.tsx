import type { ReactNode } from "react";

import { Container, type ContentWidth } from "@/components/ui/Container";

/**
 * `grid` leaves the section transparent so the persistent background shows
 * through; `solid` paints the opaque theme background, which conceals the grid
 * (and the reserved mascot layer) behind it. See the layering plan in
 * globals.css.
 */
type SectionSurface = "grid" | "solid";

type SectionShellProps = {
  id: string;
  title: string;
  width?: ContentWidth;
  headingClassName?: string;
  surface?: SectionSurface;
  children?: ReactNode;
};

export function SectionShell({
  id,
  title,
  width = "content",
  headingClassName,
  surface = "grid",
  children,
}: SectionShellProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      data-section
      data-scene
      data-surface={surface}
      aria-labelledby={headingId}
      className={[
        "relative flex min-h-svh scroll-mt-16 flex-col justify-center border-b border-border",
        surface === "solid" ? "bg-bg" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Only the transparent scenes settle on scroll; a solid scene already has
          its fade and rise from the entrance reveal. */}
      <Container width={width} className="py-20 sm:py-24 lg:py-28" scene={surface === "grid"}>
        <h2
          id={headingId}
          className={["font-mono text-2xl font-semibold tracking-tight text-fg sm:text-3xl", headingClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h2>

        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
