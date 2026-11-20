"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { PersonalityEntry } from "@/data/personality";

type PersonalityDialogProps = {
  entry: PersonalityEntry;
  /** The frame that opened the overlay; focus returns here when it closes. */
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * One interest, opened from the conveyor. Compact and centred on the viewport
 * rather than growing out of the frame that was clicked, so both rows stay
 * recognisable behind the backdrop.
 */
export function PersonalityDialog({ entry, returnFocusTo, onClose }: PersonalityDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    setClosing(true);
  }, []);

  // Let the closing fade finish before the overlay unmounts.
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, 170);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    const body = document.body;
    const html = document.documentElement;

    // Lock the page without shifting it: hide the scrollbar and pad it out.
    // Root and body are both locked so the viewport cannot scroll anywhere.
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const basePadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${basePadding + scrollbarWidth}px`;
    }

    // Keep the page behind the overlay out of the tab order and the a11y tree.
    const host = panel?.closest("[data-personality-dialog]");
    const inerted: Element[] = [];
    for (const child of Array.from(body.children)) {
      if (host && (child === host || child.contains(host))) continue;
      child.setAttribute("inert", "");
      inerted.push(child);
    }

    panel?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const focused = document.activeElement;

      if (event.shiftKey && (focused === first || focused === panel || !panel.contains(focused))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && focused === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      for (const element of inerted) element.removeAttribute("inert");
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      html.style.overflow = previous.htmlOverflow;
      if (returnFocusTo && document.contains(returnFocusTo)) {
        returnFocusTo.focus({ preventScroll: true });
      }
    };
  }, [requestClose, returnFocusTo]);

  if (typeof document === "undefined") return null;

  const titleId = `personality-${entry.id}-title`;

  return createPortal(
    <div
      data-personality-dialog=""
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      onClick={(event) => {
        // Only the backdrop closes; clicks inside the panel stay inside.
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 bg-[#05080b]/68",
          "animate-[detail-fade-in_180ms_ease-out]",
          closing ? "opacity-0 transition-opacity duration-150" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={[
          "relative flex max-h-[calc(100svh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[480px] flex-col overflow-hidden",
          "border border-border-strong bg-bg shadow-[0_32px_90px_-40px_rgb(0_0_0/0.9)] outline-none",
          "animate-[project-dialog-in_180ms_cubic-bezier(0.16,1,0.3,1)]",
          "sm:max-h-[calc(100svh-3rem)]",
          closing ? "opacity-0 transition-opacity duration-150" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
          <p className="flex min-w-0 items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] text-fg-secondary uppercase">
            <span aria-hidden="true" className="size-1 shrink-0 bg-accent" />
            <span className="truncate">{entry.interest}</span>
          </p>

          <button
            type="button"
            onClick={requestClose}
            aria-label={`Close ${entry.title}`}
            className="group flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 border border-border px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-fg-secondary uppercase transition-colors duration-150 hover:border-border-strong hover:bg-hover hover:text-fg sm:min-h-9 sm:min-w-9"
          >
            <span aria-hidden="true" className="text-sm leading-none">
              &times;
            </span>
            <span className="hidden sm:inline">close</span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="relative aspect-[4/3] w-full bg-bg-subtle">
            <Image
              src={entry.src}
              alt={entry.alt ?? ""}
              fill
              sizes="(min-width: 480px) 480px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="px-4 py-5 sm:px-5">
            <h3
              id={titleId}
              className="text-lg font-semibold tracking-tight text-fg text-pretty sm:text-xl"
            >
              {entry.title}
            </h3>

            <p className="mt-2.5 text-[15px] leading-7 text-fg-secondary">{entry.caption}</p>

            {entry.placeholder ? (
              <p className="mt-3 font-mono text-[10.5px] leading-5 tracking-[0.14em] text-fg-muted uppercase">
                placeholder caption
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
