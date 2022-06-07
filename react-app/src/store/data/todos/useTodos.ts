import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'src/store/config/rootReducer';

import { acPopulateTodos, Payload as PayloadPopulate } from './actionAndReducers/populateTodos';

const useTodos = () => {
  const dispatch = useDispatch();
  return {
    acPopulateTodos: (payload: PayloadPopulate) => {
      dispatch(acPopulateTodos(payload));
    },
    pending: useSelector((state: ApplicationState) => state?.todos?.pending),
    completed: useSelector((state: ApplicationState) => state?.todos?.completed),
  };
};

export default useTodos;
