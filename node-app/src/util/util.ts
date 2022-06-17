import { ReadonlyRows, RowPropsClient } from "src/types";

export const filterPending = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => !row.completed);

export const filterCompleted = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => row.completed);
