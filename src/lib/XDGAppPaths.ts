// # spell-checker:ignore macos APPDATA LOCALAPPDATA tempdir
/* eslint-env es6, node */
'use strict';

import path from 'path';

import xdg from 'xdg-portable';

type Options = {
	readonly name?: string | null;
	readonly suffix?: string | null;
	readonly isolated?: boolean | null;
};

type DirOptions = {
	readonly isolated?: boolean | null;
};

type XDGAppPaths = {
	new (options?: Options | string): XDGAppPaths;
	(options?: Options | string): XDGAppPaths;
	readonly $name: () => string;
	readonly $isolated: () => boolean;
	readonly cache: (dirOptions?: DirOptions | boolean) => string;
	readonly config: (dirOptions?: DirOptions | boolean) => string;
	readonly data: (dirOptions?: DirOptions | boolean) => string;
	readonly runtime: (dirOptions?: DirOptions | boolean) => string | undefined;
	readonly state: (dirOptions?: DirOptions | boolean) => string;
	readonly configDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
	readonly dataDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
};

function isBoolean<T>(t: T | boolean): t is boolean {
	return typeOf(t) === 'boolean';
}

function isObject<T>(t: T | Record<string, unknown>): t is Record<string, unknown> {
	return typeOf(t) === 'object';
}

function isString<T>(t: T): boolean {
	return typeOf(t) === 'string';
}

function typeOf<T>(t: T): string {
	return typeof t;
}

// eslint-disable-next-line functional/no-class
class XDGAppPaths_ {
	constructor(options: Options = {}) {
		function XDGAppPaths(options: Options = {}): XDGAppPaths {
			return new XDGAppPaths_(options) as XDGAppPaths;
		}

		if (!isObject(options)) {
			options = { name: options };
		}

		const suffix = options.suffix ?? '';
		const isolated_ = options.isolated ?? true;

		// derive a suitable application name (ref: <https://stackoverflow.com/a/46110961/43774>)
		// * `require.main.filename`, should be usually available; fallback to `process.execPath` when necessary
		// ToDO: add ES6/ESM (.mjs) module compatibility for name generation (lacks `require`; see `yargs` for possibilities using `import.meta.url`)
		const name_ = path.parse(
			([options.name, require && require.main && require.main.filename].find((e) => isString(e)) ??
				process.execPath) + (suffix ?? '')
		).name;

		XDGAppPaths.$name = function $name() {
			return name_;
		};
		XDGAppPaths.$isolated = function $isolated() {
			return isolated_;
		};

		XDGAppPaths.cache = function cache(dirOptions?: DirOptions | boolean) {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.cache(), isolated ? (name_ as string) : '');
		};

		XDGAppPaths.config = function config(dirOptions?: DirOptions | boolean) {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.config(), isolated ? (name_ as string) : '');
		};

		XDGAppPaths.data = function data(dirOptions?: DirOptions | boolean) {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.data(), isolated ? (name_ as string) : '');
		};

		XDGAppPaths.runtime = function runtime(dirOptions?: DirOptions | boolean) {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.runtime()
				? path.join(xdg.runtime() as string, isolated ? (name_ as string) : '')
				: void 0;
		};

		XDGAppPaths.state = function state(dirOptions?: DirOptions | boolean) {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.state(), isolated ? (name_ as string) : '');
		};

		XDGAppPaths.configDirs = function configDirs(
			dirOptions?: DirOptions | boolean
		): readonly string[] {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.configDirs().map((s: string) => path.join(s, isolated ? (name_ as string) : ''));
		};

		XDGAppPaths.dataDirs = function dataDirs(dirOptions?: DirOptions | boolean): readonly string[] {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.dataDirs().map((s: string) => path.join(s, isolated ? (name_ as string) : ''));
		};

		return XDGAppPaths as XDGAppPaths;
	}
}

export type { Options, DirOptions, XDGAppPaths };
export default new XDGAppPaths_() as XDGAppPaths;
