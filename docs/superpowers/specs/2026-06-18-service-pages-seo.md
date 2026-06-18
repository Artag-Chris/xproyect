# Service Pages for SEO — Design Spec

## Goal
Create 5 bilingual service pages (EN/ES) targeting local SEO keywords for Pereira, Risaralda. Each page is a lightweight landing page focused on traffic generation, not hard sales.

## Routes
`/[lang]/services/[slug]` — dynamic route with `generateStaticParams`.

10 static pages at build time:
| Tema | EN slug | ES slug |
|------|---------|---------|
| Automatización de procesos | process-automation | automatizacion-procesos |
| IA para empresas | ai-for-business | ia-empresas |
| Desarrollo web | web-development | desarrollo-web |
| Transformación digital | digital-transformation | transformacion-digital |
| IA en negocios Colombia | ai-colombia-business | ia-negocios-colombia |

## Data Model (in `dictionaries/{en,es}.json`)

Each service lives under `services.{slug}`:
```json
{
  "meta": { "title": "...", "description": "..." },
  "hero": { "title": "...", "desc": "...", "cta": "..." },
  "features": [
    { "title": "...", "desc": "..." }
  ],
  "why_us": [
    { "title": "...", "desc": "..." }
  ],
  "faq": [
    { "question": "...", "answer": "..." }
  ],
  "cta": { "title": "...", "button": "..." }
}
```

The `tRaw()` function (already implemented) will be used to access these array/object values.

## Components

### `src/app/[lang]/services/[slug]/page.tsx`
- `generateStaticParams()` returns `[{lang:'en', slug:'process-automation'}, ...]`
- `generateMetadata()` reads `services.{slug}.meta` from dictionary, sets title, description, og, canonical, hreflang
- Renders `<ServicePage slug={slug} />`

### `src/components/services/ServicePage.tsx` (client component)
- Composes sections: ServiceHero → ServiceFeatures → ServiceWhyUs → ServiceFAQ → ServiceCTA

### `src/components/services/ServiceHero.tsx`
- Styled with existing design system tokens (Syne 800 heading, Jakarta body, blue CTA)
- Reuses `useTrack()` for CTA clicks

### `src/components/services/ServiceFeatures.tsx`
- Grid of 3-4 feature cards with title + description (no icons — keep it fast)
- Matches existing card patterns (border-radius 16px, padding 40px)

### `src/components/services/ServiceWhyUs.tsx`
- 3 reasons styled similarly to ProofSection cards (blue accent top border)

### `src/components/services/ServiceFAQ.tsx`
- Accordion FAQ identical to existing FAQSection, with FAQPage schema inline

### `src/components/services/ServiceCTA.tsx`
- Simple section with heading, text, and primary button linking to `#contact`

## Dictionary Content Per Service (5 EN + 5 ES)

Each service gets tailored copy including:
- Location keywords: "Pereira", "Risaralda", "Colombia"
- FAQ questions addressing local business concerns
- Why-us points emphasizing direct founder access, local presence, risk-free guarantee

## No New Dependencies
- Uses existing `t()` / `tRaw()` from locale-context
- Uses existing `useTrack()` for analytics
- Uses same styled-components, framer-motion, Lenis as rest of app

## Navbar Changes
- Navbar gets a "Servicios" / "Services" dropdown in the middle of the link list
- Submenu shows the 5 service page titles linking to each `/[lang]/services/[slug]`
- Dropdown opens on hover (desktop), tap (mobile)
- Uses existing dictionary keys `nav.services` and `services.*.title`
- Each sub-item also fires `nav_link_clicked` analytics event

## Footer Changes
- New column "Servicios" / "Services" with links to all 5 service pages
- Links match existing footer link style

## Internal Links from Sections
- `CapacitiesSection`: Each capacity card links to its corresponding service page
- `ShowcaseSection`: Case study cards link to relevant service pages

## Sitemap Update
- `src/app/sitemap.ts` updated to include all 10 service page URLs

## Implementation Order
1. Add service data to dictionaries (both EN/ES)
2. Create service components (ServiceHero, ServiceFeatures, ServiceWhyUs, ServiceFAQ, ServiceCTA, ServicePage)
3. Create `[slug]/page.tsx` with generateStaticParams + generateMetadata
4. Wire up `tRaw()` access in ServicePage
5. Update sitemap.ts
6. Build + verify

## Lo que NO cambia
- Header, Footer, FloatingContactHub, analytics, Lenis, theme — untouched
