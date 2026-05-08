/*
 * Style Dictionary config.
 *
 * Source: export/tokens.json (W3C DTCG).
 * Outputs:
 *   - dist/tokens.css       — CSS variables, mode-aware via [data-theme]
 *   - dist/tokens.flat.json — flat key→value map for badges + label scripts
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

/* ----- Name transform ----------------------------------- */

function jdsName(path) {
  const [a, b, c, d] = path;

  if (a === 'palette' && b === 'ink') return `jds-ink-${c}`;
  if (a === 'palette' && b === 'accent') return `jds-${c}`;

  if (a === 'color' && c === 'bg') {
    return d === 'default' ? 'jds-bg' : `jds-bg-${d}`;
  }
  if (a === 'color' && c === 'fg') {
    return /^\d+$/.test(d) ? `jds-fg${d}` : `jds-fg-${d}`;
  }
  if (a === 'color' && c === 'border') {
    return d === 'default' ? 'jds-border' : `jds-border-${d}`;
  }
  if (a === 'color' && c === 'accent') return `jds-accent-${d}`;
  if (a === 'color' && c === 'syntax') return `jds-syntax-${d}`;
  if (a === 'color' && c === 'scrollbar') return `jds-scrollbar-${d}`;

  if (a === 'font-family') return `jds-font-${b}`;
  if (a === 'font-weight') return `jds-fw-${b}`;
  if (a === 'font-size') return `jds-fs-${b}`;
  if (a === 'line-height') return `jds-lh-${b}`;
  if (a === 'letter-spacing') return `jds-ls-${b}`;

  if (a === 'spacing') return `jds-space-${b}`;
  if (a === 'radius') return `jds-radius-${b}`;
  if (a === 'border-width') {
    return b === 'default' ? 'jds-border-width' : `jds-border-width-${b}`;
  }

  if (a === 'shadow') return `jds-shadow-${c}`;

  if (a === 'z-index') return `jds-z-${b}`;
  if (a === 'duration') return `jds-dur-${b}`;
  if (a === 'easing') return `jds-ease-${b}`;
  if (a === 'breakpoint') return `jds-bp-${b}`;
  if (a === 'layout') return `jds-layout-${b}`;

  if (a === 'typography') return `jds-typography-${b}`;

  return `jds-${path.join('-')}`;
}

StyleDictionary.registerTransform({
  name: 'name/jds',
  type: 'name',
  transform: (token) => jdsName(token.path),
});

/* ----- Format: css/jds ---------------------------------- */

/*
 * Map a token to which selector block it belongs in:
 *   "agnostic" — palette, type primitives, spacing, motion, layout, etc.
 *   "dark"     — color.dark.* + shadow.dark.*
 *   "light"    — color.light.* + shadow.light.*
 *   null       — typography composite tokens (rendered as utility classes in src/base.css)
 */
function bucketOf(token) {
  const [a, b] = token.path;
  if (a === 'typography') return null;
  if (a === 'color' && b === 'dark') return 'dark';
  if (a === 'color' && b === 'light') return 'light';
  if (a === 'shadow' && b === 'dark') return 'dark';
  if (a === 'shadow' && b === 'light') return 'light';
  return 'agnostic';
}

// Convert shadow token (single or array) → CSS box-shadow string.
function shadowToCSS(value) {
  const list = Array.isArray(value) ? value : [value];
  return list
    .map((s) => {
      const parts = [];
      if (s.inset) parts.push('inset');
      parts.push(s.offsetX, s.offsetY, s.blur, s.spread, s.color);
      return parts.join(' ');
    })
    .join(', ');
}

function renderToken(token) {
  const isShadow = token.path[0] === 'shadow';
  const value = isShadow ? shadowToCSS(token.$value) : token.$value;
  const desc = token.original?.$description;
  const trailing = desc ? ` /* ${desc} */` : '';
  return `  --${token.name}: ${value};${trailing}`;
}

StyleDictionary.registerFormat({
  name: 'css/jds',
  format: ({ dictionary }) => {
    const buckets = { agnostic: [], dark: [], light: [] };
    for (const token of dictionary.allTokens) {
      const b = bucketOf(token);
      if (b === null) continue;
      buckets[b].push(token);
    }

    const lines = [];

    lines.push('/**');
    lines.push(` * Jekwwer Design System (JDS) v${pkg.version}`);
    lines.push(` * Generated from export/tokens.json — DO NOT EDIT.`);
    lines.push(` * Edit tokens.json and run \`npm run build\` to regenerate.`);
    lines.push(' */');
    lines.push('');

    lines.push(':root {');
    for (const t of buckets.agnostic) lines.push(renderToken(t));
    lines.push('}');
    lines.push('');

    lines.push(':root,');
    lines.push('[data-theme="dark"] {');
    for (const t of buckets.dark) lines.push(renderToken(t));
    lines.push('}');
    lines.push('');

    lines.push('[data-theme="light"] {');
    for (const t of buckets.light) lines.push(renderToken(t));
    lines.push('}');
    lines.push('');

    return lines.join('\n');
  },
});

/* ----- Format: json/jds-flat ---------------------------- */

/*
 * Flat `{ "jds.<dotted-path>": <value> }` map mirroring tokens.json paths.
 *
 * Used by:
 *   - scripts/build-badges.mjs — accent hexes for shields.io endpoints
 *   - scripts/build-labels.mjs — accent hexes for GitHub label colors
 *
 * Excludes typography composite tokens (object-shaped, not a useful flat lookup).
 */
StyleDictionary.registerFormat({
  name: 'json/jds-flat',
  format: ({ dictionary }) => {
    const out = {};
    for (const token of dictionary.allTokens) {
      if (token.path[0] === 'typography') continue;
      const key = `jds.${token.path.join('.')}`;
      const value =
        token.path[0] === 'shadow' ? shadowToCSS(token.$value) : token.$value;
      out[key] = value;
    }
    return JSON.stringify(out, null, 2) + '\n';
  },
});

/* ----- Config ------------------------------------------ */

export default {
  source: ['export/tokens.json'],
  // Dark/light tokens intentionally share names (e.g. `--jds-bg`); [data-theme] selector resolves them.
  log: {
    warnings: 'disabled',
    verbosity: 'default',
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/jds', 'color/css'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/jds',
        },
        {
          destination: 'tokens.flat.json',
          format: 'json/jds-flat',
        },
      ],
    },
  },
};
