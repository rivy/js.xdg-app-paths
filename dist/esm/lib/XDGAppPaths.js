'use strict';
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
function Adapt(adapter_) {
    var meta = adapter_.meta, path = adapter_.path, xdg = adapter_.xdg;
    var XDGAppPaths_ = (function () {
        function XDGAppPaths_(options_) {
            if (options_ === void 0) { options_ = {}; }
            var _a, _b, _c;
            function XDGAppPaths(options) {
                if (options === void 0) { options = {}; }
                return new XDGAppPaths_(options);
            }
            var options = (isObject(options_) ? options_ : { name: options_ });
            var suffix = (_a = options.suffix) !== null && _a !== void 0 ? _a : '';
            var isolated_ = (_b = options.isolated) !== null && _b !== void 0 ? _b : true;
            var namePriorityList = [
                options.name,
                meta.pkgMainFilename(),
                meta.mainFilename(),
            ];
            var nameFallback = '$eval';
            var name = path.parse(((_c = namePriorityList.find(function (e) { return isString(e); })) !== null && _c !== void 0 ? _c : nameFallback) + suffix).name;
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
    return { XDGAppPaths: new XDGAppPaths_() };
}
export { Adapt };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLFlBQVksQ0FBQztBQW1GYixTQUFTLFNBQVMsQ0FBSSxDQUFjO0lBQ25DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUksQ0FBOEI7SUFDbEQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUFJO0lBQ3hCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUksQ0FBSTtJQUN0QixPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxRQUEwQjtJQUNoQyxJQUFBLElBQUksR0FBZ0IsUUFBUSxLQUF4QixFQUFFLElBQUksR0FBVSxRQUFRLEtBQWxCLEVBQUUsR0FBRyxHQUFLLFFBQVEsSUFBYixDQUFjO0lBRXJDO1FBQ0Msc0JBQVksUUFBK0I7WUFBL0IseUJBQUEsRUFBQSxhQUErQjs7WUFDMUMsU0FBUyxXQUFXLENBQUMsT0FBOEI7Z0JBQTlCLHdCQUFBLEVBQUEsWUFBOEI7Z0JBQ2xELE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFnQixDQUFDO1lBQ2pELENBQUM7WUFFRCxJQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBWSxDQUFDO1lBRWhGLElBQU0sTUFBTSxHQUFHLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDO1lBQ3BDLElBQU0s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