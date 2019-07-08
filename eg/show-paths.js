// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const path = require('path');
const util = require('util');
const _ = require('lodash') || undefined;

const appPaths = require('..');

// Extend appPaths with a "log" location
appPaths.log = () => {
	return path.join(appPaths.state(), 'log');
};

console.log('appPaths:', util.inspect(appPaths));
if (_) {
	_.each(appPaths, (value, key) => {
		console.log(key, '=', appPaths[key]());
	});
}

delete process.env.XDG_CONFIG_HOME;
let p = require('..')('dross');

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require('..')({suffix: '-nodejs'});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require('..')({name: 'extraordinaire', suffix: '-nodejs'});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}

p = require('..')({name: 'fluffy', isolated: false});

console.log('p:', util.inspect(p));
if (_) {
	_.each(p, (value, key) => {
		console.log(key, '=', p[key]());
	});
}