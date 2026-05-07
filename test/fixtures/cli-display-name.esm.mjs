/* eslint-env es6, node */
/* eslint-disable no-console , security-node/detect-crlf */

import p from '../../build/esm/src/mod.esm.js';

console.log(p.$name());
// console.warn({ process });

var requireMain =
	typeof require !== 'undefined' && require !== null && require.main
		? require.main
		: { filename: void 0 };
var requireMainFilename = requireMain.filename;
var filename =
	(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
	(typeof process._eval === 'undefined' ? process.argv[1] : void 0);
var pkgMainFilename = process.pkg ? process.execPath : void 0;

console.warn('fixture/esm', {
	p_name: p.$name(),
	pkgMainFilename,
	filename,
	requireMain,
	requireMainFilename,
	processExecArgv: process.execArgv,
	processArgv: process.argv,
	NYC_CONFIG: process.env.NYC_CONFIG,
});
