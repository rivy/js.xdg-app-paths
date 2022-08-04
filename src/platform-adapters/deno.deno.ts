// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as path from 'https://deno.land/std@0.81.0/path/mod.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xdg from 'https://deno.land/x/xdg@v9.1.0/src/mod.deno.ts';

/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import { Platform } from './_base.ts';

// create a local reference to refer to `Deno` (for better linting without need for multiple `// @ts-ignore` directives)
// @ts-ignore
const deno = Deno;

// Deno general permission(s) at time of import
// * Deno.Permissions (stabilized in v1.8.0)
const queryEnv = await deno?.permissions?.query({ name: 'env' });
const allowEnv = (queryEnv?.state ?? 'granted') === 'granted';
const queryRead = await deno?.permissions?.query({ name: 'read' });
const allowRead = (queryRead?.state ?? 'granted') === 'granted';

export const adapter: Platform.Adapter = {
	atImportPermissions: { env: allowEnv, read: allowRead },
	meta: {
		mainFilename: allowRead ? () => deno.mainModule : () => void 0,
		pkgMainFilename: () => void 0,
	},
	path,
	process: { platform: deno.build.os },
	xdg,
};

/* eslint-enable @typescript-eslint/ban-ts-comment */
