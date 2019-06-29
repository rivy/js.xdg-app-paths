// # spell-checker:ignore macos APPDATA LOCALAPPDATA

'use strict';
const path = require('path');
const os = require('os');

const homedir = os.homedir();
const tmpdir = os.tmpdir();
const {env} = process;

// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>

const macos = name => {
	const library = path.join(homedir, 'Library');

	const _config = path.join(env.XDG_CONFIG_HOME ? env.XDG_CONFIG_HOME : path.join(library, 'Preferences'), name);
	const _data = path.join(env.XDG_DATA_HOME ? env.XDG_DATA_HOME : path.join(library, 'Application Support'), name);

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	return {
		cache: env.XDG_CACHE_HOME ? path.join(env.XDG_CACHE_HOME, name) : path.join(library, 'Caches', name),
		config: _config,
		data: _data,
		log: env.XDG_STATE_HOME ? path.join(env.XDG_STATE_HOME, name) : path.join(library, 'Logs', name),
		temp: path.join(tmpdir, name),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const windows = name => {
	// #ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data

	const _config = env.XDG_CONFIG_HOME ? path.join(env.XDG_CONFIG_HOME, name) : path.join(appData, name, 'Config');
	const _data = env.XDG_DATA_HOME ? path.join(env.XDG_DATA_HOME, name) : path.join(appData, name, 'Data');

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	return {
		// Locations for data/config/cache/log are invented (Windows doesn't have a popular convention)
		cache: env.XDG_CACHE_HOME ? path.join(env.XDG_CACHE_HOME, name) : path.join(localAppData, name, 'Cache'),
		config: _config,
		data: _data,
		log: env.XDG_STATE_HOME ? path.join(env.XDG_STATE_HOME, name) : path.join(localAppData, name, 'Log'),
		temp: path.join(tmpdir, name),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const linux = name => {
	const username = path.basename(homedir);

	const _config = path.join(env.XDG_CONFIG_HOME ? env.XDG_CONFIG_HOME : path.join(homedir, '.config'), name);
	const _data = path.join(env.XDG_DATA_HOME ? env.XDG_DATA_HOME : path.join(homedir, '.local', 'share'), name);

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter).map(s => path.join(s, name)));
	}

	return {
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, '.cache'), name),
		config: _config,
		data: _data,
		log: path.join(env.XDG_STATE_HOME || path.join(homedir, '.local', 'state'), name),
		temp: path.join(tmpdir, username, name),
		configDirs: _configDirs,
		dataDirs: _dataDirs
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
