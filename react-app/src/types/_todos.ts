export type Tid = number | string;
export interface RowPropsClient {
  id: Tid;
  todoText: string;
}
export type ReadonlyRows = ReadonlyArray<RowPropsClient>;

export interface PropsTodos {
  pending: RowPropsClient[];
  completed: RowPropsClient[];
}
