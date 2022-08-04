/** Configuration options supplied to `XDGAppPaths` methods */
interface DirOptions {
    /** Isolation flag; used to override the default isolation mode, when needed. */
    readonly isolated?: boolean | null;
}
/** Configuration options supplied when constructing `XDGAppPaths` */
interface Options {
    /** Name of the application; used to generate isolated application paths.
    > When missing (`undefined`), `null`, or empty (`''`), it is generated automatically from the process main file name, where determinable.
    > "$eval" is used as a final fallback value when the application name cannot otherwise be determined.
    */
    readonly name?: string | null;
    /** Suffix which is appended to the application name when generating the application paths. */
    readonly suffix?: string | null;
    /** Default isolation flag (used when no isolation flag is supplied for `DirOptions`). */
    readonly isolated?: boolean | null;
}
/** `XDGAppPaths` (API) - Determine (XDG-compatible) paths for storing application files (cache, config, data, etc) */
interface XDGAppPaths {
    /** Create an `XDGAppPaths` object (a preceding `new` is optional). */
    (options?: Options | string): XDGAppPaths;
    /** Create an `XDGAppPaths` object (`new` is optional). */
    new (options?: Options | string): XDGAppPaths;
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

declare const _default: XDGAppPaths;

export = _default;
