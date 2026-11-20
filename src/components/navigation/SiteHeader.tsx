"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { contactNavigation, primaryNavigation, sections, site } from "@/data/site";

const mobileNavigation = [...primaryNavigation, contactNavigation];

export function SiteHeader() {
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-section]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      <div className="mx-auto flex h-14 w-full max-w-[88rem] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
        >
          <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden h-full flex-1 justify-center lg:flex">
          <ul className="flex h-full items-stretch">
            {primaryNavigation.map((item, position) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id} className="flex">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative flex items-center gap-2 px-3.5 font-mono text-[12px] tracking-wide transition-colors",
                      isActive
                        ? "bg-surface text-fg after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-accent"
                        : "text-fg-muted hover:bg-surface hover:text-fg",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={isActive ? "text-[10px] text-accent" : "text-[10px] text-fg-muted"}
                    >
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`#${contactNavigation.id}`}
            className="border border-border px-3 py-1.5 font-mono text-[12px] text-fg-secondary transition-colors hover:border-accent hover:text-accent"
          >
            {contactNavigation.label}
          </a>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex size-11 items-center justify-center border border-border text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-border bg-surface lg:hidden"
      >
        <nav aria-label="Sections" className="mx-auto w-full max-w-[88rem] px-5 py-2 sm:px-8">
          <ul className="divide-y divide-border">
            {mobileNavigation.map((item) => {
              const index = sections.find((section) => section.id === item.id)?.index;
              const isActive = activeId === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "flex min-h-12 items-center justify-between gap-4 py-3 text-sm transition-colors",
                      isActive ? "text-accent" : "text-fg-secondary hover:text-fg",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="font-mono text-[11px] text-fg-muted">
                      {index}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="size-4"
    >
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="size-4"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
