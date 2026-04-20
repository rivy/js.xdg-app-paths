// CommitLint configuration
// ref: <https://commitlint.js.org/#/reference-configuration>
// v2024-07-12 [rivy]

// spell-checker:ignore (jargon) maint (names) CommitLint DPrint (people) Roy Ivy III * rivy

/* @prettier */
// note: (dprint) {.dprint.json}.prettier.associations should contain the name of this file

const isNPMTestDist = !!process.env.npm_config_test_dist;
const isTestDist = !!process.env.test_dist;
const isTestRelease = !!process.env.test_release;

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

const RULE_DISABLE = 0;
const RULE_WARNING = 1;
const RULE_ERROR = 2;

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
		'body-max-line-length': [RULE_DISABLE],
		// ## maint [2020-01-07; rivy] ~ 'footer-leading-blank' disabled until <https://github.com/conventional-changelog/commitlint/issues/896> is fixed
		// ## ... refs: <https://github.com/conventional-changelog/commitlint/issues/896#issuecomment-671865868> , <https://github.com/rook/rook/pull/6499#issuecomment-717267089>
		'footer-leading-blank': [RULE_DISABLE],
		'footer-max-line-length': [RULE_DISABLE],
		'header-max-length': [RULE_WARNING, 'always', 90],
		'scope-case': [RULE_ERROR, 'always', ['camel-case', 'lower-case', 'pascal-case', 'upper-case']],
		'subject-case': [RULE_DISABLE],
		'subject-empty': [relaxedReview ? RULE_WARNING : RULE_ERROR, 'never'],
		'type-case': [RULE_ERROR, 'always', ['lower-case', 'sentence-case']],
		'type-enum': [RULE_ERROR, 'always', [...commitTags.map((v) => v.toLowerCase()), ...commitTags]],
	},
};
