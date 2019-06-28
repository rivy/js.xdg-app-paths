<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- spell-checker:ignore rivy Sindre Sorhus -->

# os-paths [![Build Status](https://travis-ci.org/rivy/js.os-paths.svg?branch=master)](https://travis-ci.org/rivy/js.os-paths)

> Get paths for storing things like data, config, cache, etc

Uses the correct OS-specific paths. Most developers get this wrong.

## Install

```shell
npm install os-paths
```

## Usage

```js
const osPaths = require('os-paths');

const paths = osPaths('MyApp');

paths.data;
//=> '/home/rivy/.local/share/MyApp-nodejs'

paths.config
//=> '/home/rivy/.config/MyApp-nodejs'
```

## API

### paths = osPaths(name, [options])

Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

#### name

Type: `string`

Name of your project. Used to generate the paths.

#### options

Type: `Object`

##### suffix

Type: `string`<br>
Default: `'nodejs'`

**Don't use this option unless you really have to!**<br>
Suffix appended to the project name to avoid name conflicts with native
apps. Pass an empty string to disable it.

### paths.data

Directory for data files.

### paths.config

Directory for config files.

### paths.cache

Directory for non-essential data files.

### paths.log

Directory for log files.

### paths.temp

Directory for temporary files.

## License

MIT © Roy Ivy III, [Sindre Sorhus](https://sindresorhus.com)
