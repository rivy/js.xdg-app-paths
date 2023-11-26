// Prettier configuration
// ref: <https://prettier.io/docs/en/options.html>
// v2023-11-26 [rivy]

// spell-checker:ignore (names) DPrint (people) Roy Ivy III * rivy

/* @prettier */ // note: (dprint) {.dprint.json}.prettier.associations should contain the name of this file

module.exports = {
	// $schema: 'http://json.schemastore.org/prettierrc',
	printWidth: 100,
	proseWrap: 'preserve',
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	// ## overrides/[*.markdown]/tabWidth - may set this to 4 when/if https://github.com/prettier/prettier/issues/5019 is fixed
	overrides: [{ files: ['*.md', '*.mkd', '*.markdown'], options: { tabWidth: 2, useTabs: false } }],
};
