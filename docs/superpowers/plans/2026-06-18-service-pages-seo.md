# Service Pages for SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 5 bilingual service pages (EN/ES) with navbar dropdown, footer links, and internal links.

**Architecture:** Dynamic route `/[lang]/services/[slug]` generates 10 static pages. Content via `tRaw()`. Navbar gets services dropdown. Footer gets real service links.

**Tech Stack:** Next.js 16 App Router, styled-components, framer-motion, existing i18n.

---

### Task 1: Add service content to EN dictionary

- [ ] **Insert `services` block into `dictionaries/en.json` before the last `}`**

The block has 5 services: `process-automation`, `ai-for-business`, `web-development`, `digital-transformation`, `ai-colombia-business`. Each has: `meta`, `hero`, `features[]`, `why_us[]`, `faq[]`, `cta`. Full content in spec doc.

- [ ] **Run build to verify**
Run: `npm run build`
Expected: No errors

### Task 2: Add Spanish service content to ES dictionary

- [ ] **Insert `services` block into `dictionaries/es.json`** with same structure, Spanish copy. All FAQ, features, CTAs in Spanish with Pereira/Risaralda/Colombia keywords.

- [ ] **Run build to verify**

### Task 3: Create service components

- [ ] **Create `src/components/services/ServiceHero.tsx`** — Client component. Props: title, desc, cta. Styled h1 + p + CTA button with framer-motion animations. Uses useTrack() for CTA clicks.

- [ ] **Create `src/components/services/ServiceFeatures.tsx`** — Client component. Props: heading, items. 2-column grid of cards styled like CapacitiesSection.

- [ ] **Create `src/components/services/ServiceWhyUs.tsx`** — Client component. Props: heading, items. 3-column grid, cards with blue accent top border (like ProofSection).

- [ ] **Create `src/components/services/ServiceFAQ.tsx`** — Client component. Props: heading, items. Accordion FAQ with FAQPage JSON-LD schema inline.

- [ ] **Create `src/components/services/ServiceCTA.tsx`** — Client component. Props: title, button. Centered section with heading + button linking to /#contact.

- [ ] **Create `src/components/services/ServicePage.tsx`** — Client component. Props: slug. Uses t/tRaw from useLocale(). Reads services.{slug} data. Composes all 5 sections + Footer.

### Task 4: Create dynamic route

- [ ] **Create `src/app/[lang]/services/[slug]/page.tsx`**

generateStaticParams() returns 10 combos (2 locales x 5 slugs).
generateMetadata() reads services.{slug}.meta from dictionary.
Renders ServicePage with slug prop.

### Task 5: Update navbar with services dropdown

- [ ] **Add `nav.capacities` key to both dictionaries** — EN: Capabilities, ES: Capacidades
- [ ] **In Header.tsx**: NavLinks — rename current Services link to Capacities (pointing to #capacities). Add new Services link with dropdown submenu showing 5 service links.
- [ ] **Add dropdown styled components**: DropdownWrapper, DropdownMenu (absolute hidden, shown on hover), DropdownItem (same style as LinkItem).
- [ ] **Mobile menu**: Add the same service links as static list under current nav items.

### Task 6: Update footer services column

- [ ] **Replace hardcoded `footer.service_items` in Footer.tsx** with real links. Add `footer.service_links` to both dictionaries: array of { title, slug } for each service.
- [ ] Remove old `footer.service_items` from dictionaries.

### Task 7: Add internal links

- [ ] **CapacitiesSection.tsx**: Wrap each card in next/link. Mapping: 0→process-automation, 1→ai-for-business, 2→digital-transformation, 3→digital-transformation, 4→web-development, 5→digital-transformation
- [ ] **ShowcaseSection.tsx**: Wrap each card in next/link. Mapping: 0→web-development, 1→process-automation, 2→web-development

### Task 8: Update sitemap

- [ ] **In sitemap.ts**: Add all 10 service URLs with priority 0.8

### Task 9: Build and verify

- [ ] **npm run build** — expect 0 errors
- [ ] **npm run lint** — expect 0 warnings
