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
            var namePriorityList = [
                options.name,
                meta.pkgMainFilename(),
                meta.mainFilename(),
            ];
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
    return { XDGAppPaths: new XDGAppPaths_() };
}
exports.Adapt = Adapt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFlBQVksQ0FBQzs7O0FBeUViLFNBQVMsU0FBUyxDQUFJLENBQWM7SUFDbkMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUE4QjtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFJLENBQUk7SUFDeEIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBSSxDQUFJO0lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLFFBQTBCO0lBQ2hDLElBQUEsSUFBSSxHQUFnQixRQUFRLEtBQXhCLEVBQUUsSUFBSSxHQUFVLFFBQVEsS0FBbEIsRUFBRSxHQUFHLEdBQUssUUFBUSxJQUFiLENBQWM7SUFFckM7UUFDQyxzQkFBWSxPQUFxQjtZQUFyQix3QkFBQSxFQUFBLFlBQXFCOztZQUNoQyxTQUFTLFdBQVcsQ0FBQyxPQUFxQjtnQkFBckIsd0JBQUEsRUFBQSxZQUFxQjtnQkFDekMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQWdCLENBQUM7WUFDakQsQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM1QjtZQUVELElBQU0sTUFBTSxTQUFHLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQztZQUNwQyxJQUFNLFNBQVMsU0FBRyxPQUFPLENBQUMsUUFBUSxt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