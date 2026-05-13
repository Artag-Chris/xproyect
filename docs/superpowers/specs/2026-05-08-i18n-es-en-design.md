# i18n: English / Spanish Internationalization

## Overview
Add full bilingual support (English + Spanish) to the Lumen X Labs portfolio site. Automatic browser language detection via `Accept-Language` header, with a manual toggle in the navbar.

## Approach
Custom JSON dictionaries + React Context (no third-party i18n library). Follows the Next.js 16 recommended pattern from `docs/01-app/02-guides/internationalization.md`.

## Architecture

### Routing
- `proxy.js` at root — Next.js 16 file convention for middleware-like logic
  - Reads `Accept-Language` header
  - Matches against supported locales (`['en', 'es']`)
  - Redirects `/` → `/en` or `/es`
- `app/[lang]/` — dynamic route segment captures locale
  - `[lang]/layout.tsx` — locale-aware layout
  - `[lang]/page.tsx` — main page (moved from `app/page.tsx`)

### Dictionary Loading
- Server-side: `dictionaries/en.json` and `dictionaries/es.json`
- `src/lib/get-dictionary.ts` — lazy dynamic import (`import('./dictionaries/en.json')`)
- Loaded in `[lang]/layout.tsx`, passed to `LocaleProvider`

### Locale Context
- `src/lib/locale-context.tsx`
  - `LocaleProvider` — wraps children with locale + dictionary
  - `useLocale()` hook — returns `{ locale, setLocale, t }`
  - `t(key)` — dot-notation lookup (e.g. `t('nav.home')`)

### Language Toggle
- Globe icon in `Header.tsx` next to the theme toggle
- On click: navigates to `/es/...` or `/en/...` (simple `router.push`)
- Active locale detected from URL `[lang]` param

## File Changes

### New files
- `proxy.js` — locale detection and redirect
- `dictionaries/en.json` — all English strings
- `dictionaries/es.json` — all Spanish strings
- `src/lib/get-dictionary.ts` — dictionary loader
- `src/lib/locale-context.tsx` — context provider + hook

### Modified files
- `src/app/layout.tsx` → remove Header, ThemeProvider, SmoothScroll (move to `[lang]/layout.tsx`), keep only StyledComponentsRegistry + html wrapper
- `src/app/page.tsx` → move to `src/app/[lang]/page.tsx`
- `src/app/[lang]/layout.tsx` (new) → Server component loading dict, wraps with LocaleProvider + existing providers + Header
- `src/components/common/Header.tsx` → add globe toggle, use `useLocale()` for nav text
- `src/components/sections/Hero.tsx` → use `t('hero.*')`
- `src/components/sections/PainSection.tsx` → use `t('pain.*')`
- `src/components/sections/MethodSection.tsx` → use `t('method.*')`
- `src/components/sections/CapacitiesSection.tsx` → use `t('capacities.*')`
- `src/components/sections/ProofSection.tsx` → use `t('proof.*')`
- `src/components/sections/ShowcaseSection.tsx` → use `t('showcase.*')`
- `src/components/sections/CallSection.tsx` → use `t('call.*')`
- `src/components/common/Footer.tsx` → use `t('footer.*')`
- `src/components/common/ClientOnly.tsx` → may need locale context too

## Dictionary Structure
Top-level keys matching section names: `nav`, `hero`, `pain`, `method`, `capacities`, `proof`, `showcase`, `call`, `footer`, `meta`.

```json
{
  "nav": { "home": "Home", "about": "About", "projects": "Projects", "contact": "Contact" },
  "meta": { "title": "Lumen X Labs - Digital Solutions", "description": "..." },
  "hero": { "title": "...", "description": "...", "cta_primary": "...", "cta_secondary": "..." },
  "pain": { "heading": "...", "items": [...] },
  "method": { "heading": "...", "steps": [...] },
  "capacities": { "heading": "...", "items": [...] },
  "proof": { "heading": "...", "stats": [...] },
  "showcase": { "heading": "...", "projects": [...] },
  "call": { "heading": "...", "subtitle": "...", "form": {...} },
  "footer": { "tagline": "...", "links": [...] }
}
```

## Component Changes
Each section component receives translations via `useLocale()`. Pattern:

```tsx
import { useLocale } from '@/lib/locale-context';

export default function Hero() {
  const { t } = useLocale();
  return <h1>{t('hero.title')}</h1>;
}
```

## Navbar Toggle
- Globe SVG icon next to the theme toggle button
- Uses `usePathname()` to get current path, swaps locale prefix
- `router.push(pathWithNewLocale)` — full page navigation (no state sync needed)

## Error Handling
- `proxy.js`: if locale unsupported, fall back to `en`
- `get-dictionary`: if dictionary file fails to load, throw/return 404 via `notFound()`
- `t(key)`: if key missing, return key name as fallback (visible debug signal)

## Out of Scope (for now)
- Date/number formatting per locale
- RTL language support
- Translation file extraction tooling
- Static generation with `generateStaticParams`
