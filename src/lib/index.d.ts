export declare type Options = {
	readonly name?: string | null;
	readonly suffix?: string | null;
	readonly isolated?: boolean | null;
};

export declare type DirOptions = {
	readonly isolated?: boolean | null;
};

export declare type XDGAppPaths = {
	readonly $name: () => string;
	readonly $isolated: () => boolean;
	readonly cache: (dirOptions?: DirOptions | boolean) => string;
	readonly config: (dirOptions?: DirOptions | boolean) => string;
	readonly data: (dirOptions?: DirOptions | boolean) => string;
	readonly runtime: (dirOptions?: DirOptions | boolean) => string | undefined;
	readonly state: (dirOptions?: DirOptions | boolean) => string;
	readonly configDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
	readonly dataDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
	new (options?: Options | string): XDGAppPaths;
	(options?: Options | string): XDGAppPaths;
};

declare const _default: XDGAppPaths;
export default _default;
