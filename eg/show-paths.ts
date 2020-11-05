// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const path = require('path');
const { inspect } = require('util');
const _ = require('lodash') || undefined;
const xdgAppPathsModulePath = '../src/lib';
const appPaths = require(xdgAppPathsModulePath);

// Extend appPaths with a "log" location function
appPaths.log = function (dirOptions = null) {
	function typeOf(x) {
		// Use avoids circumvention of eslint variable tracking for `x`
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
		dirOptions = { isolated: this.$isolated() };
	}

	return path.join(this.state(dirOptions), (dirOptions.isolated ? '' : this.$name() + '-') + 'log');
};

console.log('appPaths:', inspect(appPaths));
if (_) {
	_.each(appPaths, (value, key) => {
		console.log(key, '=', appPaths[key]());
	});
}

console.log('appPaths.log():', appPaths.log());
console.log('appPaths.log(false):', appPaths.log(false));
console.log('appPaths.log(true):', appPaths.log(true));

delete process.env.XDG_CONFIG_HOME;
let p = require(xdgAppPathsModulePath)('dross');

console.log('p:', inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({ suffix: '-nodejs' });

console.log('p:', inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({ name: 'extraordinaire', suffix: '-nodejs' });

console.log('p:', inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({ name: 'fluffy', isolated: false });

console.log('p:', inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}
