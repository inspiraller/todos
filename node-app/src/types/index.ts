export interface RowProps {
  id: number;
  todoText: string;
  completed: boolean;
}
export type ReadonlyRows = ReadonlyArray<RowProps>;
