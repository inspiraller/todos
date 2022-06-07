import { useMemo } from 'react';
import { AnyAction, Store } from 'redux';
import configureStore from './configureStore';

import { ApplicationState } from './rootReducer';

export interface TobjStoreWrapper {
  store: Store<ApplicationState, AnyAction>;
}

let objStoreWrapper: TobjStoreWrapper;

const initStore = (preloadedState: ApplicationState = {}) =>
  configureStore({ initialState: preloadedState });

export const initializeStore = (preloadedState: ApplicationState = {}) => {
  /* eslint-disable no-underscore-dangle */
  let _objStoreWrapper: TobjStoreWrapper = objStoreWrapper ?? initStore(preloadedState); // <!- Can mock data here for test purposes....

  if (preloadedState && objStoreWrapper) {
    _objStoreWrapper = initStore({
      ...objStoreWrapper?.store?.getState(),
      ...preloadedState,
    });
    // Reset the current objStoreWrapper
    objStoreWrapper = undefined as unknown as TobjStoreWrapper;
  }
  // For SSG and SSR always create a new objStoreWrapper
  if (typeof global?.window === 'undefined') return _objStoreWrapper;
  // Create the objStoreWrapper once in the client
  if (!objStoreWrapper) objStoreWrapper = _objStoreWrapper;

  return _objStoreWrapper;
};
export function useStore(initialState: ApplicationState) {
  return useMemo(() => initializeStore(initialState).store, [initialState]);
}
