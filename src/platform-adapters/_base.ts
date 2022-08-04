// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Platform {
	export type ParsedPath = {
		readonly base: string;
		readonly dir: string;
		readonly ext: string;
		readonly name: string;
		readonly root: string;
	};
	export type Adapter = {
		readonly atImportPermissions: {
			/** Is general environment access granted at module import time?
			- note: used for graceful degradation, but this grant is *required* for unimpaired module functionality
			- always `true` for non-Deno platforms
			*/
			readonly env?: boolean;
			/** Is general file system read access granted at module import time?
			- note: used for graceful degradation, but this grant is *required* for unimpaired module functionality
			- always `true` for non-Deno platforms
			*/
			readonly read?: boolean;
		};
		readonly meta: {
			readonly mainFilename: () => string | undefined;
			readonly pkgMainFilename: () => string | undefined;
		};
		readonly path: {
			/** Path list delimiter */
			readonly delimiter: string;
			/** @function Returns all path segments, joined using the platform-specific separator, and normalized. */
			readonly join: (...paths: readonly string[]) => string;
			/** @function Returns the normalized path, resolving all `.` and `..` segments. */
			readonly normalize: (path: string) => string;
			/** @function Returns an object whose properties represent significant elements of the `path`. */
			readonly parse: (path: string) => ParsedPath;
		};
		readonly process: {
			/** OS/platform identity string */
			readonly platform: string;
		};
		readonly xdg: {
			/** @function Returns the directory path for user-specific non-essential (ie, cached) data files. */
			readonly cache: () => string;
			/** @function Returns the directory path for user-specific configuration files.	*/
			readonly config: () => string;
			/** @function Returns directory path for user-specific data files. */
			readonly data: () => string;
			/**	@function Returns the directory path for user-specific non-essential runtime files (such as sockets, named pipes, etc); may be `undefined`. */
			readonly runtime: () => string | undefined;
			/** @function Returns the directory path for user-specific state files (non-essential and more volatile than configuration files). */
			readonly state: () => string;
			/** @function Returns a preference-ordered array of base directory paths to search for configuration files (includes `.config()` directory as first entry). */
			readonly configDirs: () => readonly string[];
			/** @function Returns a preference-ordered array of base directory paths to search for data files (includes `.data()` directory as first entry). */
			readonly dataDirs: () => readonly string[];
		};
	};
}
