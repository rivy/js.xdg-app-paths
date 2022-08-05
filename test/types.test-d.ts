import { expectType } from 'tsd';

import xdgAppPaths from '../src/mod.esm';

expectType<typeof xdgAppPaths>(xdgAppPaths);
expectType<typeof xdgAppPaths>(xdgAppPaths());
expectType<typeof xdgAppPaths>(new xdgAppPaths());

expectType<typeof xdgAppPaths>(xdgAppPaths('MyApp'));
expectType<typeof xdgAppPaths>(xdgAppPaths({ name: 'MyApp', suffix: '-nodejs', isolated: false }));
expectType<typeof xdgAppPaths>(new xdgAppPaths('MyApp'));
expectType<typeof xdgAppPaths>(
	new xdgAppPaths({ name: 'MyApp', suffix: '-nodejs', isolated: false })
);

const paths = xdgAppPaths('MyApp');

expectType<typeof xdgAppPaths>(paths);

expectType<string>(paths.$name());
expectType<boolean>(paths.$isolated());

expectType<string>(paths.cache());
expectType<string>(paths.cache(false));
expectType<string>(paths.cache({ isolated: true }));
expectType<string>(paths.config());
expectType<string>(paths.config(true));
expectType<string>(paths.config({ isolated: false }));
expectType<string>(paths.data());
expectType<string>(paths.data(false));
expectType<string>(paths.data({ isolated: true }));
expectType<string | undefined>(paths.runtime());
expectType<string | undefined>(paths.runtime(true));
expectType<string | undefined>(paths.runtime({ isolated: false }));
expectType<string>(paths.state());
expectType<string>(paths.state(false));
expectType<string>(paths.state({ isolated: true }));
expectType<readonly string[]>(paths.configDirs());
expectType<readonly string[]>(paths.configDirs(true));
expectType<readonly string[]>(paths.configDirs({ isolated: false }));
expectType<readonly string[]>(paths.dataDirs());
expectType<readonly string[]>(paths.dataDirs(false));
expectType<readonly string[]>(paths.dataDirs({ isolated: true }));
