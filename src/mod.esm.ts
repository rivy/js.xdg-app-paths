import { Adapt } from './lib/XDGAppPaths.js';
import type { DirOptions, Options, XDGAppPaths } from './lib/XDGAppPaths.js';
import { adapter } from './platform-adapters/node.js';

export type { DirOptions, Options, XDGAppPaths };
export default Adapt(adapter).XDGAppPaths as XDGAppPaths;
