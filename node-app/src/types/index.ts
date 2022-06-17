export interface RowProps {
  id: number;
  todoText: string;
  completed: boolean;
}
export type ReadonlyRows = ReadonlyArray<RowProps>;

export interface RowPropsClient {
  id: number;
  todoText: string;
}
