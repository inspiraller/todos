
export interface PropsInitial {
 pending: string[];
 completed: string[];
}

const initialState: PropsInitial = {
  pending: [],
  completed: []
};

export default initialState;
