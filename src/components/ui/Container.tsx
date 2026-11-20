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
  children: ReactNode;
};

export function Container({ width = "wide", className, children }: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
