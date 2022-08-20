// CommitLint configuration
// ref: <https://commitlint.js.org/#/reference-configuration>
// v2022-08-20 [rivy]

// spell-checker:ignore (names) commitLint (people) Roy Ivy III * rivy (words) maint

/* @prettier */ // note: (dprint) {.dprint.json}.prettier.associations should contain the name of this file

const isNPMTestDist = !!process.env['npm_config_test_dist'];
const isTestDist = !!process.env['test_dist'];
const isTestRelease = !!process.env['test_release'];

/** Relax linting rules/strictures (for development; *not* when submitting for distribution/release). */
const relaxedReview = !(isNPMTestDist || isTestDist || isTestRelease);

const commitTags = [
	'Add',
	'Added',
	'Bugfix',
	'Build',
	'Change',
	'Changed',
	'Chore',
	'Deps',
	'Docs',
	'Feat',
	'Fix',
	'Fixed',
	'Fixes',
	'FORK',
	'Maint',
	'Perf',
	'Refactor',
	'Style',
	'Test',
	'Tests',
	'Update',
	'Updated',
	'Upkeep',
	// * git automated messages
	'Automatic',
	'Auto-merged',
	'Merge',
	'Merged',
	'Revert',
	// * ok for relaxed review (ie, development), otherwise *not ok*
	...(relaxedReview ? ['VERSION', 'WIP', 'X'] : []),
];

module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			// headerPattern ~ tested at <https://regex101.com/r/ez7wQS/1>
			headerPattern: /^(\s*\w[\w-]*)(?:\s*(?:[/(]([\w,/]+)[)]?))?!?\s*[~:]?\s*(.*)$/,
			headerCorrespondence: ['type', 'scope', 'subject'],
		},
	},
	plugins: [
		{
			rules: {
				'@local/DEBUG': (parsed, when, value) => {
					return [true, console.log({ parsed, when, value })];
				},
			},
		},
	],
	// ref: [Commit messages starting with fixup! do not trigger any errors](https://github.com/conventional-changelog/commitlint/issues/3206)
	// ref: [tests for default ignores](https://github.com/conventional-changelog/commitlint/blob/914782aad70d353b/%40commitlint/is-ignored/src/defaults.ts#L20-L26)
	defaultIgnores: false,
	ignores: [
		(msg) => msg.match(/^\s*\d+([.]\d+)*/) /* version commit */,
		relaxedReview
			? (msg) => msg.match(/^\s*(fixup|squash)!/) /* fixup! or squash! commit */
			: undefined,
	].filter((v) => v != null),
	rules: {
		// '@local/DEBUG': [1, 'always'],
		'body-max-line-length': [0],
		// ## maint [2020-01-07; rivy] ~ 'footer-leading-blank' disabled until <https://github.com/conventional-changelog/commitlint/issues/896> is fixed
		// ## ... refs: <https://github.com/conventional-changelog/commitlint/issues/896#issuecomment-671865868> , <https://github.com/rook/rook/pull/6499#issuecomment-717267089>
		'footer-leading-blank': [0],
		'header-max-length': [1, 'always', 90],
		'scope-case': [2, 'always', ['camel-case', 'lower-case', 'pascal-case', 'upper-case']],
		'subject-case': [0],
		'subject-empty': [relaxedReview ? 1 : 2, 'never'],
		'type-case': [2, 'always', ['lower-case', 'sentence-case']],
		'type-enum': [2, 'always', [...commitTags.map((v) => v.toLowerCase()), ...commitTags]],
	},
};
