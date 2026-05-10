// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// spell-checker:ignore Deno

import { Adapt } from '../dist/esm/lib/XDGAppPaths.js';
import type { DirOptions, Options, XDGAppPaths } from '../dist/types/mod.d.ts';

// @ts-expect-error // deno-TS ~ .ts imports allowed
import { adapter } from './platform-adapters/deno.deno.ts';

const _: XDGAppPaths = Adapt(adapter).XDGAppPaths as XDGAppPaths;

export type { DirOptions, Options, XDGAppPaths };
export default _;
