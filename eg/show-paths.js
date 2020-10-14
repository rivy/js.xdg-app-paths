// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const path = require('path');
const util = require('util');
const _ = require('lodash') || undefined;

const xdgAppPathsModulePath = '../src/lib';

const appPaths = require(xdgAppPathsModulePath);

// Extend appPaths with a "log" location
appPaths.log = (options = {isolated: appPaths.$isolated()}) => {
	if (typeof options === 'boolean') {
		options = {isolated: options};
	}

	const isolated = ((options.isolated === undefined) || (options.isolated === null)) ? appPaths.$isolated() : options.isolated;
	return path.join(appPaths.state(options), (isolated ? '' : appPaths.$name() + '-') + 'log');
};

console.log('appPaths:', util.inspect(appPaths));
if (_) {
	_.each(appPaths, (value, key) => {
		console.log(key, '=', appPaths[key]());
	});
}
// # console.log('appPaths.log(false):', appPaths.log(false));
// # console.log('appPaths.log(true):', appPaths.log(true));

delete process.env.XDG_CONFIG_HOME;
let p = require(xdgAppPathsModulePath)('dross');

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({suffix: '-nodejs'});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({name: 'extraordinaire', suffix: '-nodejs'});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require(xdgAppPathsModulePath)({name: 'fluffy', isolated: false});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}
