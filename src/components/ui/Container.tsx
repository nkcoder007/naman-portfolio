import type { ReactNode } from "react";

const widths = {
  full: "max-w-none",
  wide: "max-w-[88rem]",
  content: "max-w-3xl",
} as const;

export type ContentWidth = keyof typeof widths;

type ContainerProps = {
  width?: ContentWidth;
  className?: string;
  /** Mark this block as a section's scene content, for the scroll-driven settle. */
  scene?: boolean;
  children: ReactNode;
};

export function Container({ width = "wide", className, scene = false, children }: ContainerProps) {
  return (
    <div
      data-scene-content={scene ? "" : undefined}
      className={["mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
