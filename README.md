# Jekwwer Design System (JDS)

Token-driven, dark+light-symmetric design system. CSS variables + utility classes, no JS runtime. Personal scope — used
across Jekwwer projects.

[![license](https://img.shields.io/github/license/Jekwwer/jds?color=61afef&labelColor=242c36)](LICENSE)
[![version](https://img.shields.io/github/v/release/Jekwwer/jds?label=jds&color=61afef&labelColor=242c36&display_name=tag)](https://github.com/Jekwwer/jds/releases/latest)
[![styled with jds](https://img.shields.io/endpoint?url=https://jekwwer.github.io/jds/badges/styled-with.json)](https://github.com/Jekwwer/jds)
[![ci](https://img.shields.io/github/actions/workflow/status/Jekwwer/jds/ci.yml?label=ci&logo=githubactions&logoColor=white&color=61afef&labelColor=242c36)](https://github.com/Jekwwer/jds/actions/workflows/ci.yml)

## What's in v0.1

JDS at v0.1 ships the foundation only:

- **Design tokens** — `dist/tokens.css` (CSS variables, mode-aware via `[data-theme]`) + `dist/tokens.flat.json` (flat
  hex map for non-CSS consumers).
- **Base CSS layer** — `src/base.css` with `@font-face` for Geist + Geist Mono, `.jds-*` typography utility classes,
  `:focus-visible` reset.
- **Brand assets** — animated wordmark, static fallback, square monogram (`assets/`).

Component CSS (buttons, cards, inputs, etc.) lands incrementally per consumer need. See **Roadmap** below.

## Install

JDS is not yet on npm. Pin via git tag:

```bash
npm install git+https://github.com/Jekwwer/jds.git#v0.1.0
```

## Use

Two `<link>` tags. Order matters — tokens first, then base.

```html
<link rel="stylesheet" href="node_modules/@jekwwer/jds/dist/tokens.css" />
<link rel="stylesheet" href="node_modules/@jekwwer/jds/src/base.css" />
```

Toggle mode via `[data-theme="dark"|"light"]` on `<html>`. Default is dark. See `examples/hello-world/` for a live demo
using all shipped tokens.

## Theming

JDS ships blue as the canonical primary accent. Override in your CSS:

```css
:root {
  --jds-accent-primary: var(--jds-orange);
  --jds-accent-primary-bg: rgba(209, 154, 102, 0.12);
  --jds-border-focus: var(--jds-orange);
  --jds-shadow-focus: 0 0 0 3px rgba(209, 154, 102, 0.35);
}
```

Live example: `examples/override-primary/`. v0.2 will add `[data-accent="<hue>"]` runtime switching across 7 hues.

## Philosophy

Five rules drive every decision:

1. **Token-driven, no drift.** `export/tokens.json` is the source; CSS + JSON regenerate via Style Dictionary.
2. **Dark + light equal.** Both themes ship, both verified, neither privileged.
3. **No JS runtime.** Plain CSS. Framework-agnostic. Works in Astro / Next / SvelteKit / static / vanilla.
4. **Terminal aesthetic.** Mono for metadata, sans for prose. Unicode glyphs as icons. Caret + prompt + line-num motifs
   as brand language.
5. **A11y not optional.** Focus rings on every interactive element, semantic HTML, prefers-reduced-motion respected.

Full rules + voice + accessibility patterns: [`docs/usage-guidelines.md`][USAGE_GUIDELINES]. Component anatomy:
[`docs/components.md`][COMPONENTS].

## Roadmap

JDS is pre-v1.0, personal scope.

| version            | what lands                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| **v0.1** (current) | tokens + base CSS + examples                                            |
| **v0.2**           | multi-accent `[data-accent]` runtime switching (7 hues × 2 modes)       |
| **v0.3 → v0.9**    | component CSS — shell, atomic primitives, cards, lists, bento, terminal |
| **v0.10**          | Astro docs site rendering all components live                           |
| **v1.0**           | API stable; npm publish                                                 |

No deadlines — driven by actual consumer need, not aspiration.

## Badges

JDS ships a "styled with jds" shields.io endpoint for consumer READMEs:

```markdown
[![styled with jds](https://img.shields.io/endpoint?url=https://jekwwer.github.io/jds/badges/styled-with.json)](https://github.com/Jekwwer/jds)
```

Drops a two-tone `styled with | jds` badge into any repo. JDS's own version badge in this README uses shields.io's
built-in `github/v/release` scraper (sources from the git tag directly, themed via URL params).

## GitHub labels

JDS ships a canonical 10-label set at `dist/labels.yml`. Sync it to any Jekwwer repo via the reusable workflow — copy
[`examples/sync-jds-labels.yml`][SYNC_JDS_LABELS] into your repo's `.github/workflows/`. Sync is additive: your
repo-specific labels are untouched.

## Brand + license

Code: [MIT][LICENSE].

The "JDS" name and the logo files in `assets/` are brand assets owned by Evgenii Shiliaev — all rights reserved (not
covered by the MIT license). See [`NOTICE.md`][NOTICE] for usage rules. Geist + Geist Mono fonts ship under SIL OFL 1.1
([`fonts/OFL.txt`][OFL]).

## Contact

<evgenii.shiliaev@jekwwer.com> or open an [issue][issues].

[COMPONENTS]: docs/components.md
[LICENSE]: LICENSE
[NOTICE]: NOTICE.md
[OFL]: fonts/OFL.txt
[SYNC_JDS_LABELS]: examples/sync-jds-labels.yml
[USAGE_GUIDELINES]: docs/usage-guidelines.md
[issues]: https://github.com/Jekwwer/jds/issues
