// deno-fmt-ignore-file ## prefer customized `prettier` formatting

import path from 'path';
import { inspect } from 'util';

/* eslint-disable functional/immutable-data , no-console , security-node/detect-crlf , security/detect-object-injection */

import xdgAppPaths from '../dist/cjs/mod.cjs';
import type { DirOptions, XDGAppPaths } from '../src/mod.esm';

function objectEntries(obj: unknown) {
	const obj_ = obj as { readonly [key: string]: unknown };
	return Object.keys(obj_).map((key) => {
		const value = obj_[key];
		return typeof value === 'function' ? value() : value;
	});
}

// eslint-disable-next-line functional/prefer-readonly-type
type XDGAppPathsWithLog = XDGAppPaths & { log: (dirOptions?: DirOptions | boolean) => string };

// Extend appPaths with a "log" location
(xdgAppPaths as XDGAppPathsWithLog).log = function log(dirOptions?: DirOptions | boolean) {
	const self = xdgAppPaths;
	const dirOptions_ = dirOptions ?? { isolated: self.$isolated() };
	const isolated = typeof dirOptions_ === 'boolean' ? dirOptions_ : dirOptions_.isolated || true;
	return path.join(self.state(isolated), `${isolated ? '' : `${self.$name()}-`} + 'log'`);
};

console.log('appPaths:', inspect(xdgAppPaths));
console.log('appPaths.state(false):', xdgAppPaths.state(false));
console.log('appPaths.state(true):', xdgAppPaths.state(true));
console.log(objectEntries(xdgAppPaths));
console.log('appPaths.log(false):', (xdgAppPaths as XDGAppPathsWithLog).log(false));
console.log('appPaths.log(true):', (xdgAppPaths as XDGAppPathsWithLog).log(true));

process.env.XDG_CONFIG_HOME = void 0;
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
