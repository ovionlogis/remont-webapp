# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev
```
Server runs on `http://0.0.0.0:3000` (accessible from network)

**Build & production:**
```bash
npm run build
npm start
```

**Type checking:**
```bash
npm run typecheck
```

**Linting:**
```bash
npm run lint
npm run lint:fix
```

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `./src/*` — always use absolute imports
- Target: ES2017
- Module resolution: bundler (Next.js)

## Git Workflow

- Default branch: `main`
- Lowercase commit messages, no emoji

## Code Architecture

**Directory structure:**
- `src/app/*/page.tsx` — Thin route files; no logic, import from `src/views/`
- `src/views/` — Page-level components with data wiring
- `src/components/` — Presentational UI components
- `src/config/` — Centralized environment variables
- `src/content/` — Static options, route constants

**Component file structure:**
```
FeatureName/
├── FeatureName.tsx
├── FeatureName.stories.ts  # (optional)
└── index.tsx               # Re-export
```

**Creating a new page:**
1. Add route in `src/app/new-page/page.tsx`
2. Create view in `src/views/NewPage/NewPage.tsx`
3. Export from `src/views/NewPage/index.tsx`
4. Import view in page.tsx and export as default

## ESLint Configuration

Uses `eslint-config-airbnb-extended` with flat config format (ESLint 9).

**Key style rules:**
- Single quotes
- 2-space indentation
- No semicolons
- No comma dangle
- Arrow functions for React components
- JSX prop sorting enabled

Run typecheck and lint after every change:
```bash
npm run typecheck
npm run lint
```

## Sass

Shared stylesheets live in `src/styles/`:
- `globals.css` — global styles, imported in root layout
- `mixins.scss` — media query mixins (`mediaXs`, `mediaSm`, `mediaMd`, `mediaLg`, `mediaXl`, `mediaXXl`, etc.) and utility mixins
- `variables.scss` — CSS/Sass variables (if present)

Global variables and mixins are auto-imported in every `.scss` file via `sassOptions.additionalData` in `next.config.ts` — no explicit `@use` needed.
