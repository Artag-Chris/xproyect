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

## Verification

- Run `npm run lint` before finalizing changes.
- Ensure all new components follow the existing category-based folder structure in `src/components/`.
