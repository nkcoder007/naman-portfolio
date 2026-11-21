import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

/**
 * The document footer: a separate, deliberately quiet element after <main>,
 * never part of the contact scene. `#top` is the same fragment the header
 * wordmark already uses.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container width="wide" className="py-8 sm:py-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="text-[13.5px] font-medium tracking-tight text-fg">{site.name}</p>
            <p className="mt-1.5 font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
              &copy; {year} &middot; portfolio
            </p>
          </div>

          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 self-start font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase transition-colors duration-150 hover:text-accent focus-visible:outline-offset-4 sm:min-h-0 sm:self-auto"
          >
            back to top
            <span
              aria-hidden="true"
              className="text-[13px] leading-none transition-transform duration-150 group-hover:-translate-y-0.5"
            >
              &uarr;
            </span>
          </a>
        </div>

        {/* Artwork attribution: kept to the quietest type step so it sits under
            the footer content rather than competing with it. */}
        <p className="mt-6 max-w-[54rem] font-mono text-[10.5px] leading-[1.7] text-fg-muted">
          One Piece and its associated artwork belong to their respective rights holders. This is
          an unofficial fan-made use and is not affiliated with or endorsed by the rights
          holders.
        </p>
      </Container>
    </footer>
  );
}
