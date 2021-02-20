// spell-checker:ignore frontmatter retext
exports.plugins = [
	require('remark-footnotes'),
	// require('remark-frontmatter'),
	[
		require('remark-retext'),
		require('unified')().use({
			plugins: [
				require('retext-english'),
				require('retext-syntax-urls'),
				// [require('retext-spell'), require('dictionary-en')],
				[require('retext-sentence-spacing'), { preferred: 1 }],
				require('retext-repeated-words'),
				require('retext-passive'),
			],
		}),
	],
	'remark-preset-lint-consistent',
	'remark-preset-lint-recommended',
	'remark-preset-lint-markdown-style-guide',
	['remark-lint-emphasis-marker', 'consistent'],
	['remark-lint-file-extension', false],
	['remark-lint-heading-increment', false],
	['remark-lint-list-item-indent', 'mixed'],
	['remark-lint-maximum-heading-length', false],
	['remark-lint-maximum-line-length', false],
	['remark-lint-no-duplicate-headings', false],
	['remark-lint-unordered-list-marker-style', 'consistent'],
];
