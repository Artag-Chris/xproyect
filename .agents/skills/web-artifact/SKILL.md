# Skill: web-artifact
Description: When asked to produce a design, plan, or feature, present 2–3 concrete options (A, B, C) with concise descriptions and trade-offs. The user selects one option to proceed. This skill facilitates quick, visual decision-making and aligns with high-quality UI/UX design.

How it works:
- You first present 2–3 approaches to the user, each with:
  - Title (short)
  - 1–2 sentence description
  - Pros
  - Cons
- The first option is the recommended choice, clearly labeled "(Recommended)".
- Then you prompt the user to pick one by replying with the option label (A/B/C).
- After the user selects, you continue with the detailed plan for that option (design/spec, tasks, and acceptance criteria).

Response format example:
- A) Compact, fast-loading hero with text-first content
  Description: A lightweight hero with strong copy and minimal visuals.
  - Pros: fast, accessible. - Cons: less visual impact.
- B) Rich hero with video background
  Description: Premium video hero with overlays.
  - Pros: high engagement. - Cons: heavier load.
- C) Video toggle hero (A/B test-ready)
  Description: Hero supports video on/off with a toggle for tests.
  - Pros: flexibility. - Cons: added state management.

What I need from you to proceed:
- Tell me which option you want to pursue (A, B, or C).
- If you want to add more constraints (tone, audience, performance budget), share them and I’ll incorporate into the next step.
