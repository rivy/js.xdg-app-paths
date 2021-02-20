'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var xdg_portable_1 = __importDefault(require("xdg-portable"));
function isBoolean(t) {
    return typeOf(t) === 'boolean';
}
function isObject(t) {
    return typeOf(t) === 'object';
}
function isString(t) {
    return typeOf(t) === 'string';
}
function typeOf(t) {
    return typeof t;
}
var XDGAppPaths_ = (function () {
    function XDGAppPaths_(options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c;
        function XDGAppPaths(options) {
            if (options === void 0) { options = {}; }
            return new XDGAppPaths_(options);
        }
        if (!isObject(options)) {
            options = { name: options };
        }
        var suffix = (_a = options.suffix) !== null && _a !== void 0 ? _a : '';
        var isolated_ = (_b = options.isolated) !== null && _b !== void 0 ? _b : true;
        var requireMain = typeof require !== 'undefined' && require !== null && require.main
            ? require.main
            : { filename: void 0 };
        var requireMainFilename = requireMain.filename;
        var mainFilename = (requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
            (typeof process._eval === 'undefined' ? process.argv[1] : void 0);
        var pkgMainFilename = process.pkg ? process.execPath : void 0;
        var namePriorityList = [options.name, pkgMainFilename, mainFilename];
        var nameFallback = 'an-anonymous-script';
        var name = path_1["default"].parse(((_c = namePriorityList.find(function (e) { return isString(e); })) !== null && _c !== void 0 ? _c : nameFallback) + suffix)
            .name;
        XDGAppPaths.$name = function $name() {
            return name;
        };
        XDGAppPaths.$isolated = function $isolated() {
            return isolated_;
        };
        function isIsolated(dirOptions) {
            var _a;
            dirOptions = dirOptions !== null && dirOptions !== void 0 ? dirOptions : { isolated: isolated_ };
            var isolated = isBoolean(dirOptions) ? dirOptions : (_a = dirOptions.isolated) !== null && _a !== void 0 ? _a : isolated_;
            return isolated;
        }
        function finalPathSegment(dirOptions) {
            return isIsolated(dirOptions) ? name : '';
        }
        XDGAppPaths.cache = function cache(dirOptions) {
            return path_1["default"].join(xdg_portable_1["default"].cache(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.config = function config(dirOptions) {
            return path_1["default"].join(xdg_portable_1["default"].config(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.data = function data(dirOptions) {
            return path_1["default"].join(xdg_portable_1["default"].data(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.runtime = function runtime(dirOptions) {
            return xdg_portable_1["default"].runtime()
                ? path_1["default"].join(xdg_portable_1["default"].runtime(), finalPathSegment(dirOptions))
                : void 0;
        };
        XDGAppPaths.state = function state(dirOptions) {
            return path_1["default"].join(xdg_portable_1["default"].state(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.configDirs = function configDirs(dirOptions) {
            return xdg_portable_1["default"]
                .configDirs()
                .map(function (s) { return path_1["default"].join(s, finalPathSegment(dirOptions)); });
        };
        XDGAppPaths.dataDirs = function dataDirs(dirOptions) {
            return xdg_portable_1["default"]
                .dataDirs()
                .map(function (s) { return path_1["default"].join(s, finalPathSegment(dirOptions)); });
        };
        return XDGAppPaths;
    }
    return XDGAppPaths_;
}());
exports["default"] = new XDGAppPaths_();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFlBQVksQ0FBQzs7Ozs7QUFFYiw4Q0FBd0I7QUFFeEIsOERBQStCO0FBaUMvQixTQUFTLFNBQVMsQ0FBSSxDQUFjO0lBQ25DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUksQ0FBOEI7SUFDbEQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUFJO0lBQ3hCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUksQ0FBSTtJQUN0QixPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFHRDtJQUNDLHNCQUFZLE9BQXFCO1FBQXJCLHdCQUFBLEVBQUEsWUFBcUI7O1FBQ2hDLFNBQVMsV0FBVyxDQUFDLE9BQXFCO1lBQXJCLHdCQUFBLEVBQUEsWUFBcUI7WUFDekMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQWdCLENBQUM7UUFDakQsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBTSxNQUFNLFNBQUcsT0FBTyxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDO1FBQ3BDLElBQU0sU0FBUyxTQUFHLE9BQU8sQ0FBQyxRQUFRLG1DQUFJLElBQUksQ0FBQztRQUczQyxJQUFNLFdBQVcsR0FDaEIsT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFD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