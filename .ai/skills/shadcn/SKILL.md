---
name: shadcn
description: Manages shadcn/ui components — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples for projects with a components.json file.
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

## Example prompts

```
/shadcn add a settings panel using a card layout
/shadcn replace this raw <div> modal with a Dialog primitive
/shadcn which primitive should I use for a multi-step form wizard?
```
