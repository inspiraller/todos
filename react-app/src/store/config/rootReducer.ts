import { combineReducers } from 'redux';
import todos from 'src/store/data/todos/reducer';

export interface ApplicationState {
  todos?: ReturnType<typeof todos>;
}

export const rootReducer = {
  todos,
};

const createRootReducer = () =>
  combineReducers<ApplicationState>({
    ...rootReducer,
  });

export default createRootReducer;
