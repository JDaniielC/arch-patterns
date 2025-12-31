# Arch Patterns

This repository showcases common distributed-system patterns. Each route focuses on a different architecture topic (fanout, choreography, microservices, etc.) with interactive diagrams, animated flows, and supporting narrative content.

## Getting Started
1. Install Node 18+ and npm.
2. Install dependencies with `npm install` (a `package-lock.json` is committed).
3. Start the dev server via `npm run dev` and open http://localhost:3000.

If you use another package manager, keep it synced with the lockfile or regenerate the lockfile before committing.

## Project Layout
- `app/` – App Router pages per topic plus global styles/layout.
- `components/` – Reusable UI primitives, layout scaffolds, and diagram helpers.
- `lib/content.ts` – Centralized topic metadata and copy.
- `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json` – Build- and styling-related configuration.

Keep new assets under `public/` (add the folder if needed) and colocate feature-specific helpers within their topic folder before generalizing them into `components/`.

## Tech Stack
- Next.js 14 App Router
- React 18 + TypeScript
- Tailwind CSS + PostCSS
- Framer Motion for animations
- Prism React Renderer for code samples

## Contributing
Follow Conventional Commits (e.g., `feat: add hybrid choreography topic`). Run `npm run lint` and `npx tsc --noEmit` before opening a pull request, and include screenshots or GIFs when altering diagrams or layout so reviewers can compare behavior quickly.
