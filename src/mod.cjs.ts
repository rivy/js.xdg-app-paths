import { Adapt } from './lib/XDGAppPaths.js';
import type { XDGAppPaths } from './lib/XDGAppPaths.js';
import { adapter } from './platform-adapters/node.js';

export = Adapt(adapter).XDGAppPaths as XDGAppPaths;
