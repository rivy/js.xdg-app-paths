/** Configuration options supplied to `XDGAppPaths` methods; (optional) */
declare type DirOptions = {
    readonly isolated?: boolean | null;
};
/** Configuration options supplied when constructing `XDGAppPaths`; (optional) */
declare type Options = {
    readonly name?: string | null;
    readonly suffix?: string | null;
    readonly isolated?: boolean | null;
};
/** `XDGAppPaths` (API) Determine (XDG-compatible) paths for storing application files (cache, config, data, etc) */
interface XDGAppPaths {
    /** Create an `XDG` object (`new` is optional). */
    new (options?: Options | string): XDGAppPaths;
    /** Create an `XDG` object (`new` is optional). */
    (options?: Options | string): XDGAppPaths;
    /** Returns the directory for non-essential data files.
    > Deletion of the data contained here might cause an application to slow down.
    */
    cache(dirOptions?: DirOptions | boolean): string;
    /** Returns the directory for config files.
    > Deletion of the data contained here might require the user to reconfigure an application.
    */
    config(dirOptions?: DirOptions | boolean): string;
    /** Returns the directory for data files.
    > Deletion of the data contained here might force the user to restore from backups.
    */
    data(dirOptions?: DirOptions | boolean): string;
    /** Returns the directory for runtime files; may return `undefined`.
    > Deletion of the data contained here might interfere with a currently executing application but should have no effect on future executions.
    */
    runtime(dirOptions?: DirOptions | boolean): string | undefined;
    /** Returns the directory for state files.
    > Deletion of the data contained here should not materially interfere with execution of an application.
    */
    state(dirOptions?: DirOptions | boolean): string;
    /** Returns a priority-sorted list of possible directories for configuration file storage (includes `paths.config()` as the first entry). */
    configDirs(dirOptions?: DirOptions | boolean): readonly string[];
    /** Returns a priority-sorted list of possible directories for data file storage (includes `paths.data()` as the first entry). */
    dataDirs(dirOptions?: DirOptions | boolean): readonly string[];
    /** Application name used for path construction (from supplied configuration or auto-generated). */
    $name(): string;
    /** Default isolation mode used by the particular `XDGAppPaths` instance. */
    $isolated(): boolean;
}

declare const _: XDGAppPaths;

export default _;
export { DirOptions, Options, XDGAppPaths };
