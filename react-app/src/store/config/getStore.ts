import { AnyAction, Store } from 'redux';
import configureStore from './configureStore';

import { ApplicationState } from './rootReducer';

/* eslint-disable import/no-mutable-exports */
export type Tstore = Store<ApplicationState, AnyAction>;

interface PropStoreEmpty {
  store?: Tstore;
}

interface PropStore {
  store: Tstore;
}

let objStore: PropStoreEmpty | PropStore = {};

if (!objStore.store) {
  objStore = configureStore({});
}

export default objStore as PropStore;

