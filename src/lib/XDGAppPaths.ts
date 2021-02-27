// # spell-checker:ignore APPDATA LOCALAPPDATA MacOS tempdir
/* eslint-env es6, node */
'use strict';

import { Platform } from '../platform-adapters/_base.js';

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

/** Configuration options supplied to `XDGAppPaths` methods */
// eslint-disable-next-line functional/prefer-type-literal
interface DirOptions {
	/** Isolation flag; used to override the default isolation mode, when needed. */
	readonly isolated?: boolean | null;
}

/** Configuration options supplied when constructing `XDGAppPaths` */
// eslint-disable-next-line functional/prefer-type-literal
interface Options {
	/** Name of the application; used to generate isolated application paths.
	> When missing (`undefined`), `null`, or empty (`''`), it is generated automatically from the process main file name, where determinable.
	> "$eval" is used as a final fallback value when the application name cannot otherwise be determined.
	*/
	readonly name?: string | null;
	/** Suffix which is appended to the application name when generating the application paths. */
	readonly suffix?: string | null;
	/** Default isolation flag (used when no isolation flag is supplied for `DirOptions`). */
	readonly isolated?: boolean | null;
}

/** `XDGAppPaths` (API) - Determine (XDG-compatible) paths for storing application files (cache, config, data, etc) */
// eslint-disable-next-line functional/prefer-type-literal
interface XDGAppPaths {
	/** Create an `XDGAppPaths` object (a preceding `new` is optional). */
	(options?: Options | string): XDGAppPaths;

	/** Create an `XDGAppPaths` object (`new` is optional). */
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (options?: Options | string): XDGAppPaths;

	/* eslint-disable functional/no-method-signature */

	/** Returns the directory for non-essential data files.
	> Deletion of the data contained here might cause an application to slow down.
	*/
	cache(dirOptions?: DirOptions | boolean): string;

	/** Returns the directory for config files.
	> Deletion of the data contained here might require the user to reconfigure an application.
	*/
	config(dirOptions?: DirOptions | boolean): string;

	/** Returns the directory for data files.
	> Deletion of the data contained here might force the user to restore from backups.
	*/
	data(dirOptions?: DirOptions | boolean): string;

	/** Returns the directory for runtime files; may return `undefined`.
	> Deletion of the data contained here might interfere with a currently executing application but should have no effect on future executions.
	*/
	runtime(dirOptions?: DirOptions | boolean): string | undefined;

	/** Returns the directory for state files.
	> Deletion of the data contained here should not materially interfere with execution of an application.
	*/
	state(dirOptions?: DirOptions | boolean): string;

	/** Returns a priority-sorted list of possible directories for configuration file storage (includes `paths.config()` as the first entry). */
	configDirs(dirOptions?: DirOptions | boolean): readonly string[];

	/** Returns a priority-sorted list of possible directories for data file storage (includes `paths.data()` as the first entry). */
	dataDirs(dirOptions?: DirOptions | boolean): readonly string[];

	/** Application name used for path construction (from supplied configuration or auto-generated). */
	$name(): string;
	/** Default isolation mode used by the particular `XDGAppPaths` instance. */
	$isolated(): boolean;

	/* eslint-enable functional/no-method-signature */
}

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

function Adapt(adapter_: Platform.Adapter): { readonly XDGAppPaths: XDGAppPaths } {
	const { meta, path, xdg } = adapter_;
	// eslint-disable-next-line functional/no-class
	class XDGAppPaths_ {
		constructor(options_: Options | string = {}) {
			function XDGAppPaths(options: Options | string = {}): XDGAppPaths {
				return new XDGAppPaths_(options) as XDGAppPaths;
			}

			const options = (isObject(options_) ? options_ : { name: options_ }) as Options;

			const suffix = options.suffix ?? '';
			const isolated_ = options.isolated ?? true;

			// derive a suitable application name
			const namePriorityList: ReadonlyArray<string | null | undefined> = [
				options.name,
				meta.pkgMainFilename(),
				meta.mainFilename(),
			];
			const nameFallback = '$eval';
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

	return { XDGAppPaths: new XDGAppPaths_() as XDGAppPaths };
}

export type { DirOptions, Options, XDGAppPaths };
export { Adapt };
