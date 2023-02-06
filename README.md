<!-- dprint-ignore-file -->
<!-- deno-fmt-ignore-start -->

<!-- @prettier -->
<!DOCTYPE markdown><!-- markdownlint-disable first-line-heading no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- markdownlint-disable heading-increment no-duplicate-heading no-emphasis-as-heading -->
<!-- spell-checker:ignore (abbrev/jargon) CICD NodeJS -->
<!-- spell-checker:ignore (JS/TS) concat mkdirp readonly typeof -->
<!-- spell-checker:ignore (markdown) nbsp nodejsv -->
<!-- spell-checker:ignore (npm/targets) realclean -->
<!-- spell-checker:ignore (platform/windows) APPDATA LOCALAPPDATA -->
<!-- spell-checker:ignore (people) Roy Ivy III * rivy ; Sindre Sorhus * sindresorhus -->
<!-- spell-checker:ignore (utils) dprint uutils -->

# [xdg-app-paths](https://github.com/rivy/js.xdg-app-paths)

> Determine ([XDG](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)-compatible) paths for storing application files (cache, config, data, etc)

[![Build status (GHA)][gha-image]][gha-url]
[![Build status (AppVeyor)][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Style Guide][style-image]][style-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![Deno version][deno-image]][deno-url]
[![NPM version][npm-image]][npm-url]
[![NodeJS version][nodejsv-image]][repository-url]
[![npmJS Downloads][downloads-image]][downloads-url]
[![JSDelivr Downloads][jsdelivr-image]][jsdelivr-url]

<!--
XDG references
# ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
# ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
# ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
# ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
# ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>
-->

## Installation (CJS/ESM/TypeScript)

<!-- ref: [JSDelivr ~ GitHub](https://www.jsdelivr.com/documentation#id-github) @@ <https://archive.is/c8s9Y> -->

```shell
npm install xdg-app-paths
# or... `npm install "git:github.com/rivy/js.xdg-app-paths"`
# or... `npm install "git:github.com/rivy/js.xdg-app-paths#v8.3.0"`
# or... `npm install "https://cdn.jsdelivr.net/gh/rivy/js.xdg-app-paths@v8.3.0/dist/xdg-app-paths.tgz"`
# or... `npm install "https://cdn.jsdelivr.net/gh/rivy/js.xdg-app-paths@COMMIT_SHA/dist/xdg-app-paths.tgz"`
```

## Usage

#### CommonJS (CJS)

```js
// MyApp.js
const xdgAppPaths = require('xdg-app-paths/cjs');

const cache = xdgAppPaths.cache();
//(nix)=> '/home/rivy/.cache/MyApp.js'
//(win)=> 'C:\\Users\\rivy\\AppData\\Local\\MyApp\\Cache'

const config = xdgAppPaths.config();
//(nix)=> '/home/rivy/.config/MyApp.js'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\MyApp\\Config'

const data = xdgAppPaths.data();
//(nix)=> '/home/rivy/.local/share/MyApp.js'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\MyApp\\Data'
```

#### ECMAScript (ESM)/TypeScript

```js
import xdgAppPaths from 'xdg-app-paths';
const configDirs = xdgAppPaths.configDirs();
//...
```

#### Deno

<!-- ref: [JSDelivr ~ GitHub](https://www.jsdelivr.com/documentation#id-github) @@ <https://archive.is/c8s9Y> -->

```ts
import xdgAppPaths from 'https://deno.land/x/xdg_app_paths@v8.3.0/src/mod.deno.ts';
//or (via CDN, [ie, JSDelivr with GitHub version/version-range, commit, 'latest' support])...
//import xdgAppPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.xdg-app-paths@v8.3.0/src/mod.deno.ts';
//import xdgAppPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.xdg-app-paths@COMMIT_SHA/src/mod.deno.ts';
const configDirs = xdgAppPaths.configDirs();
//...
```

## API

### Construction/Initialization

#### `XDGAppPaths( Options? )`

```js
// CJS
const xdgAppPaths = require('xdg-app-paths/cjs');
// or ...
const xdgAppPaths = require('xdg-app-paths/cjs')(options);

// ESM/TypeScript
import xdgAppPaths from 'xdg-app-paths';
// or ...
import XDGAppPaths from 'xdg-app-paths';
const xdgAppPaths = XDGAppPaths(options);

// Deno
import xdgAppPaths from 'https://deno.land/x/xdg_app_paths/src/mod.deno.ts';
// or ...
import XDGAppPaths from 'https://deno.land/x/xdg_app_paths/src/mod.deno.ts';
const xdgAppPaths = XDGAppPaths(options);
```

When importing this module, the object returned is a function object, `XDGAppPaths`, augmented with attached methods. Additional `XDGAppPaths` objects may be constructed by direct call of the imported `XDGAppPaths` object (eg, `const x = xdgAppPaths(...)`) or by using `new` (eg, `const x = new xdgAppPaths(...)`).

Upon construction, if not supplied with a specified name (via `Options.name`), `XDGAppPaths` will generate an application name which is used to further generate isolated application directories, where needed. "$eval" is used as the fallback value when automatically generating names (ie, for immediate mode scripts such as `node -e "..."`). The generated or supplied name is stored during `XDGAppPaths` construction and subsequently accessible via the `$name()` method.

### Interfaces/Types

```js
import type { DirOptions, Options, XDGAppPaths } from 'xdg-app-paths'; // TypeScript
//or...
//import type { DirOptions, Options, XDGAppPaths } from 'https://deno.land/x/xdg_app_paths/src/mod.deno.ts'; // Deno
```

#### `XDGAppPaths`

_`XDGAppPaths` API; also, the interface/type of the default function object export_

---

#### `DirOptions`

_Configuration options supplied to `XDGAppPaths` methods_

<small>

> **`DirOptions: boolean` => `{ isolated: boolean }`** <br/> As a shortcut, when `DirOptions` is supplied as a `boolean`, it is directly interpreted as the `isolated` property (ie, `dirOptions = { isolated: dirOptions }`).
>
> ---
>
> **`DirOptions: object`** <br/> &bullet; default = `{ isolated: true }`
>
> **`DirOptions.isolated: boolean`** <br/> &bullet; default = `true` <br/> _Isolation flag; used to override the default isolation mode, when needed_

</small>

#### `Options`

_Configuration options supplied when constructing `XDGAppPaths`_

<small>

> **`Options: string` => `{ name: string }`** <br/> As a shortcut, when `Options` is supplied as a `string`, is interpreted directly as the `name` property (ie, `options = { name: options }`).
>
> ---
>
> **`Options: object`** <br/> &bullet; default = `{ name: '', suffix: '', isolated: true }`
>
> **`Options.name: string`** <br/> &bullet; default = `''` <br/> _Name of the application; used to generate isolated application paths_ <br/> When missing (`undefined`, `null`, or empty (`''`)), it is generated automatically from the process main file name, where determinable. `'$eval'` is used as a final fallback value when the application name cannot otherwise be determined. Note, Deno reports `'$deno$eval'` as the main file name when executing `deno eval ...`.
>
> **`Options.suffix: string`** <br/> &bullet; default = `''` <br/> _Suffix which is appended to the application name when generating the application paths_
>
> **`Options.isolated: boolean`** <br/> &bullet; default = `true` <br/> _Default isolation flag (used when no isolation flag is supplied for `DirOptions`)_

</small>

All interfaces/types listed are exported individually by name (eg, as "XDGAppPaths").

### Methods

All returned path strings are simple, platform-compatible, strings and are _not_ guaranteed to exist. The application is responsible for construction of the directories. If needed, [`make-dir`](https://www.npmjs.com/package/make-dir) or [`mkdirp`](https://www.npmjs.com/package/mkdirp) can be used to create the directories.

#### `xdgAppPaths.cache( DirOptions? ): string`

_Returns the directory for non-essential data files_

> Deletion of the data contained here might cause an application to slow down.

#### `xdgAppPaths.config( DirOptions? ): string`

_Returns the directory for config files_

> Deletion of the data contained here might require the user to reconfigure an application.

#### `xdgAppPaths.data( DirOptions? ): string`

_Returns the directory for data files_

> Deletion of the data contained here might force the user to restore from backups.

#### `xdgAppPaths.runtime( DirOptions? ): string?`

_Returns the directory for runtime files; may return `undefined`_

> Deletion of the data contained here might interfere with a currently executing application but should have no effect on future executions.

#### `xdgAppPaths.state( DirOptions? ): string`

_Returns the directory for state files_

> Deletion of the data contained here should not materially interfere with execution of an application.

#### `xdgAppPaths.configDirs( DirOptions? ): readonly string[]`

_Returns a priority-sorted list of possible directories for configuration file storage (includes `paths.config()` as the first entry)_

#### `xdgAppPaths.dataDirs( DirOptions? ): readonly string[]`

_Returns a priority-sorted list of possible directories for data file storage (includes `paths.data()` as the first entry)_

#### `xdgAppPaths.$name(): string`

_Application name used for path construction (from supplied configuration or auto-generated)_

#### `xdgAppPaths.$isolated(): boolean`

_Default isolation mode used by the particular `XDGAppPaths` instance_

## Example

```js
// MyApp.js
const locatePath = require('locate-path');
const mkdirp = require('mkdirp');
const path = require('path');

const xdgAppPaths = require('xdg-app-paths/cjs');
// Extend appPaths with a "log" location function
xdgAppPaths.log = function (dirOptions) {
  const self = xdgAppPaths; // * bind `self` to `xdgAppPaths` => avoids `this` variability due to caller context
  function typeOf(x) {
    // use avoids circumvention of eslint variable tracking for `x`
    return typeof x;
  }

  if (typeOf(dirOptions) === 'boolean') {
    dirOptions = { isolated: dirOptions };
  }

  if (
    typeOf(dirOptions) !== 'object' ||
    dirOptions === null ||
    typeOf(dirOptions.isolated) !== 'boolean'
  ) {
    dirOptions = { isolated: self.$isolated() };
  }

  return path.join(self.state(dirOptions), (dirOptions.isolated ? '' : self.$name() + '-') + 'log');
};

// log file
const logPath = path.join(xdgAppPaths.log(), 'debug.txt');
mkdirp.sync(path.dirname(logPath), 0o700);

// config file
// * search for config file within user preferred directories; otherwise, use preferred directory
const possibleConfigPaths = xdgAppPaths
  .configDirs()
  .concat(xdgAppPaths.configDirs({ isolated: !xdgAppPaths.$isolated() }))
  .map((v) => path.join(v, xdgAppPaths.$name() + '.json'));
const configPath = locatePath.sync(possibleConfigPaths) || possibleConfigPaths[0];
// debug(logPath, 'configPath="%s"', configPath);
mkdirp.sync(path.dirname(configPath), 0o700);

// cache file
const cacheDir = path.join(xdgAppPaths.cache());
// debug(logPath, 'cacheDir="%s"', cacheDir);
mkdirp.sync(cacheDir, 0o700);
const cachePath = {};
cachePath.orders = path.join(cacheDir, 'orders.json');
cachePath.customers = path.join(cacheDir, 'customers.json');
//...
```

## Supported Platforms

### NodeJS

> #### Requirements
>
> NodeJS >= 4.0[^*]

<!--{blockquote: .--info style="font-size:75%;"}-->

[^*]: With the conversion to a TypeScript-based project, due to tooling constraints, building and testing are more difficult and more limited on Node platforms earlier than NodeJS-v10. However, the generated CommonJS/UMD project code is fully tested (for NodeJS-v10+) and continues to be compatible with NodeJS-v4+.

#### CommonJS modules (CJS; `*.js` and `*.cjs`)

CJS is the basic supported output (with support for NodeJS versions as early as NodeJS-v4).

```js
const xdgAppPaths = require('xdg-app-paths/cjs');
console.log(xdgAppPaths.config());
```

> Note: for CJS, `require('xdg-app-paths')` is supported for backward-compatibility and will execute correctly at run-time. However, `require('xdg-app-paths')` links to the default package type declarations which, though _correct_ for Deno/ESM/TypeScript, are _incorrect_ for CJS. This, then, leads to incorrect analysis of CJS files by static analysis tools such as TypeScript and Intellisense.
>
> Using `require('xdg-app-paths/cjs')` is preferred as it associates the proper CJS type declarations and provides correct information to static analysis tools.

#### ECMAScript modules (ESM; `*.mjs`)

- <small><span title="ESM support added in v6.0">Requires `XDGAppPaths` `v6.0`+.</span></small>

`XDGAppPaths` fully supports ESM imports.

```js
import xdgAppPaths from 'xdg-app-paths';
console.log(xdgAppPaths.config());
```

### TypeScript (`*.ts`)

- <small><span title="TypeScript support added in v6.0">Requires `XDGAppPaths` `v6.0`+.</span></small>

As of `v6.0`+, `XDGAppPaths` has been converted to a TypeScript-based module.
As a consequence, TypeScript type definitions are automatically generated, bundled, and exported by the module.

### Deno

> #### Requirements
>
> Deno >= v1.8.0[^deno-version-req]

<!--{blockquote: .--info style="font-size:75%;"}-->

[^deno-version-req]: The `Deno.permissions` API (stabilized in Deno v1.8.0) is required to avoid needless panics or prompts by Deno during static imports of this module/package. Note: Deno v1.3.0+ may be used if the run flag `--unstable` is also used.

> #### Required Permissions
>
> - `--allow-env` &middot; _allow access to the process environment variables_<br>
>   This is a transitive requirement from the 'xdg'/'xdg-portable' module; `XDG` requires access to various environment variable to determine platform and user configuration (eg, XDG configuration variables, location of temp and user directories, ...).
> - `--allow-read` &middot; _allow read(-only) access to the file system_<br>
>   This permission is required to use `Deno.mainModule`, which is, in turn, required to auto-generate the application name used for data isolation.

<!--{blockquote: .--info style="font-size:75%;"}-->

- <small><span title="Deno support added in v7.0">Requires `XDGAppPaths` `v7.0`+.</span></small>

`XDGAppPaths` also fully supports use by Deno.

```js deno
import xdgAppPaths from 'https://deno.land/x/xdg_app_paths/src/mod.deno.ts';
console.log(xdgAppPaths.config());
```

## Discussion

The [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)<small><sup>&shy;[@](https://archive.is/J0mTC)</sup></small> defines categories of user information (ie, "cache", "config", "data", ...), defines their standard storage locations, and defines the standard process for user configuration of those locations (using `XDG_CACHE_HOME`, etc).

Applications supporting the XDG convention are expected to store user-specific files within these locations, either within the common/shared directory (eg, `` `${xdg.cache()}/filename` ``) or within a more isolated application-defined subdirectory (eg, `` `${xdg.config()}/DIR/filename` ``; `DIR` usually being the application name).

### Windows ("win32") specific notes

Windows has an alternate convention, offering just two standard locations for applications to persist data, either `%APPDATA%` (for files which may "roam" with the user between hosts) and `%LOCALAPPDATA%` (for local-machine-only files). All application files are expected to be stored within an application-unique subdirectory in one of those two locations, usually under a directory matching the application name. There is no further popular convention used to segregate the file types (ie, into "cache", "config", ...) in any way similar to the XDG specification.

So, to support basic XDG-like behavior (that is, segregating the information types into type-specific directories), this module supports a new convention for Windows hosts (taken from [`xdg-portable`](https://www.npmjs.com/package/xdg-portable)), placing the specific types of files into subdirectories under either `%APPDATA%` or `%LOCALAPPDATA%`, as appropriate for the file type. The default directories used for the windows platform are listed by [`xdg-portable`](https://www.npmjs.com/package/xdg-portable#api).

By default, this module returns paths which are isolated, application-specific sub-directories under the respective common/shared base directories. These sub-directories are purely dedicated to use by the application. If, however, the application requires access to the common/shared areas, the `isolated: false` option may be used during initialization (or as an optional override for specific function calls) to generate and return the common/shared paths. Note, that when using the command/shared directories, take care to use file names which do not collide with those used by other applications.

### Origins

This module was forked from [sindresorhus/env-paths](https://github.com/sindresorhus/env-paths) in order to add cross-platform portability and support simpler cross-platform applications.

## Building and Contributing

[![Repository][repository-image]][repository-url]
[![Build status (GHA)][gha-image]][gha-url]
[![Build status (AppVeyor)][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
&nbsp; <br/>
[![Quality status (Codacy)][codacy-image]][codacy-url]
[![Quality status (CodeClimate)][codeclimate-image]][codeclimate-url]
[![Quality status (CodeFactor)][codefactor-image]][codefactor-url]

### Build requirements

- NodeJS >= 10.14
- a JavaScript package/project manager ([`npm`](https://www.npmjs.com/get-npm) or [`yarn`](https://yarnpkg.com))
- [`git`](https://git-scm.com)

> #### optional
>
> - [`bmp`](https://deno.land/x/bmp@v0.0.6) (v0.0.6+) ... synchronizes version strings within the project
> - [`git-changelog`](https://github.com/rivy-go/git-changelog) (v1.1+) ... enables changelog automation

### Quick build/test

```shell
npm install-test
```

### Contributions/development

#### _Reproducible_ setup (for CI or local development)

```shell
git clone "https://github.com/rivy/js.xdg-app-paths"
cd js.xdg-app-paths
# * note: for WinOS, replace `cp` with `copy` (or use [uutils](https://github.com/uutils/coreutils))
# npm
cp .deps-lock/package-lock.json .
npm clean-install
# yarn
cp .deps-lock/yarn.lock .
yarn --immutable --immutable-cache --check-cache
```

#### Project development scripts

```shell
> npm run help
...
usage: `npm run TARGET` or `npx run-s TARGET [TARGET..]`

TARGETs:

build               build/compile package
clean               remove build artifacts
coverage            calculate and display (or send) code coverage [alias: 'cov']
fix                 fix package issues (automated/non-interactive)
fix:lint            fix ESLint issues
fix:style           fix Prettier formatting issues
help                display help
lint                check for package code 'lint'
lint:audit          check for `npm audit` violations in project code
lint:commits        check for commit flaws (using `commitlint` and `cspell`)
lint:editorconfig   check for EditorConfig format flaws (using `editorconfig-checker`)
lint:lint           check for code 'lint' (using `eslint`)
lint:markdown       check for markdown errors (using `remark`)
lint:spell          check for spelling errors (using `cspell`)
lint:style          check for format imperfections (using `prettier`)
prerelease          clean, rebuild, and fully test (useful prior to publish/release)
realclean           remove all generated files
rebuild             clean and (re-)build project
refresh             clean and rebuild/regenerate all project artifacts
refresh:dist        clean, rebuild, and regenerate project distribution
retest              clean and (re-)test project
reset:hard          remove *all* generated files and reinstall dependencies
show:deps           show package dependencies
test                test package
test:code           test package code (use `--test-code=...` to pass options to testing harness)
test:types          test for type declaration errors (using `tsd`)
update              update/prepare for distribution [alias: 'dist']
update:changelog    update CHANGELOG (using `git changelog ...`)
update:dist         update distribution content
verify              fully (and verbosely) test package
```

#### Packaging & Publishing

##### Package

```shell
#=== * POSIX
# update project VERSION strings (package.json,...)
# * `bmp --[major|minor|patch]`; next VERSION in M.m.r (semver) format
bmp --minor
VERSION=$(cat VERSION)
git-changelog --next-tag "v${VERSION}" > CHANGELOG.mkd
# create/commit updates and distribution
git add package.json CHANGELOG.mkd README.md VERSION .bmp.yml
git commit -m "${VERSION}"
npm run clean && npm run update:dist && git add dist && git commit --amend --no-edit
# (optional) update/save dependency locks
# * note: `yarn import` of 'package-lock.json' (when available) is faster but may not work for later versions of 'package-lock.json'
rm -f package-lock.json yarn.lock
npm install --package-lock
yarn install
mkdir .deps-lock 2> /dev/null
cp package-lock.json .deps-lock/
cp yarn.lock .deps-lock/
git add .deps-lock
git commit --amend --no-edit
# tag VERSION commit
git tag -f "v${VERSION}"
# (optional) prerelease checkup
npm run prerelease
#=== * WinOS
@rem # update project VERSION strings (package.json,...)
@rem # * `bmp --[major|minor|patch]`; next VERSION in M.m.r (semver) format
bmp --minor
for /f %G in (VERSION) do @set "VERSION=%G"
git-changelog --next-tag "v%VERSION%" > CHANGELOG.mkd
@rem # create/commit updates and distribution
git add package.json CHANGELOG.mkd README.md VERSION .bmp.yml
git commit -m "%VERSION%"
npm run clean && npm run update:dist && git add dist && git commit --amend --no-edit
@rem # (optional) update/save dependency locks
@rem # * note: `yarn import` of 'package-lock.json' (when available) is faster but may not work for later versions of 'package-lock.json'
del package-lock.json yarn.lock 2>NUL
npm install --package-lock
yarn install
mkdir .deps-lock 2>NUL
copy /y package-lock.json .deps-lock >NUL
copy /y yarn.lock .deps-lock >NUL
git add .deps-lock
git commit --amend --no-edit
@rem # tag VERSION commit
git tag -f "v%VERSION%"
@rem # (optional) prerelease checkup
npm run prerelease
```

##### Publish

```shell
# publish
# * optional (will be done in 'prePublishOnly' by `npm publish`)
npm run clean && npm run test && npm run dist && git-changelog > CHANGELOG.mkd #expect exit code == 0
git diff-index --quiet HEAD || echo "[lint] ERROR uncommitted changes" # expect no output and exit code == 0
# *
npm publish # `npm publish --dry-run` will perform all prepublication actions and stop just before the actual publish push
# * if published to NPMjs with no ERRORs; push to deno.land with tag push
git push origin --tags
```

### Contributions

Contributions are welcome.

Any pull requests should be based off of the default branch (`master`). And, whenever possible, please include tests for any new code, ensuring that local (via `npm test`) and remote CI testing passes.

By contributing to the project, you are agreeing to provide your contributions under the same [license](./LICENSE) as the project itself.

## Related

- [`xdg-portable`](https://www.npmjs.com/package/xdg-portable) ... XDG Base Directory paths (cross-platform)
- [`env-paths`](https://www.npmjs.com/package/env-paths) ... inspiration for this module

## License

[MIT](./LICENSE) © [Roy Ivy III](https://github.com/rivy)

<!-- badge references -->

<!-- Repository -->
<!-- Note: for '[repository-image] ...', `%E2%81%A3` == utf-8 sequence of "Unicode Character 'INVISIBLE SEPARATOR' (U+2063)"; ref: <https://codepoints.net/U+2063> -->

[repository-image]: https://img.shields.io/github/v/tag/rivy/js.xdg-app-paths?sort=semver&label=%E2%81%A3&logo=github&logoColor=white
[repository-url]: https://github.com/rivy/js.xdg-app-paths
[license-image]: https://img.shields.io/npm/l/xdg-app-paths.svg?color=tomato&style=flat
[license-url]: license
[nodejsv-image]: https://img.shields.io/node/v/xdg-app-paths?color=slateblue
[style-image]: https://img.shields.io/badge/code_style-prettier-mediumvioletred.svg
[style-url]: https://prettier.io

<!-- Continuous integration/deployment (CICD) -->

[appveyor-image]: https://img.shields.io/appveyor/ci/rivy/js-xdg-app-paths/master.svg?style=flat&logo=AppVeyor&logoColor=deepskyblue
[appveyor-url]: https://ci.appveyor.com/project/rivy/js-xdg-app-paths
[gha-image]: https://img.shields.io/github/actions/workflow/status/rivy/js.xdg-app-paths/CI.yml?branch=master&label=CI&logo=github
[gha-url]: https://github.com/rivy/js.xdg-app-paths/actions?query=workflow%3ACI

<!-- Code quality -->

[coverage-image]: https://img.shields.io/codecov/c/github/rivy/js.xdg-app-paths/master.svg
[coverage-url]: https://codecov.io/gh/rivy/js.xdg-app-paths
[codeclimate-url]: https://codeclimate.com/github/rivy/js.xdg-app-paths
[codeclimate-image]: https://img.shields.io/codeclimate/maintainability/rivy/js.xdg-app-paths?label=codeclimate
[codacy-image]: https://img.shields.io/codacy/grade/6f019c41b12b4c35a5ac5693744e4b96?label=codacy
[codacy-url]: https://app.codacy.com/gh/rivy/js.xdg-app-paths/dashboard
[codefactor-image]: https://img.shields.io/codefactor/grade/github/rivy/js.xdg-app-paths?label=codefactor
[codefactor-url]: https://www.codefactor.io/repository/github/rivy/js.xdg-app-paths

<!-- Distributors/Registries -->

[deno-image]: https://img.shields.io/github/v/tag/rivy/js.xdg-app-paths?label=deno
[deno-url]: https://deno.land/x/xdg_app_paths
[downloads-image]: http://img.shields.io/npm/dm/xdg-app-paths.svg?style=flat
[downloads-url]: https://npmjs.org/package/xdg-app-paths
[jsdelivr-image]: https://img.shields.io/jsdelivr/gh/hm/rivy/js.xdg-app-paths?style=flat
[jsdelivr-url]: https://www.jsdelivr.com/package/gh/rivy/js.xdg-app-paths
[npm-image]: https://img.shields.io/npm/v/xdg-app-paths.svg?style=flat
[npm-url]: https://npmjs.org/package/xdg-app-paths

<!-- Alternate/Old image/URL links -->

<!-- [appveyor-image]: https://ci.appveyor.com/api/projects/status/.../branch/master?svg=true -->
<!-- [coverage-image]: https://img.shields.io/coveralls/github/rivy/xdg-app-paths/master.svg -->
<!-- [coverage-url]: https://coveralls.io/github/rivy/xdg-app-paths -->
<!-- [npm-image]: https://img.shields.io/npm/v/xdg-app-paths.svg?style=flat&label=npm&logo=NPM&logoColor=linen -->
<!-- [repository-image]:https://img.shields.io/badge/%E2%9D%A4-darkcyan?style=flat&logo=github -->
<!-- [style-image]: https://img.shields.io/badge/code_style-standard-darkcyan.svg -->
<!-- [style-url]: https://standardjs.com -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.xdg-app-paths/master.svg?style=flat&logo=Travis-CI&logoColor=silver -->
<!-- [travis-image]: https://travis-ci.org/rivy/js.xdg-app-paths.svg?branch=master -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.xdg-app-paths/master.svg?style=flat&logo=travis -->
<!-- [travis-url]: https://travis-ci.org/rivy/js.xdg-app-paths -->
