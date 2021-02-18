// # spell-checker:ignore APPDATA LOCALAPPDATA MacOS tempdir
/* eslint-env es6, node */
'use strict';

import path from 'path';

import xdg from 'xdg-portable';

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

type DirOptions = {
	readonly isolated?: boolean | null;
};

type Options = {
	readonly name?: string | null;
	readonly suffix?: string | null;
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

const requireMain =
	typeof require !== 'undefined' && require !== null && require.main
		? require.main
		: { filename: void 0 };
const requireMainFilename = requireMain.filename;
const mainFilename =
	// HACK: additional comparison `require?.main?.filename !== process.execArgv[0]` compensates for ESM scripts run via `ts-node`
	(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
	// HACK: `process._eval` is undocumented; used here (again, for ESM) as evidence of `node -e ...` differentiating between immediate eval vs file-bound scripts
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(typeof (process as any)._eval === 'undefined' ? process.argv[1] : void 0);

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

		// derive a suitable application name
		const namePriorityList = [options.name, mainFilename];
		const nameFallback = 'an-anonymous-script';
		const name = path.parse((namePriorityList.find((e) => isString(e)) ?? nameFallback) + suffix)
			.name;

		XDGAppPaths.$name = function $name() {
			return name;
		};
		XDGAppPaths.$isolated = function $isolated() {
			return isolated_;
		};

		function isIsolated(dirOptions?: DirOptions | boolean): boolean {
			dirOptions = dirOptions ?? { isolated: isolated_ };
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated ?? isolated_;
			return isolated;
		}

		function finalPathSegment(dirOptions?: DirOptions | boolean): string {
			return isIsolated(dirOptions) ? name : '';
		}

		XDGAppPaths.cache = function cache(dirOptions?: DirOptions | boolean) {
			return path.join(xdg.cache(), finalPathSegment(dirOptions));
		};

		XDGAppPaths.config = function config(dirOptions?: DirOptions | boolean) {
			return path.join(xdg.config(), finalPathSegment(dirOptions));
		};

		XDGAppPaths.data = function data(dirOptions?: DirOptions | boolean) {
			return path.join(xdg.data(), finalPathSegment(dirOptions));
		};

		XDGAppPaths.runtime = function runtime(dirOptions?: DirOptions | boolean) {
			return xdg.runtime()
				? path.join(xdg.runtime() as string, finalPathSegment(dirOptions))
				: void 0;
		};

		XDGAppPaths.state = function state(dirOptions?: DirOptions | boolean) {
			return path.join(xdg.state(), finalPathSegment(dirOptions));
		};

		XDGAppPaths.configDirs = function configDirs(dirOptions?: DirOptions | boolean) {
			return xdg
				.configDirs()
				.map((s) => path.join(s, finalPathSegment(dirOptions))) as readonly string[];
		};

		XDGAppPaths.dataDirs = function dataDirs(dirOptions?: DirOptions | boolean) {
			return xdg
				.dataDirs()
				.map((s) => path.join(s, finalPathSegment(dirOptions))) as readonly string[];
		};

		return XDGAppPaths as XDGAppPaths;
	}
}

export type { DirOptions, Options, XDGAppPaths };
export default new XDGAppPaths_() as XDGAppPaths;
