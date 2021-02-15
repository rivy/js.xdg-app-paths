// spell-checker:ignore () commitLint

const commitTags = [
	'Add',
	'Added',
	'Bugfix',
	'Build',
	'Change',
	'Changed',
	'Chore',
	'Docs',
	'Feat',
	'Fix',
	'Fixed',
	'Fixes',
	'Maint',
	'Merge',
	'Perf',
	'Refactor',
	'Revert',
	'Style',
	'Test',
	'Tests',
	'Update',
	'Updated',
	'Upkeep',
	'WIP',
];

module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: './.commitlint.parser-preset.js',
	plugins: [
		{
			rules: {
				'@local/DEBUG': (parsed, when, value) => {
					return [true, console.log({ parsed, when, value })];
				},
			},
		},
	],
	rules: {
		// '@local/DEBUG': [1, 'always'],
		'body-max-line-length': [0],
		// ## maint [2020-01-07; rivy] ~ 'footer-leading-blank' disabled until <https://github.com/conventional-changelog/commitlint/issues/896> is fixed
		// ## ... refs: <https://github.com/conventional-changelog/commitlint/issues/896#issuecomment-671865868> , <https://github.com/rook/rook/pull/6499#issuecomment-717267089>
		'footer-leading-blank': [0],
		'scope-case': [2, 'always', ['lower-case', 'upper-case']],
		'subject-case': [0],
		'type-case': [2, 'always', ['lower-case', 'sentence-case']],
		'type-enum': [2, 'always', [...commitTags.map((v) => v.toLowerCase()), ...commitTags]],
	},
};
