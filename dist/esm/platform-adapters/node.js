import * as path from 'path';
import xdg from 'xdg-portable';
export var adapter = {
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
    xdg: xdg
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUkvQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQXFCO0lBQ3hDLG1CQUFtQixFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQzlDLElBQUksRUFBRTtRQUNMLFlBQVksRUFBRTtZQUNiLElBQU0sV0FBVyxHQUNoQixPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSTtnQkFDakUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUNkLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNqRCxJQUFNLFFBQVEsR0FFYixDQUFDLG1CQUFtQixLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFHNUUsQ0FBQyxPQUFRLE9BQWUsQ0FBQyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sUUFBUSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxlQUFlLEVBQUU7WUFFaEIsT0FBUSxPQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQ0Q7SUFDRCxJQUFJLE1BQUE7SUFDSixPQUFPLFNBQUE7SUFDUCxHQUFHLEtBQUE7Q0FDSCxDQUFDIn0=