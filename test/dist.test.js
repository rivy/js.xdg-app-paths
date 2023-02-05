/* eslint-env es6, node */
'use strict';

/* note: dynamic imports are used because 'dist' may not exist */

const fs = require('fs');
const path = require('path');

const test = require('ava');

const vNodeJS = process.versions.node.split('.');
const vNodeJSMajor = +vNodeJS[0];

// Distribution tests

const packagePath = '../package.json';

// eslint-disable-next-line security-node/detect-non-literal-require-calls
const pkg = require(packagePath);

const packageCJSPath = path.resolve(__dirname, packagePath, '..', pkg.exports['.'].require);
const packageESMPath = path.resolve(__dirname, packagePath, '..', pkg.exports['.'].import);

const packageAPI = [
	'$name',
	'$isolated',
	'cache',
	'config',
	'data',
	'runtime',
	'state',
	'configDirs',
	'dataDirs',
];

function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function flattenToValues(obj) {
	const values = [];
	if (isObject(obj) || Array.isArray(obj)) {
		Object.keys(obj).forEach((key) => {
			// eslint-disable-next-line security/detect-object-injection
			values.push(...flattenToValues(obj[key]));
		});
	} else values.push(obj);
	return values;
}

if (!process.env.npm_config_test_dist) {
	test.skip('skipped (enable with `npm test --test-dist`)', () => void 0);
} else {
	const testID$CJStoESM = 'CJS/ESM equivalence';
	if (vNodeJSMajor < 12) {
		test.skip(testID$CJStoESM + ' (requires Node-v12+)', () => void 0);
	} else {
		test(testID$CJStoESM, async (t) => {
			// eslint-disable-next-line security/detect-non-literal-require , security-node/detect-non-literal-require-calls
			const mCJS = require(packageCJSPath);
			const mESM = (await import('file://' + packageESMPath)).default;

			t.deepEqual(mCJS, mESM);

			t.is(typeof mCJS, 'function');
			t.is(typeof mCJS, typeof mESM);
			t.is(Object.keys(mCJS).length, packageAPI.length);
			t.is(Object.keys(mCJS).length, Object.keys(mESM).length);
			packageAPI.forEach((key) => {
				/* eslint-disable security/detect-object-injection */
				t.is(typeof mCJS[key], 'function');
				t.is(typeof mCJS[key], typeof mESM[key]);
				t.deepEqual(mCJS[key](), mESM[key]());
				/* eslint-enable security/detect-object-injection */
			});
		});
	}

	test("package 'exports' consistency", (t) => {
		/* eslint-disable security/detect-non-literal-fs-filename */
		t.is(pkg.main, pkg.exports['.'].require);
		t.is(pkg.module, pkg.exports['.'].import);
		t.is(pkg.types, pkg.exports['.'].types);

		t.true(fs.existsSync(pkg.exports['.'].require));
		t.true(fs.existsSync(pkg.exports['.'].import));
		t.true(fs.existsSync(pkg.exports['.'].types));

		t.is(pkg.main, pkg.exports['.'].default);

		if (pkg.exports['./cjs']) {
			const pathRequire = pkg.exports['./cjs'].require;
			t.is(pkg.exports['.'].require, pathRequire);
			// const extension = path.extname(pathRequire);
			// const basename = path.basename(pathRequire, extension);
			// const dirname = path.dirname(pathRequire);
			// t.is(pkg.exports['./cjs'].types, path.posix.join(dirname, basename) + '.d.ts');
			t.true(fs.existsSync(pkg.exports['./cjs'].require));
		}

		// 'types' default to the Deno/ESM/TypeScript variant
		if (pkg.exports['./esm']) {
			const pathImport = pkg.exports['./esm'].import;
			t.is(pkg.exports['.'].import, pathImport);
			t.is(pkg.exports['.'].types, path.pkg.exports['./esm'].types);
			t.true(fs.existsSync(pkg.exports['./esm'].require));
		}
		/* eslint-enable security/detect-non-literal-fs-filename */
	});

	test("package 'exports' all exist", (t) => {
		const exports_ = pkg.exports;
		const paths = flattenToValues(exports_);
		t.log({ exportsPaths: paths });
		paths.forEach((p) => {
			const path_ = path.resolve(__dirname, packagePath, '..', p);
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			const exists = fs.existsSync(path_);
			if (!exists) {
				t.log({ path_, exists });
			}
			t.true(exists);
		});
	});

	test("package 'exports' sub-paths support older tools", (t) => {
		// confirm package files/directories exist which correspond to advertised exports sub-paths
		// [why]: older tools import/require based on package directory structure, not 'exports'
		const exports_ = pkg.exports;
		const subPaths = Object.keys(exports_);
		t.log({ subPaths });
		// test for sub-path file/directory existence
		subPaths.forEach((p) => {
			const path_ = path.resolve(__dirname, packagePath, '..', p);
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			const exists = fs.existsSync(path_);
			if (!exists) {
				t.log({ exists, path_ });
			}
			t.true(exists);
		});
		const files = pkg.files;
		// test that sub-path file/directory is included in 'files'
		subPaths.forEach((p) => {
			const included = p === '.' || files.includes(p.replace(/^.\//, ''));
			if (!included) {
				t.log({ included, p, files });
			}
			t.true(included);
		});
	});

	test('package version has matching Git/VCS version tag', (t) => {
		t.log({ version: pkg.version });

		const result = require('child_process').spawnSync('git rev-list refs/tags/v' + pkg.version, {
			shell: true,
			encoding: 'utf-8',
		});
		t.is(result.status, 0);
	});
}
