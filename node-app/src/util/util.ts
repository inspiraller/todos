import { ReadonlyRows, RowProps } from "src/types";

export const filterPending = (rows: ReadonlyRows): ReadonlyArray<RowProps['todoText']> =>
  rows.filter((row) => !row.completed).map((row) => row.todoText);

export const filterCompleted = (rows: ReadonlyRows): ReadonlyArray<RowProps['todoText']> =>
  rows.filter((row) => row.completed).map((row) => row.todoText);
