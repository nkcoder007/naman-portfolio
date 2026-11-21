"use client";

import { useEffect } from "react";

/** The grid drifts by this share of the scroll distance. */
const GRID_FACTOR = 0.12;

/** Content parallax is capped, so nothing can drift far from its layout position. */
const MAX_OFFSET = 32;

/**
 * How much of a scene's own entry is used to settle it, as a share of the
 * shorter of its height and the viewport. Only the grid-backed scenes carry a
 * scene settle: the solid ones already get their fade and rise from the
 * entrance reveal, and a second opacity curve there would dim them twice.
 */
const SCENE_RANGE = 0.52;

/**
 * Scroll-driven depth: the persistent grid lags the page slightly, a few marked
 * elements drift a touch slower than it, and each grid-backed scene settles as
 * it enters. Opacity is never touched here — the entrance reveal owns it.
 *
 * One passive scroll listener and one animation frame for the whole page, all
 * writes done straight to style — no React state, no DOM queries during
 * scrolling. The mascot is deliberately not part of this: it runs its own
 * cursor loop (components/mascot/Mascot.tsx).
 */
export function ScrollParallax() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const backdrop = document.querySelector<HTMLElement>(".page-backdrop");

    // The pattern repeats every tile, so the shift can be wrapped to one.
    const gridTile = backdrop ? Number.parseFloat(getComputedStyle(backdrop).backgroundSize) : 0;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map(
      (element) => ({
        element,
        factor: Number.parseFloat(element.dataset.parallax ?? "") || 0,
      }),
    );

    // Scene settle: the content block of each grid-backed section. Progress is
    // derived from where the block sits, so it is continuous in both scroll
    // directions and settles once the section has arrived.
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-content]"));

    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      const height = window.innerHeight;

      // Every read happens before any write, so a frame never interleaves the
      // two and force a layout mid-update.
      const measured = scenes.map((element) => ({ element, rect: element.getBoundingClientRect() }));

      if (backdrop && gridTile > 0) {
        backdrop.style.backgroundPosition = `0 ${(y * GRID_FACTOR) % gridTile}px`;
      }

      for (const { element, factor } of targets) {
        const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * factor));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      }

      for (const { element, rect } of measured) {
        const distance = Math.min(rect.height, height) * SCENE_RANGE;
        const progress = distance > 0 ? Math.min(1, Math.max(0, (height - rect.top) / distance)) : 1;

        // Ease-out: most of the settle happens early, so the text reaches a
        // readable weight sooner and gives up the last few pixels gently.
        element.style.setProperty("--scene-progress", (1 - (1 - progress) ** 2).toFixed(4));
      }
    }

    function request() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function clear() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      backdrop?.style.removeProperty("background-position");

      for (const { element } of targets) element.style.removeProperty("transform");
      for (const element of scenes) element.style.removeProperty("--scene-progress");
    }

    function sync() {
      window.removeEventListener("scroll", request);

      // Reduced motion: no drift at all, and nothing left behind from a visit
      // that started with motion on.
      if (reducedMotion.matches) {
        clear();
        return;
      }

      // Paint the current position straight away rather than a frame later, so
      // a restored scroll position is correct on the first painted frame.
      update();
      window.addEventListener("scroll", request, { passive: true });
    }

    sync();
    reducedMotion.addEventListener("change", sync);

    return () => {
      window.removeEventListener("scroll", request);
      reducedMotion.removeEventListener("change", sync);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
