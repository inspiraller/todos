import { AnyAction } from 'redux'
import initialState, { PropsInitial } from './_initialState'
import {
  TYPE_POPULATE_TODOS,
  rdcPopulateTodos,
} from './actionAndReducers/populateTodos'

const reducer = (
  state: PropsInitial = initialState,
  action: AnyAction
): PropsInitial => {
  const { payload } = action
  switch (action.type) {
    case TYPE_POPULATE_TODOS:
      return rdcPopulateTodos({ state, payload })
    default:
      return state
  }
}

export default reducer
