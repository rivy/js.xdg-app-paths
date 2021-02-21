// deno-fmt-ignore-file ## prefer customized `prettier` formatting

// * `deno` permission requirements
// --allow-env (transitive from 'xdg-app-paths')
// --allow-read

/* eslint-disable @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any , functional/immutable-data , import/order , no-console , security-node/detect-crlf , security/detect-object-injection */

// @ts-ignore
import * as path from 'https://deno.land/std@0.87.0/path/mod.ts';

/// <reference path='../vendor/types/deno.d.ts'/>

// @ts-ignore
const deno = Deno;

const inspect = deno.inspect;

// @ts-ignore
import xdgAppPaths from 'https://deno.land/x/xdg_app_paths@v7.0.0/src/mod.deno.ts';
// @ts-ignore
import type { DirOptions, XDGAppPaths } from '../src/mod.deno.ts';

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

deno.env.delete('XDG_CONFIG_HOME');
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

/* eslint-enable @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any , functional/immutable-data , import/order , no-console , security-node/detect-crlf , security/detect-object-injection */
