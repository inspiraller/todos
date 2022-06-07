import { createStore, Store } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer, { ApplicationState } from "./rootReducer";

type TConfigure = (arbitrary: { initialState?: ApplicationState }) => {
  store: Store<ApplicationState>;
};

const configureStore: TConfigure = ({ initialState = {} }) => {


  const reducers = createRootReducer();
  const store = createStore<ApplicationState, any, any, any>(
    reducers,
    initialState,
    composeWithDevTools()
  ) as Store<ApplicationState>;
  return { store };
};

export default configureStore;
