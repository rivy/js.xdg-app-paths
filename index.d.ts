// # spell-checker:ignore rivy
declare namespace xdgAppPaths {
	export interface Options {
		/**
		__Don't use this option unless you really have to!__

		Suffix appended to the project name to avoid name conflicts with native apps. Pass an empty string to disable it.

		@default 'nodejs'
		*/
		readonly suffix?: string;
	}

	export interface Paths {
		/**
		Directory for data files.
		*/
		readonly data: string;

		/**
		Directory for data files.
		*/
		readonly config: string;

		/**
		Directory for non-essential data files.
		*/
		readonly cache: string;

		/**
		Directory for log files.
		*/
		readonly log: string;

		/**
		Directory for temporary files.
		*/
		readonly temp: string;
	}
}

declare const xdgAppPaths: {
	/**
	Get OS-specific (and [XDG](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)-compatible) paths for storing things like data, config, cache, etc

	Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

	@param name - Name of your project. Used to generate the paths.
	@returns The paths to use for your project on current OS.

	@example
	```
	import xdgAppPaths = require('xdg-app-paths');

	const paths = xdgAppPaths('MyApp');

	paths.data;
	//(*nix)=> '/home/rivy/.local/share/MyApp-nodejs'

	paths.config
	//(*nix)=> '/home/rivy/.config/MyApp-nodejs'
	```
	*/
	(name: string, options?: xdgAppPaths.Options): xdgAppPaths.Paths;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function xdgAppPaths(name: string, options?: xdgAppPaths.Options): xdgAppPaths.Paths;
	// export = xdgAppPaths;
	default: typeof xdgAppPaths;
};

export = xdgAppPaths;
