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

const default_: XDGAppPaths = Adapt(adapter).XDGAppPaths;

export type { DirOptions, Options, XDGAppPaths };
export default default_;
