// deno-fmt-ignore-file ## prefer customized `prettier` formatting

import * as path from 'path';

import xdg from 'xdg-portable';

import { Platform } from './_base.js';

export const adapter: Platform.Adapter = {
	atImportPermissions: { env: true, read: true },
	meta: {
		mainFilename: () => {
			const requireMain =
				typeof require !== 'undefined' && require !== null && require.main
					? require.main
					: { filename: void 0 };
			const requireMainFilename = requireMain.filename;
			const filename =
				// HACK: additional comparison `require?.main?.filename !== process.execArgv[0]` compensates for ESM scripts run via `ts-node`
				(requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
				// HACK: `process._eval` is undocumented; used here (again, for ESM) as evidence of `node -e ...` differentiating between immediate eval vs file-bound scripts
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(typeof (process as any)._eval === 'undefined' ? process.argv[1] : void 0);
			return filename;
		},
		pkgMainFilename: () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (process as any).pkg ? process.execPath : void 0;
		},
	},
	path,
	process,
	xdg,
};
