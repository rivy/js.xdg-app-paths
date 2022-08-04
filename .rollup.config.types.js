// `rollup` configuration
// ref: <https://devhints.io/rollup>
// v2002-07-14 [rivy]
// setup: `npm i rollup @rollup/plugin-typescript` or `npm i rollup rollup-plugin-typescript2` (for visible TS error output)

// spell-checker:ignore (people) Roy Ivy III * rivy

import dts from 'rollup-plugin-dts';

export default [
	// bundle TypeScript typings (TypeScript is unable/unwilling to do so...)
	// * ref: <https://github.com/Microsoft/TypeScript/issues/4433> , <https://github.com/google/model-viewer/issues/1502>
	// * ref: <https://github.com/Swatinem/rollup-plugin-dts>
	{
		input: './build/types/src/mod.esm.d.ts',
		output: [{ file: './dist/types/mod.d.ts', format: 'esm' }],
		plugins: [dts()],
	},
	{
		input: './build/types/src/mod.cjs.d.ts',
		output: [{ file: './dist/types/mod.cjs.d.ts', format: 'cjs' }],
		plugins: [dts()],
		// * note: for correct interpretation of types by VSCode, './dist/types/mod.cjs.d.ts' requires a subsequent text replacement ("export { _default as default }" => "export = _default")
	},
];
