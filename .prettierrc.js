// Prettier configuration
// ref: <https://prettier.io/docs/en/options.html>
// v2022-07-13 [rivy]

// spell-checker:ignore (people) Roy Ivy III * rivy

module.exports = {
	// $schema: 'http://json.schemastore.org/prettierrc',
	printWidth: 100,
	proseWrap: 'preserve',
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	// "# overrides/[*.markdown]/tabWidth": "// set to 4 when https://github.com/prettier/prettier/issues/5019 is fixed",
	overrides: [
		{
			files: ['*.md', '*.mkd', '*.markdown'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};
