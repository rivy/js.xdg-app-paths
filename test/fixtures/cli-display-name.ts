/* eslint-disable no-console , security-node/detect-crlf */

// `ts-node` cannot import modules with extensions => use CJS module
// ## maint: [2021-02-16; rivy] await resolution of <https://github.com/TypeStrong/ts-node/issues/783> to return to direct TS import
// import p from '../../src/mod.esm.js';
import p from '../../build/lab/src/mod.cjs.js';

console.log(p.$name());
