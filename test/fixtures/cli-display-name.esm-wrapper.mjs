/* eslint-env es6, node */
/* eslint-disable no-console , security-node/detect-crlf */

import p from '../../build/cjs/src/esm-wrapper/mod.esm.js';

console.log(p.$name());
// console.warn({ process });

// mainFilename: function () {
//     var requireMain = typeof require !== 'undefined' && require !== null && require.main
//         ? require.main
//         : { filename: void 0 };
//     var requireMainFilename = requireMain.filename;
//     var filename = (requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
//         (typeof process._eval === 'undefined' ? process.argv[1] : void 0);
// 		console.warn('platform-adapter/node', { requireMain, requireMainFilename, processExecArgv: process.execArgv, processArgv: process.argv, NYC_CONFIG: process.env.NYC_CONFIG });
//     return filename;
// },
// pkgMainFilename: function () {
//     return process.pkg ? process.execPath : void 0;
// },

var requireMain =
	typeof require !== 'undefined' && require !== null && require.main
		? require.main
		: { filename: void 0 };
var requireMainFilename = requireMain.filename;
var filename =
	(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
	(typeof process._eval === 'undefined' ? process.argv[1] : void 0);
var pkgMainFilename = process.pkg ? process.execPath : void 0;

console.warn('fixture/esm-wrapper', {
	p_name: p.$name(),
	pkgMainFilename,
	filename,
	requireMain,
	requireMainFilename,
	processExecArgv: process.execArgv,
	processArgv: process.argv,
	NYC_CONFIG: process.env.NYC_CONFIG,
});
