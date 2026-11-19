# Naman — Portfolio

Personal portfolio site built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. If port 3000 is already occupied, Next.js automatically selects the next
available port (for example http://localhost:3001) and prints the chosen URL in the terminal.

## Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the development server     |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | Run ESLint                       |
| `npm run typecheck` | Run the TypeScript compiler      |

## Structure

```
src/
  app/          layout, page and global styles (App Router)
  components/   navigation, sections, ui, animations
  data/         content and content types
  lib/          shared helpers
public/
  images/       profile, projects, backgrounds
  documents/    résumé, PDFs and other downloads
```

`@/*` maps to `src/*`.

## Scope

This project is intentionally minimal: no database, auth, CMS, API routes or analytics. Extra
dependencies are added only when a phase needs them.
