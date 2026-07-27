<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Developer Commands

- `npm run dev`: Start development server (default port 3001)
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint for code quality checks

## Architecture & Conventions

- **Framework**: Next.js 16 with App Router.
- **Styling**: Hybrid approach using Tailwind CSS 4.0 and Styled Components.
- **Animations**: GSAP for complex sequences, Framer Motion for transitions, and Lottie for vector animations.
- **Component Structure**:
  - `app/`: Routing, layouts, and global styles.
  - `src/components/common/`: Shared UI elements (Header, Footer).
  - `src/components/sections/`: Major page sections (Hero).
  - `src/components/video/`: Video and animation components.
  - `src/components/metrics/`: Data and metric display components.
- **Registry**: Styled Components are managed via `src/lib/registry.tsx`.

## Style Guide

- **Theme**: Light-themed with Electric Blue (`#007bff`) accents.
- **Theming**: Use CSS variables defined in `app/globals.css` for consistent colors.
- **Type Safety**: Strict TypeScript usage across the project.
- **Animations**: Prefer `framer-motion` for simple enters/exits and `gsap` for timeline-based animations.

## Skills (Premium Stack)

- `emil-design-eng` — Emil Kowalski's premium design engineering patterns (164.9K installs)
- `high-end-visual-design` — High-end visual design system (227.6K installs)
- `design-taste-frontend` — Design taste for frontend interfaces (294.8K installs)
- `ui-ux-pro-max` — Professional UI/UX (287K installs) — High Risk flag on Gen scanner
- `scroll-stop-builder` — Scroll-driven premium landing pages with video
- `frontend-design` — Core frontend design (709K installs)
- `vercel-react-best-practices` — React/Next.js perf from Vercel (582.5K installs)

## Verification

- Run `npm run lint` before finalizing changes.
- Ensure all new components follow the existing category-based folder structure in `src/components/`.
