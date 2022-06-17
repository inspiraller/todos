export interface RowPropsClient {
  id: number | string;
  todoText: string;
}
export type ReadonlyRows = ReadonlyArray<RowPropsClient>;

export interface PropsTodos {
  pending: RowPropsClient[];
  completed: RowPropsClient[];
}
