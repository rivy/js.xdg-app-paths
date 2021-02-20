'use strict';
import path from 'path';
import xdg from 'xdg-portable';
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
        var name = path.parse(((_c = namePriorityList.find(function (e) { return isString(e); })) !== null && _c !== void 0 ? _c : nameFallback) + suffix)
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
            return path.join(xdg.cache(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.config = function config(dirOptions) {
            return path.join(xdg.config(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.data = function data(dirOptions) {
            return path.join(xdg.data(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.runtime = function runtime(dirOptions) {
            return xdg.runtime()
                ? path.join(xdg.runtime(), finalPathSegment(dirOptions))
                : void 0;
        };
        XDGAppPaths.state = function state(dirOptions) {
            return path.join(xdg.state(), finalPathSegment(dirOptions));
        };
        XDGAppPaths.configDirs = function configDirs(dirOptions) {
            return xdg
                .configDirs()
                .map(function (s) { return path.join(s, finalPathSegment(dirOptions)); });
        };
        XDGAppPaths.dataDirs = function dataDirs(dirOptions) {
            return xdg
                .dataDirs()
                .map(function (s) { return path.join(s, finalPathSegment(dirOptions)); });
        };
        return XDGAppPaths;
    }
    return XDGAppPaths_;
}());
export default new XDGAppPaths_();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFlBQVksQ0FBQztBQUViLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUV4QixPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUM7QUFpQy9CLFNBQVMsU0FBUyxDQUFJLENBQWM7SUFDbkMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUE4QjtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFJLENBQUk7SUFDeEIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBSSxDQUFJO0lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUdEO0lBQ0Msc0JBQVksT0FBcUI7UUFBckIsd0JBQUEsRUFBQSxZQUFxQjs7UUFDaEMsU0FBUyxXQUFXLENBQUMsT0FBcUI7WUFBckIsd0JBQUEsRUFBQSxZQUFxQjtZQUN6QyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBZ0IsQ0FBQztRQUNqRCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QixPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFNLE1BQU0sU0FBRyxPQUFPLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7UUFDcEMsSUFBTSxTQUFTLFNBQUcsT0FBTyxDQUFDLFFBQVEsbUNBQUksSUFBSSxDQUFDO1FBRzNDLElBQU0sV0FBVyxHQUNoQixPQUFPLE9BQU8sS0FBSyxXQUFXLElB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