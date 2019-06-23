import {expectType} from 'tsd';
import osPaths = require('.');
import {Paths} from '.';

expectType<Paths>(osPaths('MyApp'));
expectType<Paths>(osPaths('MyApp', {suffix: 'test'}));

const paths = osPaths('MyApp');

expectType<string>(paths.cache);
expectType<string>(paths.config);
expectType<string>(paths.data);
expectType<string>(paths.log);
expectType<string>(paths.temp);
