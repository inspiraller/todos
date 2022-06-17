import { RowPropsClient } from "src/types";

export interface PropsInitial {
 pending: RowPropsClient[]
 completed: RowPropsClient[]
}

const initialState: PropsInitial = {
  pending: [],
  completed: []
};

export default initialState;
