import {expectType} from 'tsd';
import xdgAppPaths = require('../src/lib');

const paths: typeof xdgAppPaths = xdgAppPaths('MyApp');

expectType<typeof xdgAppPaths>(xdgAppPaths());
expectType<typeof xdgAppPaths>(xdgAppPaths('MyApp'));
expectType<typeof xdgAppPaths>(xdgAppPaths({name: 'MyApp', suffix: '-nodejs', isolated: false}));

expectType<string>(paths.cache());
expectType<string>(paths.cache(false));
expectType<string>(paths.cache({isolated: true}));
expectType<string>(paths.config());
expectType<string>(paths.config(true));
expectType<string>(paths.config({isolated: false}));
expectType<string>(paths.data());
expectType<string>(paths.data(false));
expectType<string>(paths.data({isolated: true}));
expectType<string|undefined>(paths.runtime());
expectType<string|undefined>(paths.runtime(true));
expectType<string|undefined>(paths.runtime({isolated: false}));
expectType<string>(paths.state());
expectType<string>(paths.state(false));
expectType<string>(paths.state({isolated: true}));
expectType<string[]>(paths.configDirs());
expectType<string[]>(paths.configDirs(true));
expectType<string[]>(paths.configDirs({isolated: false}));
expectType<string[]>(paths.dataDirs());
expectType<string[]>(paths.dataDirs(false));
expectType<string[]>(paths.dataDirs({isolated: true}));

expectType<string>(paths.$name());
expectType<boolean>(paths.$isolated());
