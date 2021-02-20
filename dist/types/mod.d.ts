declare type DirOptions = {
    readonly isolated?: boolean | null;
};
declare type Options = {
    readonly name?: string | null;
    readonly suffix?: string | null;
    readonly isolated?: boolean | null;
};
declare type XDGAppPaths = {
    new (options?: Options | string): XDGAppPaths;
    (options?: Options | string): XDGAppPaths;
    readonly $name: () => string;
    readonly $isolated: () => boolean;
    readonly cache: (dirOptions?: DirOptions | boolean) => string;
    readonly config: (dirOptions?: DirOptions | boolean) => string;
    readonly data: (dirOptions?: DirOptions | boolean) => string;
    readonly runtime: (dirOptions?: DirOptions | boolean) => string | undefined;
    readonly state: (dirOptions?: DirOptions | boolean) => string;
    readonly configDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
    readonly dataDirs: (dirOptions?: DirOptions | boolean) => readonly string[];
};

declare const default_: XDGAppPaths;

export default default_;
export { DirOptions, Options, XDGAppPaths };
