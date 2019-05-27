import test from 'ava';
import osPaths from '.';

test('default', t => {
	const name = 'unicorn';
	const paths = osPaths(name);

	for (const [key, value] of Object.entries(paths)) {
		const vals = [].concat(value); // Convert value (single value or array) to a flat array
		t.log(key, ':', value);
		t.true(vals.reduce((a, v) => a && v.endsWith(`${name}-nodejs`), true));
	}
});

test('custom suffix', t => {
	const name = 'unicorn';
	const opts = {suffix: 'horn'};
	const paths = osPaths(name, opts);
	t.true(paths.data.endsWith(`${name}-${opts.suffix}`));
});

test('no suffix', t => {
	const name = 'unicorn';
	const opts = {suffix: false};
	const paths = osPaths(name, opts);
	t.true(paths.data.endsWith(name));
});

// Linux-specific tests
if (process.platform === 'linux') {
	test('correct paths with XDG_*_HOME set', t => {
		const envVars = {
			data: 'XDG_DATA_HOME',
			config: 'XDG_CONFIG_HOME',
			cache: 'XDG_CACHE_HOME',
			log: 'XDG_STATE_HOME'
		};

		for (const env of Object.values(envVars)) {
			process.env[env] = `/tmp/${env}`;
		}

		const name = 'unicorn';
		const paths = osPaths(name);

		for (const env of Object.keys(envVars)) {
			const expectedPath = process.env[envVars[env]];
			t.true(paths[env].startsWith(expectedPath) && paths[env].endsWith(`${name}-nodejs`));
		}
	});
}
