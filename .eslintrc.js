// ESLint configuration
// ref: <https://eslint.org/docs/latest/user-guide/configuring/configuration-files>
// v2023-02-05 [rivy]

// spell-checker:ignore (names) rivy ; (options) iife

/* @prettier */ // note: (dprint) {.dprint.json}.prettier.associations should contain the name of this file

const useDeno = true;
const usePrettier = !useDeno;

module.exports = {
	root: true,
	env: { es6: true },
	ignorePatterns: [
		'[._@#$]build',
		'[._@#$]coverage',
		'.eslintrc.js',
		'.nyc_output',
		'.yarn',
		'build',
		'coverage',
		'dist',
		'node_modules',
		'vendor',
	],
	parser: '@typescript-eslint/parser',
	// avoid `parserOptions` ~ [2020-10-29]/rivy ~ use is causing issues for eslint evaluation of files outside of `src` (see https://github.com/typescript-eslint/typescript-eslint/issues/1723)
	// parserOptions: { ecmaVersion: 6, project: ['./tsconfig.json', './tsconfig.eslint.json'] },
	plugins: ['import', 'functional', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:functional/lite',
		'plugin:import/typescript',
		'plugin:security/recommended',
		'plugin:security-node/recommended',
		...(usePrettier ? ['prettier', 'prettier/@typescript-eslint'] : []),
	],
	reportUnusedDisableDirectives: true,
	rules: {
		// ref: https://eslint.org/docs/rules
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'eslint-comments/no-unused-disable': 'warn',
		'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
		'no-console': ['warn'], // ref: https://eslint.org/docs/rules/no-console
		'no-restricted-syntax': [
			'error',
			{
				selector: `CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]`,
				message: 'Unexpected property on console object was called',
			},
		],
		'no-undefined': ['error'], // ref: https://eslint.org/docs/rules/no-undefined
		'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // ref: https://eslint.org/docs/rules/no-unused-vars
		'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
		'wrap-iife': ['error', 'inside'], // correlate with Prettier formatting choice; ref: https://eslint.org/docs/rules/wrap-iife
	},
	overrides: [{ files: ['*.js'], rules: { '@typescript-eslint/no-var-requires': 'off' } }],
	// globals: { BigInt: true, console: true, WebAssembly: true },
	// globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
};
