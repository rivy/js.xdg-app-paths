// spell-checker:ignore (names) rivy
module.exports = {
	root: true,
	env: { es6: true },
	globals: { BigInt: true, console: true, WebAssembly: true },
	ignorePatterns: ['.eslintrc.js', '.nyc_output', 'build', 'coverage', 'dist', 'node_modules'],
	// parser: '@typescript-eslint/parser',
	// avoid `parserOptions` ~ [2020-10-29]/rivy ~ use is causing issues for eslint evaluation of files outside of `src` (see https://github.com/typescript-eslint/typescript-eslint/issues/1723)
	// parserOptions: { project: ['./tsconfig.json', './tsconfig.eslint.json'] },
	// plugins: ['import' , 'functional', '@typescript-eslint'],
	plugins: ['import'],
	extends: [
		'eslint:recommended',
		// 'plugin:@typescript-eslint/recommended',
		'plugin:eslint-comments/recommended',
		// 'plugin:import/typescript',
		// 'plugin:functional/lite',
		'prettier',
		// 'prettier/@typescript-eslint',
	],
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'eslint-comments/no-unused-disable': 'error',
		'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
		'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
};
