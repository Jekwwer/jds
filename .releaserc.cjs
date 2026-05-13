module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        // Explicit list (including default-equivalent rules) self-documents
        // the full project commit-type policy.
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'init', release: false },
          { type: 'feat', release: 'minor' },
          { type: 'security', release: 'patch' },
          { type: 'fix', release: 'patch' },
          { type: 'fix', scope: 'examples', release: false },
          { type: 'perf', release: 'patch' },
          // revert: handled by semantic-release auto-cancel (pairs with reverted commit, excluded from release)
          { type: 'deps', release: 'patch' },
          { type: 'build', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'refactor', release: false },
          { type: 'style', release: false },
          { type: 'test', release: false },
          { type: 'chore', release: false },
          { type: 'ci', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'init', section: 'INITIAL COMMIT', hidden: true },
            { type: 'feat', section: 'NEW FEATURES' },
            { type: 'security', section: 'SECURITY UPDATES' },
            { type: 'fix', section: 'BUG FIXES' },
            { type: 'perf', section: 'PERFORMANCE IMPROVEMENTS' },
            { type: 'revert', section: 'REVERTS' },
            { type: 'deps', section: 'DEPENDENCY UPDATES' },
            { type: 'build', section: 'BUILD SYSTEM' },
            { type: 'docs', section: 'DOCUMENTATION' },
            { type: 'refactor', section: 'REFACTORING', hidden: true },
            { type: 'style', section: 'CODE STYLE IMPROVEMENTS', hidden: true },
            { type: 'test', section: 'TESTING', hidden: true },
            { type: 'chore', section: 'CHORES' },
            { type: 'ci', section: 'CONTINUOUS INTEGRATION' },
          ],
        },
        writerOpts: {
          headerPartial: '## {{version}} - {{date}}',
          mainTemplate:
            '{{> header}}\n' +
            '{{#if noteGroups}}\n' +
            '{{#each noteGroups}}\n' +
            '\n' +
            '### {{title}}\n' +
            '\n' +
            '{{#each notes}}\n' +
            '* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}\n' +
            '{{/each}}\n' +
            '{{/each}}\n' +
            '{{/if}}\n' +
            '{{#each commitGroups}}\n' +
            '\n' +
            '{{#if title}}\n' +
            '### {{title}}\n' +
            '\n' +
            '{{/if}}\n' +
            '{{#each commits}}\n' +
            '{{> commit root=@root}}\n' +
            '{{/each}}\n' +
            '{{/each}}\n',
          groupBy: 'type',
          commitGroupsSort: (a, b) => {
            const order = [
              'INITIAL COMMIT',
              'NEW FEATURES',
              'SECURITY UPDATES',
              'BUG FIXES',
              'PERFORMANCE IMPROVEMENTS',
              'REVERTS',
              'DEPENDENCY UPDATES',
              'BUILD SYSTEM',
              'DOCUMENTATION',
              'REFACTORING',
              'CODE STYLE IMPROVEMENTS',
              'TESTING',
              'CHORES',
              'CONTINUOUS INTEGRATION',
            ];
            return order.indexOf(a.title) - order.indexOf(b.title);
          },
          commitsSort: ['scope', 'subject'],
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        // V1.0-FLIP: set to true at v1.0 (publishes @jekwwer/jds to npm registry).
        // Coupled flips: release.yml `id-token: write` permission + NPM_TOKEN env-var,
        // plus add NPM_TOKEN repo secret. Audit: `grep -rn V1.0-FLIP .`.
        npmPublish: false,
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/exec',
      {
        // `npm run build` reads package.json — must run after @semantic-release/npm.
        prepareCmd: 'npm run build',
      },
    ],
    [
      '@semantic-release/git',
      {
        // Committed so jsdelivr + GitHub Pages serve without a build step.
        // CI's verify-build-artifacts step catches drift.
        assets: [
          'package.json',
          'package-lock.json',
          'CHANGELOG.md',
          'LICENSE',
          'dist/**',
          'badges/**',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
