# NOTICE

**Code**: [MIT][LICENSE]. **Brand assets**: all rights reserved (see below). **Fonts**: SIL Open Font License 1.1.

## Brand assets — all rights reserved

The "Jekwwer Design System" / "JDS" name and the logo files in `assets/` (`logo-wordmark.svg`,
`logo-wordmark-static.svg`, `logo-mark.svg`) are brand assets owned by Evgenii Shiliaev. They are **not covered by the
MIT license**.

You may **not**:

- Use them to identify your own product or service
- Imply endorsement by Jekwwer / Evgenii Shiliaev
- Distribute modified versions of the marks

You **may**:

- Reference them in documentation, articles, screenshots, and reviews

## If you fork this repo

Before redistributing a fork as your own design system, replace:

- All three logo SVGs in `assets/`
- "Jekwwer Design System" / "JDS" name in `package.json` (`name`, `description`, `author`)
- Hardcoded brand strings in build scripts: `sd.config.mjs` (line emitting `dist/tokens.css` header) and
  `scripts/build-labels.mjs` (line emitting `dist/labels.yml` header)
- Brand prose across `README.md`, `NOTICE.md` (this file), and `docs/usage-guidelines.md` if it survives in your fork's
  voice
- File names with `jds-` prefix (e.g., `examples/sync-jds-labels.yml`)

For `LICENSE`: **append** your own copyright line below the existing one — don't replace. The MIT terms transfer; the
copyright lineage stays.

After editing the above, run `npm run build` — it regenerates `dist/tokens.css`, `dist/tokens.flat.json`,
`dist/labels.yml`, and `badges/styled-with.json` to pick up your new brand strings.

## Fonts — SIL Open Font License 1.1

The font files in `fonts/` (Geist, Geist Mono) are © Vercel and the Geist Font Project Authors, distributed under the
SIL Open Font License, Version 1.1.

The OFL governs use, modification, and redistribution of the fonts independently of the MIT license covering the rest of
this repository.

JDS ships **WOFF2 only**. For TTF / OTF (design-tool import, OS install), fetch from the upstream linked below.

Full license text: [`fonts/OFL.txt`][OFL]. Upstream: <https://github.com/vercel/geist-font>

## Acknowledgments

- **Style Dictionary** — Apache 2.0. Build-time dep that compiles `export/tokens.json` to `dist/tokens.css` +
  `dist/tokens.flat.json`.
- **Lucide icons** — ISC. Recommended in [`README.md`][README] for richer iconography. Not bundled.
- **W3C Design Tokens Community Group (DTCG) format** — open specification. Used as the schema for `export/tokens.json`.
- **shields.io** — service used for badge endpoints (own README + consumer READMEs).

[LICENSE]: LICENSE
[OFL]: fonts/OFL.txt
[README]: README.md
