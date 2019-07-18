// # spell-checker:ignore rivy
declare namespace xdgAppPaths {
	export interface Paths {
		/**
		Directory for non-essential data files.
		*/
		cache(): string;

		/**
		Directory for data files.
		*/
		config(): string;

		/**
		Directory for data files.
		*/
		data(): string;

		runtime(): string | undefined;

		/**
		Directory for state files.
		*/
		state(): string;

		/**
		Directory for temporary files.
		*/
		temp(): string;

		configDirs(): string[];
		dataDirs(): string[];
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
	(name: string): xdgAppPaths.Paths;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function xdgAppPaths(name: string, options?: xdgAppPaths.Options): xdgAppPaths.Paths;
	// export = xdgAppPaths;
	default: typeof xdgAppPaths;
};

export = xdgAppPaths;
