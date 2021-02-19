import { Adapt } from './lib/XDGAppPaths.js';
import type { XDGAppPaths } from './lib/XDGAppPaths.js';
import { adapter } from './platform-adapters/node.js';

const default_: XDGAppPaths = Adapt(adapter).XDGAppPaths;

export = default_;
