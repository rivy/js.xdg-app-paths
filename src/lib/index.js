// # spell-checker:ignore macos APPDATA LOCALAPPDATA tempdir
/* eslint-env es6, node */
'use strict';

const path = require('path');

const xdg = require('xdg-portable');

function normalizeOptions_(options, isolated) {
	if (!isObject(options)) {
		options = { isolated: options };
	}

	options = options || {};

	options.isolated =
		options.isolated === undefined || options.isolated === null ? isolated : options.isolated;
	if (!isBoolean(options.isolated)) {
		throw new TypeError(
			`Expected boolean for "isolated" argument, got ${typeOf(options.isolated)}`
		);
	}

	return options;
}

function isBoolean(value) {
	return typeOf(value) === 'boolean';
}

function isObject(value) {
	return typeOf(value) === 'object';
}

function isString(value) {
	return typeOf(value) === 'string';
}

function typeOf(value) {
	return typeof value;
}

class XDGAppPaths_ {
	constructor(options = null) {
		const XDGAppPaths = function (options = null) {
			return new XDGAppPaths_(options).fn;
		};

		if (!isObject(options)) {
			options = { name: options };
		}

		options = options || {};

		options.isolated =
			options.isolated === undefined || options.isolated === null ? true : options.isolated;
		const isolated_ = options.isolated;
		if (!isBoolean(isolated_)) {
			throw new TypeError(`Expected boolean for "isolated" argument, got ${typeOf(isolated_)}`);
		}

		options.suffix = options.suffix === undefined || options.suffix === null ? '' : options.suffix;
		const suffix_ = options.suffix;
		if (!isString(suffix_)) {
			throw new TypeError(`Expected string for "suffix" argument, got ${typeOf(suffix_)}`);
		}

		options.name = options.name === undefined || options.name === null ? '' : options.name;
		let name_ = options.name;
		if (!isString(name_)) {
			throw new TypeError(`Expected string for "name" argument, got ${typeOf(name_)}`);
		}

		// Derive a suitable application name (ref: <https://stackoverflow.com/a/46110961/43774>)
		// * `require.main.filename`, should be usually available; fallback to `process.execPath` when necessary
		// # ToDO: add ES6/ESM (.mjs) module compatibility for name generation (lacks `require`; see `yargs` for possibilities using `import.meta.url`)
		if (!name_) {
			name_ = path.parse((require.main && require.main.filename) || process.execPath).name;
		}

		name_ += suffix_ || '';

		XDGAppPaths.$name = () => name_;
		XDGAppPaths.$isolated = () => isolated_;

		XDGAppPaths.cache = (dirOptions = null) => {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.cache(), isolated ? name_ : '');
		};

		XDGAppPaths.config = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.config(), isolated ? name_ : '');
		};

		XDGAppPaths.data = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.data(), isolated ? name_ : '');
		};

		XDGAppPaths.runtime = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.runtime() ? path.join(xdg.runtime() || '', isolated ? name_ : '') : undefined;
		};

		XDGAppPaths.state = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return path.join(xdg.state(), isolated ? name_ : '');
		};

		XDGAppPaths.configDirs = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.configDirs().map((s) => path.join(s, isolated ? name_ : ''));
		};

		XDGAppPaths.dataDirs = function (dirOptions = null) {
			dirOptions = normalizeOptions_(dirOptions, isolated_);
			const isolated = isBoolean(dirOptions) ? dirOptions : dirOptions.isolated;
			return xdg.dataDirs().map((s) => path.join(s, isolated ? name_ : ''));
		};

		this.fn = XDGAppPaths;
	}
}

module.exports = new XDGAppPaths_().fn;
