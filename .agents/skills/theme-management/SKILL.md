---
name: theme-management
description: Expert in implementing and managing multi-theme systems (Light, Dark, etc.). Ensures seamless transitions, accessibility, and persistence of user preferences.
---

# Theme Management System

## Role: Theme Architect
The goal is to ensure that the application is visually accessible and aesthetically pleasing regardless of the user's theme preference, while maintaining the brand identity (Lumen = Light).

## 1. Theme Philosophy
* **Primary (Lumen Light)**: The default experience. Represents clarity, energy, and creativity. Uses high-brightness surfaces and a vibrant Electric Blue.
* **Secondary (Deep Dark)**: A refined alternative for low-light environments. Not just "black", but a deep, layered charcoal system that maintains contrast.

## 2. Design Tokens (The Law)
Every component MUST use these tokens. Hardcoding colors is strictly forbidden.

| Token | Light Value (Lumen) | Dark Value (Deep) |
|---|---|---|
| `--background` | `#ffffff` (Pure White) | `#050505` (Deep Black) |
| `--foreground` | `#0a0a0a` | `#f5f5f5` |
| `--surface` | `#ffffff` | `#0a0a0a` |
| `--surface-secondary` | `#fcfcfc` | `#111111` |
| `--border` | `#e5e5e5` | `#262626` |
| `--text-primary` | `#0a0a0a` | `#f5f5f5` |
| `--text-secondary` | `#4a4a4a` | `#a1a1a1` |

## 3. Implementation Standards

### Technical Strategy
* **Root Class**: Theme is controlled by the `.dark` class on the `<html>` element.
* **CSS Variables**: Use `var(--token-name)` for all styling.
* **Persistence**: User preference must be saved in `localStorage` via Zustand persist middleware.
* **Smooth Transition**: `transition: background-color 0.3s, color 0.3s` must be applied to the `body`.

## 4. Compliance Checklist
- [ ] No hardcoded hex/rgb colors in components.
- [ ] All components react to the `.dark` class change.
- [ ] Contrast ratios are accessible in both modes.
- [ ] The "Lumen" Electric Blue remains consistent across themes.

