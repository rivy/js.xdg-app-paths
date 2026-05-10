/* eslint-disable no-console , security-node/detect-crlf */

// `ts-node` cannot import modules with extensions => use CJS module
// ## maint: [2021-02-16; rivy] await resolution of <https://github.com/TypeStrong/ts-node/issues/783> to return to direct TS import
// import p from '../../src/mod.esm.js';
import p from '../../build/cjs/src/mod.cjs.js';

console.log(p.$name());

/* eslint-disable no-var, @typescript-eslint/no-explicit-any */
if (process.env.DEBUG) {
	var scriptName = 'fixture/cli-display-name.ts';
	console.warn(scriptName, { process });

	var requireMain =
		typeof require !== 'undefined' && require !== null && require.main
			? require.main
			: { filename: void 0 };
	var requireMainFilename = requireMain.filename;
	var filename =
		(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
		(typeof (process as any)._eval === 'undefined' ? process.argv[1] : void 0);
	var pkgMainFilename = (process as any).pkg ? process.execPath : void 0;

	console.warn(scriptName, {
		p_name: p.$name(),
		pkgMainFilename,
		filename,
		requireMain,
		requireMainFilename,
		processExecArgv: process.execArgv,
		processArgv: process.argv,
		NYC_CONFIG: process.env.NYC_CONFIG,
	});
}
/* eslint-enable no-var, @typescript-eslint/no-explicit-any */
