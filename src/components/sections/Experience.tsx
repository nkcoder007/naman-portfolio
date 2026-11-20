import { SectionShell } from "@/components/sections/SectionShell";
import { experience, type ExperienceTone } from "@/data/experience";

const toneText: Record<ExperienceTone, string> = {
  research: "text-syntax-purple",
  certification: "text-syntax-blue",
  teaching: "text-syntax-teal",
};

const toneNode: Record<ExperienceTone, string> = {
  research: "bg-syntax-purple",
  certification: "bg-syntax-blue",
  teaching: "bg-syntax-teal",
};

// Shared meta/content columns so the intro, entries and footnote sit on one track.
const columns =
  "md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-16";

// 11rem meta + 4rem gap + 46rem text column at lg, so the whole composition is
// centered as one block while the section identifier and title stay on the rail.
const compositionWidth = "mx-auto w-full max-w-[61rem]";

export function Experience() {
  return (
    <SectionShell
      id="experience"
      index="02"
      title="Experience"
      width="wide"
      headingClassName={compositionWidth}
    >
      <div className={`mt-2 ${compositionWidth}`}>
        <div className={`grid gap-y-3 ${columns}`}>
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:pt-1.5">
            {experience.entries.length} entries
          </p>
          <p className="max-w-[46rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
            {experience.intro}
          </p>
        </div>

        <ol className="mt-9 border-t border-border sm:mt-11">
          {experience.entries.map((entry, index) => (
            <li key={entry.id} className="border-b border-border">
              <article className={`grid ${columns}`}>
                <div className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-7 pb-3 md:block md:border-l md:border-border md:py-9 md:pl-6">
                  <span
                    aria-hidden="true"
                    className={`absolute hidden md:block ${toneNode[entry.tone]} ${
                      entry.featured ? "size-2 -top-1 -left-1" : "size-1.5 -top-[3px] -left-[3px]"
                    }`}
                  />

                  <p className="font-mono text-xs text-fg-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p
                    className={`font-mono text-[11px] tracking-[0.18em] uppercase ${toneText[entry.tone]} md:mt-2.5`}
                  >
                    {entry.category}
                  </p>

                  {entry.period ? (
                    <p className="font-mono text-xs text-fg-secondary md:mt-2">{entry.period}</p>
                  ) : null}
                </div>

                <div className="pb-9 md:py-9">
                  <h3
                    className={`font-semibold tracking-tight text-fg ${
                      entry.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    }`}
                  >
                    {entry.title}
                  </h3>

                  {entry.organization ? (
                    <p className="mt-1.5 font-mono text-xs text-fg-muted">{entry.organization}</p>
                  ) : null}

                  <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
                    {entry.summary}
                  </p>

                  {entry.skills?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {entry.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-2 font-mono text-[12.5px] text-fg-secondary sm:text-[13px]"
                        >
                          <span aria-hidden="true" className="size-1 bg-border-strong" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {entry.outcome ? (
                    <div className="mt-5 max-w-[42rem] border-l-2 border-accent pl-4 sm:pl-5">
                      <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                        {entry.outcome.label}
                      </p>
                      <p className="mt-2 text-[14.5px] leading-7 text-fg-secondary">
                        {entry.outcome.text}
                      </p>
                      {entry.outcome.pendingDetails ? (
                        <p className="mt-2 font-mono text-[11px] leading-5 text-fg-muted">
                          {entry.outcome.pendingDetails}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ol>

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
