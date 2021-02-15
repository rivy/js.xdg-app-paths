module.exports = {
	printWidth: 100,
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	// "prettier # overrides/[*.markdown]/tabWidth": "// set to 4 when https://github.com/prettier/prettier/issues/5019 is fixed",
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
