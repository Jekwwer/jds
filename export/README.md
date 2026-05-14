# JDS — design tokens

`tokens.json` is the single source of truth for the Jekwwer Design System. W3C Design Tokens Community Group format.

Covers: color (palette + semantic dark/light), type, spacing, radii, shadows, motion, breakpoints, z-index.

Generated outputs — `dist/tokens.css` (CSS variables) + `dist/tokens.flat.json` (flat hex map for non-CSS consumers) —
regenerate from this file via `npm run build` (Style Dictionary). Don't hand-edit `dist/`.

## Consuming

For install + use, see [README][README]. To compile your own output from `tokens.json`, see [`sd.config.mjs`][SD_CONFIG]
at repo root for the official build pipeline.

For component class API + visual contract, see [`docs/components.md`][COMPONENTS]. For voice / accessibility / layout
rules, see [`docs/usage-guidelines.md`][USAGE_GUIDELINES].

[COMPONENTS]: ../docs/components.md
[README]: ../README.md
[SD_CONFIG]: ../sd.config.mjs
[USAGE_GUIDELINES]: ../docs/usage-guidelines.md
