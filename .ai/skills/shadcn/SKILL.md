---
name: shadcn
description: Manages shadcn/ui components — adding, searching, fixing, debugging, styling, and composing UI. Generates high-fidelity UI from mockups or visual references. Provides project context, component docs, and usage examples for projects with a components.json file.
---

# shadcn Skill

## When to trigger

Invoke when:
- Adding, composing, or modifying UI components
- Selecting shadcn/ui primitives
- Keeping component markup consistent with existing patterns
- Debugging component styling or variant issues
- Questions about `components.json` config

## Behavior

1. Check `src/components/ui/` for already-installed primitives before suggesting `shadcn add`
2. Prefer composition of existing primitives over custom markup
3. Use Tailwind semantic tokens only — never hard-coded colors
4. Keep implementations minimal and aligned with current component patterns
5. Reference `components.json` for style (`new-york`), base color (`neutral`), and CSS variable settings
6. When adding a new component, use `pnpm dlx shadcn@latest add <name>`
7. Use `'use client'` only where interactivity requires it — never add it by default

## UI Generation (Visual Input)

When generating high-fidelity UI from a design or feature request:

1. If the user provides an image or mockup, extract layout, spacing, and typography from it before generating components
2. If no visual reference is provided, ask: "Should I base this on a mockup you have, or reimagine it from the Technical Blueprint?"
3. Map visual regions to the most appropriate shadcn/ui primitives before writing any markup
4. Validate generated output against the `technical-blueprint.md` directory structure when placing new files

## Example prompts

```
/shadcn add a settings panel using a card layout
/shadcn replace this raw <div> modal with a Dialog primitive
/shadcn which primitive should I use for a multi-step form wizard?
```
