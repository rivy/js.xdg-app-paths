'use strict';
const path = require('path');
const os = require('os');

const homedir = os.homedir();
const tmpdir = os.tmpdir();
const {env} = process;

const macos = name => {
	const library = path.join(homedir, 'Library');

	return {
		cache: path.join(library, 'Caches', name),
		config: path.join(library, 'Preferences', name),
		data: path.join(library, 'Application Support', name),
		log: path.join(library, 'Logs', name),
		temp: path.join(tmpdir, name)
	};
};

const windows = name => {
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');

	return {
		// Data/config/cache/log are invented by me as Windows isn't opinionated about this
		cache: path.join(localAppData, name, 'Cache'),
		config: path.join(appData, name, 'Config'),
		data: path.join(localAppData, name, 'Data'),
		log: path.join(localAppData, name, 'Log'),
		temp: path.join(tmpdir, name)
	};
};

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
const linux = name => {
	const username = path.basename(homedir);

	return {
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, '.cache'), name),
		config: path.join(env.XDG_CONFIG_HOME || path.join(homedir, '.config'), name),
		data: path.join(env.XDG_DATA_HOME || path.join(homedir, '.local', 'share'), name),
		// https://wiki.debian.org/XDGBaseDirectorySpecification#state
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
