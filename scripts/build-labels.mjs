/**
 * Generates dist/labels.yml (github-label-sync format) from
 * dist/tokens.flat.json (hex colors).
 * Run by `npm run build:labels`. Consumer setup in README "GitHub labels".
 */
import { readFileSync, writeFileSync } from 'node:fs';

const tokens = JSON.parse(
  readFileSync(new URL('../dist/tokens.flat.json', import.meta.url), 'utf8'),
);

// Strips leading `#` — github-label-sync wants raw 6-digit hex.
function hex(path) {
  const v = tokens[path];
  if (typeof v !== 'string' || !v.startsWith('#')) {
    throw new Error(`Token "${path}" missing or not a hex color (got: ${v}).`);
  }
  return v.slice(1);
}

// Canonical label set — colors pulled live from tokens.flat.json so brand drift propagates.
const labels = [
  // ----- Conventional commit types ----------------------
  {
    name: 'feat',
    color: hex('jds.palette.accent.green'),
    description: 'New feature or capability',
    aliases: ['feature', 'enhancement'],
  },
  {
    name: 'fix',
    color: hex('jds.palette.accent.red'),
    description: 'Bug fix',
    aliases: ['bug'],
  },
  {
    name: 'docs',
    color: hex('jds.palette.accent.blue'),
    description: 'Documentation change, no code',
    aliases: ['documentation'],
  },
  {
    name: 'refactor',
    color: hex('jds.palette.accent.cyan'),
    description: 'Restructure with no behavior change',
  },
  {
    name: 'chore',
    color: hex('jds.palette.ink.500'),
    description: 'Routine maintenance',
  },
  {
    name: 'breaking',
    color: hex('jds.palette.accent.orange'),
    description: 'Backwards-incompatible change',
  },

  // ----- Status -----------------------------------------
  {
    name: 'wip',
    color: hex('jds.palette.accent.yellow'),
    description: 'Work in progress',
  },
  {
    name: 'blocked',
    color: hex('jds.palette.accent.red-light'),
    description: 'Stalled',
  },

  // ----- Housekeeping -----------------------------------
  {
    name: 'good first issue',
    color: hex('jds.palette.accent.purple'),
    description: 'Good for newcomers',
  },
  {
    name: 'duplicate',
    color: hex('jds.palette.ink.300'),
    description: 'Duplicate of another issue',
  },
];

function toYAML(labels) {
  return labels
    .map((l) => {
      const lines = [
        `  - name: ${l.name}`,
        `    color: "${l.color}"`,
        `    description: ${JSON.stringify(l.description)}`,
      ];
      if (l.aliases?.length) {
        lines.push(`    aliases:`);
        for (const a of l.aliases) lines.push(`      - ${a}`);
      }
      return lines.join('\n');
    })
    .join('\n');
}

// No version stamping — consumer pins JDS via git ref, that IS the version.
// (tokens.css differs because consumers archive it.)
const header = `# Jekwwer Design System (JDS) — canonical GitHub label set
# Generated from dist/tokens.flat.json — DO NOT EDIT.
# Edit scripts/build-labels.mjs and run \`npm run build\` to regenerate.

labels:
`;

writeFileSync(
  new URL('../dist/labels.yml', import.meta.url),
  header + toYAML(labels) + '\n',
);

console.log(`✓ Wrote dist/labels.yml (${labels.length} labels)`);
