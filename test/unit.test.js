/* eslint-disable functional/immutable-data , functional/no-loop-statement , security-node/non-literal-reg-expr , security/detect-non-literal-regexp , security/detect-object-injection */
/* eslint-env es6, node */
'use strict';

const path = require('path');

const test = require('ava');
const spawn = require('cross-spawn');

const module_ = require('../build/tests_/src/mod.cjs.js');

const isWinOS = /^win/i.test(process.platform);

function isDefined(value) {
	return typeOf(value) !== 'undefined';
}

function regexpEscape(s) {
	return s.replace(/\W/g, '\\$&');
}

function typeOf(value) {
	return typeof value;
}

function xdgPathRegex(name) {
	return new RegExp(
		'(^|' +
			regexpEscape(path.sep) +
			')' +
			regexpEscape(name) +
			'(' +
			// for windows, `name` may be embedded within the generated paths (instead of always trailing as in MacOS/*nix)
			(isWinOS ? regexpEscape(path.sep) + '|' : '') +
			'$)'
	);
}

const vNodeJS = process.versions.node.split('.');
const vNodeJSMajor = +vNodeJS[0];
const vNodeJSminor = +vNodeJS[1];

// removal of `--experimental-modules` flag gate for ESM
// ref: [NodeJS-v12.17 changes]<https://github.com/nodejs/node/pull/33197>
// ref: [NodeJS-v13.2 changes]<https://github.com/nodejs/node/pull/30547>
const settledSupportForESMs =
	vNodeJSMajor > 13 ||
	(vNodeJSMajor === 13 && vNodeJSminor >= 2) ||
	(vNodeJSMajor === 12 && vNodeJSminor >= 17);

// # Unit tests

test('default', (t) => {
	const isolated = true;
	const paths = module_;
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('alternate constructor (via function())', (t) => {
	const isolated = true;
	const paths = module_();
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('alternate constructor (via function(...))', (t) => {
	const name = 'albacore';
	const isolated = true;
	const paths = module_(name);
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('alternate constructor (via new())', (t) => {
	const isolated = true;
	const paths = new module_(); // aka, `new module_(undefined)`
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('alternate constructor (via new(...))', (t) => {
	const isolated = true;
	const name = 'behemoth';
	const paths = new module_(name);
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('construct without require.main.filename', (t) => {
	const isolated = true;
	const name = 'beholder';

	const priorRequireMainFilename = require.main.filename;
	require.main.filename = void 0;

	// eslint-disable-next-line functional/no-let
	let paths = new module_(name);
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	require.main.filename = null;

	paths = new module_(name);

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	require.main.filename = priorRequireMainFilename;
});

test('chosen application name', (t) => {
	const isolated = true;
	const name = 'crux';
	const paths = module_(name);
	const regex = xdgPathRegex(name);

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('chosen suffix', (t) => {
	const isolated = true;
	const suffix = '-nodejs';
	const paths = module_({ suffix });
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('chosen application name + suffix', (t) => {
	const isolated = true;
	const name = 'debacle';
	const suffix = '-nodejs';
	const paths = module_({ name, suffix });
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name + suffix);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});
});

test('correct paths with only XDG_*_HOME set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME',
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	Object.keys(envVars).forEach((key) => {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	});

	const isolated = true;
	const name = 'excalibur';
	const paths = module_(name);
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	Object.keys(envVars).forEach((env) => {
		const expectedPath = path.join(process.env[envVars[env]], name);
		t.is(paths[env](), expectedPath);
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 1);
	t.is(configDirs[0], paths.config());
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 1);
	t.is(dataDirs[0], paths.data());
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
});

test('correct "isolated" paths with only XDG_*_HOME set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME',
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	for (const key of Object.keys(envVars)) {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	}

	const name = 'foundling';
	const isolated = true;
	const paths = module_({ name, isolated });
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^((\$.*)|runtime)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	Object.keys(envVars).forEach((env) => {
		const expectedPath = path.join(process.env[envVars[env]], name);
		t.is(paths[env](), expectedPath);
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 1);
	t.is(configDirs[0], paths.config());
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 1);
	t.is(dataDirs[0], paths.data());
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
});

test('correct non-"isolated" paths with only XDG_*_HOME set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		state: 'XDG_STATE_HOME',
	};
	delete process.env.XDG_CONFIG_DIRS;
	delete process.env.XDG_DATA_DIRS;
	Object.keys(envVars).forEach((key) => {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	});

	const name = 'gremlins';
	const isolated = false;
	const paths = module_({ name, isolated });

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		t.log(key, ':', value());
	});

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(envVars).forEach((env) => {
		const expectedPath = process.env[envVars[env]];
		t.is(paths[env](), expectedPath);
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 1);
	t.is(configDirs[0], paths.config());
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 1);
	t.is(dataDirs[0], paths.data());
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
});

test('correct paths with XDG_* set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		runtime: 'XDG_RUNTIME_DIR',
		state: 'XDG_STATE_HOME',
		configDirs: 'XDG_CONFIG_DIRS',
		dataDirs: 'XDG_DATA_DIRS',
	};
	Object.keys(envVars).forEach((key) => {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	});

	const isolated = true;
	const name = 'howling';
	const paths = module_(name);
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^(\$.*)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 2);
	t.is(configDirs[0], paths.config());
	t.is(configDirs[1], path.join(envVars.configDirs, name));
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));
	t.deepEqual(paths.configDirs(isolated)[1], path.join(envVars.configDirs, name));
	t.deepEqual(paths.configDirs({ isolated })[1], path.join(envVars.configDirs, name));
	t.notDeepEqual(paths.configDirs(!isolated)[1], path.join(envVars.configDirs, name));
	t.notDeepEqual(paths.configDirs({ isolated: !isolated })[1], path.join(envVars.configDirs, name));

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 2);
	t.is(dataDirs[0], paths.data());
	t.is(dataDirs[1], path.join(envVars.dataDirs, name));
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
	t.deepEqual(paths.dataDirs(isolated)[1], path.join(envVars.dataDirs, name));
	t.deepEqual(paths.dataDirs({ isolated })[1], path.join(envVars.dataDirs, name));
	t.notDeepEqual(paths.dataDirs(!isolated)[1], path.join(envVars.dataDirs, name));
	t.notDeepEqual(paths.dataDirs({ isolated: !isolated })[1], path.join(envVars.dataDirs, name));
});

test('correct "isolated" paths with XDG_* set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		runtime: 'XDG_RUNTIME_DIR',
		state: 'XDG_STATE_HOME',
		configDirs: 'XDG_CONFIG_DIRS',
		dataDirs: 'XDG_DATA_DIRS',
	};
	Object.keys(envVars).forEach((key) => {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	});

	const name = 'ignoble';
	const isolated = true;
	const paths = module_({ name, isolated });
	const regex = xdgPathRegex(paths.$name());

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		const values = [].concat(value()); // convert value (single value or array) to a flat array
		t.log(key, ':', value());
		values.forEach((v) => {
			if (!key.match(/^(\$.*)$/) && isDefined(v)) {
				t.regex(v, regex, `${key}:${v}`);
				t.deepEqual(value(), value({}));
				t.deepEqual(value(), value({ isolated: null }));
				t.deepEqual(value(), value(isolated));
				t.deepEqual(value(), value({ isolated }));
				t.notDeepEqual(value(), value(!isolated));
				t.notDeepEqual(value(), value({ isolated: !isolated }));
			}
		});
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 2);
	t.is(configDirs[0], paths.config());
	t.is(configDirs[1], path.join(envVars.configDirs, name));
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));
	t.deepEqual(paths.configDirs(isolated)[1], path.join(envVars.configDirs, name));
	t.deepEqual(paths.configDirs({ isolated })[1], path.join(envVars.configDirs, name));
	t.notDeepEqual(paths.configDirs(!isolated)[1], path.join(envVars.configDirs, name));
	t.notDeepEqual(paths.configDirs({ isolated: !isolated })[1], path.join(envVars.configDirs, name));

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 2);
	t.is(dataDirs[0], paths.data());
	t.is(dataDirs[1], path.join(envVars.dataDirs, name));
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
	t.deepEqual(paths.dataDirs(isolated)[1], path.join(envVars.dataDirs, name));
	t.deepEqual(paths.dataDirs({ isolated })[1], path.join(envVars.dataDirs, name));
	t.notDeepEqual(paths.dataDirs(!isolated)[1], path.join(envVars.dataDirs, name));
	t.notDeepEqual(paths.dataDirs({ isolated: !isolated })[1], path.join(envVars.dataDirs, name));
});

test('correct non-"isolated" paths with XDG_* set', (t) => {
	const envVars = {
		cache: 'XDG_CACHE_HOME',
		config: 'XDG_CONFIG_HOME',
		data: 'XDG_DATA_HOME',
		runtime: 'XDG_RUNTIME_DIR',
		state: 'XDG_STATE_HOME',
		configDirs: 'XDG_CONFIG_DIRS',
		dataDirs: 'XDG_DATA_DIRS',
	};
	Object.keys(envVars).forEach((key) => {
		const env = envVars[key];
		process.env[env] = path.join('.', env);
	});

	const name = 'jackals';
	const isolated = false;
	const paths = module_({ name, isolated });

	t.is(paths.$name(), name);
	t.is(paths.$isolated(), isolated);

	Object.keys(paths).forEach((key) => {
		const value = paths[key];
		t.log(key, ':', value());
	});

	Object.keys(envVars).forEach((env) => {
		const expectedPath = process.env[envVars[env]];
		if (!env.endsWith('Dirs')) {
			t.is(paths[env](), expectedPath);
		}
	});

	const configDirs = paths.configDirs();
	t.is(configDirs.length, 2);
	t.is(configDirs[0], paths.config());
	t.is(configDirs[1], envVars.configDirs);
	t.deepEqual(paths.configDirs(isolated)[0], paths.config(isolated));
	t.deepEqual(paths.configDirs({ isolated })[0], paths.config({ isolated }));
	t.deepEqual(paths.configDirs(!isolated)[0], paths.config(!isolated));
	t.deepEqual(paths.configDirs({ isolated: !isolated })[0], paths.config({ isolated: !isolated }));
	t.deepEqual(paths.configDirs(isolated)[1], envVars.configDirs);
	t.deepEqual(paths.configDirs({ isolated })[1], envVars.configDirs);
	t.notDeepEqual(paths.configDirs(!isolated)[1], envVars.configDirs);
	t.notDeepEqual(paths.configDirs({ isolated: !isolated })[1], envVars.configDirs);

	const dataDirs = paths.dataDirs();
	t.is(dataDirs.length, 2);
	t.is(dataDirs[0], paths.data());
	t.is(dataDirs[1], envVars.dataDirs);
	t.deepEqual(paths.dataDirs(isolated)[0], paths.data(isolated));
	t.deepEqual(paths.dataDirs({ isolated })[0], paths.data({ isolated }));
	t.deepEqual(paths.dataDirs(!isolated)[0], paths.data(!isolated));
	t.deepEqual(paths.dataDirs({ isolated: !isolated })[0], paths.data({ isolated: !isolated }));
	t.deepEqual(paths.dataDirs(isolated)[1], envVars.dataDirs);
	t.deepEqual(paths.dataDirs({ isolated })[1], envVars.dataDirs);
	t.notDeepEqual(paths.dataDirs(!isolated)[1], envVars.dataDirs);
	t.notDeepEqual(paths.dataDirs({ isolated: !isolated })[1], envVars.dataDirs);
});

test('correctly derive anonymous (CJS)', (t) => {
	const command = 'node';
	process.env.TEST_MODULE_PATH = './build/tests_/src/mod.cjs.js';
	const script = '"p=require(process.env.TEST_MODULE_PATH); console.log(p.$name());"';
	const args = ['-e', script];
	const options = { shell: true, encoding: 'utf-8' };

	t.log({ script });

	const { error, status, stdout, stderr } = spawn.sync(command, args, options);

	t.log({ error, status, stdout, stderr });

	t.deepEqual({ error, status }, { error: null, status: 0 });

	t.is(stdout.toString().trim(), 'an-anonymous-script');
});

if (settledSupportForESMs) {
	test('correctly derive anonymous (ESM/[import CJS])', (t) => {
		const command = 'node';
		process.env.TEST_MODULE_PATH = './build/tests_/src/mod.cjs.js';
		const script =
			'"import p from \'' + process.env.TEST_MODULE_PATH + '\'; console.log(p.$name({}));"';
		const args = ['--input-type=module', '-e', script];
		const options = { shell: true, encoding: 'utf-8' };

		t.log({ script });

		const { error, status, stdout, stderr } = spawn.sync(command, args, options);

		t.log({ error, status, stdout, stderr });

		t.deepEqual({ error, status }, { error: null, status: 0 });

		t.is(stdout.toString().trim(), 'an-anonymous-script');
	});

	test('correctly derive anonymous (ESM/[esm-wrapper])', (t) => {
		const command = 'node';
		process.env.TEST_MODULE_PATH = './build/tests_/src/esm-wrapper/mod.esm.js';
		const script =
			'"import p from \'' + process.env.TEST_MODULE_PATH + '\'; console.log(p.$name({}));"';
		const args = ['--input-type=module', '-e', script];
		const options = { shell: true, encoding: 'utf-8' };

		t.log({ script });

		const { error, status, stdout, stderr } = spawn.sync(command, args, options);

		t.log({ error, status, stdout, stderr });

		t.deepEqual({ error, status }, { error: null, status: 0 });

		t.is(stdout.toString().trim(), 'an-anonymous-script');
	});

	test('correctly derive anonymous (ESM)', (t) => {
		const command = 'node';
		process.env.TEST_MODULE_PATH = './build/esm/src/mod.esm.js';
		const script =
			'"import p from \'' + process.env.TEST_MODULE_PATH + '\'; console.log(p.$name({}));"';
		const args = [
			'--input-type=module',
			'-e',
			isWinOS ? script : script.replace('$name', '\\$name'),
		];
		const options = { shell: true, encoding: 'utf-8' };

		t.log({ script });

		const { error, status, stdout, stderr } = spawn.sync(command, args, options);

		t.log({ error, status, stdout, stderr });

		t.deepEqual({ error, status }, { error: null, status: 0 });

		t.is(stdout.toString().trim(), 'an-anonymous-script');
	});
}
