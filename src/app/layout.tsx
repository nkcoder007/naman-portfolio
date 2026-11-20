import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `Portfolio of ${site.name}, ${site.role.toLowerCase()}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-accent focus:bg-bg focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
        >
          Skip to main content
        </a>

        <SiteHeader />

        {children}

        <footer className="border-t border-border">
          <Container className="flex flex-col gap-1.5 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
              {site.name}
            </p>
            <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
              Next.js · React · TypeScript · Tailwind CSS
            </p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
