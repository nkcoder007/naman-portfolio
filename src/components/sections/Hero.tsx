import { Container } from "@/components/ui/Container";
import { hero, profile } from "@/data/profile";

type Tone = "keyword" | "type" | "property" | "string" | "comment";

type Token = { text: string; tone?: Tone };

const tokenTones: Record<Tone, string> = {
  keyword: "text-syntax-purple",
  type: "text-syntax-teal",
  property: "text-syntax-blue",
  string: "text-syntax-orange",
  comment: "text-fg-muted",
};

const t = (text: string, tone?: Tone): Token => ({ text, tone });
const str = (text: string): Token => ({ text: `"${text}"`, tone: "string" });

const profileCode: Token[][] = [
  [t("type", "keyword"), t(" "), t("Profile", "type"), t(" = {")],
  [t("  "), t("role", "property"), t(": "), t("string", "type"), t(";")],
  [t("  "), t("focus", "property"), t(": "), t("string[]", "type"), t(";")],
  [t("  "), t("tools", "property"), t(": "), t("string[]", "type"), t(";")],
  [t("  "), t("exploring", "property"), t(": "), t("string[]", "type"), t(";")],
  [t("};")],
  [],
  [t("const", "keyword"), t(" "), t("naman"), t(": "), t("Profile", "type"), t(" = {")],
  [t("  "), t("role", "property"), t(": "), str("student developer"), t(",")],
  [
    t("  "),
    t("focus", "property"),
    t(": ["),
    str("software"),
    t(", "),
    str("apps"),
    t(", "),
    str("games"),
    t("],"),
  ],
  [
    t("  "),
    t("tools", "property"),
    t(": ["),
    str("Python"),
    t(", "),
    str("C#"),
    t(", "),
    str("Unity"),
    t("],"),
  ],
  [
    t("  "),
    t("exploring", "property"),
    t(": ["),
    str("AI/ML"),
    t(", "),
    str("Qiskit"),
    t("],"),
  ],
  [t("};")],
  [],
  [t("// still learning, still building", "comment")],
];

export function Hero() {
  return (
    <section
      id="hero"
      data-section
      data-scene
      data-surface="grid"
      data-reveal-immediate
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh scroll-mt-16 flex-col justify-center border-b border-border"
    >
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-8 xl:gap-14">
          <div>
            <h1
              id="hero-heading"
              data-reveal-item
              data-reveal-step="0"
              className="font-mono text-[2.25rem] leading-[1.04] font-semibold tracking-tight text-balance text-fg sm:text-6xl xl:text-7xl"
            >
              Hey, I&apos;m Naman!
            </h1>

            <p
              data-reveal-item
              data-reveal-step="1"
              className="mt-6 flex flex-col gap-y-1 font-mono text-[12.5px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-[13px]">
              <span className="text-fg-secondary">{profile.school}</span>
              <span aria-hidden="true" className="hidden text-border-strong sm:inline">
                ·
              </span>
              <span className="text-fg-muted">class of {profile.graduationYear} (expected)</span>
            </p>

            <p
              data-reveal-item
              data-reveal-step="1"
              className="mt-7 max-w-xl text-lg leading-8 text-fg-secondary sm:mt-8 sm:text-xl sm:leading-9"
            >
              {hero.intro}
            </p>
          </div>

          <EditorPanel />
        </div>
      </Container>
    </section>
  );
}

function EditorPanel() {
  return (
    <aside
      aria-label="Profile as a TypeScript snippet"
      data-reveal-item
      data-reveal-step="2"
      className="w-full border border-border bg-surface"
    >
      <div className="flex items-end border-b border-border bg-bg-subtle pt-2 pl-2">
        <span className="relative -mb-px flex items-center gap-2 border border-b-0 border-border bg-surface px-3.5 py-2 font-mono text-xs text-fg after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-accent">
          <span aria-hidden="true" className="size-1.5 shrink-0 bg-syntax-blue" />
          profile.ts
          <span aria-hidden="true" className="ml-0.5 text-fg-muted">
            ×
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border px-3.5 py-1.5 font-mono text-[11px] text-fg-muted">
        <span className="truncate">src / data / profile.ts</span>
        <span aria-hidden="true" className="shrink-0 tracking-[0.14em] uppercase">
          ts
        </span>
      </div>

      <div className="overflow-x-auto py-4">
        <ol className="min-w-max font-mono text-[11px] leading-5 sm:text-[12px] sm:leading-[1.8] xl:text-[13px]">
          {profileCode.map((tokens, lineNumber) => (
            <li
              key={lineNumber}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 px-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-3 sm:px-4"
            >
              <span
                aria-hidden="true"
                className="text-right text-fg-muted tabular-nums select-none"
              >
                {lineNumber + 1}
              </span>
              <span className="whitespace-pre">
                {tokens.length > 0
                  ? tokens.map((token, index) => (
                      <span
                        key={index}
                        className={token.tone ? tokenTones[token.tone] : undefined}
                      >
                        {token.text}
                      </span>
                    ))
                  : "\u00A0"}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-3 border-t border-border bg-bg-subtle px-3.5 py-1.5 font-mono text-[11px] text-fg-muted"
      >
        <span>main</span>
        <span className="flex items-center gap-3">
          <span>Ln 15, Col 1</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span>TypeScript</span>
        </span>
      </div>
    </aside>
  );
}
