// Prettier configuration
// ref: <https://prettier.io/docs/en/options.html>
// v2022-08-20 [rivy]

// spell-checker:ignore (people) Roy Ivy III * rivy

/* @prettier */ // note: (dprint) {.dprint.json}.prettier.associations should contain the name of this file

module.exports = {
	// $schema: 'http://json.schemastore.org/prettierrc',
	printWidth: 100,
	proseWrap: 'preserve',
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	// ## overrides/[*.markdown]/tabWidth": "// set this to 4 when/if https://github.com/prettier/prettier/issues/5019 is fixed",
	overrides: [{ files: ['*.md', '*.mkd', '*.markdown'], options: { tabWidth: 2, useTabs: false } }],
};
