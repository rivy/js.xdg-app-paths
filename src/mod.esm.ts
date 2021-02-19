import { Adapt } from './lib/XDGAppPaths.js';
import type { DirOptions, Options, XDGAppPaths } from './lib/XDGAppPaths.js';
import { adapter } from './platform-adapters/node.js';

const default_: XDGAppPaths = Adapt(adapter).XDGAppPaths;

export type { DirOptions, Options, XDGAppPaths };
export default default_;
