/* eslint-env es6, node */
/* eslint-disable no-console , security-node/detect-crlf */

const p = require('../../build/umd/src/mod.cjs.js');

console.log(p.$name());

var requireMain =
	typeof require !== 'undefined' && require !== null && require.main
		? require.main
		: { filename: void 0 };
var requireMainFilename = requireMain.filename;
var filename =
	(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
	(typeof process._eval === 'undefined' ? process.argv[1] : void 0);
var pkgMainFilename = process.pkg ? process.execPath : void 0;

console.warn('fixture/umd.js', {
	p_name: p.$name(),
	pkgMainFilename,
	filename,
	requireMain,
	requireMainFilename,
	processExecArgv: process.execArgv,
	processArgv: process.argv,
	NYC_CONFIG: process.env.NYC_CONFIG,
});
