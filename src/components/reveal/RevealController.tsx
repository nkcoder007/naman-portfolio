"use client";

import { useEffect } from "react";

/** One beat of the entrance stagger. */
const STEP_MS = 110;

/**
 * A section starts its entrance once a real part of it is on screen: 15% of it
 * inside the viewport, and never while it is still peeking in from the bottom
 * edge.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -10% 0px",
};

/** Fallback: if the observer never reports at all, show the page instead of hiding it. */
const FAILSAFE_MS = 2500;

/** After this long past its own entrance, an element stops being staged at all. */
const SETTLE_MS = 900;

/**
 * Drives the once-per-visit section entrances. One observer watches the page's
 * sections; when one enters, every staged element inside it is released with
 * its own stagger step.
 *
 * All work is done by writing data attributes and one custom property, so no
 * React state changes and no re-renders happen — the elements themselves are
 * marked with `data-reveal-item` where their entrance belongs.
 */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-item]"));

    // Nothing staged, or motion is off: release the page and stop here.
    if (items.length === 0 || reducedMotion.matches) {
      root.removeAttribute("data-reveal");
      return;
    }

    // Group the staged elements by the section that contains them; one section
    // entry drives the whole group's sequence.
    const groups = new Map<Element, HTMLElement[]>();

    for (const item of items) {
      item.dataset.revealState = "queued";
      const section = item.closest("[data-section]") ?? document.body;
      const group = groups.get(section);
      if (group) group.push(item);
      else groups.set(section, [item]);
    }

    // The queued state now holds everything still, so the pre-paint gate can go.
    root.removeAttribute("data-reveal");

    let sawCallback = false;
    const cleanups = new Set<number>();

    /** Stop staging an element, landing it on its finished state. */
    function settle(item: HTMLElement) {
      // Finishing rather than cancelling means an entrance the browser never
      // got around to painting still resolves to the visible state.
      for (const animation of item.getAnimations()) {
        try {
          animation.finish();
        } catch {
          // Animations without an end (none here) cannot be finished.
        }
      }

      item.removeAttribute("data-reveal-state");
      item.style.removeProperty("--reveal-delay");
    }

    function release(section: Element) {
      const group = groups.get(section);
      if (!group) return;

      groups.delete(section);
      observer.unobserve(section);

      let longestDelay = 0;

      group.forEach((item, index) => {
        const step = item.dataset.revealStep ? Number(item.dataset.revealStep) : index;
        const delay = step * STEP_MS;
        longestDelay = Math.max(longestDelay, delay);
        item.style.setProperty("--reveal-delay", `${delay}ms`);
        item.dataset.revealState = "in";
      });

      // Once the entrance is over, stop staging the elements at all. This runs
      // on a timer rather than on a transition event, so content is never left
      // hidden behind an entrance that could not run.
      const cleanup = window.setTimeout(() => {
        cleanups.delete(cleanup);
        group.forEach(settle);
      }, longestDelay + SETTLE_MS);

      cleanups.add(cleanup);
    }

    const observer = new IntersectionObserver((entries) => {
      sawCallback = true;

      for (const entry of entries) {
        if (entry.isIntersecting) release(entry.target);
      }
    }, OBSERVER_OPTIONS);

    for (const section of groups.keys()) {
      if (!section.hasAttribute("data-reveal-immediate")) observer.observe(section);
    }

    // The hero starts on mount. Reading layout first commits the staged state,
    // so its entrance transitions out of it instead of snapping in.
    void root.offsetHeight;

    for (const section of Array.from(groups.keys())) {
      if (section.hasAttribute("data-reveal-immediate")) release(section);
    }

    const failsafe = window.setTimeout(() => {
      if (sawCallback) return;
      for (const section of Array.from(groups.keys())) release(section);
      observer.disconnect();
    }, FAILSAFE_MS);

    // Turning reduced motion on mid-visit settles everything immediately.
    function handleReducedMotion(event: MediaQueryListEvent) {
      if (!event.matches) return;

      for (const section of Array.from(groups.keys())) {
        const group = groups.get(section);
        groups.delete(section);
        group?.forEach(settle);
      }

      observer.disconnect();
    }

    reducedMotion.addEventListener("change", handleReducedMotion);

    return () => {
      window.clearTimeout(failsafe);
      for (const cleanup of cleanups) window.clearTimeout(cleanup);
      cleanups.clear();
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  return null;
}
