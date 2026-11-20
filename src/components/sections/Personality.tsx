"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { PersonalityDialog } from "@/components/sections/PersonalityDialog";
import { SectionShell } from "@/components/sections/SectionShell";
import { bottomRowOffset, personality, type PersonalityEntry } from "@/data/personality";

/** One full loop of a sequence, in milliseconds. */
const BASE_DURATION_MS = 68_000;
/** Hovering or focusing a row stretches the loop, slowing it without stopping. */
const SLOW_FACTOR = 4;

// Same meta/content columns as the projects index, so intro and note line up
// with the rest of the page while the rows use the full section width.
const metaColumns =
  "md:grid-cols-[7rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-x-16";

const interestCount = new Set(personality.entries.map((entry) => entry.interest)).size;

// The lower row begins part-way through the collection, so the two strips never
// present the same image side by side.
const bottomRow = [
  ...personality.entries.slice(bottomRowOffset),
  ...personality.entries.slice(0, bottomRowOffset),
];

export function Personality() {
  const [active, setActive] = useState<{
    entry: PersonalityEntry;
    trigger: HTMLElement;
  } | null>(null);

  const openEntry = useCallback((entry: PersonalityEntry, trigger: HTMLElement) => {
    setActive({ entry, trigger });
  }, []);

  const closeEntry = useCallback(() => setActive(null), []);

  return (
    <SectionShell id="personality" title="Personality" width="wide" surface="solid">
      <div className="mt-2">
        <div className={`grid gap-y-3 ${metaColumns}`}>
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:pt-1.5">
            {interestCount} interests
          </p>
          <p className="max-w-[46rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
            {personality.intro}
          </p>
        </div>
      </div>

      <div className="mt-9 space-y-5 sm:mt-11 sm:space-y-7 lg:space-y-8">
        <ConveyorRow
          entries={personality.entries}
          direction="left"
          paused={active !== null}
          listLabel="Personality images, upper row"
          onOpen={openEntry}
        />
        <ConveyorRow
          entries={bottomRow}
          direction="right"
          paused={active !== null}
          listLabel="Personality images, lower row"
          onOpen={openEntry}
        />
      </div>

      <div className={`mt-8 grid ${metaColumns}`}>
        <p className="hidden font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:block">
          note
        </p>
        <p className="max-w-[44rem] font-mono text-[11px] leading-5 text-fg-muted">
          {personality.note}
        </p>
      </div>

      {active ? (
        <PersonalityDialog
          entry={active.entry}
          returnFocusTo={active.trigger}
          onClose={closeEntry}
        />
      ) : null}
    </SectionShell>
  );
}

type ConveyorRowProps = {
  entries: readonly PersonalityEntry[];
  /** `left` travels right-to-left, `right` travels left-to-right. */
  direction: "left" | "right";
  paused: boolean;
  listLabel: string;
  onOpen: (entry: PersonalityEntry, trigger: HTMLElement) => void;
};

function ConveyorRow({ entries, direction, paused, listLabel, onOpen }: ConveyorRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  /** Duration currently written to the track, so only real speed changes rebuild it. */
  const appliedDurationRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  // Hover and keyboard focus are separate reasons to slow down, so losing one
  // never cancels the other.
  const slow = hovered || keyboardFocus;

  // Only keyboard focus slows a row. The focus the overlay hands back to its
  // trigger is not `:focus-visible` when it was opened with a pointer, so a
  // closed overlay no longer leaves its row at the slow speed.
  const syncKeyboardFocus = useCallback(() => {
    const row = rowRef.current;
    const active = document.activeElement;
    setKeyboardFocus(
      Boolean(
        row && active instanceof HTMLElement && row.contains(active) && active.matches(":focus-visible"),
      ),
    );
  }, []);

  useEffect(() => {
    // A tab or window change can swallow the pointerleave that ends a hover, so
    // hover is dropped on the way out and re-established by the first pointer
    // event after returning. Keyboard focus is reconciled rather than dropped:
    // if a frame still has keyboard focus, its row stays slowed.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") syncKeyboardFocus();
      else setHovered(false);
    };
    const onWindowBlur = () => setHovered(false);
    const onWindowFocus = () => syncKeyboardFocus();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, [syncKeyboardFocus]);

  // The speed change is applied by hand: the track is rebuilt with the same
  // progress it already had, so a longer loop never jumps mid-frame. Progress
  // is read from the animation's own timeline, which is the same calculation
  // for the left- and right-moving keyframes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reduced motion is handled entirely by the stylesheet: no animation at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = slow ? BASE_DURATION_MS * SLOW_FACTOR : BASE_DURATION_MS;

    if (appliedDurationRef.current !== duration) {
      const [animation] = track.getAnimations();
      const timing = animation?.effect?.getComputedTiming();
      const total = Number(timing?.duration ?? 0);
      // The negative delay carries the position from the previous speed, so the
      // effective time is the clock minus that delay.
      const elapsed = Number(animation?.currentTime ?? 0) - Number(timing?.delay ?? 0);
      const progress = total > 0 ? (((elapsed % total) + total) % total) / total : 0;

      track.style.animation = "none";
      void track.offsetWidth;
      track.style.animation = `personality-row-${direction} ${duration}ms linear infinite`;
      track.style.animationDelay = `${-progress * duration}ms`;
      appliedDurationRef.current = duration;
    }

    // Pausing only flips the play state, so both rows freeze exactly where they
    // are while the overlay is open and carry on from there when it closes.
    track.style.animationPlayState = paused ? "paused" : "running";
  }, [direction, slow, paused]);

  return (
    <div
      ref={rowRef}
      className="personality-row relative overflow-hidden"
      onPointerEnter={() => setHovered(true)}
      // Re-asserts hover when the pointer is already inside the row, which is
      // the case after returning from another tab.
      onPointerMove={() => {
        if (!hovered) setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      // Touch and gesture end a pointer without a leave event.
      onPointerCancel={() => setHovered(false)}
      // Activating a frame opens the overlay, which covers both rows: the hover
      // that led the pointer here is over as soon as the backdrop appears.
      onClickCapture={() => {
        if (hovered) setHovered(false);
      }}
      onFocusCapture={(event) => {
        const target = event.target;
        setKeyboardFocus(target instanceof HTMLElement && target.matches(":focus-visible"));
      }}
      onBlurCapture={(event) => {
        // Focus moving inside the row is settled by the next focusin.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setKeyboardFocus(false);
        }
      }}
    >
      <div ref={trackRef} className="personality-track flex w-max items-stretch">
        <ImageSequence entries={entries} label={listLabel} onOpen={onOpen} />

        {/* Identical copy of the sequence: the animation shifts the track by
            exactly half its width, so the loop point is pixel-for-pixel invisible. */}
        <ImageSequence entries={entries} onOpen={onOpen} duplicate />
      </div>
    </div>
  );
}

type ImageSequenceProps = {
  entries: readonly PersonalityEntry[];
  label?: string;
  onOpen: (entry: PersonalityEntry, trigger: HTMLElement) => void;
  /** The off-screen copy: still clickable, never in the tab order. */
  duplicate?: boolean;
};

function ImageSequence({ entries, label, onOpen, duplicate = false }: ImageSequenceProps) {
  return (
    <ul
      aria-label={duplicate ? undefined : label}
      aria-hidden={duplicate || undefined}
      className="personality-sequence flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5"
    >
      {entries.map((entry) => (
        <li key={entry.id} className="shrink-0">
          <button
            type="button"
            aria-haspopup="dialog"
            tabIndex={duplicate ? -1 : undefined}
            onClick={(event) => onOpen(entry, event.currentTarget)}
            className="group relative block w-[13rem] shrink-0 overflow-hidden border border-border bg-bg-subtle text-left transition-colors duration-150 hover:border-border-strong focus-visible:outline-offset-[-2px] sm:w-[16rem] lg:w-[19rem] xl:w-[21rem]"
          >
            <span className="relative block aspect-[4/3] w-full overflow-hidden">
              <Image
                src={entry.src}
                alt={entry.alt ?? ""}
                fill
                sizes="(min-width: 1280px) 21rem, (min-width: 1024px) 19rem, (min-width: 640px) 16rem, 13rem"
                className="object-cover"
              />
            </span>

            {/* Second focus cue besides the ring, and the only label on the frame. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-[#070b10]/85 px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-white uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <span className="truncate">{entry.title}</span>
              <span className="shrink-0 text-white/65">open</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
