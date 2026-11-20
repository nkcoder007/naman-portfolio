"use client";

import { useEffect, useRef } from "react";

import { MascotArt } from "@/components/mascot/MascotArt";

/** Keep the whole mascot at least this far from the viewport edges. */
const EDGE_INSET = 24;

/**
 * Gap between the cursor and the mascot's top-left corner: the mascot trails
 * diagonally below and to the right, clear of the pointer artwork.
 */
const CURSOR_GAP = 16;

/** Follow easing, as a time constant in milliseconds. Higher trails further. */
const EASE_MS = 300;

/** Sub-pixel remainder at which the mascot is considered settled and the loop stops. */
const SETTLED_PX = 0.4;

/**
 * The persistent mascot: a decorative layer behind the page content, above the
 * grid backdrop (see the layering plan in globals.css).
 *
 * Desktop follows the cursor with easing; touch devices drift on their own with
 * a CSS animation, so no pointer work is done there. Everything is written
 * straight to the element's transform — no React state, no re-renders — and the
 * animation frame only runs while the mascot is still moving.
 */
export function Mascot() {
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    // Kept as a separate binding so the nested helpers below see a non-null node.
    const element = anchor;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // The resting position comes from CSS; motion is a delta from it, so the
    // first paint is already in the right place before this effect runs.
    let base = { left: 0, top: 0, width: 0, height: 0 };
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let frame = 0;
    let lastFrame = 0;

    function paint() {
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
    }

    function measure() {
      element.style.transform = "none";
      const rect = element.getBoundingClientRect();
      base = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      current = { x: 0, y: 0 };
      target = { x: 0, y: 0 };
    }

    /** Keep the mascot fully inside the viewport, expressed as a delta from base. */
    function bounded(x: number, y: number) {
      const minX = EDGE_INSET - base.left;
      const maxX = window.innerWidth - base.width - EDGE_INSET - base.left;
      const minY = EDGE_INSET - base.top;
      const maxY = window.innerHeight - base.height - EDGE_INSET - base.top;

      return {
        x: Math.min(Math.max(x, minX), Math.max(minX, maxX)),
        y: Math.min(Math.max(y, minY), Math.max(minY, maxY)),
      };
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    }

    function tick(now: number) {
      const elapsed = lastFrame ? Math.min(64, now - lastFrame) : 16;
      lastFrame = now;

      const ease = 1 - Math.exp(-elapsed / EASE_MS);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      const settled =
        Math.abs(target.x - current.x) < SETTLED_PX && Math.abs(target.y - current.y) < SETTLED_PX;

      if (settled) {
        current = { x: target.x, y: target.y };
        paint();
        frame = 0;
        lastFrame = 0;
        return;
      }

      paint();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (frame) return;
      lastFrame = 0;
      frame = requestAnimationFrame(tick);
    }

    function followPointer(event: PointerEvent) {
      // Touch coordinates are deliberately ignored: those devices drift instead.
      if (event.pointerType === "touch") return;

      target = bounded(
        event.clientX + CURSOR_GAP - base.left,
        event.clientY + CURSOR_GAP - base.top,
      );
      start();
    }

    function applyMode() {
      stop();
      window.removeEventListener("pointermove", followPointer);

      measure();
      paint();

      // Reduced motion: the mascot stays put at its resting position.
      if (reducedMotion.matches) return;

      // Coarse pointers get the independent CSS drift, so nothing is tracked.
      if (finePointer.matches) {
        window.addEventListener("pointermove", followPointer, { passive: true });
      }
    }

    applyMode();

    window.addEventListener("resize", applyMode);
    finePointer.addEventListener("change", applyMode);
    reducedMotion.addEventListener("change", applyMode);

    return () => {
      stop();
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("resize", applyMode);
      finePointer.removeEventListener("change", applyMode);
      reducedMotion.removeEventListener("change", applyMode);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" aria-hidden="true">
      {/* Resting position. On touch devices the inner wrapper drifts around it. */}
      <div
        ref={anchorRef}
        className="absolute bottom-6 left-6 size-[4.75rem] opacity-90 will-change-transform sm:bottom-4 sm:left-6 sm:size-20 lg:bottom-10 lg:left-10 lg:size-32"
      >
        <div className="mascot-drift size-full">
          <MascotArt />
        </div>
      </div>
    </div>
  );
}
