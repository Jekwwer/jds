// markdownlint-cli2 config. Rule reference:
// https://github.com/DavidAnson/markdownlint
module.exports = {
  config: {
    default: true,

    // Match Prettier's bullet-marker default.
    MD004: { style: 'dash' },

    // Match `.editorconfig` `*.md` line length; code blocks / tables /
    // headings legitimately exceed 120 char.
    MD013: {
      line_length: 120,
      heading_line_length: 120,
      code_blocks: false,
      tables: false,
    },

    'no-inline-html': false,
    'no-emphasis-as-heading': false,
  },

  ignores: ['CHANGELOG.md'],
  gitignore: true,
};
