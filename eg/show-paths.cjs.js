// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
// 'use strict';

const path = require('path');

/* eslint-disable no-console , security-node/detect-crlf , security-node/detect-non-literal-require-calls , security/detect-object-injection */

const xdgAppPathsModulePath = '../dist/cjs/mod.cjs.js';

const xdgAppPaths = require(xdgAppPathsModulePath);

// Extend appPaths with a "log" location function
// eslint-disable-next-line functional/immutable-data
xdgAppPaths.log = function (dirOptions) {
	const self = xdgAppPaths; // * bind `self` to `appPaths` => avoids `this` variability due to caller context
	function typeOf(x) {
		// * use avoids circumvention of eslint variable tracking for `x`
		return typeof x;
	}

	const dirOptions_ = (() => {
		if (typeOf(dirOptions) === 'boolean') {
			return { isolated: dirOptions };
		}
		if (
			typeOf(dirOptions) !== 'object' ||
			dirOptions == null ||
			typeOf(dirOptions.isolated) !== 'boolean'
		) {
			return { isolated: self.$isolated() };
		}
	})();

	return path.join(
		self.state(dirOptions_),
		`${dirOptions_.isolated ? '' : `${self.$name()}-`} + 'log'`,
	);
};

function showObjectEntries(obj) {
	const strings = Object.keys(obj).map((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		return `${key} = ${val}`;
	});
	return strings.join('\n');
}

console.log({ appPaths: xdgAppPaths });
console.log(showObjectEntries(xdgAppPaths));

console.log('appPaths.log():', xdgAppPaths.log());
console.log('appPaths.log(false):', xdgAppPaths.log(false));
console.log('appPaths.log(true):', xdgAppPaths.log(true));

// eslint-disable-next-line functional/immutable-data
process.env.XDG_CONFIG_HOME = void 0;
// eslint-disable-next-line functional/no-let
let p = require(xdgAppPathsModulePath)('dross');

console.log({ p });
console.log(showObjectEntries(p));

p = require(xdgAppPathsModulePath)({ suffix: '-nodejs' });

console.log({ p });
console.log(showObjectEntries(p));

p = require(xdgAppPathsModulePath)({ name: 'extraordinaire', suffix: '-nodejs' });

console.log({ p });
console.log(showObjectEntries(p));

p = require(xdgAppPathsModulePath)({ name: 'fluffy', isolated: false });

console.log({ p });
console.log(showObjectEntries(p));

/* eslint-enable no-console , security-node/detect-crlf , security-node/detect-non-literal-require-calls , security/detect-object-injection */
