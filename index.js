'use strict';
const path = require('path');
const os = require('os');

const homedir = os.homedir();
const tmpdir = os.tmpdir();
const {env} = process;

//# ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
//# ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>

const macos = name => {
	const library = path.join(homedir, 'Library');

	return {
		cache: env.XDG_CACHE_HOME ? path.join(env.XDG_CACHE_HOME, name) : path.join(library, 'Caches', name),
		config: env.XDG_CONFIG_HOME ? path.join(env.XDG_CONFIG_HOME, name) : path.join(library, 'Preferences', name),
		data: env.XDG_DATA_HOME ? path.join(env.XDG_DATA_HOME, name) : path.join(library, 'Application Support', name),
		log: env.XDG_STATE_HOME ? path.join(env.XDG_STATE_HOME, name) : path.join(library, 'Logs', name),
		temp: path.join(tmpdir, name)
	};
};

const windows = name => {
	// #ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');			// "AppData/Roaming" data *may* follow user between machines
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');	// "AppData/Local" is local-machine-only user data

	return {
		// Locations for data/config/cache/log are invented (Windows doesn't have a popular convention)
		cache: env.XDG_CACHE_HOME ? path.join(env.XDG_CACHE_HOME, name) : path.join(localAppData, name, 'Cache'),
		config: env.XDG_CONFIG_HOME ? path.join(env.XDG_CONFIG_HOME, name) : path.join(appData, name, 'Config'),
		data: env.XDG_DATA_HOME ? path.join(env.XDG_DATA_HOME, name) : path.join(appData, name, 'Data'),
		log: env.XDG_STATE_HOME ? path.join(env.XDG_STATE_HOME, name) : path.join(localAppData, name, 'Log'),
		temp: path.join(tmpdir, name)
	};
};

const linux = name => {
	const username = path.basename(homedir);

	return {
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, '.cache'), name),
		config: path.join(env.XDG_CONFIG_HOME || path.join(homedir, '.config'), name),
		data: path.join(env.XDG_DATA_HOME || path.join(homedir, '.local', 'share'), name),
		log: path.join(env.XDG_STATE_HOME || path.join(homedir, '.local', 'state'), name),
		temp: path.join(tmpdir, username, name)
	};
};

const osPaths = (name, options) => {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected string, got ${typeof name}`);
	}

	options = Object.assign({suffix: 'nodejs'}, options);

	if (options.suffix) {
		// Add suffix to prevent possible conflict with native apps
		name += `-${options.suffix}`;
	}

	if (process.platform === 'darwin') {
		return macos(name);
	}

	if (process.platform === 'win32') {
		return windows(name);
	}

	return linux(name);
};

module.exports = osPaths;
// #TODO: Remove this for the next major release
module.exports.default = osPaths;
