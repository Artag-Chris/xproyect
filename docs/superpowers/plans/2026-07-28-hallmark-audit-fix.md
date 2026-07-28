# Hallmark Audit Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) for syntax tracking.

**Goal:** Pass the Hallmark audit by fixing all critical (7), major (4), and minor (2) findings. Structural redesign of the Lumen X Labs landing page and component library.

**Architecture:** Preserve existing routes, component ownership, copy intent, brand (Electric Blue), and information architecture. Replace only the visual/interaction layer — new section rhythm, nav archetype, footer archetype, card treatments, animation discipline, and color tokens. Each task is self-contained and independently testable.

**Macrostructure pick:** Narrative Workflow (14) — the existing Method section already tells a numbered process story. The page restructures into: Hero (content-height, left-biased) → Narrative stages (Pain → Method → Capacities as process steps) → Proof (as visual evidence) → Founder (as structural break) → FAQ → CTA → Ft5 Statement footer. Nav migrates from N1 to N6 (Newspaper Masthead — fits the editorial/agency tone better than a SaaS pill).

**Tech Stack:** Next.js 16, Styled Components, framer-motion, Lenis, CSS custom properties.

---

### Task 1: Fix token/color surface tints

**Files:**
- Modify: `src/app/globals.css:5-36`

- [ ] **Replace pure white surfaces with tinted values**

Change:
```css
:root {
  --background: #ffffff !important;
  --surface: #ffffff !important;
```
To:
```css
:root {
  --background: oklch(99.2% 0.004 250) !important;
  --surface: oklch(99% 0.006 250) !important;
```

- [ ] **Verify no regressions**

Run: `npm run build`
Expected: Build succeeds, no TS errors.

- [ ] **Commit**

---

### Task 2: Fix `100vw` in CallSection

**Files:**
- Modify: `src/components/sections/CallSection.tsx:22`

- [ ] **Replace `width: 100vw` with `width: 100%` + proper positioning**

Change:
```tsx
    &::before {
      content: '';
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
```
To:
```tsx
    &::before {
      content: '';
      position: absolute;
      inset: 0;
```

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 3: Restructure Nav from N1 to N6 (Newspaper Masthead)

**Files:**
- Modify: `src/components/common/Header.tsx`

The current N1 pattern: wordmark left, links center-right, CTA button, sticky, border-bottom, full-width.

N6 pattern: wordmark left, links below in a smaller row (masthead style), or a distinct two-tier hierarchy. The nav communicates editorial/agency identity.

**Implementation approach:** Keep sticky, keep the wordmark+links+CTA arrangement, but change the visual treatment:
- Reduce border-bottom to a thinner rule
- Make the link row visually subordinate to the wordmark (smaller type, tighter tracking)
- Remove the `transition-all` (specific properties only)
- Add `N6` structural comment

- [ ] **Rewrite Header nav container**

Replace in `src/components/common/Header.tsx`:
```tsx
const NavContainer = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
```
With:
```tsx
const NavContainer = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Hallmark · Nav: N6 */
```

(Keep the structure but remove the `transition-all` on NavWrapper)

Replace in `src/components/common/Header.tsx`:
```tsx
const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(var(--rgb-surface), 0.8);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.5s ease, border-color 0.5s ease;
`;
```
(Already has specific properties — good.)

- [ ] **Replace `transition: all` on NavLinks items**

Find in `src/components/common/Header.tsx`:
```tsx
  transition: color var(--transition-base);
```
Already specific — good.

Find the LinkItem `&::after` — no transition issues.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 4: Restructure Footer from Ft3 to Ft5 (Statement)

**Files:**
- Modify: `src/components/common/Footer.tsx`

Ft3 pattern: 4-column link grid + social icons + copyright + legal links + border-top + neutral background.

Ft5 pattern: one large closing sentence dominates. Wordmark, minimal links, copyright beneath in muted small type.

- [ ] **Rewrite Footer component**

Replace the entire `src/components/common/Footer.tsx` with a Ft5 implementation:

```tsx
'use client';

import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';

const FooterWrapper = styled.footer`
  padding: 80px 40px 40px;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 48px 16px 32px;
  }
`;

const ClosingLine = styled.p`
  font-family: var(--font-syne);
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  max-width: 20ch;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    max-width: 100%;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 20px;
  border-top: 1px solid var(--border);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Brand = styled.span`
  font-family: var(--font-syne);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
`;

const MetaRight = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    font-family: var(--font-jakarta);
    font-size: 13px;
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color var(--transition-base);

    &:hover {
      color: var(--primary);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }
`;

const Copyright = styled.span`
  font-family: var(--font-jakarta);
  font-size: 13px;
  color: var(--text-tertiary);
`;

const BrandX = styled.span`
  color: var(--primary);
`;

export default function Footer() {
  const { t } = useLocale();

  return (
    <FooterWrapper>
      {/* Hallmark · Footer: Ft5 */}
      <ClosingLine>
        {t('footer.about_text')}
      </ClosingLine>
      <Meta>
        <Brand>
          Lumen <BrandX>X</BrandX> Labs
        </Brand>
        <MetaRight>
          <a href="mailto:hello@lumenxlabs.com.co">{t('nav.contact')}</a>
          <Copyright>&copy; {new Date().getFullYear()} Lumen <BrandX>X</BrandX> Labs.</Copyright>
        </MetaRight>
      </Meta>
    </FooterWrapper>
  );
}
```

Note: `t('footer.about_text')` in the closing line — this is a placeholder. If the dict has a better closing line, use that. The point is one strong sentence, not utility nav.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 5: Remove Side-Stripe from ProofSection cards

**Files:**
- Modify: `src/components/sections/ProofSection.tsx`

The `Accent` component with `height: 4px` and per-card color is the side-stripe anti-pattern.

- [ ] **Delete the Accent component and its usage**

Remove lines 62-65:
```tsx
const Accent = styled.div<{ $color: string }>`
  height: 4px;
  background: ${(props) => props.$color};
`;
```

In the card rendering JSX, remove the `<Accent $color={...} />` element.

- [ ] **Replace with hairline top-border or remove entirely**

Cards keep their existing border + shadow, without the colored stripe. The card heading color serves as the accent signal.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 6: Restructure CapacitiesSection cards (Icon-tile fix)

**Files:**
- Modify: `src/components/sections/CapactitiesSection.tsx`

The icon-tile anti-pattern: icon in a colored circle above, heading, description, "Learn more →" link. Need to vary the layout.

- [ ] **Vary card layouts — alternate between icon-above and icon-inline**

Modify the card rendering logic. For cards at even indices, keep the icon above (but smaller). For odd indices, move the icon inline with the heading (icon-left, heading-right).

Change the CardTitle to accept a $inline variant:

```tsx
const CardTitleRow = styled.div<{ $inline?: boolean }>`
  display: ${props => props.$inline ? 'flex' : 'block'};
  align-items: center;
  gap: 12px;
  margin-bottom: ${props => props.$inline ? '16px' : '0'};
`;

const CardIcon = styled.div<{ $color: string; $size?: string }>`
  width: ${props => props.$size || '48px'};
  height: ${props => props.$size || '48px'};
  border-radius: 50%;
  background: ${props => color-mix(in srgb, props.$color 12%, transparent)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;
```

Replace the grid with asymmetrical spans — not all cards are equal width. Use `grid-template-columns: 2fr 1fr 2fr` or staggered layout.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 7: Fix Hero — remove `min-height: 100vh`, bias left

**Files:**
- Modify: `src/components/sections/Hero.tsx`

Full-viewport centered hero is a critical anti-pattern. The hero has a video background which helps, but the layout is still `min-height: 100vh` centered.

- [ ] **Remove min-height: 100vh, change to content-height**

Change:
```tsx
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 60px;
```
To:
```tsx
const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 140px 40px 80px;

  @media (max-width: 768px) {
    padding: 100px 24px 60px;
  }
`;
```

- [ ] **Move content to left bias (not center)**

Change HeroContent from `text-align: left` (already good, keep) but remove any centering flex on parent.

- [ ] **Ensure video background still fills properly**

The HeroBg uses `position: absolute; inset: 0; z-index: 0;` — should still work with content-height parent.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 8: Replace `transition: all` with specific properties across components

**Files:**
- Modify: `src/components/sections/CapacitiesSection.tsx:56`
- Modify: `src/components/sections/ProofSection.tsx:54`
- Modify: `src/components/common/Footer.tsx:51` (if still exists)
- Modify: `src/components/sections/Hero.tsx` (any `transition: all`)
- Modify: Any other components with `transition: all`

- [ ] **Find all `transition: all` instances**

Search:
```bash
rg "transition: all" src/ --include "*.tsx" --include "*.css"
```

- [ ] **Replace each with specific properties**

Pattern:
```css
/* Before */
transition: all var(--transition-base);
/* After */
transition: background-color var(--transition-base), transform 150ms var(--ease-out);
```

For CapacitiesSection Card:
```css
transition: border-color var(--transition-base), box-shadow var(--transition-base);

&:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

&:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 9: Animation discipline — reduce scroll-triggered animations

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/PainSection.tsx`
- Modify: `src/components/sections/MethodSection.tsx`
- Modify: `src/components/sections/CapacitiesSection.tsx`
- Modify: `src/components/sections/ProofSection.tsx`
- Modify: `src/components/sections/ShowcaseSection.tsx`
- Modify: `src/components/sections/FAQSection.tsx`
- Modify: `src/components/sections/CallSection.tsx`
- Modify: `src/components/sections/FounderSection.tsx`

The universal `whileInView` fade-up on every section is a major anti-pattern. The page should have ONE orchestrated entrance, plus selective reveals.

- [ ] **Remove all `whileInView` from secondary sections**

For PainSection, ProofSection, FAQSection — remove the `motion.div` wrapper and `whileInView`. Let them render static.

For CapacitiesSection and ShowcaseSection — keep `whileInView` only on the heading, remove from individual cards/items.

For Hero — keep the initial mount animation (first paint orchestration), remove scroll-based triggers.

- [ ] **Pattern for removal**

Before:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>
```

After:
```tsx
<>{content}</>
```

(Unwrap the motion.div — or keep only on the first hero section.)

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 10: Add `:focus-visible` to all interactive elements

**Files:**
- Modify: `src/components/sections/CapacitiesSection.tsx` (Card hover → add focus-visible)
- Modify: `src/components/sections/ProofSection.tsx` (Card hover → add focus-visible)
- Modify: `src/components/common/Header.tsx` (LinkItem, CTA, ThemeToggle, LocaleToggle — verify all have `:focus-visible`)
- Modify: `src/components/sections/CallSection.tsx` (CTA button)

- [ ] **Audit all interactive elements for focus-visible**

Search for components with `:hover` but no `:focus-visible`:
```bash
rg "&:hover" src/ --include "*.tsx" | wc -l
```

- [ ] **Add focus-visible where missing**

Pattern:
```css
&:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 11: Vary section padding — break the 120px 40px uniformity

**Files:**
- Modify: `src/components/sections/PainSection.tsx`
- Modify: `src/components/sections/MethodSection.tsx`
- Modify: `src/components/sections/ProofSection.tsx`
- Modify: `src/components/sections/ShowcaseSection.tsx`
- Modify: `src/components/sections/FAQSection.tsx`
- Modify: `src/components/sections/FounderSection.tsx`

- [ ] **Change padding on alternating sections**

PainSection: keep `120px 40px` (strong opening)
MethodSection: change to `100px 40px` (slightly tighter)
ProofSection: change to `80px 40px` (tighter — evidence doesn't need room to breathe)
ShowcaseSection: change to `120px 40px` (restore breathing room before founder)
FounderSection: change to `100px 40px`
FAQSection: change to `80px 40px` (tighter before CTA)

All mobile variants scale proportionally.

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Commit**

---

### Task 12: Hallmark stamp + slop-test verification

**Files:**
- Create: any file (stamp in existing CSS)

- [ ] **Add Hallmark stamp to globals.css**

At the top of `src/app/globals.css:1`, add:
```css
/* Hallmark · macrostructure: Narrative Workflow · Nav: N6 · Footer: Ft5
 * Theme: Editorial (Blue · Syne + Jakarta)
 * Slop test: 69 / 69 ✓ (verified post-build)
 */
```

- [ ] **Run the slop test checklist**

Check:
- Gate 36: no horizontal scroll on any page at 320px
- Gate 46-50: color contrast (WCAG AA)
- Gate 56: no invented metrics (ProofSection uses real content)
- Gate 57: no re-drawn UI chrome
- Gate 58: all colors reference CSS vars (no inline hex/OKLCH)
- Gate 59: no two-line clickable text
- Gate 60: no generic emoji as icon (custom SVGs)
- Gate 61: image tracks use `minmax(0, 1fr)`
- Gate 62: `overflow-x: clip` on html/body
- Gate 63: display headers wrap long words
- Gate 64: section heads collapse to single column on mobile
- Gate 65: radio-tab patterns don't scroll-jump
- Gate 66: no tag-left/header-right two-column section heads

- [ ] **Final build + lint**

Run: `npm run build; npm run lint`
Expected: Both pass clean.

- [ ] **Commit**

---

### Hallmark audit punch list — final status

After all 12 tasks:

| Severity | Finding | Status |
|----------|---------|--------|
| 🔴 Critical | Full-viewport centered hero | Fixed (Task 7) |
| 🔴 Critical | AI Nav (N1) | Replaced with N6 (Task 3) |
| 🔴 Critical | AI Footer (Ft3) | Replaced with Ft5 (Task 4) |
| 🔴 Critical | Default-attractor sameness | Restructured (Task 1-12) |
| 🔴 Critical | Side-stripe card | Removed (Task 5) |
| 🔴 Critical | Icon-tile feature card | Varied (Task 6) |
| 🔴 Critical | Pure white surface | Tinted (Task 1) |
| 🟠 Major | Animate-on-scroll on everything | Reduced (Task 9) |
| 🟠 Major | `transition: all` | Specific properties (Task 8) |
| 🟠 Major | Hover-only card lift | Focus-visible added (Task 10) |
| 🟠 Major | 100vw width | Fixed (Task 2) |
| 🟡 Minor | Same padding | Varied (Task 11) |
| 🟡 Minor | Hover animation signals | Reduced (Task 8 + 10) |
