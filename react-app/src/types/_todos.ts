export type Tid = number | string;
export interface RowPropsClient {
  id: Tid;
  todoText: string;
  created_timestamp: string; // date
  completed: string; // date
}
export type ReadonlyRows = ReadonlyArray<RowPropsClient>;

export interface PropsTodos {
  pending: RowPropsClient[];
  completed: RowPropsClient[];
}
