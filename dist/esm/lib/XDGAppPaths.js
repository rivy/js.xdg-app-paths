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
export { Adapt };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHQXBwUGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1hER0FwcFBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFlBQVksQ0FBQztBQW1DYixTQUFTLFNBQVMsQ0FBSSxDQUFjO0lBQ25DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUksQ0FBOEI7SUFDbEQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBSSxDQUFJO0lBQ3hCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUksQ0FBSTtJQUN0QixPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxRQUEwQjtJQUNoQyxJQUFBLElBQUksR0FBZ0IsUUFBUSxLQUF4QixFQUFFLElBQUksR0FBVSxRQUFRLEtBQWxCLEVBQUUsR0FBRyxHQUFLLFFBQVEsSUFBYixDQUFjO0lBRXJDO1FBQ0Msc0JBQVksT0FBcUI7WUFBckIsd0JBQUEsRUFBQSxZQUFxQjs7WUFDaEMsU0FBUyxXQUFXLENBQUMsT0FBcUI7Z0JBQXJCLHdCQUFBLEVBQUEsWUFBcUI7Z0JBQ3pDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFnQixDQUFDO1lBQ2pELENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN2QixPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDNUI7WUFFRCxJQUFNLE1BQU0sU0FBRyxPQUFPLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7WUFDcEMsSUFBTSxTQUFTLFNBQUcsT0FBTyxDQUFDLFFBQVEsbUNBQUksSUFBSSxDQUFDO1lBRzNDLElBQU0sZ0JBQWdCLEdBQTZDO2dCQUNsRSxPQUFPLENBQUMsSUFBSTtnQkFDWixJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ25CLENBQUM7WUFDRixJQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUMzQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFYLENBQVcsQ0FBQyxtQ0FBSSxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUM7aUJBQzNGLElBQUksQ0FBQztZQUVQLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLO2dCQUNqQyxPQUFPLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQztZQUNGLFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxTQUFTO2dCQUN6QyxPQUFPLFNBQVMsQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFRixTQUFTLFVBQVUsQ0FBQyxVQUFpQzs7Z0JBQ3BELFVBQVUsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDbkQsSUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFDLFVBQVUsQ0FBQyxRQUFRLG1DQUFJLFNBQVMsQ0FBQztnQkFDdkYsT0FBTyxRQUFRLENBQUM7WUFDakIsQ0FBQztZQUVELFNBQVMsZ0JBQWdCLENBQUMsVUFBaUM7Z0JBQzFELE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzQyxDQUFDO1lBRUQsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBQyxVQUFpQztnQkFDbkUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQztZQUVGLFdBQVcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxNQUFNLENBQUMsVUFBaUM7Z0JBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUM7WUFFRixXQUFXLENBQUMsSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDLFVBQWlDO2dCQUNqRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDO1lBRUYsV0FBVyxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxVQUFpQztnQkFDdkUsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFO29CQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFZLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2xFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUVGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLENBQUMsVUFBaUM7Z0JBQ25FLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUM7WUFFRixXQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsVUFBVSxDQUFDLFVBQWlDO2dCQUM3RSxPQUFPLEdBQUc7cUJBQ1IsVUFBVSxFQUFFO3FCQUNaLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQTFDLENBQTBDLENBQXNCLENBQUM7WUFDL0UsQ0FBQyxDQUFDO1lBRUYsV0FBVyxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxVQUFpQztnQkFDekUsT0FBTyxHQUFHO3FCQUNSLFFBQVEsRUFBRTtxQkFDVixHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxDQUFzQixDQUFDO1lBQy9FLENBQUMsQ0FBQztZQUVGLE9BQU8sV0FBMEIsQ0FBQztRQUNuQyxDQUFDO1FBQ0YsbUJBQUM7SUFBRCxDQUFDLEFBNUVELElBNEVDO0lBRUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLFlBQVksRUFBaUIsRUFBRSxDQUFDO0FBQzNELENBQUM7QUFHRCxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMifQ==