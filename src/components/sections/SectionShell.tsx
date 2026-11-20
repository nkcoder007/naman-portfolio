import type { ReactNode } from "react";

import { Container, type ContentWidth } from "@/components/ui/Container";

type SectionShellProps = {
  id: string;
  index: string;
  title: string;
  width?: ContentWidth;
  headingClassName?: string;
  children?: ReactNode;
};

export function SectionShell({
  id,
  index,
  title,
  width = "content",
  headingClassName,
  children,
}: SectionShellProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      data-section
      data-scene
      aria-labelledby={headingId}
      className="relative flex min-h-svh scroll-mt-16 flex-col justify-center border-b border-border"
    >
      <Container width={width} className="py-20 sm:py-24 lg:py-28">
        <p
          aria-hidden="true"
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em]"
        >
          <span className="text-accent">{index}</span>
          <span className="text-border-strong">/</span>
          <span className="text-fg-secondary">{id}</span>
          <span className="ml-1 h-px flex-1 bg-border" />
        </p>

        <h2
          id={headingId}
          className={["mt-6 text-2xl font-semibold tracking-tight text-fg sm:text-3xl", headingClassName]
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
