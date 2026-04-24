---
name: premium-navigation
description: Expert in creating high-end, production-grade navigation systems. Focuses on UX, accessibility, visual hierarchy, and smooth state transitions.
---

# Premium Navigation System

## Role: Navigation Architect
A navbar is not just a list of links; it's the primary orientation tool of a digital experience. A premium navigation system must balance invisibility (not getting in the way) with effortless utility.

## Core Principles

### 1. Visual Hierarchy & Rhythm
* **The Logo Anchor**: The logo should be the strongest visual anchor, typically top-left, serving as the "Home" reset.
* **Symmetry vs. Intent**: Avoid perfect center-alignment unless it's a specific aesthetic choice. Prefer a balanced distribution between Brand (left) and Utility (right).
* **Micro-interactions**: Hover states must be subtle but definitive (e.g., subtle color shifts, thin lines, or scale changes).

### 2. UX & Ergonomics
* **Fitts' Law**: Important CTAs (like "Contact") should be visually distinct and easy to target.
* **Active State**: The current page must be clearly indicated so the user always knows "Where am I?".
* **Sticky Intelligence**: Navbars should be sticky but not obstructive. Use backdrop blurs (`backdrop-blur`) to maintain context of the content underneath.

### 3. Mobile-First Adaptability
* **The Thumb Zone**: Mobile menus should be easily reachable.
* **Transition Fluidity**: Menus should slide or fade in using high-quality easing (e.g., `cubic-bezier`), never abrupt jumps.
* **Interaction Clarity**: Hamburger icons must transform into "X" icons when open to provide clear closure feedback.

## Implementation Standards

### Technical Requirements
* **Semantic HTML**: Use `<header>` and `<nav>` tags.
* **Accessibility**: Ensure `aria-label` on mobile buttons and correct `role` attributes.
* **Performance**: Minimize layout shifts. Use fixed heights or stable flexbox layouts.

### Aesthetic Guidelines (Tech-Editorial)
* **Typography**: Use bold, high-contrast sans-serifs for links.
* **Spacing**: Generous padding to allow the brand to "breathe".
* **Detailing**: Use 1px borders instead of heavy shadows to define boundaries.

## Checklist for Final Review
- [ ] Logo is prominent and links to `/`.
- [ ] Active page is visually distinct.
- [ ] CTA is clearly differentiated from regular links.
- [ ] Mobile menu is fluid and accessible.
- [ ] Backdrop blur is implemented for sticky behavior.
- [ ] No layout shift on mount.
