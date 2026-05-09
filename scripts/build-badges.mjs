/**
 * Generates shields.io endpoint files at badges/<name>.json from
 * package.json (version) + dist/tokens.flat.json (hex colors).
 * Run by `npm run build:badges`. Consumer URLs in README "Badges".
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const tokens = JSON.parse(
  readFileSync(new URL('../dist/tokens.flat.json', import.meta.url), 'utf8'),
);

// Strips leading `#` — shields.io wants raw 6-digit hex.
function hex(path) {
  const v = tokens[path];
  if (typeof v !== 'string' || !v.startsWith('#')) {
    throw new Error(`Token "${path}" missing or not a hex color (got: ${v}).`);
  }
  return v.slice(1);
}

const accent = hex('jds.palette.accent.blue');
// labelColor: ink-700 (NOT ink-950, which blends into GitHub's dark canvas).
const labelDark = hex('jds.palette.ink.700');

const badges = {
  // "styled with jds" — two-tone (dark prefix + accent payload). For consumer READMEs.
  'styled-with.json': {
    schemaVersion: 1,
    label: 'styled with',
    message: 'jds',
    color: accent,
    labelColor: labelDark,
  },
};

mkdirSync(new URL('../badges/', import.meta.url), { recursive: true });

for (const [filename, data] of Object.entries(badges)) {
  writeFileSync(
    new URL(`../badges/${filename}`, import.meta.url),
    JSON.stringify(data, null, 2) + '\n',
  );
}

console.log(`✓ Wrote ${Object.keys(badges).length} badge(s) to badges/`);
