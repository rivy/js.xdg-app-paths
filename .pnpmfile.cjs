// pnpm hooks/config (.pnpmfile.cjs)
// v2026-05-11 [rivy]
// ref: [pnpm ~ pnpmfile hooks](https://pnpm.io/pnpmfile)
// spell-checker:ignore () pnpmfile

module.exports = {
	hooks: {
		updateConfig(config) {
			return Object.assign(config, {
				allowBuilds: {
					'core-js': false, //## suppress build scripts (generally ads/requests/telemetry) and annoying ERR/warnings
				},
			});
		},
	},
};
