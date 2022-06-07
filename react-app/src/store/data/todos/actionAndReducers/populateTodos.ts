import { PropsInitial } from '../_initialState';

export const TYPE_POPULATE_TODOS = 'todos/POPULATE_TODOS';

export interface Payload {
  pending?: string[];
  completed?: string[];
}

type TacPopulateTodos = (props: Payload) => {
  type: string;
  payload: Payload;
};

export const acPopulateTodos: TacPopulateTodos = (payload) => ({
  type:  TYPE_POPULATE_TODOS,
  payload,
});

type TrdcPopulateTodos = (props: { state: PropsInitial; payload: Payload }) => PropsInitial;
export const rdcPopulateTodos: TrdcPopulateTodos = ({ state, payload }) => {
  const loaded = payload as Payload;

  const pending = loaded?.pending || state.pending;
  const completed  = loaded?.completed || state.completed

  return {
    ...state,
    pending,
    completed
  };
};
