"use client";

import { useCallback, useState } from "react";

import { ProjectDialog } from "@/components/sections/ProjectDialog";
import type { Project } from "@/data/projects";

type ProjectGridProps = {
  items: readonly Project[];
};

export function ProjectGrid({ items }: ProjectGridProps) {
  const [active, setActive] = useState<{ project: Project; trigger: HTMLElement } | null>(null);

  const openProject = useCallback((project: Project, trigger: HTMLElement) => {
    setActive({ project, trigger });
  }, []);

  const closeProject = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="mt-9 grid gap-4 sm:mt-11 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.map((project, index) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              position={index + 1}
              onOpen={(trigger) => openProject(project, trigger)}
            />
          </li>
        ))}
      </ul>

      {active ? (
        <ProjectDialog
          project={active.project}
          returnFocusTo={active.trigger}
          onClose={closeProject}
        />
      ) : null}
    </>
  );
}

type ProjectCardProps = {
  project: Project;
  position: number;
  onOpen: (trigger: HTMLElement) => void;
};

function ProjectCard({ project, position, onOpen }: ProjectCardProps) {
  const technologies = project.technologies ?? [];
  const shownTechnologies = technologies.slice(0, 3);
  const hiddenTechnologyCount = technologies.length - shownTechnologies.length;

  // A card with nothing further to show stays a plain, complete card.
  const hasDetails = Boolean(
    project.overview ||
      project.contributions?.length ||
      project.features?.length ||
      project.details ||
      project.role ||
      project.timeframe ||
      project.status ||
      project.repositoryUrl ||
      project.liveUrl,
  );

  const header = (
    <>
      <span className="flex items-center justify-between gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase">
        <span className="flex min-w-0 items-center gap-2 text-fg-muted">
          <span aria-hidden="true" className="size-1 shrink-0 bg-border-strong" />
          <span className="truncate">{project.category}</span>
        </span>
        {project.featured ? (
          <span className="shrink-0 text-accent">featured</span>
        ) : (
          <span className="shrink-0 text-fg-muted tabular-nums">
            {String(position).padStart(2, "0")}
          </span>
        )}
      </span>

      <span className="mt-4 block text-lg font-semibold tracking-tight text-fg">
        {project.title}
      </span>

      <span className="mt-2 block text-[14px] leading-6 text-fg-secondary line-clamp-3">
        {project.summary}
      </span>

      <span className="mt-4 flex min-h-5 flex-wrap gap-x-3 gap-y-1.5 font-mono text-[11px] text-fg-muted">
        {shownTechnologies.map((technology) => (
          <span key={technology} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-1 bg-border-strong" />
            {technology}
          </span>
        ))}
        {hiddenTechnologyCount > 0 ? <span>+{hiddenTechnologyCount}</span> : null}
      </span>
    </>
  );

  return (
    <article className="flex h-full flex-col border border-border bg-surface">
      {project.featured ? <span aria-hidden="true" className="h-0.5 bg-accent" /> : null}

      {hasDetails ? (
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onOpen(event.currentTarget)}
          className="group flex flex-1 flex-col px-5 py-5 text-left"
        >
          {header}

          <span className="-mx-5 mt-auto flex items-center justify-between gap-3 border-t border-border px-5 pt-3 font-mono text-[10.5px] tracking-[0.16em] uppercase">
            <span className="text-fg-muted transition-colors group-hover:text-fg-secondary">
              details
            </span>
            <span
              aria-hidden="true"
              className="flex size-5 shrink-0 items-center justify-center border border-border text-xs leading-none text-fg-secondary transition-colors group-hover:border-border-strong group-hover:text-fg"
            >
              +
            </span>
          </span>
        </button>
      ) : (
        <div className="flex flex-1 flex-col px-5 py-5">{header}</div>
      )}
    </article>
  );
}
