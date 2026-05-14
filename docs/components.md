# JDS components

Spec reference for shipped JDS class API. Matches `dist/tokens.css` + `src/base.css` at the version in this repo.

> **v0.2 surface.** Typography utility classes + `.jds-accent-outline` accent surface ship as the JDS class API.
> Component CSS (buttons, cards, inputs, terminal, etc.) lands incrementally per the [Roadmap][ROADMAP] in the README.
> This doc grows with each release.
>
> **Examples** (`examples/hello-world/`, `examples/multi-accent/`, `examples/override-primary/`) demo JDS in HTML. They
> consume JDS via `var(--jds-*)` tokens and the utility classes documented here. They also use **local CSS** for visual
> elements not yet shipped as canonical JDS components (buttons, theme toggle, etc.) — those are demo-only, not part of
> JDS's class API. As components land in upcoming v0.x releases, examples migrate to canonical classes.

---

## Typography

Loaded from `src/base.css`. All slots ship with `margin: 0`; consumers control spacing via `--jds-space-*`. Pair with
`dist/tokens.css` (load tokens FIRST, then base) — see [Use][USE] in the README.

### `.jds-h1` / `.jds-display`

**Purpose.** Page-level title. Bold display weight; clamps fluidly between 38px and `--jds-fs-5xl` (60px).

**Class API.**

| token            | binding                               |
| ---------------- | ------------------------------------- |
| `font-family`    | `var(--jds-font-display)`             |
| `font-size`      | `clamp(38px, 5vw, var(--jds-fs-5xl))` |
| `font-weight`    | `var(--jds-fw-bold)`                  |
| `line-height`    | `var(--jds-lh-tight)`                 |
| `letter-spacing` | `var(--jds-ls-display)`               |
| `color`          | `var(--jds-fg1)`                      |

**HTML example.**

```html
<h1 class="jds-h1">Designed like code.</h1>
```

`.jds-display` is an alias — same rules, different semantic tag (use on a non-`<h1>` if needed).

### `.jds-h2`

**Purpose.** Section title.

**Class API.** `--jds-font-display`, `--jds-fs-3xl` (38px), `--jds-fw-semibold`, `--jds-lh-tight`, `--jds-ls-tight`,
`--jds-fg1`.

**HTML example.**

```html
<h2 class="jds-h2">Foundations</h2>
```

### `.jds-h3`

**Purpose.** Sub-section title.

**Class API.** `--jds-font-sans`, `--jds-fs-2xl` (30px), `--jds-fw-semibold`, `--jds-lh-snug`, `--jds-ls-tight`,
`--jds-fg1`.

**HTML example.**

```html
<h3 class="jds-h3">Theming</h3>
```

### `.jds-h4`

**Purpose.** Card / block title.

**Class API.** `--jds-font-sans`, `--jds-fs-xl` (24px), `--jds-fw-semibold`, `--jds-lh-snug`, `--jds-fg1`.

**HTML example.**

```html
<h4 class="jds-h4">Override primary</h4>
```

### `.jds-h5`

**Purpose.** Mono small caps — used for metadata labels, section tags, kit chrome. Uppercase + tracking + mono.

**Class API.** `--jds-font-mono`, `--jds-fs-sm` (13px), `--jds-fw-medium`, `--jds-lh-snug`, `--jds-ls-mono-kbd`,
`text-transform: uppercase`, `--jds-fg3`.

**HTML example.**

```html
<h5 class="jds-h5">PALETTE · 7 HUES</h5>
```

### `.jds-p` / `.jds-body`

**Purpose.** Body prose. Default reading copy.

**Class API.** `--jds-font-sans`, `--jds-fs-base` (15px), `--jds-fw-regular`, `--jds-lh-normal`, `--jds-fg2`.

**HTML example.**

```html
<p class="jds-p">Token-driven, dark+light-symmetric. Toggle the theme; everything flips.</p>
```

`.jds-body` is an alias.

### `.jds-lead`

**Purpose.** Larger intro paragraph beneath an `h1`. Slightly bigger than body.

**Class API.** `--jds-font-sans`, `--jds-fs-lg` (20px), `--jds-fw-regular`, `--jds-lh-normal`, `--jds-fg2`.

**HTML example.**

```html
<p class="jds-lead">Every color, font, and spacing on this page reads from a custom property.</p>
```

### `.jds-small` / `.jds-caption`

**Purpose.** Tertiary copy. Captions, footnotes, secondary metadata.

**Class API.** `--jds-font-sans`, `--jds-fs-sm` (13px), `--jds-lh-snug`, `--jds-fg3`.

**HTML example.**

```html
<p class="jds-small">Last build: 2026-05-09. Tokens regenerated on every build.</p>
```

### `.jds-code` / `.jds-mono`

**Purpose.** Inline mono — code tokens, file paths, identifiers. Sized relative to surrounding prose at `0.9em`.
OpenType `calt` + `liga` features enabled (ligatures + contextual alternates).

**Class API.** `--jds-font-mono`, `font-size: 0.9em` (relative), `--jds-fw-regular`,
`font-feature-settings: "calt" 1, "liga" 1`.

**HTML example.**

```html
<p class="jds-p">
  Set <code class="jds-code">--jds-accent-primary</code> on <code class="jds-code">:root</code> to override.
</p>
```

`.jds-mono` is an alias for non-`<code>` mono usage (e.g., a `<span>` showing a timestamp).

### `.jds-kbd`

**Purpose.** Keyboard shortcut renderer. Uppercase tracking + mono.

**Class API.** `--jds-font-mono`, `--jds-fs-xs` (12px), `--jds-fw-medium`, `text-transform: uppercase`,
`--jds-ls-mono-kbd`, `--jds-fg3`.

**HTML example.**

```html
<p class="jds-p">Press <kbd class="jds-kbd">⌘K</kbd> to open the palette.</p>
```

### `.jds-label`

**Purpose.** Section tags + small uppercase metadata. Same shape as `.jds-h5` but used as inline label, not heading.

**Class API.** `--jds-font-mono`, `--jds-fs-xs` (12px), `--jds-fw-medium`, `--jds-ls-mono-kbd`,
`text-transform: uppercase`, `--jds-fg3`.

**HTML example.**

```html
<span class="jds-label">FOUNDATIONS</span>
```

---

## Accent surfaces

Utility classes for accent-colored surfaces. The Solid pattern (`--jds-accent-primary` fill + `--jds-fg-inverse` text)
stays inline — too rare across JDS surfaces to earn a class. The Outline pattern ships as a class because it's the
dominant accent chip / tag / badge style across the JDS examples and the blog look-spec.

### `.jds-accent-outline`

**Purpose.** Accent text + accent border on the page background. Use for status badges, language tags, inline category
markers — anywhere the surface should signal an accent without flooding the rectangle in fill color.

**Class API.**

| token            | binding                               |
| ---------------- | ------------------------------------- |
| `background`     | `var(--jds-bg)`                       |
| `color`          | `var(--jds-accent-primary)`           |
| `border`         | `1px solid var(--jds-accent-primary)` |
| `border-radius`  | `var(--jds-radius-sm)`                |
| `:focus-visible` | `box-shadow: var(--jds-shadow-focus)` |

**HTML example.**

```html
<span class="jds-accent-outline">v0.2</span>
```

Pairs with the Solid + Outline pattern rule in [`docs/usage-guidelines.md`][USAGE_GUIDELINES] "Accent surfaces —
two-pattern rule".

---

## Base layer (no class — applied via tag selectors)

Loaded with `src/base.css`. These aren't classes; they're sensible defaults applied automatically when the file is
imported.

- **`html, body`** — `var(--jds-bg)` background, `var(--jds-fg1)` color, `var(--jds-font-sans)` family,
  `var(--jds-fs-base)` size, `var(--jds-lh-normal)` line height, font smoothing on
- **`::selection`** — `var(--jds-accent-primary-bg)` background, `var(--jds-fg1)` text
- **`:focus-visible`** — `box-shadow: var(--jds-shadow-focus)` (3px ring), `border-radius: var(--jds-radius-sm)`,
  `outline: none` — applied to ANY focus-visible element by default
- **Scrollbars** — thin, themed: `var(--jds-scrollbar-thumb)` thumb, transparent track. Styled across Firefox
  (`scrollbar-color`) + WebKit (`::-webkit-scrollbar*`)

---

## Brand assets (no class — direct file references)

Loaded from `assets/`. SVGs use `fill="currentColor"` so they inherit parent text color.

- **Wordmark** — `assets/logo-wordmark.svg` — animated `jds█` cluster with breathing caret. Use in headers, hero
  surfaces, marketing.
- **Wordmark static** — `assets/logo-wordmark-static.svg` — same layout, frozen-cursor fallback. Use where animation
  breaks: OG images, PDFs, dense feeds.
- **Mark** — `assets/logo-mark.svg` — square monogram. Use as favicon, avatar, app icon, anywhere the wordmark would be
  too small to read (16–64px).

Brand assets are all-rights-reserved (not covered by the MIT license) — see [`NOTICE.md`][NOTICE] for usage rules.

---

## Coming in v0.x

Component CSS (`.jds-app-header`, `.jds-tag`, `.jds-feature-card`, etc.) lands incrementally with each v0.x release. See
the [Roadmap][ROADMAP] in the README for the full version trajectory. Each component's anatomy, variants, states, and
class API will be documented here as it ships.

[NOTICE]: ../NOTICE.md
[ROADMAP]: ../README.md#roadmap
[USAGE_GUIDELINES]: usage-guidelines.md
[USE]: ../README.md#use
