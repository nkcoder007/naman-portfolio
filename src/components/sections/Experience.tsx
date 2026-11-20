"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { SectionShell } from "@/components/sections/SectionShell";
import {
  experience,
  type ExperienceDetails,
  type ExperienceTone,
} from "@/data/experience";

const toneText: Record<ExperienceTone, string> = {
  research: "text-syntax-purple",
  certification: "text-syntax-blue",
  teaching: "text-syntax-teal",
};

// Shared meta/content columns so the intro and footnote sit on one track.
const columns =
  "md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-16";

// 11rem meta + 4rem gap + 46rem text column at lg, so the whole composition is
// centered as one block while the section identifier and title stay on the rail.
const compositionWidth = "mx-auto w-full max-w-[61rem]";

const entries = experience.entries;

const tabIdFor = (id: string) => `experience-tab-${id}`;
const panelIdFor = (id: string) => `experience-panel-${id}`;

export function Experience() {
  const [activeId, setActiveId] = useState<string>(entries[0].id);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(
    0,
    entries.findIndex((entry) => entry.id === activeId),
  );

  function selectAt(index: number) {
    const next = entries[(index + entries.length) % entries.length];
    setActiveId(next.id);
    tabsRef.current[index % entries.length]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        selectAt(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        selectAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectAt(0);
        break;
      case "End":
        event.preventDefault();
        selectAt(entries.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <SectionShell
      id="experience"
      title="Experience"
      width="wide"
      headingClassName={compositionWidth}
      surface="solid"
    >
      <div className={`mt-2 ${compositionWidth}`}>
        <div data-reveal-item data-reveal-step="0" className={`grid gap-y-3 ${columns}`}>
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:pt-1.5">
            {entries.length} entries
          </p>
          <p className="max-w-[46rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
            {experience.intro}
          </p>
        </div>

        <div className="mt-9 border-t border-border sm:mt-11 md:grid md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Experience entries"
            aria-orientation="vertical"
            data-reveal-item
            data-reveal-step="0"
            className="md:border-r md:border-border"
          >
            {entries.map((entry, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={entry.id}
                  ref={(node) => {
                    tabsRef.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabIdFor(entry.id)}
                  aria-selected={selected}
                  aria-controls={panelIdFor(entry.id)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(entry.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={[
                    "group relative flex min-h-11 w-full items-center border-b border-border py-3 pr-4 pl-4 text-left transition-colors duration-150",
                    "md:pr-5",
                    selected
                      ? "bg-surface text-accent"
                      : "text-fg-secondary hover:bg-hover hover:text-accent",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-y-0 left-0 w-0.5 bg-accent transition-opacity duration-150",
                      selected ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />

                  <span className="text-[15px] leading-6 font-medium text-pretty">
                    {entry.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* One shared cell: the panel takes the height of the tallest entry, so
              switching never moves the composition or re-centres the section. */}
          <div data-reveal-item data-reveal-step="1" className="grid">
            {entries.map((entry, index) => {
              const selected = index === activeIndex;

              return (
                <div
                  key={entry.id}
                  id={panelIdFor(entry.id)}
                  role="tabpanel"
                  aria-labelledby={tabIdFor(entry.id)}
                  tabIndex={selected ? 0 : -1}
                  className={[
                    "min-w-0 [grid-area:1/1]",
                    selected
                      ? "visible animate-[detail-fade-in_160ms_ease-out]"
                      : "invisible",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-surface px-5 py-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase sm:px-7 lg:px-8">
                    <span className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className={toneText[entry.tone]}>{entry.category}</span>

                      {entry.organization ? (
                        <>
                          <span aria-hidden="true" className="text-border-strong">
                            /
                          </span>
                          <span className="text-fg-muted">{entry.organization}</span>
                        </>
                      ) : null}

                      {entry.period ? (
                        <>
                          <span aria-hidden="true" className="text-border-strong">
                            /
                          </span>
                          <span className="text-fg-muted">{entry.period}</span>
                        </>
                      ) : null}
                    </span>

                    <span className="text-fg-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(entries.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
                    <h3 className="text-xl font-semibold tracking-tight text-fg text-pretty sm:text-2xl">
                      {entry.title}
                    </h3>

                    <p className="mt-4 max-w-[46rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
                      {entry.summary}
                    </p>

                    {entry.skills?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {entry.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2 font-mono text-[12px] text-fg-secondary"
                          >
                            <span aria-hidden="true" className="size-1 bg-border-strong" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.details ? <EntryDetails details={entry.details} /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`mt-6 grid ${columns}`}>
          <p className="hidden font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:block">
            note
          </p>
          <p className="max-w-[44rem] font-mono text-[11px] leading-5 text-fg-muted">
            {experience.note}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function EntryDetails({ details }: { details: ExperienceDetails }) {
  const hasDetail =
    Boolean(details.responsibilities?.length) ||
    Boolean(details.contributions?.length) ||
    Boolean(details.timeCommitment) ||
    Boolean(details.dates) ||
    Boolean(details.outcomes?.length);

  if (!hasDetail) return null;

  return (
    <div className="mt-6 max-w-[46rem] space-y-6 border-t border-border pt-5">
      {details.responsibilities?.length ? (
        <DetailGroup label="responsibilities">
          <DetailList items={details.responsibilities} />
        </DetailGroup>
      ) : null}

      {details.contributions?.length ? (
        <DetailGroup label="contributions">
          <DetailList items={details.contributions} />
        </DetailGroup>
      ) : null}

      {details.timeCommitment ? (
        <DetailGroup label="time commitment">
          <p className="font-mono text-[12.5px] leading-6 text-fg-secondary">
            {details.timeCommitment}
          </p>
        </DetailGroup>
      ) : null}

      {details.dates ? (
        <DetailGroup label="dates">
          <p className="font-mono text-[12.5px] leading-6 text-fg-secondary">
            {details.dates}
          </p>
        </DetailGroup>
      ) : null}

      {details.outcomes?.length ? (
        <DetailGroup label={details.outcomeLabel ?? "outcomes"}>
          <ul className="space-y-2">
            {details.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2.5 text-[15px] leading-7 text-fg-secondary">
                <span aria-hidden="true" className="mt-3 size-1 shrink-0 bg-accent" />
                {outcome}
              </li>
            ))}
          </ul>
          {details.pendingDetails ? (
            <p className="mt-2 font-mono text-[11px] leading-5 text-fg-muted">
              {details.pendingDetails}
            </p>
          ) : null}
        </DetailGroup>
      ) : null}
    </div>
  );
}

function DetailGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.18em] text-fg-secondary uppercase">
        {label}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-7 text-fg-secondary">
          <span aria-hidden="true" className="mt-3 size-1 shrink-0 bg-border-strong" />
          {item}
        </li>
      ))}
    </ul>
  );
}
