// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore // deno-type URL import
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore // deno-type URL import
import xdg from 'https://deno.land/x/xdg@v10.5.0/src/mod.deno.ts';

/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore // deno-type import
import { Platform } from './_base.ts';

// create a local reference to refer to `Deno` (for better linting without need for multiple `// @ts-ignore` directives)
// @ts-ignore // Deno alias to suppress other false-positive TS warnings
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
