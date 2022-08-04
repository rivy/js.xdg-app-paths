'use strict';
exports.__esModule = true;
exports.Adapt = void 0;
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
exports.Adapt = Adapt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLFlBQVksQ0FBQzs7O0FBbUZiLFNBQVMsU0FBUyxDQUFJLENBQWM7SUFDbkMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUE4QjtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFJLENBQUk7SUFDeEIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBSSxDQUFJO0lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLFFBQTBCO0lBQ2hDLElBQUEsSUFBSSxHQUFnQixRQUFRLEtBQXhCLEVBQUUsSUFBSSxHQUFVLFFBQVEsS0FBbEIsRUFBRSxHQUFHLEdBQUssUUFBUSxJQUFiLENBQWM7SUFFckM7UUFDQyxzQkFBWSxRQUErQjtZQUEvQix5QkFBQSxFQUFBLGFBQStCOztZQUMxQyxTQUFTLFdBQVcsQ0FBQyxPQUE4QjtnQkFBOUIsd0JBQUEsRUFBQSxZQUE4QjtnQkFDbEQsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQWdCLENBQUM7WUFDakQsQ0FBQztZQUVELElBQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFZLENBQUM7WUFFaEYsSUFBTSxNQUFNLEdBQUcsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7WUFDcEMsSUFB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