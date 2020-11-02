/* eslint-env es6, node */
// spell-checker:ignore (modules) execa
'use strict';

const path = require('path');

const test = require('ava');
const spawn = require('cross-spawn');

const module_ = require('../src/lib');

// Integration tests

test('api', t => {
	const paths = module_;
	const api = [
		'$name',
		'$isolated',
		'cache',
		'config',
		'data',
		'runtime',
		'state',
		'configDirs',
		'dataDirs'
	];

	t.is(typeof paths, 'function');
	t.is(Object.keys(paths).length, api.length);
	api.forEach(key => {
		t.is(typeof paths[key], 'function');
	});
});

test('correctly derive script name (JavaScript/CJS)', t => {
	const command = 'node';
	const script = 'test/fixtures/cli-display-name.js';
	const args = [script];
	const options = {shell: true};

	const {error, status, stdout, stderr} = spawn.sync(command, args, options);

	t.log('error=', error);
	t.log('status=', status);
	t.log('stdout=', stdout);
	t.log('stdout.toString()=', stdout.toString().trim());
	t.log('stderr=', stderr);

	t.is(stdout.toString().trim(), path.parse(script).name);
});
