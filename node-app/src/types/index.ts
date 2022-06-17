export interface RowProps {
  id: number;
  todoText: string;
  created_timestamp: string; // date
  completed: string; // date
}
export type ReadonlyRows = ReadonlyArray<RowProps>;

export interface RowPropsClient {
  id: number;
  todoText: string;
  created_timestamp: string; // date
  completed: string; // date
}
