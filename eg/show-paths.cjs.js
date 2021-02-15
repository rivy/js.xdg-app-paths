// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const path = require('path');

/* eslint-disable no-console , security-node/detect-crlf , security-node/detect-non-literal-require-calls , security/detect-non-literal-require , security/detect-object-injection */

const xdgAppPathsModulePath = '../dist/cjs/mod.cjs.js';

const appPaths = require(xdgAppPathsModulePath);

// Extend appPaths with a "log" location function
// eslint-disable-next-line functional/immutable-data
appPaths.log = function (dirOptions = null) {
	const self = appPaths; // * bind `self` to `appPaths` => avoids `this` variability due to caller context
	function typeOf(x) {
		// * use avoids circumvention of eslint variable tracking for `x`
		return typeof x;
	}

	if (typeOf(dirOptions) === 'boolean') {
		dirOptions = { isolated: dirOptions };
	}

	if (
		typeOf(dirOptions) !== 'object' ||
		dirOptions === null ||
		typeOf(dirOptions.isolated) !== 'boolean'
	) {
		dirOptions = { isolated: self.$isolated() };
	}

	return path.join(self.state(dirOptions), (dirOptions.isolated ? '' : self.$name() + '-') + 'log');
};

function showObjectEntries(obj) {
	var strings = [];
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		strings.push(key + ' = ' + val);
	});
	return strings.join('\n');
}

console.log({ appPaths });
console.log(showObjectEntries(appPaths));

console.log('appPaths.log():', appPaths.log());
console.log('appPaths.log(false):', appPaths.log(false));
console.log('appPaths.log(true):', appPaths.log(true));

// eslint-disable-next-line functional/immutable-data
delete process.env.XDG_CONFIG_HOME;
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

/* eslint-enable no-console , security-node/detect-crlf , security-node/detect-non-literal-require-calls , security/detect-non-literal-require , security/detect-object-injection */
