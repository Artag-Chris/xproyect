---
name: editorial-spacing
description: Spacing and breathability guide for "Refined Tech-Editorial" desktop experiences. Ensures generous, intentional whitespace that communicates freedom, luxury, and tranquility across all sections.
---

# Editorial Spacing for Desktop

## Core Principle: Space Communicates Value

In editorial design, **whitespace is not empty — it's intentional**. Generous spacing signals premium quality, gives the user's eye room to rest, and creates a sense of calm control. Cramped spacing signals cheapness and anxiety.

At 1920px+ desktop widths, every spacing value must be **scaled up** from what works at mobile. What looks "tight but fine" on a phone looks "claustrophobic" on a 27" monitor.

## Desktop Spacing Baseline (≥1200px viewport)

### Section Vertical Rhythm
| Context | Value |
|---|---|
| Section padding-top | `120px` minimum, `160px` for featured sections |
| Section padding-bottom | `120px` minimum |
| Heading → subtitle/grid | `60px` |
| Section heading font-size | `clamp(32px, 5vw, 56px)` |
| Card grid gap (3-col) | `32px–40px` |
| Card grid gap (2-col) | `40px` |

### Card Internal Spacing
| Context | Value |
|---|---|
| Card padding | `40px` |
| Card title → description | `16px` |
| Card title font-size | `24px` |
| Card description font-size | `16px` (min) / `18px` (preferred) |
| Card description line-height | `1.6–1.7` |

### Text & Readability
| Context | Value |
|---|---|
| Body text line-height | `1.6` (tight) / `1.7–1.8` (breathing) |
| Paragraph max-width | `600px–720px` for centered text |
| Section content max-width | `1200px` |
| Section horizontal padding | `40px` (not 20px — feels fragile at 1920px+) |

### Transition Zones (between sections)
| Context | Value |
|---|---|
| Adjacent sections | Both at `120px` padding → seamless |
| Hero padding-bottom | Must match `120px` rhythm (Hero overflow is fine since it's full-viewport) |

## The "Breathability" Check

After applying spacing, verify by asking:

1. **The Squint Test**: Squint at the page — do you see a balanced, airy composition, or dark clumps of text?
2. **The Finger Test**: At 1920px, can you fit 2–3 fingers between major content blocks? If not, spacing is too tight.
3. **The Reading Line**: Body text should not exceed 60–70 characters per line. If it does, constrain max-width or increase padding.
4. **The Vertical Rhythm**: The gap between a heading and its associated content should be ~2× the gap between a heading and the content of the previous section. This creates visual hierarchy.
5. **Grid Gap Check**: At 1920px, a 3-column grid with 24px gaps makes cards nearly touch. 32px minimum for editorial feel.

## Common Anti-Patterns

- **20px horizontal padding** on sections at 1920px+ → creates fragile edges. Minimum 40px.
- **Heading → content gap < 40px** → makes the page feel rushed. Minimum 60px.
- **Card title → body gap < 12px** → makes text feel crammed. Minimum 16px.
- **Grid gap < 24px in multi-column layouts** → cards visually merge. Minimum 32px.
- **Section padding-bottom < 100px** → sections crash into each other.
- **Hero content narrower than other sections** → jarring transition when user scrolls.
- **Hero description line-height < 1.6** → cramped reading at large sizes.

## Implementation Checklist

- [ ] All sections use `padding: 120px 40px` (not 20px) for desktop
- [ ] All content containers max out at `1200px` (consistent)
- [ ] Heading → next element gap is `60px` consistently
- [ ] Card padding is `40px` everywhere
- [ ] Card title margin-bottom is `16px`
- [ ] Card description `font-size: 16px` minimum, `line-height: 1.6`
- [ ] Multi-column grids use `32px+` gap
- [ ] Hero matches the vertical rhythm of adjacent sections
- [ ] Body text `line-height: 1.6` minimum
- [ ] Paragraphs constrained to `600–700px` max-width when centered
