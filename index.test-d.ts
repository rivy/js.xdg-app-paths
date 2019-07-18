import {expectType} from 'tsd';
import xdgAppPaths = require('.');
import {Paths} from '.';

expectType<Paths>(xdgAppPaths('MyApp'));

const paths = xdgAppPaths('MyApp');

expectType<string>(paths.cache());
expectType<string>(paths.config());
expectType<string>(paths.data());
expectType<string|undefined>(paths.runtime());
expectType<string>(paths.state());
expectType<string>(paths.temp());
