import path from 'path';
import { inspect } from 'util';

/* eslint-disable @typescript-eslint/no-explicit-any , functional/immutable-data , no-console , security-node/detect-crlf , security/detect-object-injection */

import xdgAppPaths from '../dist/cjs/mod.cjs';
import type { DirOptions, XDGAppPaths } from '../src/mod.esm';

function objectEntries(obj: any) {
	const map: any = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

// eslint-disable-next-line functional/prefer-readonly-type
type XDGAppPathsWithLog = XDGAppPaths & { log: (dirOptions?: DirOptions | boolean) => string };

// Extend appPaths with a "log" location
(xdgAppPaths as XDGAppPathsWithLog).log = function log(dirOptions?: DirOptions | boolean) {
	const self = xdgAppPaths;
	dirOptions = dirOptions ?? { isolated: self.$isolated() };
	const isolated = typeof dirOptions === 'boolean' ? dirOptions : dirOptions.isolated || true;
	return path.join(self.state(isolated), (isolated ? '' : self.$name() + '-') + 'log');
};

console.log('appPaths:', inspect(xdgAppPaths));
console.log('appPaths.state(false):', xdgAppPaths.state(false));
console.log('appPaths.state(true):', xdgAppPaths.state(true));
console.log(objectEntries(xdgAppPaths));
console.log('appPaths.log(false):', (xdgAppPaths as XDGAppPathsWithLog).log(false));
console.log('appPaths.log(true):', (xdgAppPaths as XDGAppPathsWithLog).log(true));

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

/* eslint-enable @typescript-eslint/no-explicit-any , functional/immutable-data , no-console , security-node/detect-crlf , security/detect-object-injection */
