/* eslint-env es6, node */
'use strict';

import path from 'path';

import test from 'ava';

import _module from '.';

const isWinOS = (/^win/i.test(process.platform));

function regexpEscape(s) {
	return s.replace(/\W/g, '\\$&');
}

function xdgPathRegex(name) {
	return new RegExp(
		'(^|' + regexpEscape(path.sep) + ')' + regexpEscape(name) +
		'(' +
		// For windows, `name` may be embedded within the generated paths (instead of always trailing as in MacOS/*nix)
		(isWinOS ? (regexpEscape(path.sep) + '|') : '') +
		'$)'
	);
}

test('api', t => {
	const paths = _module;
	const api = ['cache', 'config', 'data', 'runtime', 'state', 'temp', 'configDirs', 'dataDirs', '$name', '$isolated'];
	t.is(typeof paths, 'function');
	t.is(Object.entries(paths).length, api.length);
	api.forEach(key => {
		t.is(typeof paths[key], 'function');
	});
});

test('default', t => {
	const paths = _module;
	const regex = xdgPathRegex(paths.$name());
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('alternate constructor (via function)', t => {
	const paths = _module('a');
	const regex = xdgPathRegex(paths.$name());
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('alternate constructor (via new())', t => {
	const paths = new _module('aa');
	const regex = xdgPathRegex(paths.$name());
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('alternate constructor (via new)', t => {
	const paths = new _module; // eslint-disable-line new-parens
	const regex = xdgPathRegex(paths.$name());
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('chosen application name', t => {
	const name = 'aardvark';
	const paths = _module(name);
	const regex = xdgPathRegex(name);
	t.is(paths.$name(), name);
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('chosen suffix', t => {
	const suffix = '-nodejs';
	const paths = _module({suffix});
	const regex = xdgPathRegex(paths.$name());
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('chosen application name + suffix', t => {
	const name = 'behemoth';
	const suffix = '-nodejs';
	const paths = _module({name, suffix});
	const regex = xdgPathRegex(paths.$name());
	t.is(paths.$name(), name + suffix);
	for (const [key, value] of Object.entries(paths)) {
		const values = [].concat(value()); // Convert value (single value or array) to a flat array
		t.log(key, ':', value());
		for (const v of values) {
			if (!key.match(/^(([$].*)|runtime)$/) && (typeof v !== 'undefined')) {
				t.regex(v, regex, `${key}:${v}`);
			}
		}
	}
});

test('correct paths with XDG_*_HOME set', t => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME'
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	for (const env of Object.values(envVars)) {
		process.env[env] = path.join('.', env);
	}

	const name = 'canticle';
	const paths = _module(name);

	for (const [key, value] of Object.entries(paths)) {
		t.log(key, ':', value());
	}

	for (const env of Object.keys(envVars)) {
		const expectedPath = process.env[envVars[env]];
		t.true((paths[env])().startsWith(expectedPath) && (paths[env])().endsWith(name));
	}
});

test('correct "isolated" paths with XDG_*_HOME set', t => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME'
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	for (const env of Object.values(envVars)) {
		process.env[env] = path.join('.', env);
	}

	const name = 'debacle';
	const isolated = true;
	const paths = _module({name, isolated});

	for (const [key, value] of Object.entries(paths)) {
		t.log(key, ':', value());
	}

	t.is(paths.$isolated(), isolated);
	for (const env of Object.keys(envVars)) {
		const expectedPath = process.env[envVars[env]];
		t.is((paths[env])(), path.join(expectedPath, name));
	}
});

test('correct private ("non-isolated") paths with XDG_*_HOME set', t => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME'
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	for (const env of Object.values(envVars)) {
		process.env[env] = path.join('.', env);
	}

	const name = 'excalibur';
	const isolated = false;
	const paths = _module({name, isolated});

	for (const [key, value] of Object.entries(paths)) {
		t.log(key, ':', value());
	}

	t.is(paths.$isolated(), isolated);
	for (const env of Object.keys(envVars)) {
		const expectedPath = process.env[envVars[env]];
		t.is((paths[env])(), expectedPath);
	}
});

test('correct paths with XDG_* set', t => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		runtime: 'XDG_RUNTIME_DIR',
		state: 'XDG_STATE_HOME',
		configDirs: 'XDG_CONFIG_DIRS',
		dataDirs: 'XDG_DATA_DIRS'
	};
	for (const env of Object.values(envVars)) {
		process.env[env] = path.join('.', env);
	}

	const name = 'crux';
	const paths = _module(name);

	for (const [key, value] of Object.entries(paths)) {
		t.log(key, ':', value());
	}

	for (const env of Object.keys(envVars)) {
		const expectedPath = process.env[envVars[env]];
		const path = (typeof paths[env]() === 'string') ? paths[env]() : paths[env]()[1];
		t.true(path.startsWith(expectedPath) && path.endsWith(name));
	}
});

test('construction throws with bad arguments', t => {
	t.throws(() => _module(-1), {instanceOf: TypeError, message: /^Expected string for "name"/i});
	t.throws(() => _module({name: -1}), {instanceOf: TypeError, message: /^Expected string for "name"/i});
	t.throws(() => _module({suffix: -1}), {instanceOf: TypeError, message: /^Expected string for "suffix"/i});
	t.throws(() => _module({isolated: -1}), {instanceOf: TypeError, message: /^Expected boolean for "isolated"/i});
});

test('methods throw with bad arguments', t => {
	const paths = _module();
	t.throws(() => paths.config(-1), {instanceOf: TypeError, message: /^Expected boolean for "isolated"/i});
	t.throws(() => paths.config({isolated: -1}), {instanceOf: TypeError, message: /^Expected boolean for "isolated"/i});
});
