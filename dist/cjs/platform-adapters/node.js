"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.adapter = void 0;
var path = __importStar(require("path"));
var xdg_portable_1 = __importDefault(require("xdg-portable"));
exports.adapter = {
    atImportPermissions: { env: true, read: true },
    meta: {
        mainFilename: function () {
            var requireMain = typeof require !== 'undefined' && require !== null && require.main
                ? require.main
                : { filename: void 0 };
            var requireMainFilename = requireMain.filename;
            var filename = (requireMainFilename !== process.execArgv[0] ? requireMainFilename : void 0) ||
                (typeof process._eval === 'undefined' ? process.argv[1] : void 0);
            return filename;
        },
        pkgMainFilename: function () {
            return process.pkg ? process.execPath : void 0;
        }
    },
    path: path,
    process: process,
    xdg: xdg_portable_1["default"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBNkI7QUFFN0IsOERBQStCO0FBSWxCLFFBQUEsT0FBTyxHQUFxQjtJQUN4QyxtQkFBbUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUM5QyxJQUFJLEVBQUU7UUFDTCxZQUFZLEVBQUU7WUFDYixJQUFNLFdBQVcsR0FDaEIsT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUk7Z0JBQ2pFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDZCxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6QixJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDakQsSUFBTSxRQUFRLEdBRWIsQ0FBQyxtQkFBbUIsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRzVFLENBQUMsT0FBUSxPQUFlLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1RSxPQUFPLFFBQVEsQ0FBQztRQUNqQixDQUFDO1FBQ0QsZUFBZSxFQUFFO1lBRWhCLE9BQVEsT0FBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUNEO0lBQ0QsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0lBQ1AsR0FBRywyQkFBQTtDQUNILENBQUMifQ==