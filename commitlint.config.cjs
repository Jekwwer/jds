/**
 * type-enum mirrors `.releaserc.cjs` releaseRules — change both together,
 * else semantic-release silently skips otherwise-valid commits.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'security',
        'fix',
        'perf',
        'deps',
        'build',
        'docs',
        'refactor',
        'style',
        'test',
        'chore',
        'ci',
        'revert',
      ],
    ],
  },
};
