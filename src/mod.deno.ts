// deno-fmt-ignore-file ## prefer customized `prettier` formatting
// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Adapt } from '../dist/esm/lib/XDGAppPaths.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DirOptions, Options, XDGAppPaths } from '../dist/types/mod.d.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { adapter } from './platform-adapters/deno.deno.ts';

const _: XDGAppPaths = Adapt(adapter).XDGAppPaths as XDGAppPaths;

export type { DirOptions, Options, XDGAppPaths };
export default _;
