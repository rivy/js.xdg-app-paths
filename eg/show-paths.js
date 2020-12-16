// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const path = require('path');

const xdgAppPathsModulePath = '../src/lib';

const appPaths = require(xdgAppPathsModulePath);

// Extend appPaths with a "log" location function
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

console.log({ appPaths });
Object.entries(appPaths).forEach((entry) => {
	const [key, value] = entry;
	const val = typeof value === 'function' ? value() : value;
	console.log(key, '=', val);
});

console.log('appPaths.log():', appPaths.log());
console.log('appPaths.log(false):', appPaths.log(false));
console.log('appPaths.log(true):', appPaths.log(true));

delete process.env.XDG_CONFIG_HOME;
let p = require(xdgAppPathsModulePath)('dross');

console.log({ p });
Object.entries(p).forEach((entry) => {
	const [key, value] = entry;
	const val = typeof value === 'function' ? value() : value;
	console.log(key, '=', val);
});

p = require(xdgAppPathsModulePath)({ suffix: '-nodejs' });

console.log({ p });
Object.entries(p).forEach((entry) => {
	const [key, value] = entry;
	const val = typeof value === 'function' ? value() : value;
	console.log(key, '=', val);
});

p = require(xdgAppPathsModulePath)({ name: 'extraordinaire', suffix: '-nodejs' });

console.log({ p });
Object.entries(p).forEach((entry) => {
	const [key, value] = entry;
	const val = typeof value === 'function' ? value() : value;
	console.log(key, '=', val);
});

p = require(xdgAppPathsModulePath)({ name: 'fluffy', isolated: false });

console.log({ p });
Object.entries(p).forEach((entry) => {
	const [key, value] = entry;
	const val = typeof value === 'function' ? value() : value;
	console.log(key, '=', val);
});
