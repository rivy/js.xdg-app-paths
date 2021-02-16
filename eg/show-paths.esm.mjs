// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

import path from 'path';
import { inspect } from 'util';

/* eslint-disable functional/immutable-data , no-console , security-node/detect-crlf , security/detect-object-injection */

import xdgAppPaths from '../dist/cjs/esm-wrapper/mod.esm.js';

function objectEntries(obj) {
	const map = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

// Extend appPaths with a "log" location function
xdgAppPaths.log = function (dirOptions = null) {
	const self = xdgAppPaths; // * bind `self` to `appPaths` => avoids `this` variability due to caller context
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

console.log({ appPaths: xdgAppPaths });
console.log(showObjectEntries(xdgAppPaths));

console.log('appPaths.log():', xdgAppPaths.log());
console.log('appPaths.log(false):', xdgAppPaths.log(false));
console.log('appPaths.log(true):', xdgAppPaths.log(true));

delete process.env.XDG_CONFIG_HOME;
// eslint-disable-next-line functional/no-let
let p = xdgAppPaths('dross');

console.log('p:', inspect(p));
console.log(objectEntries(p));

p = xdgAppPaths({ suffix: '-nodejs' });

console.log('p:', inspect(p));
console.log(objectEntries(p));

p = xdgAppPaths({ name: 'extraordinaire', suffix: '-nodejs' });

console.log('p:', inspect(p));
console.log(objectEntries(p));

p = xdgAppPaths({ name: 'fluffy', isolated: false });

console.log('p:', inspect(p));
console.log(objectEntries(p));

/* eslint-enable functional/immutable-data , no-console , security-node/detect-crlf , security/detect-object-injection */
