---
name: lumen-design-system
description: The definitive visual identity guide for Lumen X Labs. Ensures consistency in colors, typography, spacing, and component styling across the entire application.
---

# Lumen X Labs Design System

## 1. Visual Identity
Lumen X Labs uses a **Modern Tech-Editorial** aesthetic. It combines the boldness of editorial design with the precision of high-end technology interfaces.

### Core Principles
* **Precision**: Tight alignment and consistent spacing.
* **Contrast**: High contrast between backgrounds and text for accessibility and impact.
* **Sophistication**: Subtle use of blurs and gradients; no generic "SaaS" shadows.

### The "X" Branding Rule (CRITICAL)
The letter **"X"** is the symbol of the brand's spark. 
* **Color**: Every occurrence of the letter "X" in the brand name or key headings MUST be styled with the **Vibrant Electric Blue** (`#007bff`).
* **Emphasis**: The "X" should stand out from the rest of the text to emphasize the "experimental/labs" nature of the company.

## 2. Design Tokens

### Color Palette
* **Primary**: Electric Blue (`#007bff`) - Used for CTAs, active states, accents, and the "X" branding.
* **Neutrals**: 
  * Pure White/Black for extreme contrast.
  * `var(--surface)` as the primary background.
  * `var(--border)` for subtle separation.
* **Text**:
  * `var(--text-primary)` for headings.
  * `var(--text-secondary)` for body and descriptions.

### Typography
* **Display (Headings)**: `Syne` (Bold/ExtraBold) - used for all titles to convey authority and creativity.
* **UI/Body**: `Plus Jakarta Sans` - used for readability and technical feel.

### Shaping (The "Lumen" Curve)
* **Border Radius**: Avoid 0px (too brutalist) and 999px (too generic).
* **Standard Radius**: `8px` for small elements (buttons, inputs).
* **Large Radius**: `12px` to `16px` for containers (cards, sections).
* **Consistent Rounding**: All interactive elements must share a cohesive rounding logic.

## 3. Component Guidelines

### Buttons & CTAs
* **Visuals**: High contrast, clear labels.
* **Interaction**: Subtle lift (`translateY(-2px)`) and soft glow on hover.
* **Shapes**: Always use the Standard Radius (`8px`).

### Inputs & Fields
* **Borders**: 1px solid using `var(--border)`.
* **Focus State**: 2px solid `var(--primary)` with a light glow.

### Containers
* **Borders**: Prefer 1px borders over heavy box-shadows.
* **Shadows**: Use `var(--shadow-md)` only for floating elements.

## 4. Motion Philosophy
* **Easing**: Always use `cubic-bezier(0.4, 0, 0.2, 1)` for standard transitions.
* **Speed**: `300ms` for interactions, `600ms` for page entrance animations.
* **Intent**: Motion should guide the eye, not distract.

## 5. Compliance Checklist
- [ ] Does the component use the correct font for the role (Syne vs Jakarta)?
- [ ] Is the border-radius consistent (Standard 8px)?
- [ ] Are the colors derived from the CSS variables?
- [ ] **Are all "X" characters in the brand name styled with Electric Blue?**
- [ ] Is the interaction subtle and high-quality?
