import {expectType} from 'tsd';
import xdgAppPaths = require('.');
import {Paths} from '.';

expectType<Paths>(xdgAppPaths('MyApp'));
expectType<Paths>(xdgAppPaths('MyApp', {suffix: 'test'}));

const paths = xdgAppPaths('MyApp');

expectType<string>(paths.cache);
expectType<string>(paths.config);
expectType<string>(paths.data);
expectType<string>(paths.log);
expectType<string>(paths.temp);
