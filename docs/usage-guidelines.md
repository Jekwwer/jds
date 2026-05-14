# JDS usage guidelines

Foundational rules for any surface built with JDS — voice, accessibility, layout. Read before composing a new page.

> **v0.2 surface.** This doc covers rules that apply to JDS at v0.2 (tokens + base CSS + `.jds-accent-outline`).
> Component-specific rules (when to use Button vs Toggle, Modal a11y, etc.) land here as those components ship — see
> [components][COMPONENTS] and the [Roadmap][ROADMAP] in the README.

---

## 1. Voice & tone for UI copy

JDS prose reads like an engineer's PR description: terse, concrete, confident. No marketing filler, no exclamation
points, no smiles.

### Voice

- **First-person plural** (_we_) on posts, changelogs, announcements
- **Second-person** (_you_) in docs, prompts, inline help
- **Never** _I_. JDS is a system, not a person

### Tone

- Programmatic and sharp — favor verbs over adjectives
- Engineering-literate — assume the reader knows what a token, a build, or a SHA is
- Honest about state — "deprecated", "experimental", "draft" are first-class words

### Casing

- Headings: sentence case (only first word + proper nouns capitalized)
- Versions: lowercase `v2.4.0` (never `V2.4.0`)
- Prop names in tables: lowercase, exact (`onClick`, not `onclick`)
- Changelog chips: UPPERCASE mono (`ADDED`, `FIXED`, `REMOVED`)
- Type labels and metadata: UPPERCASE mono (`INFO`, `WARN`, `ERR`, `OK`)

### Punctuation

- Use the en dash (`—`) for asides, not parentheses
- Use `·` (middle dot) as a visual separator in metadata rows
- Sentence-end periods on every full sentence — including button labels that are full sentences. Single-word buttons
  take no period
- The Oxford comma is required

### Words to avoid

- "Easy", "simple", "just", "powerful", "amazing", "delightful", "magic"
- "Click here", "learn more" — link text must describe the destination
- Emoji of any kind. Use Unicode glyphs (`→ ↗ ← ✓ · ⌘ ⌫ ⌕ ☾ ☀`) instead — see Iconography below for the canonical
  vocabulary

### Words we use

- _Ship, build, run, deploy, revoke, retry, fail, pass_
- _Token, primitive, surface, scope, variant, intent, contract_
- _Stable, beta, experimental, deprecated, draft_

### Examples

| ✓ Do                   | ✗ Don't                                |
| ---------------------- | -------------------------------------- |
| `Run build`            | `🚀 Click to deploy your awesome app!` |
| `Token revoked.`       | `Success! 🎉 You did it!`              |
| `URL is not reachable` | `Oops! Something went wrong 😬`        |
| `Breaking in v3.0`     | `IMPORTANT NOTICE!!!`                  |
| `Read article →`       | `Click here to learn more`             |
| `8 articles`           | `Check out our 8 amazing articles`     |
| `0.4 ms render`        | `Lightning-fast performance ⚡`        |

---

## 2. Accessibility rules

JDS targets WCAG 2.1 AA across both modes; AAA where reasonable.

### Color contrast

- All `--jds-fg1` ↔ `--jds-bg` and `--jds-fg1` ↔ `--jds-bg-raised` pairs pass AAA (≥7:1)
- All `--jds-fg2` ↔ `--jds-bg` pairs pass AA (≥4.5:1)
- Never rely on color alone — every status carries a label, glyph, or position
- Decorative tokens are WCAG 1.4.3 exempt: `--jds-fg4` (inactive UI), `--jds-scrollbar-{thumb,track}`,
  `--jds-border-subtle`, `--jds-bg-selected`, `--jds-accent-*-bg`. axe failures on these are expected
- `--jds-{green,yellow}-light` are decorative-only; use `--jds-{green,yellow}-text-light` (or semantic
  `--jds-accent-success` / `--jds-accent-warning`) for text in light mode

#### Muted-text contract

- `--jds-fg1`: primary content (AAA against `--jds-bg`, `--jds-bg-raised`)
- `--jds-fg2`: secondary content (AA against `--jds-bg`, `--jds-bg-raised`)
- `--jds-fg3`: tertiary content — labels, captions, placeholder text, code comments (AA against `--jds-bg`,
  `--jds-bg-raised`, `--jds-bg-sunken`, both modes)
- `--jds-fg4`: inactive/disabled UI only. WCAG-exempt. Never use for readable text
- Stop at `--jds-fg3` for any readable text
- For text quieter than `--jds-fg3`, subordinate typographically — `font-style: italic`, lighter weight, smaller size,
  or desaturation. Don't drop to a lower step in the ink ramp
- axe-core fails any text-on-surface combo below 4.5:1. Valid responses: raise to `--jds-fg3`+, or use one of the
  decorative/incidental-UI tokens listed under "Color contrast" above

#### Accent surfaces — two-pattern rule

Accent-colored text never sits on accent-tinted backgrounds. `--jds-accent-*-bg` tokens are decorative regional fills
only. Pick one pattern when a surface carries an accent:

- **Solid** (high emphasis: pressed, current, primary).
  `background: var(--jds-accent-primary); color: var(--jds-fg-inverse);` no border. Use for segmented-control pressed,
  current tab, primary button, alert/callout label chip, code-block language tag
- **Outline** (low emphasis: static indicator). `background: var(--jds-bg)` (or `--jds-bg-raised` if nested in a raised
  surface — must match parent), `border: 1px solid var(--jds-accent-primary); color: var(--jds-accent-primary);` Use for
  badges, version tags, sidebar active item, post-card meta tags. Encapsulated by `.jds-accent-outline`

Both patterns axe-pass AA for all 7 hues × 2 modes. `--jds-accent-*-bg` survives for decorative regional fills only
(Hero radial, Alert/Callout outer region with neutral-foreground body, `::selection` highlight)

### Focus

- **Every interactive element** has a `:focus-visible` ring (`var(--jds-shadow-focus)`, 3px). No exceptions.
- Focus rings are 3px and accent-colored — sufficient against any background
- Destructive actions use `var(--jds-shadow-focus-danger)` (red ring)
- The default `outline` is removed; the `box-shadow` ring takes its place. Don't strip the ring without replacing it
- `tabindex="-1"` is reserved for programmatic focus targets — never use it to hide elements from keyboards

### Keyboard

- All actions reachable via `Tab` in DOM order
- `Enter` and `Space` activate buttons; `Space` toggles checkbox/toggle controls
- `Esc` closes any dismissible overlay
- Focus order matches visual order — left-to-right, top-to-bottom. If you reorder visually with CSS, fix DOM order too
- Focus returns to the invoking element when an overlay closes

### Hit targets

- Minimum 32×32px tap target for any interactive control on touch surfaces

### Motion

- All animation respects `prefers-reduced-motion: reduce` — duration drops to 0ms; the blinking caret stops
- No parallax, no auto-playing video, no autoplaying carousels

---

## 3. Layout & grid

### Spacing

- 4px base grid. Never use values that aren't a multiple of 4
- Default vertical rhythm: `--jds-space-3` (12px) between siblings, `--jds-space-6` (24px) between blocks,
  `--jds-space-9` (48px) between sections
- Component-internal padding scales: `--jds-space-3` for inputs and buttons, `--jds-space-4` for cards, `--jds-space-7`
  for hero blocks

### Containers

- Max content width: 820px for prose, 1120px for blog/dashboard, 1440px for full app shells
- Sidebars: 260px. TOC rails: 220px
- Always left-anchor body content. Center only for titles, callouts, and empty states

### Grids

- Standard column counts: 1 (mobile), 2 (split content), 3 (metrics, card walls), 4 (component galleries)
- Gap defaults: `--jds-space-3` (12px) for tight grids, `--jds-space-6` (24px) for content grids

### Stacking & elevation

Z-index hierarchy via `--jds-z-*` tokens:

- 0 (`--jds-z-base`) — base, no shadow
- 10 (`--jds-z-raised`) — raised cards (`var(--jds-shadow-sm)`)
- 100 (`--jds-z-sticky`) — sticky headers
- 1000 (`--jds-z-overlay`) — overlays / scrims
- 1100 (`--jds-z-modal`) — modal-like surfaces (`var(--jds-shadow-lg)`)
- 1200 (`--jds-z-toast`) — transient notifications
- 1300 (`--jds-z-tooltip`) — always-on-top hints

### Breakpoints

- `sm: 640px` — narrow mobile
- `md: 768px` — tablet / single-column layouts collapse
- `lg: 1024px` — full multi-column layout
- `xl: 1280px` — wide desktop / slide-deck size
- `2xl: 1440px` — container max

> Breakpoints are de-facto from the reference UI kits; not yet ratified as canonical.

### Borders & corners

- All borders are 1px. Three weights via tokens (`--jds-border-subtle`, `--jds-border`, `--jds-border-strong`) — never
  change pixel width
- Default radius: `--jds-radius-md` (6px). Cards/modals: `--jds-radius-lg` (8px). Chips: `--jds-radius-sm` (4px).
  Pills/toggles: `--jds-radius-full`. Never 0 — even 3px (`--jds-radius-xs`) softens the edge

### Shadows

- Use the shadow scale (`--jds-shadow-sm` / `--jds-shadow-md` / `--jds-shadow-lg`) — never invent custom drop shadows
- Dark mode shadows always include the `inset` highlight — gives the surface an edge against deep bg
- Colored shadows are reserved for focus rings only. No accent-colored drops elsewhere

### Iconography

- JDS does not ship an icon set. Use Unicode glyphs as the default vocabulary (`→ ↗ ← ✓ · ⌘ ⌫ ⌕ ☾ ☀`). For richer needs,
  pull from [Lucide][lucide] at `1.5px` stroke, 16px default size
- Icons inherit color from `currentColor`. Never hard-code icon colors
- Decorative icons get `aria-hidden="true"`

### Imagery

- No illustrations, no stock photos, no decorative gradients
- The only allowed flourish is the radial accent tint on hero surfaces
  (`radial-gradient(...var(--jds-accent-primary-bg)...)`)
- If product screenshots are needed (terminals, charts, code), present them on a `--jds-bg-sunken` surface with
  `--jds-border` and `--jds-radius-lg`

### Mode switching

- Theme is set via `[data-theme="dark"|"light"]` on `<html>` (or any subtree)
- Default is dark
- Both modes ship at the same fidelity. Never design dark-only or light-only
- `prefers-color-scheme` is honored on first paint; user choice (stored in `localStorage`) overrides afterwards

---

## Coming in v0.x

Component-specific guidelines (when-to-use decision matrix, per-component a11y, Do/Don't reference) ship alongside each
component as it lands. See [components][COMPONENTS] and the [Roadmap][ROADMAP] in the README for cadence.

[COMPONENTS]: components.md
[ROADMAP]: ../README.md#roadmap
[lucide]: https://lucide.dev
