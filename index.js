// # spell-checker:ignore macos APPDATA LOCALAPPDATA

'use strict';

const path = require('path');
const os = require('os');
const xdg = require('xdg-portable');

const homedir = os.homedir();
const tmpdir = os.tmpdir();
const {env} = process;

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

const macos = name => {
	return {
		cache: path.join(xdg.cache, name),
		config: path.join(xdg.config, name),
		data: path.join(xdg.data, name),
		log: path.join(xdg.state, name),
		temp: path.join(tmpdir, name),
		configDirs: xdg.configDirs.map(s => path.join(s, name)),
		dataDirs: xdg.dataDirs.map(s => path.join(s, name))
	};
};

const windows = name => {
	// #  ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	const appData = env.APPDATA || path.join(homedir || tmpdir, 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
	const localAppData = env.LOCALAPPDATA || path.join(homedir || tmpdir, 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data

	const _config = env.XDG_CONFIG_HOME ? path.join(xdg.config, name) : path.join(appData, name, 'Config');
	const _data = env.XDG_DATA_HOME ? path.join(xdg.data, name) : path.join(appData, name, 'Data');

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
		cache: env.XDG_CACHE_HOME ? path.join(xdg.cache, name) : path.join(localAppData, name, 'Cache'),
		config: _config,
		data: _data,
		log: env.XDG_STATE_HOME ? path.join(xdg.state, name) : path.join(localAppData, name, 'Log'),
		temp: path.join(tmpdir, name),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const linux = name => {
	return {
		cache: path.join(xdg.cache, name),
		config: path.join(xdg.config, name),
		data: path.join(xdg.data, name),
		log: path.join(xdg.state, name),
		temp: path.join(tmpdir, name),
		configDirs: xdg.configDirs.map(s => path.join(s, name)),
		dataDirs: xdg.dataDirs.map(s => path.join(s, name))
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
