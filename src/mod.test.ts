// deno-fmt-ignore-file ## prefer customized `prettier` formatting

import test from 'ava';

import mESM from './mod.esm.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mCJS = require('./mod.cjs.js');

test('CJS <=> ESM', (t) => {
	t.deepEqual(JSON.stringify(mCJS), JSON.stringify(mESM));

	const api = [
		'cache',
		'config',
		'data',
		'runtime',
		'state',
		'configDirs',
		'dataDirs',
		'$name',
		'$isolated',
	];

	t.is(typeof mCJS, 'function');
	t.is(typeof mCJS, typeof mESM);
	t.is(Object.keys(mCJS).length, api.length);
	t.is(Object.keys(mCJS).length, Object.keys(mESM).length);
	api.forEach((key) => {
		/* eslint-disable @typescript-eslint/no-explicit-any , security/detect-object-injection */
		t.is(typeof mCJS[key], 'function');
		t.is(typeof mCJS[key], typeof (mESM as any)[key]);
		t.deepEqual(mCJS[key](), (mESM as any)[key]());
		/* eslint-enable @typescript-eslint/no-explicit-any , security/detect-object-injection */
	});
});
